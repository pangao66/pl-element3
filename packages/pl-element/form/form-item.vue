<template>
  <component
    :is="props.noFormItem?PlWrapper:'el-form-item'"
    :label="props.label"
    :prop="props.prop"
    :rules="generateRules"
  >
    <template v-if="props.grid&&props.children.length" v-for="item in props.children">
      <el-col :span="item.span">
        <pl-form-item :form-state="props.formState" v-bind="item" :label="item.label"
                      :model-value="getValue(item)"
                      @update:model-value="val=>setModelValue(val,item)"
        >
          <!--                                        :modelValue="getPropValue(item)"-->
          <!--                                        @update:model-value="val=>setModelValue(val,item)"-->
        </pl-form-item>
      </el-col>
    </template>
    <component v-else :is="calItem" v-model="calValue" v-bind="calConfig"></component>
  </component>
</template>
<script lang="ts" setup>
import { computed, defineProps, onMounted, useAttrs, watch } from "vue";
import { PlInput } from "../input";
import { PlSelect } from "../select";
import { PlRadio } from "../radio";
import { PlDate } from "../date";
import { PlCheckbox } from "../checkbox";
import { PlWrapper } from "../wrapper";
// import PlForm from "./form.vue";
import { getPropByPath, getValueByPath } from 'element-plus/packages/utils/util'
import { cloneDeep, set } from 'lodash'

interface PlFormItemProps {
  ui?: 'input' | 'select' | 'radio' | 'date' | any
  modelValue: any
  label?: string
  prop?: string
  required?: boolean
  grid?: boolean
  children?: PlFormItemProps[]
  span?: number
  noFormItem?: boolean
  formState: any
}

const props = withDefaults(defineProps<PlFormItemProps>(), {
  ui: 'input',
  // modelValue: null,
  label: '',
  prop: '',
  noFormItem: false,
  formState: {}
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
  date: PlDate
}
const calItem = computed(() => {
  return map[props.ui] || props.ui
})
const calValue = computed({
  get: () => props.modelValue,
  set: (val: any) => {
    console.log(val)
    emit('update:modelValue', val)
  }
})
const calModel = computed({
  get: (item) => {
    console.log(item)
    return props.formState.a.b.c
  },
  set: (val) => {
    console.log(val)
    emit('update:modelValue', val)
  }
})
const getValue = (item) => {
  return getValueByPath(props.formState, item.prop)
}
const setModelValue = (val, item) => {
  // set(props.formState, item.prop, val)
  console.log(val)
  emit('update:formItem', val, item.prop)
}
const generateRules = computed(() => {
  const triggerText = props.ui === 'input' ? '请输入' : '请选择'
  let list = []
  list.push({ required: props.required, message: `${triggerText}${props.label}` })
  return list
})
const calConfig = computed(() => {
  return {
    ...useAttrs()
  }
})
</script>
<script lang="ts">
export default {
  name: "pl-form-item"
}
</script>

<style scoped>

</style>
