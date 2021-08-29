<template>
  <div>about</div>
</template>
<script lang="ts">
export interface Name {
  name: string
}

export default {
  name: "About"
}
</script>
<script lang="ts" setup>
const props = defineProps<Name>()
</script>

<style scoped>

</style>
