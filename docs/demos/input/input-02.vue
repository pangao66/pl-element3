<template>
  <pl-input transfer="cent" unit="元" v-model="input2"></pl-input>
  <span>传入后台金额{{ input2 }}分</span>
</template>
<script lang="ts" setup>
import { ref } from "vue";

const input2 = ref(0)
</script>
<script lang="ts">
export default {
  name: "input-02"
}
</script>
