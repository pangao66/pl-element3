<template>
  <el-button></el-button>
</template>
<script lang="ts">
export default {
  name: "About"
}
</script>
<script lang="ts" setup>
import { PropType } from "vue";
import type { ButtonProps } from 'element-plus/lib/components/button'

interface Name {
  name: string
}

const props = defineProps({
  type: {
    type: Object as PropType<ButtonProps>,
    required: true
  }
})
</script>
<style scoped>
</style>
