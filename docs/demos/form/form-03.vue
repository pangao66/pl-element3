<template>
  <pl-form label-width="80px" :form-items="formItems" v-model="form" @submit="handleSubmit">
  </pl-form>
</template>
<script lang="ts" setup>
import { computed, ref } from 'vue'

interface FormValue {
  name: string
  sex: '男' | '女'
  age: number
}

const form = ref<FormValue>({
  name: '',
  sex: null,
  age: null
})
const formItems = computed(() => {
  return [
    { label: '姓名', prop: 'name', ui: 'input' },
    {
      label: '性别', prop: 'sex', ui: "radio", options: [ '男', '女' ],
      uiConfig: { button: true, },
      events: {
        onChange: (val) => {
          if (val === '女') {
            form.value.age = 18
          }
        }
      }
    },
    {
      label: '年龄', prop: 'age', ui: "input",
      required: form.value.sex === '男',
      uiConfig: { disabled: form.value.sex === '女' }
    },
  ]
})
const handleSubmit = (values: FormValue) => {
  console.log(values)
}
</script>
<script lang="ts">
export default {
  name: "form-03"
}
</script>
