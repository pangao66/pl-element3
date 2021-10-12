<template>
  <el-table :data="data" v-bind="config">
    <pl-table-column
      v-for="(item, index) in columns"
      :key="index"
      v-bind="item"
    >
      <template v-if="item.slotName" #[item.slotName]="scope">
        <slot :name="item.slotName" v-bind="scope || {}"></slot>
      </template>
    </pl-table-column>
  </el-table>
</template>
<script lang="ts">
import { defineComponent, computed, PropType } from 'vue';
import PlTableColumn from './pl-table-column.vue';
// import defaultProps from 'element-plus/packages/components/table/src/table/defaults';
// import { TableColumn } from 'element-plus/packages/components/table/src/table-column/defaults';

export default defineComponent({
  name: 'pl-table',
  components: { PlTableColumn },
  props: {
    // ...defaultProps,
    tableConfig: {
      type: Object
    },
    data: {
      type: Array,
      default: () => []
    },
    columns: {
      type: Array,
    },
  },
  setup(props, { attrs }) {
    const config = computed(() => {
      return {
        ...attrs,
      };
    });
    return {
      config,
    };
  },
});
</script>

<style scoped></style>
