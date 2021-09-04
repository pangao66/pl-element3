<template>
  <el-form ref="formRef" :model="calState" v-bind="calFormConfig">
    <pl-form-item
      v-for="item in formItems"
      v-bind="item"
      :form-state="calState"
      v-model="calState[item.prop]"
    ></pl-form-item>
    <slot name="submit">
      <el-form-item>
        <el-button type="primary" @click="handleSubmit">确认</el-button>
        <el-button @click="handleReset">重置</el-button>
      </el-form-item>
    </slot>
  </el-form>
</template>
<script lang="ts">
import { defineProps, defineComponent, PropType, computed, useAttrs, ref, watch } from "vue";
import FormItem from "./form-item.vue";
import PlFormItem from "./form-item.vue";
import { ElForm } from "element-plus";
import { merge } from 'lodash'

export default defineComponent({
  name: 'pl-form',
  components: { PlFormItem, FormItem },
  emits: [ 'update:modelValue', 'submit' ],
  props: {
    modelValue: {
      type: Object,
      default: () => null
    },
    formItems: {
      type: Array,
      default: () => []
    }
  },
  setup(props, { emit }) {
    const formState = ref({})
    const calState = computed({
      get: () => props.modelValue ? props.modelValue : formState.value,
      set: (val) => {
        if (props.modelValue) {
          emit('update:modelValue', val)
        } else {
          //@ts-ignore
          formState.value = val
        }
      }
    })
    const formRef = ref<InstanceType<typeof ElForm>>()
    const loopInitValue = (item) => {
      if (item.grid && item.children) {
        item.children.forEach((row) => {
          loopInitValue(row)
        })
      }
      if ((item.ui === 'select' && item.config?.multiple) || item.ui === 'checkbox') {
        calState.value = {
          ...calState.value,
          [item.prop]: []
        }
      } else {
        if (item.prop) {
          if (item.prop.indexOf('.') > -1) {
            const r = item.prop.split('.').reduceRight((p, c) => {
              return {
                [c]: p
              }
            }, '');
            calState.value = merge(calState.value, r)
          }
          // console.log(r)
          // console.log(merge(testOjb, r))
          // calState.value = {
          //   ...calState.value,
          //   [item.prop]: ''
          // }
        }
      }
    }
    props.formItems?.forEach((item) => {
      // if (!item.grid && !item.children) {
      //   loopInitValue(item)
      // } else {
      //   item.children.forEach((item) => {
      //
      //   })
      // }
      loopInitValue(item)
    })
    const handleSubmit = async () => {
      try {
        await formRef.value?.validate()
        emit('submit', calState.value)
      } catch (e) {
        console.log(e)
      }
    }
    const handleReset = () => {
      formRef.value?.resetFields()
    }
    return {
      calState,
      handleSubmit,
      handleReset,
      formRef,
      calFormConfig: computed(() => {
        return {
          ...useAttrs(),
          labelWidth: '120px'
        }
      })
    }
  }
})
</script>

<style scoped>

</style>
