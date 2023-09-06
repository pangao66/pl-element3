<script setup>
import locale from 'element-plus/lib/locale/lang/zh-cn';
import About from './views/About.vue';
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
