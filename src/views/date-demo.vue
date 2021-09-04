<template>
  <pl-date v-model="date1">

  </pl-date>
</template>
<script lang="ts" setup>
import PlDate from "../../packages/pl-element/date/date.vue";
import { ref } from "vue";

const date1 = ref(null)
</script>
<script lang="ts">
export default {
  name: "date-demo"
}
</script>

<style scoped>

</style>
