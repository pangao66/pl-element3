import { PlInput } from '../input';
import { PlSelect } from '../select';
import { PlRadio } from '../radio';
import { PlDate } from '../date';
import { PlCheckbox } from '../checkbox';
import { PlWrapper } from '../wrapper';
import { computed, InjectionKey, VueElementConstructor } from 'vue';
import { ElFormContext, ElFormItemContext } from 'element-plus/es/tokens/form';

interface PlFormContext {
  addFormItemGroup: (prop: string, content: any) => void
}

export const PlFormKey: InjectionKey<PlFormContext> = Symbol('plForm')
export const plFormItemKey: InjectionKey<ElFormItemContext> =
  Symbol('plFormItem')
const map = {
  input: PlInput,
  select: PlSelect,
  radio: PlRadio,
  checkbox: PlCheckbox,
  date: PlDate,
  switch: 'el-switch',
  time: 'el-time-picker',
  col: 'el-col',
}
export const getComponent = (comp: keyof typeof map | VueElementConstructor): any => {
  if (typeof comp === 'string') {
    return map[comp]
  }
  return comp

}
export const generateRules = (item: any) => {
  return computed(() => {
    const triggerText = item.ui === 'input' ? '请输入' : '请选择'
    let list = []
    list.push({ required: item.required, message: `${triggerText}${item.label}`, trigger: 'blur' })
    return list
  })
}
export const generatePlaceholder = (item: any) => {
  const triggerText = item.ui === 'input' ? '请输入' : '请选择'
  return `${triggerText}${item.label}`
}
