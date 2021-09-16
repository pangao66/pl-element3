<template>
  <pl-button type="primary" @click="handleClick" debounce>
    防抖
  </pl-button>
</template>
<script lang="ts" setup>
import { ElMessage } from "element-plus/lib/components/message";

const handleClick = () => {
  ElMessage.warning('500ms内只能点击一次')
}
</script>


