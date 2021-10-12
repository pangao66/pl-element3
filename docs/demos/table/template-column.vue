<template>
  <pl-table :data="data" :columns="columns">
    <template #date="{ row }">
      <i class="el-icon-time"></i>
      <span style="margin-left: 10px">{{ row.date }}</span>
    </template>
    <template #name="{ row }">
      <el-popover effect="light" trigger="hover" placement="top">
        <template #default>
          <p>姓名: {{ row.name }}</p>
          <p>住址: {{ row.address }}</p>
        </template>
        <template #reference>
          <div class="name-wrapper">
            <el-tag size="medium">{{ row.name }}</el-tag>
          </div>
        </template>
      </el-popover>
    </template>
    <template #edit="{ $index, row }">
      <el-button type="primary" @click="handleEdit($index, row)">编辑</el-button>
      <el-button type="danger" @click="handleDelete($index, row)">删除</el-button>
    </template>
  </pl-table>
</template>
<script lang="ts" setup>
const columns = [
  { label: '日期', slotName: 'date' },
  { label: '姓名', slotName: 'name' },
  { label: '操作', slotName: 'edit' },
];
const data = [
  {
    date: '2016-05-02',
    name: '王小虎',
    address: '上海市普陀区金沙江路 1518 弄',
  },
  {
    date: '2016-05-04',
    name: '王小虎',
    address: '上海市普陀区金沙江路 1517 弄',
  },
  {
    date: '2016-05-01',
    name: '王小虎',
    address: '上海市普陀区金沙江路 1519 弄',
  },
  {
    date: '2016-05-03',
    name: '王小虎',
    address: '上海市普陀区金沙江路 1516 弄',
  },
];

function handleEdit(index, row) {
  console.log(index, row);
}

function handleDelete(index, row) {
  console.log(index, row);
}
</script>
<script lang="ts">
export default {
  name: 'template-column',
};
</script>

<style></style>
