<template>
  <pl-date v-model="date" type="daterange" :between="30"></pl-date>
</template>
<script lang="ts" setup>
import { ref } from 'vue';

const date = ref([]);
</script>
<script lang="ts">
export default {
  name: 'between-date',
};
</script>

<style></style>
