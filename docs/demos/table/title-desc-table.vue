<template>
  <pl-table :data="tableData" :columns="columns">
  </pl-table>
</template>
<script lang="ts" setup>
defineOptions({
  name: 'title-desc-table'
})
const list = Array.from(Array(99999).keys())

const tableData = [{
  date: '2016-05-02',
  name: '王小虎',
  address: '上海市普陀区金沙江路 1518 弄'
}, {
  date: '2016-05-04',
  name: '王小虎',
  address: '上海市普陀区金沙江路 1517 弄'
}, {
  date: '2016-05-01',
  name: '王小虎',
  address: '上海市普陀区金沙江路 1519 弄'
}, {
  date: '2016-05-03',
  name: '王小虎',
  address: '上海市普陀区金沙江路 1516 弄'
}]
const columns = [
  { label: '日期', prop: 'date', tip: '入职日期' },
  { label: '姓名', prop: 'name', tip: '员工姓名' },
  { label: '地址', prop: 'address', tip: '通讯地址' },
]
</script>
<style>
</style>
