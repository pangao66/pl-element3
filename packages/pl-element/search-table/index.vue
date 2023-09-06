<template>
  <div>
    <pl-search-form v-if="formItems.length" :form-items="formItems"></pl-search-form>
    <div>
      <div></div>
      <div>
        <pl-table :columns="columns" :data="tableData" style="width:100%">
        </pl-table>
        <el-pagination
          v-model:current-page="currentPage"
          v-model:page-size="currentPageSize"
          layout="total, prev, pager, next"
          :total="total"
          @size-change="handleSizeChange"
          @current-change="handleRequest"
        >
        </el-pagination>
      </div>
    </div>
  </div>
</template>
<script lang="ts" setup>
import PlSearchForm from "../form/search-form.vue";
import PlTable from '../table/pl-table.vue'
import { ref } from 'vue'

const props = defineProps({
  autoRequest: {
    type: Boolean,
    default: true
  },
  request: {
    type: Function
  },
  formItems: {
    type: Array,
    default: () => []
  },
  columns: {
    type: Array,
    default: () => []
  }
})
const currentPage = ref(1)
const currentPageSize = ref(10)
const total = ref(0)
const loading = ref(false)
const autoRequest = props.autoRequest
const request = props.request
const tableData = ref([])
const callbackOk = (res) => {
  handleRes(res)
}
const handleRequest = () => {
  loading.value = true
  const query = {
    currentPage: currentPage.value,
    currentPageSize: currentPageSize.value
  }
  loading.value = true
  const r = request(query, callbackOk) as Promise<any>
  if (r) {
    try {
      r.then((res) => {
        handleRes(res)
      }).catch(() => {
        loading.value = false
      })
    } catch (e) {
      throw new Error('请传入一个promise')
    }
  }
}
if (autoRequest && typeof request === 'function') {
  handleRequest()
}
const handleRes = (res) => {
  const { data, total: totalNum } = res
  tableData.value = data || []
  total.value = totalNum || 0
  console.log(total.value)
  loading.value = false
}
const handleSizeChange = () => {
  currentPage.value = 1
}
</script>
<script lang="ts">
export default {
  name: 'pl-search-table',
}
</script>
<style>
</style>
