<template>
  <el-radio-group v-model="calValue" v-bind="calConfig">
    <component
      :is="calComp"
      v-for="item in calOptions"
      :label="item.value"
      :disabled="item.disabled"
      :key="item.value"
    >
      {{ item.label }}
    </component>
  </el-radio-group>
</template>
<script lang="ts" setup>
import { computed, useAttrs } from "vue";
import { useOptions } from "../hooks/useOptions";

interface Props {
  modelValue: string | number | boolean | undefined | null
  labelKey?: string
  valueKey?: string
  options: (string | number | boolean)[]
  button?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  labelKey: 'label',
  valueKey: 'value',
  button: false,
  modelValue: ''
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
  return props.button ? 'el-radio-button' : 'el-radio'
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
  name: "radio",
}
</script>

<style>

</style>
