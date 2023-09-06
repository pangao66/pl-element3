<script setup>
import { useRoute } from 'vitepress'
import Theme from 'vitepress/theme'
// the default layout we'll create next
import FrameDefaultLayout from './FrameDefaultLayout.vue'
import Story from './Story.vue';

const route = useRoute()
</script>

<template>
  <!--
    replace with the layout entirely for `/frames/default`
    so we don't inherit from `Theme.Layout`
  -->
  <Story v-if="route.path.startsWith('/frames/default')" />
  <Theme.Layout v-else />
</template>
