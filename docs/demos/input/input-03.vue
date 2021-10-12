<template>
  <p>自动大写</p>
  <pl-input transfer="upperCase" v-model="str1"></pl-input>
  <p>自动小写</p>
  <pl-input transfer="lowerCase" v-model="str2"></pl-input>
</template>
<script lang="ts" setup>
import { ref } from "vue";

const str1 = ref('')
const str2 = ref('')
</script>
<script lang="ts">
export default {
  name: "input-03"
}
</script>

<style>

</style>
