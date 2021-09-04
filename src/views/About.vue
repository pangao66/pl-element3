<template>
  <div>about</div>
</template>
<script lang="ts">

export default {
  name: "About"
}
</script>
<script lang="ts" setup>
interface Name {
  name: string
}

const props = defineProps<Name>()
</script>

<style scoped>

</style>
