<template>
  <p>防抖按钮</p>
  <pl-button debounce @click="handleDebounceClick">防抖</pl-button>
  <p>自动loading</p>
  <pl-button auto-loading @click="handleClick">自动loading</pl-button>
  <p>自动全屏loading</p>
  <pl-button auto-full-screen-loading  @click="handleClick">全屏loading</pl-button>
  <p>popconfirm确认</p>
  <pl-button confirm-type="pop" auto-full-screen-loading @confirm="handleClick">删除</pl-button>
  <p>messageBox.confirm确认</p>
  <pl-button confirm-type="confirm" auto-full-screen-loading @confirm="handleClick">删除</pl-button>
</template>

<script>
import PlButton from '../../packages/components/button/button'
import { defineComponent } from 'vue'
import { ElMessage } from 'element-plus'

export default defineComponent({
  name: 'button-demo',
  components: { PlButton },
  setup () {
    return {
      handleDebounceClick () {
        ElMessage.success('500ms内重复点击无效')
      },
      handleClick (done) {
        setTimeout(() => {
          done()
        }, 1000)
      }
    }
  }
})
</script>

<style scoped>

</style>
