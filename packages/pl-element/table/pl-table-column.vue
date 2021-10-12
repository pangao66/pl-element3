<template>
  <el-table-column v-bind="config">
    <template v-for="[key, val] in Object.entries(calSlots)" #[key]="scope">
      <slot v-if="key === 'default'" :name="slotName" v-bind="scope || {}">
        <render-vnode :vnode="val"></render-vnode>
      </slot>
    </template>
  </el-table-column>
</template>
<script lang="ts">
import { computed, defineComponent } from 'vue';
// import defaultProps from 'element-plus/packages/components/table/src/table-column/defaults';
import RenderVnode from '../renderVnode';
import { identity, pickBy } from 'lodash-es';

export default defineComponent({
  name: 'pl-table-column',
  components: { RenderVnode },
  props: {
    // ...defaultProps,
    slotName: {
      type: String,
    },
  },
  setup(props, { slots, attrs }) {
    const config = computed(() => {
      return {
        ...attrs,
      };
    });
    // const calSlots = {
    //   default: props.slotName ? slots[props.slotName] : null,
    // };
    const calSlots = computed(() => {
      return pickBy(
        {
          default: props.slotName ? slots[props.slotName] : null,
          ...slots,
        },
        identity,
      );
    });
    return {
      config,
      calSlots,
    };
  },
});
</script>

<style scoped></style>
