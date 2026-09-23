<script setup lang="ts">
const props = defineProps<{
  date: string
  title: string
  description?: string
  tags?: string[]
  minutes?: number
  to: string
}>()

function handleClick(e: MouseEvent) {
  if ((e.target as HTMLElement).closest('a, button')) return
  navigateTo(props.to)
}
</script>

<template>
  <article
    class="group grid grid-cols-1 items-baseline gap-6 border-t border-default py-[22px] sm:grid-cols-[120px_1fr_100px] sm:gap-6 cursor-pointer"
    @click="handleClick"
  >
    <p class="font-mono text-[13px] text-muted tabular-nums">
      {{ date }}
    </p>
    <div class="min-w-0">
      <ULink :to="to" class="font-display text-[19px] font-semibold tracking-[-0.01em] text-highlighted group-hover:text-primary focus-visible:text-primary transition-colors">
        {{ title }}
      </ULink>
      <p v-if="description" class="mt-1 text-sm text-muted">
        {{ description }}
      </p>
      <div v-if="tags?.length" class="mt-2 flex flex-wrap gap-1.5">
        <TagBadge v-for="tag in tags" :key="tag" :label="tag" :to="`/blog?tag=${tag}`" />
      </div>
    </div>
    <p v-if="minutes" class="font-mono text-[13px] text-muted tabular-nums sm:text-right">
      {{ minutes }} min
    </p>
  </article>
</template>
