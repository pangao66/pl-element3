<script setup>
const title = 'iframe';
const src = undefined;
</script>

<template>
  <p>{title}</p>
  <iframe data-why :src="src" :title="title">
    <slot />
  </iframe>
</template>
