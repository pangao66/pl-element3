import { PlInput } from "../input";
import { PlSelect } from "../select";
import { PlRadio } from "../radio";
import { PlDate } from "../date";
import { PlCheckbox } from "../checkbox";
import { PlWrapper } from "../wrapper";
import { computed, VueElementConstructor } from "vue";

const map = {
  input: PlInput,
  select: PlSelect,
  radio: PlRadio,
  checkbox: PlCheckbox,
  date: PlDate
}
export const getComponent = (comp: keyof typeof map | VueElementConstructor): any => {
  if (typeof comp === 'string') {
    return map[comp]
  }
  return comp

}
export const generateRules = (item:any) => {
  return computed(() => {
    const triggerText = item.ui === 'input' ? '请输入' : '请选择'
    let list = []
    list.push({ required: item.required, message: `${triggerText}${item.label}`, trigger: 'blur' })
    return list
  })
}
