<template>
  <pl-button auto-loading @click="handleClick">
    loading
  </pl-button>
</template>
<script lang="ts" setup>
const handleClick = (done) => {
  setTimeout(() => {
    //do something
    done()
  }, 1000)
}
</script>
<script lang="ts">
export default {
  name: "button-02"
}
</script>
