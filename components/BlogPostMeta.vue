<script setup>
const props = defineProps({
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
})
</script>

<template>
  <div class="">
    <span class="">{{ title }}</span>
    <span class="">{{ description }}</span>
  </div>
</template>
