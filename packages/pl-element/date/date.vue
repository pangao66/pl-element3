<template>
  <el-date-picker
    v-model="calValue"
    @calendar-change="handleChange"
    @focus="handleFocus"
    v-bind="config"
  ></el-date-picker>
</template>
<script lang="ts">
import { timePickerDefaultProps } from 'element-plus/packages/components/time-picker';
import { computed, ref, useAttrs, defineComponent, PropType } from 'vue';

export default defineComponent({
  name: 'pl-date',
  props: {
    // ...timePickerDefaultProps,
    modelValue: {
      type: [ Date, Array, String ] as PropType<string | Date | Date[]>,
      default: '',
    },
    between: {
      type: Number,
    },
  },
  emits: [ 'update:modelValue' ],
  setup(props, { emit, attrs }) {
    const pickDay = ref();
    const handleChange = (val: Date[]) => {
      if (props.between) {
        const [ pointDay ] = val;
        pickDay.value = pointDay;
      }
    };
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
      // const { modelValue, between, ...othersAttrs } = props
      return {
        disabledDate: (time: number) => {
          if (!pickDay.value) {
            return false;
          }
          if (props.between) {
            const con1 =
              new Date(pickDay.value).getTime() -
              props.between * 24 * 60 * 60 * 1000;
            const con2 =
              new Date(pickDay.value).getTime() +
              props.between * 24 * 60 * 60 * 1000;
            return time < con1 || time > con2;
          }
          return false;
        },
        'value-format': 'YYYY-MM-DD',
        ...attrs,
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
