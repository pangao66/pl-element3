<template>
  <el-form
    class="pl-form"
    ref="formRef"
    :model="calState"
    v-bind="calFormConfig"
    @submit.prevent="handleSubmit"
    @reset="handleReset"
  >
    <template v-for="item in formItems">
      <pl-form-item
        v-if="!item.slotName&&!item.render"
        v-bind="item"
        :form-state="calState"
        v-model="calState[item.prop]"
        @update:form-item="updateFormItem"
      >
      </pl-form-item>
      <slot v-else :name="item.slotName"></slot>
      <render-vnode v-if="item.render" :vnode="item.render"></render-vnode>
    </template>
    <slot name="submit" v-bind="{handleSubmit,handleReset}">
      <el-form-item>
        <el-button type="primary" native-type="submit">确认</el-button>
        <el-button native-type="reset">重置</el-button>
      </el-form-item>
    </slot>
  </el-form>
</template>
<script lang="ts">
import { defineProps, defineComponent, PropType, computed, useAttrs, ref, watch, provide } from "vue";
import FormItem from "./form-item.vue";
import PlFormItem from "./form-item.vue";
import { ElForm } from "element-plus";
import { merge, set } from 'lodash-es'
import { FormItemRule } from "element-plus/packages/components/form/src/form.type";
import { PlFormKey, getComponent } from './utils'
import RenderVnode from "../renderVnode";

export default defineComponent({
  name: 'pl-form',
  components: { RenderVnode, PlFormItem, FormItem },
  emits: [ 'update:modelValue', 'submit', 'validateError' ],
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
    formConfig: {
      type: Object,
      default: () => ({})
    },
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
            }, undefined);
            calState.value = merge(calState.value, r)
          }
        }
      }
    }
    props.formItems?.forEach((item) => {
      loopInitValue(item)
    })
    const handleSubmit = async (e) => {
      e.preventDefault()
      try {
        await formRef.value?.validate()
        emit('submit', calState.value)
      } catch (e) {
        emit('validateError', e)
        // console.log(e)
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
        labelWidth: '120px',
        ...props.formConfig,
      }
    })
    provide(PlFormKey, {
      addFormItemGroup(prop, content) {
        calState.value[prop].push(content)
      }
    })
    return {
      calState,
      handleSubmit,
      handleReset,
      formRef,
      updateFormItem,
      calFormConfig,
      getComponent
    }
  }
})
</script>
<style lang="stylus">
.pl-form {
  .el-input, .el-select, .el-date-editor.el-input, .el-date-editor.el-input__inner {
    max-width: 500px;
    width: 100%
  }
}
</style>
