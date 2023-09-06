<template>
  <pl-button type="primary" @click="handleClick" debounce>
    防抖
  </pl-button>
</template>
<script lang="ts" setup>
import { ElMessage } from "element-plus";

const handleClick = () => {
  ElMessage.warning('500ms内只能点击一次')
}
</script>
<script lang="ts">
export default {
  name: 'demo-01'
}
</script>

