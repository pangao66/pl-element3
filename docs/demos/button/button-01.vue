<template>
  <pl-button type="primary" @click="handleClick" debounce>
    防抖500ms只能点击一次
  </pl-button>
</template>
<script lang="ts" setup>
import { ElMessage } from 'element-plus'

defineOptions({
  name: 'demo-01'
})
const handleClick = () => {
  ElMessage.warning('500ms内只能点击一次')
}
</script>

