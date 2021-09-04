<script setup lang="ts">
import locale from 'element-plus/lib/locale/lang/zh-cn';
import { add, multiply, times } from 'lodash'

console.log(add(0.1, 0.2))
console.log(multiply(0.14, 100))
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
