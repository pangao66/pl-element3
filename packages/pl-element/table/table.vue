<template>
  <el-table>
    <pl-table-column v-for="(item,index) in columns" v-bind="item" :key="index"></pl-table-column>
  </el-table>
</template>
<script lang="ts">
import { defineComponent } from 'vue'
import PlTableColumn from "./table-column.vue";

export default defineComponent({
  name: "pl-table",
  components: { PlTableColumn },
  props: {
    columns: {
      type: Array,
      default: () => []
    },
    data: {
      type: Array,
      default: () => []
    }
  },
  setup() {
    return {}
  }
})
</script>

<style scoped>

</style>
