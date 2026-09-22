<script setup lang="ts">
defineProps<{
  eyebrow: string
  title: string
  description: string
  route: string
  links: string
}>()

const open = defineModel<boolean>('open', { default: false })
</script>

<template>
  <UModal v-model:open="open" :title="title" :description="description" :ui="{ footer: 'justify-start' }">
    <template #body>
      <p class="font-mono text-[13px] text-muted">
        {{ eyebrow }}
      </p>
      <pre class="mt-4 overflow-auto rounded-xl border border-default bg-muted p-4 font-mono text-[13px]/[1.6] text-highlighted">route: {{ route }}<br>links: {{ links }}</pre>
    </template>
    <template #footer="{ close }">
      <UButton label="Close" color="neutral" variant="outline" @click="close" />
    </template>
  </UModal>
</template>
