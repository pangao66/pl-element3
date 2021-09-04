<template>
  <el-select v-model="calValue" v-bind="calConfig" style="width:100%">
    <el-option
      v-for="item in calOptions"
      :label="item.label"
      :value="item.value"
      :disabled="item.disabled"
      :key="item.key"
    >
      <slot name="option"></slot>
    </el-option>
  </el-select>
</template>
<script lang="ts" setup>
import { computed, watch, useAttrs } from "vue";
import { useOptions } from "../hooks/useOptions";
import { at } from "lodash";

interface PlSelectProps {
  options: any[] | Record<string | number, any>
  modelValue: any,
  isBindObject?: boolean,
  labelKey?: string
  valueKey?: string
  autoRemoveInvalidValue?: boolean
}

const props = withDefaults(defineProps<PlSelectProps>(), {
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
const { options, useOptionsMap } = useOptions(props.options, {
  labelKey: props.labelKey,
  valueKey: props.valueKey,
  isBindObject: props.isBindObject
})
const calOptions = computed(() => options.value)
const calValue = computed({
  get: () => props.modelValue,
  set: (val) => {
    emit('update:modelValue', val)
  }
})
watch(() => props.modelValue, (cur, prev) => {
  if (props.isBindObject) {
    if (typeof props.modelValue !== 'object') {
      const r = useOptionsMap(props.modelValue)
      calValue.value = r
    }
  } else {
    if (props.autoRemoveInvalidValue && typeof props.modelValue !== 'undefined' && props.modelValue !== '') {
      const r = useOptionsMap(props.modelValue)
      if (!r) {
        calValue.value = null
      }
    }
  }
}, { immediate: true })
const attrs = useAttrs()
const calConfig = computed(() => {
  return {
    clearable: true,
    filterable: true,
    defaultFirstOption: true,
    ...attrs
  }
})

</script>
<script lang="ts">
export default {
  name: "pl-select"
}
</script>

<style>

</style>
