<template>
  <el-table-column v-bind="config">
    <template v-for="[key, val] in Object.entries(calSlots)" #[key]="scope">
      <pl-table-column v-for="item in children" v-bind="item" v-if="children">
        <template v-if="item.cell&&typeof item.cell==='string'" #[item.cell]="scope">
          <slot :name="item.cell" v-bind="scope || {}"></slot>
        </template>
        <template v-if="item.header&&typeof item.header==='string'" #[item.header]="scope">
          <slot :name="item.header" v-bind="scope || {}"></slot>
        </template>
      </pl-table-column>
      <template v-else>
        <slot v-if="key === 'default'&&typeof cell==='string'" :name="cell" v-bind="scope || {}">
        </slot>
        <slot v-if="key === 'header'&&typeof header==='string'" :name="header" v-bind="scope || {}">
        </slot>
        <template v-if="tip">
          {{ scope.column.label }}
          <pl-desc v-if="tip" :content="tip"></pl-desc>
        </template>
        <render-vnode v-if="showRender" :data="scope" :vnode="val"></render-vnode>
      </template>
    </template>
  </el-table-column>
</template>
<script lang="ts">
import { computed, defineComponent } from 'vue';
// import defaultProps from 'element-plus/packages/components/table/src/table-column/defaults';
import RenderVnode from '../renderVnode';
import { identity, pickBy } from 'lodash-es';
import PlDesc from "../desc/pl-desc.vue";

export default defineComponent({
  name: 'pl-table-column',
  components: { PlDesc, RenderVnode },
  props: {
    // ...defaultProps,
    cell: {
      type: [ String, Function ],
    },
    header: {
      type: [ String, Function ]
    },
    tip: {
      type: String
    },
    children: {
      type: Array,
    }
  },
  setup(props, { slots, attrs }) {
    const config = computed(() => {
      return {
        ...attrs,
      };
    });
    const calSlots = computed(() => {
      return pickBy(
        {
          default: props.cell || props.children,
          header: props.header || props.tip,
        },
        identity,
      );
    });
    const showRender = computed(() => {
      return (props.cell && typeof props.cell !== 'string') || (props.header && typeof props.header !== 'string')
    })
    return {
      config,
      calSlots,
      showRender
    };
  },
});
</script>

<style></style>
