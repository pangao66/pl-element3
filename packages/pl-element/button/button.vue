<template>
  <component
      :is="currentComponent"
      v-bind="currentComponentConfig"
      @confirm="confirmClick"
  >
    <template #[slotName]>
      <el-button
          v-bind="{ ...props, loading: loadingStatus, onClick: handleClick }"
      >
        <slot></slot>
      </el-button>
    </template>
  </component>
</template>
<script lang="ts" setup>
defineOptions({
  name: 'pl-button',
})
import { ButtonProps, ElMessageBox, ElMessageBoxOptions, PopconfirmProps } from 'element-plus'
import { computed, ref } from 'vue'
import PlWrapper from '../wrapper/wrapper.vue'
import { isPromise } from '@vue/shared'
import { debounce } from 'lodash-es'
import type { DebounceSettings } from 'lodash-es'

type DebounceConfig = {
  wait: number;
  options: DebounceSettings;
};
const props = withDefaults(
    defineProps<
        ButtonProps & {
      autoLoading?: boolean;
      debounce?: boolean | DebounceConfig;
      onClick?: (e: MouseEvent, done: () => void) => void | Promise<void>;
      confirmType?: 'pop' | 'messagebox',
      messageBoxConfig: ElMessageBoxOptions
      popConfirmConfig: PopconfirmProps,
      onConfirm?: (e: MouseEvent) => void | Promise<void>;
      onCancel?: (e: MouseEvent) => void
    }
    >(),
    {
      autoLoading: true,
    },
)
const emit = defineEmits<{
  // confirm: [e: MouseEvent],
  cancel: [e: MouseEvent]
}>()
const loadingStatus = ref(false)
// 防抖点击
const debounceClick = debounce(
    (e: MouseEvent) => {
      emitClick(e)
    },
    typeof props.debounce === 'object' ? props.debounce.wait : 300,
    {
      leading: true,
      trailing: false,
      ...props.debounce?.options,
    }
)

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
  // 普通按钮点击自动loading
  if (props.autoLoading) {
    loadingStatus.value = true
    emitClick(e)
    return
  }
  emitClick(e)
}

const handlePromiseCallBack = (res: Promise<void> | undefined) => {
  res?.finally(() => {
    hideLoading()
  })
}
const emitClick = (e) => {
  if (typeof props.onClick === 'function') {
    const r = props.onClick(e, () => {
      hideLoading()
    })
    if (isPromise(r)) {
      handlePromiseCallBack(r)
    }
  }
}
// 触发click事件和回调函数,回调后消失loading
const hideLoading = () => {
  loadingStatus.value = false
}
const confirmClick = (e: MouseEvent) => {
  if (props.onConfirm) {
    const r = props.onConfirm(e)
    if (isPromise(r)) {
      loadingStatus.value = true
      handlePromiseCallBack(r)
    }
  }
}
const messageBoxConfirm = () => {
  const {
    message = '此操作将永久删除该数据, 是否继续?',
    title = '提示',
    confirmButtonText = '确定',
    cancelButtonText = '取消',
    type,
  } = props.messageBoxConfig
  ElMessageBox.confirm(message, title, {
    confirmButtonText,
    cancelButtonText,
    type,
  })
      .then((e: MouseEvent) => {
        confirmClick(e)
      })
      .catch((e) => {
        emit('cancel', e)
      })
}

const slotName = computed(() => {
  return props.confirmType === 'pop' ? 'reference' : 'default'
})
const currentComponent = computed(() => {
  if (props.confirmType === 'pop') {
    return 'el-popconfirm'
  }
  return PlWrapper
})
const currentComponentConfig = computed(() => {
  if (props.confirmType === 'pop') {
    return props.popConfirmConfig
  }
  return {}
})
</script>
<style></style>
