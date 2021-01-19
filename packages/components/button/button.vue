<template>
  <!--popConfirm形式-->
  <el-popconfirm
    v-if="confirmType === 'pop'"
    v-bind="popConfig"
    @confirm="$emit('confirm')"
    @cancel="$emit('cancel')"
  >
    <template #reference>
      <el-button
        v-loading.fullscreen.lock="fullscreenLoading"
        v-bind="$attrs"
        :type="type"
      >
        <slot/>
      </el-button>
    </template>
  </el-popconfirm>
  <el-button
    v-else
    @click.stop="handleClick"
    v-loading.fullscreen.lock="fullscreenLoading"
    v-bind="$attrs"
    :loading="loading"
    :type="type">
    <slot></slot>
  </el-button>
</template>

<script>
import { defineComponent, ref } from 'vue'
import { ElMessageBox } from 'element-plus'

export default defineComponent({
  name: 'pl-button',
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
    }
  },
  setup (props, { emit }) {
    const loading = ref(false)
    const fullscreenLoading = ref(false)
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
    const handleClick = () => {
      clickStart()
      if (props.confirmType === 'confirm') {
        handleConfirm()
      }
      emit('click', clickDone)
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
        emit('confirm')
      }).catch(() => {
        emit('cancel')
      })
    }
    const handlePopConfirm = () => {
      if (props.confirmType === 'confirm') {
        handleConfirm()
        return
      }
      clickStart()
      emit('confirm', clickDone)
    }
    return {
      handleClick,
      handlePopConfirm,
      loading,
      fullscreenLoading
    }
  }
})
</script>

<style>

</style>
