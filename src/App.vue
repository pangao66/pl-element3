<template>
  <div id="nav">
    <router-link to="/">Home</router-link>
    |
    <router-link to="/about">About</router-link>
  </div>
  <router-view/>
  <pl-button @click="handleClick" auto-loading>按钮</pl-button>
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
