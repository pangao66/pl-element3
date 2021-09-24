<template>
  <pl-button confirm-type="pop" @confirm="handleConfirm">popconfirm确认</pl-button>
  <pl-button type="primary" confirm-type="messagebox" @confirm="handleConfirm">messagebox确认</pl-button>
</template>
<script lang="ts" setup>
import { ElMessage } from 'element-plus'

const sleep = (time: number) => {
  return new Promise((resolve) => {
    setTimeout(resolve, time)
  })
}
const handleConfirm = async () => {
  await sleep(2000)
  ElMessage.info('操作成功')
}
</script>
<script lang="ts">
export default {
  name: "button-03"
}
</script>
