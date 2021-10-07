<template>
  <el-table-column :label="label" :prop="prop"></el-table-column>
</template>
<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: "pl-table-column",
  props: {
    label: {
      type: String,
    },
    prop: {
      type: String
    }

  },
  setup() {
    return {}
  }
})
</script>

<style>

</style>
