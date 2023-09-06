<!--<template>-->
<!--  <component-->
<!--      :is="currentComponent"-->
<!--      v-bind="currentComponentConfig"-->
<!--      @confirm="confirmClick"-->
<!--  >-->
<!--    <template #[slotName]>-->
<!--      <el-button-->
<!--          v-loading.fullscreen="fullscreenLoadingStatus"-->
<!--          :loading="loadingStatus"-->
<!--          v-bind="$attrs"-->
<!--          @click="handleClick"-->
<!--      >-->
<!--        <slot></slot>-->
<!--      </el-button>-->
<!--      &lt;!&ndash;<slot name="content"/>&ndash;&gt;-->
<!--    </template>-->
<!--  </component>-->
<!--</template>-->
<!--<script lang="ts">-->
<!--import { computed, defineComponent, PropType, ref } from 'vue'-->
<!--import PlWrapper from "../wrapper/wrapper.vue";-->
<!--import { ElMessageBox, ElMessageBoxOptions } from "element-plus";-->
<!--import { useDebounceFn } from "@vueuse/core";-->
<!--import { throttle } from 'lodash-es'-->

<!--export default defineComponent({-->
<!--  name: 'pl-button',-->
<!--  props: {-->
<!--    autoLoading: {-->
<!--      type: Boolean,-->
<!--    },-->
<!--    autoFullscreenLoading: {-->
<!--      type: Boolean,-->
<!--    },-->
<!--    debounce: {-->
<!--      type: Boolean,-->
<!--    },-->
<!--    confirmType: {-->
<!--      type: String,-->
<!--    },-->
<!--    popConfirmConfig: {-->
<!--      type: Object,-->
<!--      default: () => ({-->
<!--        title: '确定删除吗?',-->
<!--      }),-->
<!--    },-->
<!--    messageBoxConfig: {-->
<!--      type: Object as PropType<ElMessageBoxOptions>,-->
<!--      default: () => ({}),-->
<!--    },-->
<!--    tipContent: {-->
<!--      type: String,-->
<!--    },-->
<!--    tipConfig: {-->
<!--      type: Object,-->
<!--      default: () => ({}),-->
<!--    },-->
<!--    onClick: {-->
<!--      type: Function as PropType<(e, done?: () => void) => void | Promise<void>>,-->
<!--    },-->
<!--    onConfirm: {-->
<!--      type: Function as PropType<(done: () => void) => void | Promise<void>>,-->
<!--    },-->
<!--    onCancel: {-->
<!--      type: Function as PropType<() => void>,-->
<!--    },-->
<!--  },-->
<!--  emits: ['cancel'],-->
<!--  setup(props, { emit }) {-->
<!--    const loadingStatus = ref(false)-->
<!--    const fullscreenLoadingStatus = ref(false)-->
<!--    const slotName = computed(() => {-->
<!--      return props.confirmType === 'pop' ? 'reference' : 'default'-->
<!--    })-->
<!--    const currentComponent = computed(() => {-->
<!--      if (props.tipContent) {-->
<!--        return 'el-tooltip'-->
<!--      }-->
<!--      if (props.confirmType === 'pop') {-->
<!--        return 'el-popconfirm'-->
<!--      }-->
<!--      return PlWrapper-->
<!--    })-->
<!--    const currentComponentConfig = computed(() => {-->
<!--      if (props.tipContent) {-->
<!--        return {-->
<!--          content: props.tipContent,-->
<!--          effect: 'dark',-->
<!--          placement: 'top',-->
<!--          ...props.tipConfig,-->
<!--        }-->
<!--      }-->
<!--      if (props.confirmType === 'pop') {-->
<!--        return props.popConfirmConfig-->
<!--      }-->
<!--      return {}-->
<!--    })-->
<!--// 防抖点击-->
<!--    const debounceClick = throttle((e: MouseEvent) => {-->
<!--      emitClick(e)-->
<!--    }, 1000, {})-->

<!--    async function handleClick(e: MouseEvent) {-->
<!--      // 防抖-->
<!--      if (props.debounce) {-->
<!--        //@ts-ignore-->
<!--        debounceClick(e)-->
<!--        return-->
<!--      }-->
<!--      // popconfirm-->
<!--      if (props.confirmType === 'pop') {-->
<!--        return-->
<!--      }-->
<!--      // messagebox confirm-->
<!--      if (props.confirmType === 'messagebox') {-->
<!--        messageBoxConfirm()-->
<!--        return-->
<!--      }-->
<!--      // 普通按钮点击自动全屏loading-->
<!--      if (props.autoFullscreenLoading) {-->
<!--        fullscreenLoadingStatus.value = true-->
<!--        emitClick(e)-->
<!--        return-->
<!--      }-->
<!--      // 普通按钮点击自动loading-->
<!--      if (props.autoLoading) {-->
<!--        loadingStatus.value = true-->
<!--        emitClick(e)-->
<!--        return-->
<!--      }-->
<!--      emitClick(e)-->
<!--    }-->

<!--    const handlePromiseCallBack = (res: Promise<void> | undefined) => {-->
<!--      try {-->
<!--        res?.finally(() => {-->
<!--          hideLoading()-->
<!--        })-->
<!--      } catch (e) {-->
<!--        throw new Error('请传入一个Promise')-->
<!--      }-->
<!--    }-->
<!--    const emitClick = (e) => {-->
<!--      if (props.onClick) {-->
<!--        const r = props.onClick(e, () => {-->
<!--          hideLoading()-->
<!--        })-->
<!--        if (r) {-->
<!--          handlePromiseCallBack(r)-->
<!--        }-->
<!--      }-->
<!--    }-->
<!--// 触发click事件和回调函数,回调后消失loading-->
<!--    const hideLoading = () => {-->
<!--      loadingStatus.value = false-->
<!--      fullscreenLoadingStatus.value = false-->
<!--    }-->
<!--    const confirmClick = () => {-->
<!--      fullscreenLoadingStatus.value = true-->
<!--      if (props.onConfirm) {-->
<!--        const r = props.onConfirm(-->
<!--            () => {-->
<!--              hideLoading()-->
<!--            },-->
<!--        )-->
<!--        if (r) {-->
<!--          handlePromiseCallBack(r)-->
<!--        }-->
<!--      }-->
<!--    }-->
<!--    const messageBoxConfirm = () => {-->
<!--      const {-->
<!--        message = '此操作将永久删除该数据, 是否继续?',-->
<!--        title = '提示',-->
<!--        confirmButtonText = '确定',-->
<!--        cancelButtonText = '取消',-->
<!--        type,-->
<!--      } = props.messageBoxConfig-->
<!--      ElMessageBox.confirm(message, title, {-->
<!--        confirmButtonText,-->
<!--        cancelButtonText,-->
<!--        type,-->
<!--      })-->
<!--          .then(() => {-->
<!--            confirmClick()-->
<!--          })-->
<!--          .catch(() => {-->
<!--            emit('cancel')-->
<!--          })-->
<!--    }-->
<!--    return {-->
<!--      loadingStatus,-->
<!--      fullscreenLoadingStatus,-->
<!--      currentComponent,-->
<!--      currentComponentConfig,-->
<!--      confirmClick,-->
<!--      handleClick,-->
<!--      slotName,-->
<!--    }-->
<!--  },-->
<!--})-->
<!--</script>-->
<!--<style>-->
<!--</style>-->
