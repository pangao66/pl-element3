<template>
  <el-input
    :model-value="props.transfer==='cent'?tempNum:calValue"
    @input="handleInput"
    @change="handleChange"
    v-bind="calAttrs"
  >
    <template v-for="([key,val]) in Object.entries(calSlots)" #[key]>
      <slot :name="key">
        <render-vnode :vnode="val"></render-vnode>
      </slot>
    </template>
  </el-input>
</template>
<script lang="tsx" setup>
import { computed, ref, useAttrs, useSlots, watch, h, VNode } from "vue";
import NP, { float2Fixed } from 'number-precision'
import RenderVnode from "../renderVnode";
import { pickBy, identity } from 'lodash-es'

interface Props {
  modelValue: string | number | undefined | null
  trim?: 'normal' | 'all' | boolean
  transfer?: ((str: string | number) => string | number) | 'upperCase' | 'lowerCase' | 'number' | 'cent'
  modelModifiers?: Record<string, any>
  unit?: string
}

const props = withDefaults(defineProps<Props>(), {
  modelValue: '',
  trim: true,
  unit: ''
})
const emit = defineEmits<{
  (e: 'update:modelValue', val: string | number): void,
  (e: 'change', val: string | number): void,
  (e: 'input', val: string | number): void,
}>()
const tempNum = ref<string | number>(0)
watch(() => props.modelValue, (cur, prev) => {
  if (props.transfer === 'cent') {
    tempNum.value = NP.round(NP.divide(cur as number, 100) || 0, 2)
  }
}, { immediate: true })
const calValue = computed({
  get: () => {
    return props.modelValue
  },
  set: (val: string | number) => {
    emit('update:modelValue', val)
  }
})
const handleInput = (val: string | number) => {
  if (props.transfer === 'cent') {
    tempNum.value = val
    return
  }
  if (props.trim === true || props.trim === 'normal') {
    val = val.toString().trimLeft()
  }
  if (props.trim === 'all') {
    val = val.toString().trim()
  }
  if (props.transfer || props.modelModifiers) {
    if (props.transfer === 'upperCase' || props.modelModifiers?.upperCase) {
      val = val.toString().toUpperCase()
    }
    if (props.transfer === 'lowerCase' || props.modelModifiers?.lowerCase) {
      val = val.toString().toLowerCase()
    }
    if (props.transfer === 'number' || props.modelModifiers?.number) {
      val = Number(val)
    }
    if (typeof props.transfer === 'function') {
      val = props.transfer(val)
    }
  }
  calValue.value = val
  emit('input', val)
}
const handleChange = (val: number | string) => {
  if (props.transfer === 'cent') {
    val = NP.round(NP.times(val, 100), 0)
    tempNum.value = val
    calValue.value = val
    emit('update:modelValue', val)
  }
  if (props.trim) {
    val = val.toString()
    emit('update:modelValue', val.trim())
  }
  emit('change', val)
}
const calAttrs = computed(() => {
  const attrs = useAttrs()
  return {
    clearable: true,
    ...attrs
  }
})
const slots = useSlots()
const calSlots = computed(() => {
  return pickBy({
    append: props.unit,
    ...slots
  }, identity)
})
</script>
<script lang="tsx">
export default {
  name: "pl-input"
}
</script>

<style>

</style>
