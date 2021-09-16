<template>
  <el-date-picker v-model="calValue" v-bind="calConfig"></el-date-picker>
</template>
<script lang="ts" setup>
import { computed, useAttrs } from "vue";
import dayjs from 'dayjs'

const today = dayjs().valueOf()
console.log(today)

// const lastWeek=dayjs((new Date()))
interface PlDateProps {
  modelValue: any,
  between?: number
}

const map = {
  today: {
    text: '今天',
    time: today
  },
  yesterday: {
    text: '昨天',
    time: today - 3600 * 1000 * 24
  },
  weekAgo: {
    text: '一周前',
    time: today - 3600 * 1000 * 24 * 7
  },
  recentWeek: {
    text: '最近一周',
    end: today,
    start: today - 3600 * 1000 * 24 * 7
  },
  recentMonth: {
    text: '最近一个月',
    end: today,
    start: new Date().setMonth(new Date().getMonth() - 1)
  },
  recentThreeMonth: {
    text: '最近三个月',
    end: today,
    start: new Date().setMonth(new Date().getMonth() - 3)
  }
}
const props = withDefaults(defineProps<PlDateProps>(), {
  modelValue: '',
  options: () => [],
  isBindObject: false,
  labelKey: 'label',
  valueKey: 'value',
  autoRemoveInvalidValue: true
})
const emit = defineEmits<{
  (e: 'update:modelValue', val: string | number | boolean | object): void
}>()
const calValue = computed({
  get: () => props.modelValue,
  set: (val) => {
    emit('update:modelValue', val)
  }
})
const attrs = useAttrs()
const shortcuts = computed(() => {
  return [
    {}
  ]
})
const calConfig = computed(() => {
  return {
    valueFormat: 'YYYY-MM-DD',
    ...attrs
  }
})
</script>
<script lang="ts">
export default {
  name: "pl-date",
}
</script>

<style scoped>

</style>
