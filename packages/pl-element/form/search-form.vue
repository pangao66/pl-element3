<template>
  <el-form
    ref="plForm"
    :model="formState"
    class="pl-search-form"
    :class="[{ advance: advanced }, hasChildClass]"
    @submit.prevent="submit"
    @reset="$emit('reset')"
    v-bind="calFormConfig"
  >
    <el-row>
      <template v-for="(item, index) in formItems" :key="index">
        <el-col :xl="6" :lg="8" :md="12" :sm="24" class="el-col-xll-6">
          <pl-form-item
            :form-state="formState"
            v-model="formState[item.prop]"
            v-if="!item.slotName"
            v-bind="item"
          >
          </pl-form-item>
          <slot
            v-if="item.slotName"
            :name="item.slotName"
            v-bind="{ formState, item }"
          />
        </el-col>
      </template>
      <slot name="search">
        <el-form-item
          style="margin-left: auto; margin-right: 20px; order: 2"
          label-width="0"
        >
          <el-button type="primary" native-type="submit">查询</el-button>
          <el-button native-type="reset"> 重置</el-button>
          <a
            style="margin-left: 8px; cursor: pointer"
            class="advance-toggle-btn"
            @click="toggleAdvanced"
          >
            {{ advanced ? '展开' : '收起' }}
            <i class="el-icon-arrow-up" :class="{ advanced }"></i>
          </a>
        </el-form-item>
      </slot>
    </el-row>
  </el-form>
</template>
<script lang="ts">
import { computed, defineComponent, ref } from 'vue';
import { getComponent, generatePlaceholder } from './utils';
import PlFormItem from './form-item.vue';

export default defineComponent({
  name: 'pl-search-form',
  props: {
    formItems: {
      type: Array,
      default: () => [],
      required: true,
    },
    formConfig: {
      type: Object,
      default: () => ({})
    }
  },
  emits: [ 'submit', 'reset' ],
  components: {
    PlFormItem,
  },
  setup(props, { emit }) {
    const formState = ref({});
    const advanced = ref(false);
    const submit = () => {
      emit('submit', formState.value)
    };
    const hasChildClass = computed(() => {
      let length = props.formItems.length;
      if (length > 5) {
        length = 5;
      }
      return `has-items-gt-${length}`;
    });
    const calFormConfig = computed(() => {
      return {
        labelWidth: '120px',
        labelPosition: 'right',
        ...props.formConfig
      }
    })
    return {
      formState,
      advanced,
      submit,
      toggleAdvanced() {
        advanced.value = !advanced.value;
      },
      getComponent,
      hasChildClass,
      generatePlaceholder,
      calFormConfig
    };
  },
});
</script>

<style lang="stylus">
@import "./form.styl"
</style>
