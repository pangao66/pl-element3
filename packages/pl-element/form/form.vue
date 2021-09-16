<template>
  <el-form ref="formRef" :model="calState" v-bind="calFormConfig">
    <pl-form-item
      v-for="item in formItems"
      v-bind="item"
      :form-state="calState"
      v-model="calState[item.prop]"
      @update:form-item="updateFormItem"
    >

    </pl-form-item>
    <slot name="submit">
      <el-form-item>
        <el-button type="primary" @click="handleSubmit">确认</el-button>
        <el-button @click="handleReset">重置</el-button>
      </el-form-item>
    </slot>
  </el-form>
</template>
<script lang="ts">
import mitt from 'mitt'
import { defineProps, defineComponent, PropType, computed, useAttrs, ref, watch } from "vue";
import FormItem from "./form-item.vue";
import PlFormItem from "./form-item.vue";
import { ElForm } from "element-plus";
import { merge, set } from 'lodash'
import type { ElFormItemContext as FormItemCtx } from 'element-plus/lib/tokens'
import { elFormEvents } from 'element-plus/lib/tokens'
import { FormItemRule } from "element-plus/packages/components/form/src/form.type";

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
    },
    rules: [ Object, Array ] as PropType<FormItemRule | FormItemRule[]>,
  },
  setup(props, { emit }) {
    const formMitt = mitt()

    const fields: FormItemCtx[] = []


    formMitt.on<FormItemCtx>(elFormEvents.addField, field => {
      console.log(field)
      if (field) {
        fields.push(field)
      }
    })

    formMitt.on<FormItemCtx>(elFormEvents.removeField, field => {
      if (field && field.prop) {
        fields.splice(fields.indexOf(field), 1)
      }
    })
    const findFormItem = (prop) => {
      console.log(fields)
      return fields.find((item) => item.prop === prop)
    }
    // const formRef=ref()
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
            }, undefined);
            calState.value = merge(calState.value, r)
          }
        }
      }
    }
    props.formItems?.forEach((item) => {
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
    const updateFormItem = (val, path) => {
      set(calState.value, path, val)
    }
    const handleReset = () => {
      formRef.value?.resetFields()
    }
    const calFormConfig = computed(() => {
      return {
        ...useAttrs(),
        labelWidth: '120px'
      }
    })
    return {
      calState,
      handleSubmit,
      handleReset,
      formRef,
      updateFormItem,
      calFormConfig,
      findFormItem
    }
  }
})
</script>

<style scoped>

</style>
