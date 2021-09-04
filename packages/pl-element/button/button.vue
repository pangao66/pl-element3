<template>
  <component
    :is="currentComponent"
    v-bind="currentComponentConfig"
    @confirm="confirmClick"
  >
    <template #[slotName]>
      <el-button
        v-loading.fullscreen="fullscreenLoadingStatus"
        :loading="loadingStatus"
        @click="handleClick"
        v-bind="$attrs"
      >
        <slot></slot>
      </el-button>
      <slot name="content"></slot>
    </template>

  </component>
</template>

<script lang="ts" setup>
import { computed, reactive, ref, toRefs } from 'vue';
import { debounce as debounceFn } from 'lodash-es'
import PlWrapper from "../wrapper/wrapper.vue";
import { ElMessageBox } from "element-plus";

// import { DebouncedFunc } from '@types/lodash/common/function'

interface PlButtonProps {
  autoLoading?: boolean;
  autoFullscreenLoading?: boolean;
  // debounce?: boolean | import("lodash").DebouncedFunc<(index: any) => void>
  debounce?: boolean
  confirmType?: 'messagebox' | 'pop'
  popConfirmConfig?: any
  messageBoxConfig?: any
  tipContent?: string
  tipConfig?: any
}

const props = withDefaults(defineProps<PlButtonProps>(), {
  autoLoading: false,
  autoFullscreenLoading: false,
  debounce: false,
  popConfirmConfig: {
    title: '确定删除吗?'
  },
  messageBoxConfig: {},
  tipConfig: {}
});
const emit = defineEmits<{
  (e: 'click', cb: () => void, event: MouseEvent): void
  (e: 'confirm', cb: () => void): void
  (e: 'cancel'): void
}>();

const loadingStatus = ref(false);
const fullscreenLoadingStatus = ref(false);
// const {
//   autoLoading, autoFullscreenLoading, debounce, confirmType, popConfirmConfig, messageBoxConfig, tipContent, tipConfig
// } = reactive(props);
const slotName = computed(() => {
  return props.confirmType === 'pop' ? 'reference' : 'default'
})
const currentComponent = computed(() => {
  if (props.tipContent) {
    return 'el-tooltip'
  }
  if (props.confirmType === 'pop') {
    return 'el-popconfirm'
  }
  return PlWrapper
})
const currentComponentConfig = computed(() => {
  if (props.tipContent) {
    return {
      content: props.tipContent,
      effect: 'dark',
      placement: 'top',
      ...props.tipConfig
    }
  }
  if (props.confirmType === 'pop') {
    return props.popConfirmConfig
  }
  return {}
})

function handleClick(e: MouseEvent) {
  // 防抖
  if (props.debounce) {
    debounceClick(e)
    return
  }
  // popconfirm
  if (props.confirmType === 'pop') {
    return
  }
  // messagebox confirm
  if (props.confirmType === 'messagebox') {
    messageBoxConfirm()
    return
  }
  // 普通按钮点击自动全屏loading
  if (props.autoFullscreenLoading) {
    fullscreenLoadingStatus.value = true;
    emit('click', clickHideLoading, e);
    return;
  }
  // 普通按钮点击自动loading
  if (props.autoLoading) {
    loadingStatus.value = true;
    emit('click', clickHideLoading, e);
  }
}

// 触发click事件和回调函数,回调后消失loading
function clickHideLoading() {
  loadingStatus.value = false;
  fullscreenLoadingStatus.value = false;
}

// 防抖点击
const debounceClick = debounceFn((e: MouseEvent) => {
  emit('click', clickHideLoading, e)
}, 500, {
  leading: true
})
// confirm
const confirmClick = () => {
  if (props.autoFullscreenLoading) {
    fullscreenLoadingStatus.value = true
  }
  emit('confirm', clickHideLoading)
}
const messageBoxConfirm = () => {
  const {
    message = '此操作将永久删除该数据, 是否继续?',
    title = '提示',
    confirmButtonText = '确定',
    cancelButtonText = '取消',
    type = 'warning'
  } = props.messageBoxConfig || {}
  ElMessageBox.confirm(message, title, {
    confirmButtonText,
    cancelButtonText,
    type
  }).then(() => {
    confirmClick()
  }).catch(() => {
    emit('cancel')
  })
}
</script>
<script lang="ts">
export default {
  name: 'pl-button'
};
</script>

<style>

</style>
