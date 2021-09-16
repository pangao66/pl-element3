<template>
  <pl-button confirm-type="pop" @confirm="handleConfirm">popconfirm确认</pl-button>
  <pl-button type="primary" confirm-type="messagebox" @confirm="handleConfirm">messagebox确认</pl-button>
</template>
<script lang="ts" setup>
import { ElMessage } from 'element-plus'

const handleConfirm = (done) => {
  setTimeout(() => {
    done()
    ElMessage.success('操作成功')
  }, 1000)
}
</script>
<script lang="ts">
export default {
  name: "button-03"
}
</script>
