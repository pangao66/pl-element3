<template>
  <pl-form :form-items="formItems" v-model="formState">

  </pl-form>
</template>
<script lang="ts" setup>
import { ref } from "vue";

const formState = ref({
  name: '',
  region: '',
  date1: '',
  date2: '',
  delivery: false,
  type: [],
  resource: '',
  desc: '',
})
const regionOptions = [
  { label: '北京', value: 'beijing' },
  { label: '上海', value: 'shanghai' },
  { label: '广州', value: 'guangzhou' },
  { label: '深圳', value: 'shenzhen' }
]
const formItems = [
  {
    ui: "row",
    cols: [
      { span: 12, ui: 'input', label: '活动名称', prop: 'name' },
      { span: 12, ui: 'select', label: '活动区域', prop: 'region', options: regionOptions }
    ]
  },
  {
    ui: "row",
    cols: [
      { span: 12, ui: "date", label: '日期', prop: 'date1' },
      { span: 12, ui: "time", label: '时间', prop: 'date2' },
    ]
  },
  { ui: 'switch', label: '即时配送', prop: 'delivery' },
  {
    ui: 'checkbox',
    label: '活动性质',
    prop: 'type',
    options: [ '美食/餐厅线上活动', '地推活动', '线下主题活动', '单纯品牌曝光' ]
  },
  { ui: 'radio', label: '特殊资源', prop: 'resource', options: [ '线上品牌商赞助', '线下场地免费' ] },
  {
    ui: 'row',
    cols: [
      {
        span: 16, ui: 'input', label: '说明', prop: 'desc',
        uiConfig: {
          type: 'textarea',
          maxlength: 300,
          'show-word-limit': true
        }
      }
    ]
  }
]
</script>
<script lang="ts">
export default {
  name: "grid-form"
}
</script>

<style scoped>

</style>
