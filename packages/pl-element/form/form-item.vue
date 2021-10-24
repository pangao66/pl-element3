<template>
  <component
    :is="wrapperComponent"
    :label="props.hideLabel?'':props.label"
    :prop="props.prop"
    v-bind="calFormItemConfig"
  >
    <slot v-bind="props">
      <template v-if="props.cols" v-for="item in props.cols">
        <el-col :span="item.span">
          <pl-form-item
            :form-state="props.formState"
            v-bind="item"
            :label="item.label"
            :prop="item.prop"
            :model-value="getValue(item)"
            @update:model-value="val=>setModelValue(val,item)"
          >
          </pl-form-item>
        </el-col>
      </template>
      <component v-else :is="calItem" v-model="calValue" v-bind="calConfig"></component>
    </slot>
  </component>
</template>
<script lang="ts" setup>
import { computed, useAttrs, inject } from "vue";
import { PlInput } from "../input";
import { PlSelect } from "../select";
import { PlRadio } from "../radio";
import { PlDate } from "../date";
import { PlCheckbox } from "../checkbox";
import { PlWrapper } from "../wrapper";
import { getValueByPath } from 'element-plus/lib/utils/util'
import { generatePlaceholder } from "./utils";


interface PlFormItemProps {
  ui?: 'input' | 'select' | 'radio' | 'date' | any
  modelValue: any
  label?: string
  prop?: string
  required?: boolean
  rules?: any
  grid?: boolean
  cols?: PlFormItemProps[]
  span?: number
  noFormItem?: boolean
  hideLabel?: boolean,
  formState: any
  formItemConfig?: any
  uiConfig?: any
  options?: any
  min?: number
  max?: number
  minNum?: number
  maxNum?: number
  events?: any
  canAdd?: boolean
}


const props = withDefaults(defineProps<PlFormItemProps>(), {
  ui: 'input',
  label: '',
  prop: '',
  noFormItem: false,
  formState: {},
  formItemConfig: {},
  uiConfig: {},
  required: undefined,
  events: {}
})
const emit = defineEmits<{
  (e: 'update:modelValue', val: string | number | boolean | object): void,
  (e: 'update:formItem', val: string | number | boolean | object, path: string): void,
}>()
const map = {
  input: PlInput,
  select: PlSelect,
  radio: PlRadio,
  checkbox: PlCheckbox,
  date: PlDate,
  switch: 'el-switch',
  time: 'el-time-picker',
  col: 'el-col'
}

const calItem = computed(() => {
  return map[props.ui] || props.ui
})
const calValue = computed({
  get: () => props.modelValue,
  set: (val: any) => {
    emit('update:modelValue', val)
  }
})
const getValue = (item) => {
  return getValueByPath(props.formState, item.prop)
}
const setModelValue = (val, item) => {
  emit('update:formItem', val, item.prop)
}
const generateRules = computed(() => {
  const triggerText = props.ui === 'input' ? '请输入' : '请选择'
  const trigger = props.ui === 'input' ? 'blur' : 'change'
  const isArray = (props.ui === 'checkbox') || (props.ui === 'select' && props.uiConfig.multiple) || (props.ui === 'date' && props.uiConfig.type === 'daterange')
  let list = []
  let type = undefined
  if (calValue.value instanceof Date) {
    type = 'date'
  } else if (isArray) {
    type = 'array'
  }
  if (props.required) {
    list.push({
      required: props.required,
      message: `${triggerText}${props.label}`,
      type: type,
      trigger
    })
  }
  if (props.rules && Array.isArray(props.rules)) {
    list = list.concat(props.rules)
  }
  if (props.min && props.max) {
    list.push({
      message: `长度在${props.min}到${props.max}个字符`,
      trigger
    })
  }
  if (props.min && !props.max) {
    list.push({
      message: `请至少输入${props.min}个字符`,
      trigger,
    })
  }
  if (!props.min && props.max) {
    list.push({
      message: `不超过${props.max}个字符`,
      trigger,
    })
  }
  return list
})
const calConfig = computed(() => {
  const triggerText = props.ui === 'input' ? '请输入' : '请选择'
  return {
    ...props.uiConfig,
    options: props.options,
    ...props.events,
    placeholder: `${triggerText}${props.label}`
  }
})
const calFormItemConfig = computed(() => {
  return {
    rules: generateRules.value.length ? generateRules.value : undefined,
    placeholder: generatePlaceholder(props).value ? generatePlaceholder(props).value : undefined,
    ...props.formItemConfig
  }
})
const wrapperComponent = computed(() => {
  if (props.noFormItem || props.ui === 'wrapper') {
    return PlWrapper
  }
  if (props.ui === 'row') {
    return 'el-row'
  }
  return 'el-form-item'
})
</script>
<script lang="ts">
export default {
  name: "pl-form-item"
}
</script>
<style>
</style>
