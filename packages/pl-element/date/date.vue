<template>
  <el-date-picker v-model="calValue" v-bind="calConfig"></el-date-picker>
</template>
<script lang="ts" setup>
import { computed, useAttrs } from "vue";

interface PlDateProps {
  modelValue: any,
}

const props = withDefaults(defineProps<PlDateProps>(), {
  modelValue: '',
  options: () => [],
  isBindObject: false,
  labelKey: 'label',
  valueKey: 'value',
  autoRemoveInvalidValue: true
})
const emit = defineEmits<{
  (e: 'update:modelValue', val: string | number | boolean | object): void
}>()
const calValue = computed({
  get: () => props.modelValue,
  set: (val) => {
    emit('update:modelValue', val)
  }
})
const attrs = useAttrs()
const calConfig = computed(() => {
  return {
    valueFormat: 'YYYY-MM-DD',
    ...attrs
  }
})
</script>
<script lang="ts">
export default {
  name: "pl-date",
}
</script>

<style scoped>

</style>
