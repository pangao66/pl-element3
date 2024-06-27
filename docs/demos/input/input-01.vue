<template>
  <pl-input v-model.trim="input1"></pl-input>
</template>
<script lang="ts" setup>
import { ref } from 'vue'

defineOptions({
  name: 'input-demo01'
})
const input1 = ref('')
</script>


<style>

</style>
