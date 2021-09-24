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
        v-bind="$attrs"
        @click="handleClick"
      >
        <slot/>
      </el-button>
      <slot name="content"/>
    </template>

  </component>
</template>

<script lang="ts" setup>
import { computed, ref, useAttrs, PropType } from 'vue'
import PlWrapper from '../wrapper/wrapper.vue'
import { ElMessageBox } from 'element-plus'
import { debounce } from 'lodash-es'
import { isPromise } from '@vue/shared'
import { Mouse } from "@element-plus/icons";
import { PopconfirmProps } from 'element-plus'

interface PlButtonProps {
  autoLoading?: boolean;
  autoFullscreenLoading?: boolean;
  // debounce?: boolean | import("lodash").DebouncedFunc<(index: any) => void>
  debounce?: boolean
  confirmType?: 'messagebox' | 'pop'
  popConfirmConfig?: any
  messageBoxConfig?: any
  tipContent?: string
  tipConfig?: any,
  onClick?: () => void | Promise<void>
  // onConfirm?: () => void | Prmoise<void>
  onCancel?: () => void
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
})
const emit = defineEmits<{
  // (e: 'click', e, done: () => void): void,
  // (e: 'confirm', e, done: () => void): void
  (e: 'cancel'): void
}>()
const attrs = useAttrs()
const loadingStatus = ref(false)
const fullscreenLoadingStatus = ref(false)
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

async function handleClick(e: MouseEvent) {
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
    fullscreenLoadingStatus.value = true
    emitClick(e)
    return
  }
  // 普通按钮点击自动loading
  if (props.autoLoading) {
    loadingStatus.value = true
    emitClick(e)
    return
  }
  emitClick(e)
}


const emitClick = (e) => {
  if (props.onClick) {
    const r = props.onClick(
      e,
      () => {
        hideLoading()
      }
    )
    handlePromiseCallBack(r)
  } else {
    emit('click', e, hideLoading)
  }
}
// 触发click事件和回调函数,回调后消失loading
const hideLoading = () => {
  loadingStatus.value = false
  fullscreenLoadingStatus.value = false
}
// 防抖点击
const debounceClick = debounce((e: MouseEvent) => {
  emitClick(e)
}, 500, {
  leading: true
})
const confirmClick = () => {
  fullscreenLoadingStatus.value = true
  if (props.onConfirm) {
    const r = props.onConfirm(
      () => {
        hideLoading()
      }
    )
    handlePromiseCallBack(r)
  } else {
    emit('confirm', e, hideLoading)
  }
}
const handlePromiseCallBack = (res: Promise | undefined) => {
  if (isPromise(res)) {
    res.finally(() => {
      hideLoading()
    })
  }
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
  })
    .then(() => {
      confirmClick()
    })
    .catch(() => {
      emit('cancel')
    })
}
</script>
<script lang="ts">
export default {
  name: 'pl-button'
}
</script>

<style>

</style>
