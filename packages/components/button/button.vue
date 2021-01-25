<template>
  <component
    :is="content?'el-tooltip':'pl-wrapper'"
    v-bind="content?calTipConfig:{}"
  >
    <component
      :is="confirmType === 'pop'?'el-popconfirm':'pl-wrapper'"
      v-bind="confirmType === 'pop'?popConfig:{}"
      @confirm="handlePopConfirm"
      @cancel="$emit('cancel')"
    >
      <template v-slot:[slotName]>
        <el-button
          @click.stop="handleClick"
          v-loading.fullscreen.lock="fullscreenLoading"
          v-bind="$attrs"
          :loading="loading"
          :type="type">
          <slot></slot>
        </el-button>
      </template>
    </component>
  </component>
</template>

<script>
import { defineComponent, ref, computed } from 'vue'
import { ElMessageBox } from 'element-plus'
import debounce from 'lodash/debounce'

export default defineComponent({
  name: 'pl-button',
  inheritAttrs: false,
  emits: ['click', 'confirm', 'cancel'],
  props: {
    autoLoading: {
      type: Boolean,
      default: false
    },
    autoFullScreenLoading: {
      type: Boolean,
      default: false
    },
    confirmType: {
      type: String,
      default: null
    },
    confirmConfig: {
      type: Object,
      default: () => ({})
    },
    popConfig: {
      type: Object,
      default: () => ({ title: '确定删除吗？' })
    },
    type: {
      type: String,
      default: null
    },
    content: {
      type: String,
      default: null
    },
    tipConfig: {
      type: Object,
      default: null
    },
    debounce: {
      type: [Number, Boolean],
      default: false
    }
  },
  setup (props, { emit }) {
    const loading = ref(false)
    const fullscreenLoading = ref(false)
    const calTipConfig = computed(() => {
      return {
        effect: 'dark',
        placement: 'top',
        content: props.content,
        ...props.tipConfig
      }
    })
    const slotName = computed(() => {
      return props.confirmType === 'pop' ? 'reference' : 'default'
    })
    const clickDone = () => {
      loading.value = false
      fullscreenLoading.value = false
    }
    const clickStart = () => {
      if (props.autoLoading) {
        loading.value = true
      }
      if (props.autoFullScreenLoading) {
        fullscreenLoading.value = true
      }
    }
    const handleConfirm = () => {
      const {
        message = '此操作将永久删除该数据, 是否继续?',
        title = '提示',
        confirmButtonText = '确定',
        cancelButtonText = '取消',
        type = 'warning'
      } = props.confirmConfig
      ElMessageBox.confirm(message, title, {
        confirmButtonText,
        cancelButtonText,
        type
      }).then(() => {
        clickStart()
        emit('confirm', clickDone)
      }).catch(() => {
        emit('cancel')
      })
    }
    const handleClick = () => {
      if (props.confirmType === 'pop') {
        return
      }
      if (props.confirmType === 'confirm') {
        handleConfirm()
      } else {
        clickStart()
        emit('click', clickDone)
      }
    }
    const debounceTime = typeof props.debounce === 'number' ? props.debounce : 500
    const debounceClick = debounce(handleClick, debounceTime, { leading: true })
    const handlePopConfirm = () => {
      if (props.confirmType === 'confirm') {
        handleConfirm()
        return
      }
      clickStart()
      emit('confirm', clickDone)
    }
    return {
      calTipConfig,
      handleClick: props.debounce ? debounceClick : handleClick,
      handlePopConfirm,
      loading,
      fullscreenLoading,
      slotName
    }
  }
})
</script>

<style>

</style>
