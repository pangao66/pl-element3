<template>
  <pl-input v-model="input1"></pl-input>
</template>
<script lang="ts" setup>
import { ref } from 'vue'

const input1 = ref('')
</script>
<script lang="ts">
export default {
  name: "input-demo01"
}
</script>

<style>

</style>
