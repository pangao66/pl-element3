<template>
  <pl-search-form
    v-model="formState"
    :form-items="formItems"
    @submit="handleSubmit"
    ref="plForm"
  >
  </pl-search-form>
</template>
<script lang="ts" setup>
import { ref } from 'vue';

const jobDict = {
  designer: '设计',
  programmer: '程序员',
  testers: '测试',
  product: '产品',
};
const sexDict = {
  0: '女',
  1: '男',
};
const formState = ref({
  id: '',
  name: '',
  birth: '',
  job: '',
  sex: '',
});
const formItems = ref([
  { ui: 'input', prop: 'id', label: 'id' },
  { ui: 'input', prop: 'name', label: '姓名' },
  { ui: 'date', prop: 'birth', label: '生日' },
  { ui: 'select', prop: 'job', label: '职位', options: jobDict },
  { ui: 'select', prop: 'sex', label: '性别', options: sexDict },
]);
const handleSubmit = (val) => {
  console.log(val);
};
</script>
<script lang="ts">
export default {
  name: 'search-form-demo',
};
</script>

<style></style>
