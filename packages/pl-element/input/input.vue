<template>
  <el-input :model-value="props.transfer==='cent'?tempNum:calValue" @input="handleInput" @change="handleChange"
            v-bind="calAttrs">
    <template v-for="slot  in $slots" #[slot]>
      <slot :name="slot"></slot>
    </template>
  </el-input>
</template>
<script lang="ts" setup>
import { computed, ref, useAttrs, watch } from "vue";
import NP from 'number-precision'


interface Props {
  modelValue: string | number
  trim?: boolean
  transfer?: ((str: string | number) => string | number) | 'upperCase' | 'lowerCase' | 'number' | 'cent'
  modelModifiers?: Record<string, any>
}

const props = withDefaults(defineProps<Props>(), {
  modelValue: '',
  trim: true
})
const emit = defineEmits<{
  (e: 'update:modelValue', val: string | number): void
}>()
const tempNum = ref<string | number>(0)
watch(() => props.modelValue, (cur, prev) => {
  if (props.transfer === 'cent') {
    tempNum.value = NP.round(NP.divide(cur, 100) || 0, 2)
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
  if (props.trim) {
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
}
const handleChange = (val: number | string) => {
  if (props.transfer === 'cent') {
    val = NP.times(val, 100)
    tempNum.value = val
    calValue.value = val
    emit('update:modelValue', val)
  }
}
const calAttrs = computed(() => {
  const attrs = useAttrs()
  return {
    clearable: true,
    ...attrs
  }
})
</script>
<script lang="ts">
export default {
  name: "pl-input"
}
</script>

<style>

</style>
