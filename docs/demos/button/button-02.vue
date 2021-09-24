<template>
  <pl-button auto-loading @click="handleClick">
    自动loading
  </pl-button>
  <pl-button
    type="primary"
    auto-fullscreen-loading
    @click="handleClick"
  >自动全屏loading
  </pl-button>
  <pl-button auto-loading @click="handleClickCallBack">自动loading</pl-button>
</template>
<script lang="ts" setup>
import { ElMessage } from 'element-plus'

const sleep = (time: number) => {
  return new Promise((resolve) => {
    setTimeout(resolve, time)
  })
}
const handleClick = async () => {
  ElMessage.info('开始loading')
  await sleep(2000)
  ElMessage.info('结束loading')
}
const handleClickCallBack = (e, done) => {
  setTimeout(() => {
    done()
  }, 2000)
}
</script>
<script lang="ts">
export default {
  name: "button-02"
}
</script>
