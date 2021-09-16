<template>
  <pl-button auto-loading @click="handleClick">
    自动loading
  </pl-button>
  <pl-button
    type="primary"
    auto-fullscreen-loading
    @click="handleClick"
  >自动全屏loading
  </pl-button>
</template>
<script lang="ts" setup>
const handleClick = (done) => {
  setTimeout(() => {
    /** do something  这里处理一些事件,比如点击之后ajax,
     * ajax返回后调用done() 就能自动loading和关闭loading
     *  无需定义一个loading变量
     */
    done()
  }, 1000)
}
</script>
<script lang="ts">
export default {
  name: "button-02"
}
</script>
