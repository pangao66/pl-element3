<template>
  <pl-form style="width: 800px;" :form-items="formItems" v-model="form1" @submit="handleSubmit"></pl-form>
</template>
<script lang="ts" setup>
import PlForm from "../../packages/pl-element/form/form.vue";
import { ref } from "vue";

const regionOptions = ref([
  { label: '北京', value: 'beijing' },
  { label: '上海', value: 'shanghai' },
  { label: '广州', value: 'guangzhou' },
  { label: '深圳', value: 'shenzhen' }
])
const formItems = ref([
  { ui: 'input', label: '活动名称', prop: 'name', required: true, },
  { ui: 'select', label: '活动区域', prop: 'region', options: regionOptions.value, required: true },
  {
    grid: true, label: '活动时间', children: [
      { span: 12, label: '', prop: 'hehe.haha.time1', ui: 'input' },
      { span: 12, label: '', prop: 'hehe.haha.time2', ui: 'input' },
    ]
  },
  { ui: 'el-switch', label: '即时配送', prop: 'delivery', required: true },
  {
    ui: 'checkbox',
    label: '活动性质',
    prop: 'type',
    options: [ '美食/餐厅线上活动', '地推活动', '线下主题活动', '单纯品牌曝光' ],
    required: true
  },
  { ui: 'radio', label: '特殊资源', prop: 'resource', options: [ '线上品牌商赞助', '线下场地免费' ], required: true },
  { ui: 'input', label: '说明', prop: 'desc', type: 'textarea', required: true }
])
const form1 = ref({
  name: 'haha',
  time1: '',
  time2: '',
  hehe: {
    haha: {
      time1: 85,
      time3: 96
    },
    xixi: {
      test: 966
    }
  }
  // type: []
})
const handleSubmit = async (val) => {
  console.log(val)
}
</script>
<script lang="ts">
export default {
  name: "form-demo"
}
</script>

<style>

</style>
