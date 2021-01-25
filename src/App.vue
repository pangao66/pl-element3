<template>
  <el-link href="/#/button">button</el-link>
  <router-view></router-view>
</template>
<script>
export default {
  setup () {
    return {
      handleClick () {
        console.log('aaa')
      }
    }
  }
}
</script>
