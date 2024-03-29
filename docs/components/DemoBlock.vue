<template>
  <div
      class="demo-block"
      :class="[blockClass, { hover: hovering }]"
      @mouseenter="hovering = true"
      @mouseleave="hovering = false"
  >
    <div class="vp-raw">
      <div class="source">
        <slot name="default"></slot>
      </div>
    </div>
    <div ref="meta" class="meta">
      <!--      <div v-if="$slots.description" class="description">-->
      <!--        <slot name="description"></slot>-->
      <!--      </div>-->
      <div class="highlight">
        <slot name="code"></slot>
      </div>
    </div>
    <div
        ref="control"
        class="demo-block-control"
        :class="{ 'is-fixed': fixedControl }"
        @click="isExpanded = !isExpanded"
    >
      <transition name="arrow-slide">
        <i :class="[iconClass, { hovering: hovering }]"></i>
      </transition>
      <transition name="text-slide">
        <span>{{ controlText }}</span>
      </transition>
      <div class="control-button-container control-button-container-left">
        <el-button
            v-show="isExpanded && hasSetup"
            size="small"
            type="text"
            class="control-button"
            @click.stop="onSwitchSyntax"
        >
          {{
            showSetup
                ? langConfig['switch-button-option-text']
                : langConfig['switch-button-setup-text']
          }}
        </el-button>
      </div>
      <div class="control-button-container">
        <el-button
            v-show="isExpanded"
            ref="copyButton"
            size="small"
            type="text"
            class="control-button copy-button"
            @click.stop="copyCode"
        >
          复制代码
        </el-button>
        <el-tooltip
            effect="dark"
            content="前往 codepen.io 运行此示例"
            placement="right"
        >
          <transition name="text-slide">
            <el-button
                v-show="isExpanded"
                size="small"
                type="text"
                class="control-button run-online-button"
                @click.stop="goCodepen"
            >
              在线运行
            </el-button>
          </transition>
        </el-tooltip>
      </div>
    </div>
  </div>
</template>
<script>
import { nextTick, onMounted, reactive, ref } from 'vue'
// import hljs from 'highlight.js'
// import clipboardCopy from 'clipboard-copy'
// import compoLang from '../i18n/component.json'
import { useClipboard } from '@vueuse/core'
import {
  stripScript,
  stripStyle,
  stripTemplate,
  stripSetup,
  removeSetup,
} from './util'

