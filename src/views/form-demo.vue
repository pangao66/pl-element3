<template>
  <search-form
    :form-items="formItems"
    @submit="handleSubmit"
    ref="plForm"
  >
  </search-form>
</template>
<script lang="ts" setup>
import { ref } from "vue";
import SearchForm from "../../packages/pl-element/form/search-form.vue";

const jobDict = {
  designer: '设计',
  programmer: '程序员',
  testers: '测试',
  product: '产品'
}
const sexDict = {
  0: '女',
  1: '男'
}
const formState = ref({
  email: '',
  domains: []
})
const formItems = ref([
  { ui: 'input', prop: 'id', label: 'id' },
  { ui: 'input', prop: 'name', label: '姓名' },
  { ui: 'date', prop: 'birth', label: '生日' },
  { ui: 'select', prop: 'job', label: '职位', options: jobDict },
  { ui: 'select', prop: 'sex', label: '性别', options: sexDict },
  // { slotName: 'test-form-item', prop: 'test', label: '测试slot' }

])
const handleSubmit = async (val) => {
}
</script>
<script lang="ts">
export default {
  name: "form-demo"
}
</script>

<style>

</style>
