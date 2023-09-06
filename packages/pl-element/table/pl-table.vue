<template>
  <el-table ref="tableRef" :data="data" v-bind="config">
    <pl-table-column
      v-for="(item, index) in columns"
      :key="index"
      v-bind="item"
    >
      <template v-if="item.cell&&typeof item.cell==='string'" #[item.cell]="scope">
        <slot :name="item.cell" v-bind="scope || {}"></slot>
      </template>
      <template v-if="item.header&&typeof item.header==='string'" #[item.header]="scope">
        <slot :name="item.header" v-bind="scope || {}"></slot>
      </template>
    </pl-table-column>
  </el-table>
</template>
<script lang="ts">
import { defineComponent, computed, PropType, onMounted, nextTick, ref } from 'vue';
import PlTableColumn from './pl-table-column.vue';
// import { addResizeListener, removeResizeListener } from 'element-plus/lib/utils/dom/resize-event'
import { useResizeObserver } from '@vueuse/core'

export default defineComponent({
  name: 'pl-table',
  components: { PlTableColumn },
  props: {
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
    autoHeight: {
      type: Boolean,
      default: false
    }
  },
  setup(props, { attrs }) {
    const tableRef = ref(null)
    const setHeight = () => {
      const table = tableRef.value
    }
    onMounted(() => {
      nextTick(() => {
        if (props.autoHeight) {
          // addResizeListener(window.document.body, setHeight)
          // addResizeListener(this.$refs.table.$el, setHeight)
          useResizeObserver(window.document.body, (entries) => {
            const entry = entries[0]
            const { width, height } = entry.contentRect
            // text.value = `width: ${width}, height: ${height}`
            setHeight(height)
          })

        }
      })
    })
    const config = computed(() => {
      return {
        ...attrs,
      };
    });
    return {
      config,
      tableRef
    };
  },
});
</script>
<style></style>
