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
import { computed, ref } from 'vue';
import debounceFn from 'lodash/debounce'
import PlWrapper from "../pl-wrapper.vue";
import { ElMessageBox } from "element-plus";

// import { DebouncedFunc } from '@types/lodash/common/function'

interface PlButtonProps {
  autoLoading?: boolean;
  autoFullscreenLoading?: boolean;
  // debounce?: boolean | import("lodash").DebouncedFunc<(index: any) => void>
  debounce?: boolean
  confirmType?: 'messagebox' | 'pop'
  popConfirmConfig?: Record<string, any>
  messageBoxConfig?: Record<string, any>
  tipContent?: string
  tipConfig?: Record<string, any>
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
  (e: 'click', cb: () => void): void
  (e: 'confirm', cb: () => void): void
  (e: 'cancel'): void
}>();

const loadingStatus = ref(false);
const fullscreenLoadingStatus = ref(false);
const {
  autoLoading, autoFullscreenLoading, debounce, confirmType, popConfirmConfig, messageBoxConfig, tipContent, tipConfig
} = props;
const slotName = computed(() => {
  return confirmType === 'pop' ? 'reference' : 'default'
})
const currentComponent = computed(() => {
  if (tipContent) {
    return 'el-tooltip'
  }
  if (confirmType === 'pop') {
    return 'el-popconfirm'
  }
  return PlWrapper
})
const currentComponentConfig = computed(() => {
  if (tipContent) {
    return {
      content: tipContent,
      effect: 'dark',
      placement: 'top',
      ...tipConfig
    }
  }
  if (confirmType === 'pop') {
    return popConfirmConfig
  }
  return {}
})

function handleClick() {
  // 防抖
  if (debounce) {
    debounceClick()
    return
  }
  // popconfirm
  if (confirmType === 'pop') {
    return
  }
  // messagebox confirm
  if (confirmType === 'messagebox') {
    messageBoxConfirm()
    return
  }
  // 普通按钮点击自动全屏loading
  if (autoFullscreenLoading) {
    fullscreenLoadingStatus.value = true;
    emit('click', clickHideLoading);
    return;
  }
  // 普通按钮点击自动loading
  if (autoLoading) {
    loadingStatus.value = true;
    emit('click', clickHideLoading);
  }
}

// 触发click事件和回调函数,回调后消失loading
function clickHideLoading() {
  loadingStatus.value = false;
  fullscreenLoadingStatus.value = false;
}

// 防抖点击
const debounceClick = debounceFn(() => {
  emit('click')
}, 500, {
  leading: true
})
// confirm
const confirmClick = () => {
  if (autoFullscreenLoading) {
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
  } = messageBoxConfig
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
