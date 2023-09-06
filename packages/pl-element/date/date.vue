<template>
  <el-date-picker
      v-model="calValue"
      @calendar-change="handleChange"
      @focus="handleFocus"
      v-bind="config"
  ></el-date-picker>
</template>
<script lang="ts">
import type { DatePickerProps } from 'element-plus/lib/components/date-picker';
import { computed, ref, useAttrs, defineComponent, PropType } from 'vue';
// import { pick } from "lodash-es";
import type { ExtractPropTypes } from 'vue'

interface DisabledObj {
  from?: string | number;
  to?: string | number;
  before?: string | number;
  after?: string | number
}

type Props = {
  between: number
}

export default defineComponent({
  name: 'pl-date',
  props: {
    between: {
      type: Number,
    },
    disabledDate: {
      type: [Object, Function] as PropType<DisabledObj | ((time: Date) => boolean)>,
    },
  },
  emits: ['update:modelValue'],
  setup(props, { emit, attrs }) {
    const pickDay = ref();
    const handleChange = (val: Date[]) => {
      if (props.between) {
        const [pointDay] = val;
        pickDay.value = pointDay;
      }
    };
    const calDisabledDate = (date) => {
      const disabledDate = props.disabledDate
    }
    const handleFocus = () => {
      pickDay.value = null;
    };
    const calValue = computed({
      get() {
        return props.modelValue;
      },
      set(val: Date[] | Date) {
        emit('update:modelValue', val);
      },
    });
    const config = computed(() => {
      const { modelValue, between, disabledDate, ...othersAttrs } = props
      return {
        disabledDate: (time: Date) => {
          if (!pickDay.value) {
            return false;
          }
          if (props.between) {
            const con1 = new Date(pickDay.value).getTime() - props.between * 24 * 60 * 60 * 1000;
            const con2 = new Date(pickDay.value).getTime() + props.between * 24 * 60 * 60 * 1000;
            return time < con1 || time > con2;
          }
          return false;
        },
        'value-format': 'YYYY-MM-DD',
        ...othersAttrs,
      };
    });
    return {
      calValue,
      handleChange,
      handleFocus,
      config,
    };
  },
});
</script>
<style></style>
