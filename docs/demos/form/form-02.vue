<template>
  <pl-form v-model="form" :form-items="formItems" @submit="handleSubmit" :form-config="{labelWidth:'120px'}">
    <template #submit="{reset}">
      <el-form-item>
        <el-button type="primary" native-type="submit">立即创建</el-button>
        <el-button native-type="reset">重置</el-button>
      </el-form-item>
    </template>
  </pl-form>
</template>
<script lang="ts" setup>
import { reactive, ref } from 'vue';

const form = ref({
  name: '',
  region: '',
  date1: '',
  date2: '',
  delivery: false,
  type: [],
  resource: '',
  desc: '',
})
const formItems = [
  {
    label: '活动名称', prop: 'name', ui: 'input',
    required: true,
    rules: [
      { min: 3, max: 5, message: '长度在3-5个字符', trigger: 'blur' },
    ],
  },
  {
    label: '活动区域', prop: 'region', ui: 'select',
    options: [
      { label: '区域一', value: 'shanghai' },
      { label: '区域二', value: 'beijing' },
    ],
    required: true,
  },
  {
    label: '活动时间', grid: true, children: [
      { span: 11, label: '日期', prop: 'date1', ui: 'date', hideLabel: true, required: true },
      { span: 1, ui: 'col' },
      { span: 11, label: '时间', prop: 'date2', ui: 'time', hideLabel: true, required: true },
    ],
  },
  { label: '及时配送', prop: 'delivery', ui: 'switch' },
  {
    label: '活动性质', prop: 'type', ui: 'checkbox',
    options: ['美食/餐厅线上活动', '地推活动', '线下主题活动', '单纯品牌曝光'], rules: [{
      type: 'array',
      required: true,
      message: '请至少选择一个活动性质',
      trigger: 'change',
    }],
  },
  { label: '特殊资源', prop: 'resource', ui: 'radio', options: ['线上品牌商赞助', '线下场地免费'], required: true },
  { label: '活动形式', prop: 'desc', ui: 'input', uiConfig: { type: 'textarea' }, required: true },
  {
    label: '邮箱', prop: 'email', ui: 'input', rules: {
      type: 'email', message: '请输入正确的邮箱',
    },
  },
]
const handleSubmit = (values) => {
  console.log(values)
}
</script>
<script lang="ts">
export default {
  name: 'form-02',
}
</script>
