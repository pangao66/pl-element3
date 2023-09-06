<template>
  <!--自动loading-->
  <pl-button type="primary" auto-loading @click="handClick">loading</pl-button>
  <!--自动全屏loading-->
  <pl-button type="primary" auto-fullscreen-loading @click="handClick">全屏loading</pl-button>
  <!--防抖-->
  <pl-button debounce @click="handleDebounce">防抖</pl-button>
  <!-- popconfirm确认 -->
  <pl-button confirm-type="pop" @confirm="handClick">删除</pl-button>
  <!--messagebox确认-->
  <pl-button confirm-type="messagebox" @confirm="handClick">删除</pl-button>
  <!--tooltip功能-->
  <pl-button tip-content="这是说明文字">tooltip</pl-button>
</template>
<script lang="ts" setup>
import PlButton from "../../packages/pl-element/button/button.vue";
import { ElMessage } from "element-plus";


const handClick = (e: any, done: () => void) => {
  setTimeout(() => {
    done();
  }, 1000);
};
const handleConfirm = (done: () => void) => {
  setTimeout(() => {
    done();
  }, 1000);
}
const handleDebounce = () => {
  ElMessage.warning('500ms内只能点击一次')
}
</script>
<script lang="ts">
export default {
  name: "button-demo"
};
</script>
<style>
</style>
