<template>
  <pl-table :data="data" :columns="columns"></pl-table>
</template>
<script lang="ts" setup>
defineOptions({
  name: 'base-table',
})
const data = [
  { date: '2016-05-02', name: '王小虎', address: '上海市普陀区金沙江路 1518 弄', },
  { date: '2016-05-04', name: '王小虎', address: '上海市普陀区金沙江路 1517 弄', },
  { date: '2016-05-01', name: '王小虎', address: '上海市普陀区金沙江路 1519 弄', },
  { date: '2016-05-03', name: '王小虎', address: '上海市普陀区金沙江路 1516 弄', },
]
const columns = [
  { label: '日期', prop: 'date' },
  { label: '姓名', prop: 'name' },
  { label: '地址', prop: 'address' },
]

</script>


<style></style>
