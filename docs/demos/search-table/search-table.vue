<template>
  <pl-search-table :request="getTableData" :columns="columns"></pl-search-table>
</template>
<script lang="ts" setup>
import PlSearchTable from "../../../packages/pl-element/search-table/index.vue";
import axios from 'axios'

const columns = [
  {
    width: 200, prop: 'name', label: '姓名',
    cell: ({ row: { name } }) => {
      return name ? `${name.first} ${name.last}` : 'UNKNOW_USER'
    }
  },
  { width: 200, prop: 'gender', label: '性别', },
  { width: 200, prop: 'phone', label: '联系方式', },
  { width: 260, prop: 'email', label: '邮箱', },
]
const getTableData = async ({ currentPage, currentPageSize }) => {
  const { data } = await axios.get('https://randomuser.me/api', {
    params: {
      page: currentPage,
      results: currentPageSize
    }
  })
  return {
    data: data.results,
    total: 120
  }
}
</script>
<script lang="ts">
export default {
  name: "search-table"
}
</script>
<style scoped>
</style>