const version = '1.0.0' // element version
const stripTemplateAndRemoveTemplate = (code) => {
  const result = removeSetup(stripTemplate(code))
  if (result.indexOf('<template>') === 0) {
    const html = result.replace(/^<template>/, '').replace(/<\/template>$/, '')
    return html
        .replace(/^[\r?\n|\r]/, '')
        .replace(/[\r?\n|\r]$/, '')
        .trim()
  }
  return result
}
const sanitizeHTML = (str) => {
  const temp = document.createElement('div')
  temp.textContent = str
  return temp.innerHTML || ''
}
export default {
  data() {
    return {
      codepen: {
        script: '',
        html: '',
        style: '',
      },
      hovering: false,
      isExpanded: false,
      fixedControl: false,
      scrollParent: null,
      showSetup: false,
      hasSetup: false,
    }
  },
  computed: {
    lang() {
      return 'zh-CN'
    },
    langConfig() {
      return 'zh-CN'
    },
    blockClass() {
      // return `demo-${this.lang} demo-${this.$router.currentRoute.value.path
      //   .split('/')
      //   .pop()}`
      return ''
    },
    iconClass() {
      return this.isExpanded ? 'el-icon-caret-top' : 'el-icon-caret-bottom'
    },
    controlText() {
      return this.isExpanded
          ? '隐藏代码'
          : '显示代码'
    },
    codeArea() {
      return this.$el.getElementsByClassName('meta')[0]
    },
    displayDemoCode() {
      return this.showSetup ? this.codepen.setup : this.codepen.script
    },
  },
  watch: {
    isExpanded(val) {
      this.setCodeAreaHeight()
      if (!val) {
        this.fixedControl = false
        this.$refs.control.style.left = '0'
        this.removeScrollHandler()
        return
      }
      setTimeout(() => {
        this.scrollParent = document.querySelector(
            '.page-component__scroll > .el-scrollbar__wrap',
        )
        this.scrollParent &&
        this.scrollParent.addEventListener('scroll', this.scrollHandler)
        this.scrollHandler()
      }, 200)
    },
  },
  beforeUnmount() {
    this.removeScrollHandler()
  },
  mounted() {
    const highlight = this.$slots?.code?.()
    console.log(highlight)
    // if (highlight && highlight[0]) {
    //   const code = highlight[0].el.innerText
    //   if (code) {
    //     this.codepen.html = stripTemplateAndRemoveTemplate(code)
    //     this.codepen.script = stripScript(code)
    //     this.codepen.style = stripStyle(code)
    //     this.codepen.setup = stripSetup(code)
    //     if (this.codepen.setup) {
    //       this.hasSetup = true
    //     }
    //   }
    // }
  },
  methods: {
    getCodeAreaHeight() {
      if (this.$el.getElementsByClassName('description').length > 0) {
        return (
            this.$el.getElementsByClassName('description')[0].clientHeight +
            this.$el.getElementsByClassName('highlight')[0].clientHeight +
            20
        )
      }
      return this.$el.getElementsByClassName('highlight')[0].clientHeight
    },
    setCodeAreaHeight() {
      this.codeArea.style.height = this.isExpanded
          ? `${this.getCodeAreaHeight() + 1}px`
          : '0'
    },

    onSwitchSyntax() {
      this.showSetup = !this.showSetup
      this.$nextTick(this.setCodeAreaHeight)
    },
    goCodepen() {
      // since 2.6.2 use code rather than jsfiddle https://blog.codepen.io/documentation/api/prefill/
      const { script, html, style } = this.codepen
      const resourcesTpl =
          '<scr' +
          'ipt src="//unpkg.com/vue@next"></scr' +
          'ipt>' +
          '\n<scr' +
          `ipt src="//unpkg.com/element-plus/dist/index.full.js"></scr` +
          'ipt>'
      const htmlTpl = `${resourcesTpl}\n<div id="app">\n${html.trim()}\n</div>`
      const cssTpl = `@import url("//unpkg.com/element-plus/dist/index.css");\n${(
          style || ''
      ).trim()}\n`
      let jsTpl = script
          ? script
              .replace(/export default/, 'var Main =')
              .trim()
              .replace(
                  /import ({.*}) from 'vue'/g,
                  (s, s1) => `const ${s1} = Vue`,
              )
              .replace(
                  /import ({.*}) from 'element-plus'/g,
                  (s, s1) => `const ${s1} = ElementPlus`,
              )
          : 'var Main = {}'
      jsTpl +=
          '\n;const app = Vue.createApp(Main);\napp.use(ElementPlus);\napp.mount("#app")'
      const data = {
        js: jsTpl,
        // css: cssTpl,
        // html: htmlTpl,
        editors: 'vue',
        parentId: 0,
      }
      const form =
          document.getElementById('fiddle-form') || document.createElement('form')
      while (form.firstChild) {
        form.removeChild(form.firstChild)
      }
      form.method = 'POST'
      // form.action = 'https://codepen.io/pen/define/'
      form.action = 'https://codepen.io/pen/?template=qBjpaKR'

      form.target = '_blank'
      form.style.display = 'none'
      const input = document.createElement('input')
      input.setAttribute('name', 'data')
      input.setAttribute('type', 'hidden')
      input.setAttribute('value', JSON.stringify(data))
      form.appendChild(input)
      document.body.appendChild(form)
      form.submit()
      document.body.removeChild(form)
    },
    scrollHandler() {
      const { top, bottom, left } = this.$refs.meta.getBoundingClientRect()
      const controlBarHeight = 44
      this.fixedControl =
          bottom + controlBarHeight > document.documentElement.clientHeight &&
          top <= document.documentElement.clientHeight
      this.$refs.control.style.left = this.fixedControl ? `${left}px` : '0'
    },
    removeScrollHandler() {
      this.scrollParent &&
      this.scrollParent.removeEventListener('scroll', this.scrollHandler)
    },
  },
  setup(props, { slots }) {
    const state = reactive({
      codepen: {
        script: '',
        html: '',
        style: '',
        setup: '',
      },
      hasSetup: false,
    })
    const source = ref('')
    onMounted(() => {
      getCode()
    })
    const getCode = () => {
      const highlight = slots?.code?.()
      console.log(highlight)
      // if (highlight && highlight[0]) {
      //   const code = highlight[0].el.innerText
      //   source.value = code
      //   if (code) {
      //     state.codepen.html = stripTemplateAndRemoveTemplate(code)
      //     state.codepen.script = stripScript(code)
      //     state.codepen.style = stripStyle(code)
      //     state.codepen.setup = stripSetup(code)
      //     if (state.codepen.setup) {
      //       state.hasSetup = true
      //     }
      //   }
      // }
    }
    const { copy } = useClipboard({ source })
    const copyCode = () => {
      copy()
    }
    return { copyCode }
  },
}
</script>
<style lang="scss">
.demo-block {
  border: 1px solid #dcdfe6;
  border-radius: 4px;
  code {
    font-family: Menlo, Monaco, Consolas, Courier, monospace;
  }
  .demo-button {
    float: right;
  }
  .source {
    padding: 24px;
  }
  .meta {
    background-color: #fafafa;
    border-top: solid 1px var(--el-border-color-base);
    overflow: hidden;
    height: 0;
    transition: height 0.2s;
  }
  .description {
    padding: 20px;
    box-sizing: border-box;
    border: solid 1px var(--el-border-color-base);
    border-radius: 3px;
    font-size: 14px;
    line-height: 22px;
    color: var(--el-text-color-regular);
    word-break: break-word;
    margin: 10px;
    background-color: #fff;
    p {
      margin: 0;
      line-height: 26px;
    }
    //code {
    //  color: #5e6d82;
    //  background-color: #e6effb;
    //  margin: 0 4px;
    //  display: inline-block;
    //  padding: 1px 5px;
    //  font-size: 12px;
    //  border-radius: 3px;
    //  height: 18px;
    //  line-height: 18px;
    //}
  }
  .highlight {
    //padding: 0 10px 10px;
    div[class*='language-'] {
      margin: 0;
      border-radius: 0;
    }
    pre {
      margin: 0;
    }
    code.hljs {
      margin: 0;
      border: none;
      max-height: none;
      border-radius: 0;
      &::before {
        content: none;
      }
    }
  }
  .demo-block-control {
    border-top: solid 1px var(--el-border-color-base);
    height: 44px;
    box-sizing: border-box;
    background-color: #fff;
    border-bottom-left-radius: 4px;
    border-bottom-right-radius: 4px;
    text-align: center;
    margin-top: -1px;
    color: #d3dce6;
    cursor: pointer;
    position: relative;
    &.is-fixed {
      position: sticky;
      bottom: 0;
      z-index: 1000;
    }
    i {
      font-size: 16px;
      line-height: 44px;
      transition: 0.3s;
      &.hovering {
        transform: translateX(-40px);
      }
    }
    > span {
      position: absolute;
      transform: translateX(-30px);
      font-size: 14px;
      line-height: 44px;
      transition: 0.3s;
      display: inline-block;
    }
    &:hover {
      color: #409eff;
      background-color: #f9fafc;
    }
    & .text-slide-enter,
    & .text-slide-leave-active {
      opacity: 0;
      transform: translateX(10px);
    }
    .control-button-container {
      line-height: 40px;
      position: absolute;
      top: 0;
      right: 0;
      padding-left: 5px;
      padding-right: 25px;
    }
    .control-button-container-left {
      left: 0;
      width: 100%;
      height: 40px;
      padding-left: 14px; // 14 + 10 = 24px .hljs code padding left 24
    }
    .control-button {
      font-size: 14px;
      margin: 0 10px;
    }
  }
}
</style>
