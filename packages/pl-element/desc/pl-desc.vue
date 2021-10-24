<template>
  <el-tooltip :content="content" v-bind="{...tipConfig}">
    <el-icon v-bind="iconConfig" class="pl-desc-icon">
      <question-filled/>
    </el-icon>
  </el-tooltip>
</template>
<script lang="ts">
import { QuestionFilled } from '@element-plus/icons'
import { defineComponent } from 'vue'

export default defineComponent({
  props: {
    iconConfig: {
      type: Object,
      default: () => ({})
    },
    tipConfig: {
      type: Object,
      default: () => ({})
    },
    content: {
      type: String
    }
  },
  components: {
    QuestionFilled
  }
})
</script>
<style>
.pl-desc-icon {
  display: inline-block;
  vertical-align: middle;
  line-height: 100%;
}
</style>
