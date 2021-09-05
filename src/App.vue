<script setup lang="ts">
import locale from 'element-plus/lib/locale/lang/zh-cn';
import { add, multiply, times } from 'lodash'
import { ref } from "vue";

console.log(add(0.1, 0.2))
console.log(multiply(0.14, 100))
const form = ref({
  nameInfo: {
    firstName: '',
    lastName: ''
  },
  addressInfo: {
    province: '',
    area: ''
  }
})
const formItems = ref([
  'info.firstName',
  'info.lastName',
  'addressInfo.province',
  'addressInfo.area'
])
</script>
<template>
  <el-config-provider :locale="locale">
    <router-view></router-view>
  </el-config-provider>
  <div>
    <!--    <form>-->
    <!--      &lt;!&ndash;here if I know the real key  I can write directly&ndash;&gt;-->
    <!--      <input v-model="form.nameInfo.firstName"/>-->
    <!--      <input v-model="form.nameInfo.lastName"/>-->
    <!--      &lt;!&ndash;-->
    <!--       here  I use v-for  the item is a variable and-->
    <!--        it not a directly variable it's a path for a object-->
    <!--        when i write as this  it will bind  form['info.firstName'] not the value form.info.firstName I want-->
    <!--          &ndash;&gt;-->
    <!--      <input v-for="item in formItems" v-model="form[item]">-->
    <!--    </form>-->
  </div>
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
