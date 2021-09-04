<template>
  <el-checkbox-group v-model="calValue" v-bind="calConfig">
    <component
      :is="calComp"
      v-for="item in calOptions"
      :label="item.value"
      :disabled="item.disabled"
      :key="item.value"
    >
      {{ item.label }}
    </component>
  </el-checkbox-group>
</template>
<script lang="ts" setup>
import { computed, useAttrs } from "vue";
import { useOptions } from "../hooks/useOptions";

interface Props {
  modelValue: (string | number | boolean)[]
  labelKey?: string
  valueKey?: string
  options: (string | number | boolean)[]
  button?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  labelKey: 'label',
  valueKey: 'value',
  button: false,
  modelValue: () => []
})
const emit = defineEmits<{
  (e: 'update:modelValue', val: string | number | boolean): void
}>()
const calValue = computed({
  get: () => props.modelValue,
  set: (val) => {
    emit('update:modelValue', val)
  }
})
const { options } = useOptions(props.options, {
  labelKey: props.labelKey,
  valueKey: props.valueKey,
})
const calOptions = computed(() => options.value)
const calComp = computed(() => {
  return props.button ? 'el-checkbox-button' : 'el-checkbox'
})
const attrs = useAttrs()
const calConfig = computed(() => {
  return {
    ...attrs
  }
})
</script>
<script lang="ts">
export default {
  name: "checkbox"
}
</script>

<style scoped>

</style>
