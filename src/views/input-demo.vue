<template>
  默认trim
  <pl-input v-model="str1"></pl-input>
  使用v-model修饰符
  <pl-input v-model.upperCase="str2"></pl-input>
  <pl-input v-model.lowerCase="str2"></pl-input>
  <pl-input v-model.lowerCase="str2"></pl-input>
  使用transfer属性
  <pl-input v-model="str3" transfer="lowerCase"></pl-input>
  <pl-input v-model="num1" transfer="number"></pl-input>
  <pl-input v-model="num1"></pl-input>
  <pl-input v-model="num2" transfer="cent"></pl-input>
</template>
<script lang="ts" setup>
import PlInput from "../../packages/pl-element/input/pl-input.vue";
import { ref } from "vue";

const str1 = ref('')
const str2 = ref('')
const str3 = ref('')
const num1 = ref(12)
const num2 = ref(14)
</script>
<script lang="ts">
export default {
  name: "input-demo"
}
</script>

<style scoped>

</style>
