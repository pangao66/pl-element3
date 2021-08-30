<script setup lang="ts">
import locale from 'element-plus/lib/locale/lang/zh-cn';
// import PlWrapper from "./pl-element/pl-wrapper.vue";
// import type { Name } from './views/Home'
</script>
<template>
  <el-config-provider :locale="locale">
    <router-view></router-view>
  </el-config-provider>
</template>

<style lang="stylus">
* {
  margin: 0;
  padding: 0;
}

body {
  margin-top: 60px;
}
</style>
