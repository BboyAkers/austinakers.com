<script setup lang="ts">
withDefaults(defineProps<{
  label: string
  to?: string
}>(), {
  to: undefined
})
</script>

<template>
  <UBadge
    :label="label"
    :to="to"
    color="neutral"
    variant="outline"
    size="md"
    class="motion-tag rounded-full font-mono text-xs font-normal"
  />
</template>
