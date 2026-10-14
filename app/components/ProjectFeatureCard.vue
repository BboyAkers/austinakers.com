<script setup lang="ts">
withDefaults(defineProps<{
  title: string
  description?: string
  category: string
  role: string
  stack?: string[]
  year?: string
  to: string
  image?: { src: string, alt: string }
  live?: string
  code?: string
  priority?: boolean
  headingLevel?: 'h2' | 'h3'
}>(), {
  description: '',
  stack: () => [],
  year: undefined,
  image: undefined,
  live: undefined,
  code: undefined,
  priority: false,
  headingLevel: 'h3'
})
</script>

<template>
  <UCard
    variant="outline"
    :ui="{ body: 'p-0 sm:p-0', footer: 'relative z-10' }"
    class="group relative flex h-full flex-col overflow-hidden transition-[transform,box-shadow] duration-200 ease-out hover:-translate-y-1 hover:shadow-[0_24px_48px_-28px_var(--ui-text-highlighted)]/30 hover:ring-inverted focus-within:ring-inverted motion-reduce:hover:translate-y-0"
  >
    <ProjectImage
      :src="image?.src"
      :alt="image?.alt"
      :title="title"
      :priority="priority"
      sizes="(max-width: 768px) 100vw, 560px"
      class="border-b border-default"
    />

    <div class="flex flex-1 flex-col p-5 sm:p-6">
      <div class="flex items-center justify-between gap-3 font-mono text-xs text-muted">
        <span class="text-primary">{{ category }}</span>
        <span v-if="year" class="tabular-nums">{{ year }}</span>
      </div>

      <component :is="headingLevel" class="mt-2.5 font-display text-2xl font-bold tracking-[-0.02em] text-highlighted">
        <NuxtLink :to="to" class="after:absolute after:inset-0 after:content-[''] focus-visible:outline-none">
          {{ title }}
        </NuxtLink>
      </component>

      <p class="mt-1 text-sm font-semibold text-highlighted">
        {{ role }}
      </p>

      <p class="mt-2.5 text-[15px]/relaxed text-muted">
        {{ description }}
      </p>

      <ul v-if="stack.length" class="mt-4 flex flex-wrap gap-1.5" aria-label="Tech stack">
        <li v-for="tech in stack" :key="tech">
          <TagBadge :label="tech" />
        </li>
      </ul>
    </div>

    <template #footer>
      <div class="flex items-center justify-between gap-2 min-h-7">
        <NuxtLink :to="to">
        <span class="inline-flex items-center gap-1.5 text-xs font-semibold text-highlighted group-hover:text-primary transition-colors">
          Read case study
          <UIcon name="i-lucide-arrow-right" class="size-3.5 transition-transform duration-200 group-hover:translate-x-0.5 motion-reduce:transition-none" />
        </span>
        </NuxtLink>
        <div v-if="live || code" class="flex items-center gap-1.5">
          <UButton
            v-if="live"
            :to="live"
            target="_blank"
            rel="noopener noreferrer"
            :aria-label="`${title} live site (opens in new tab)`"
            label="Live"
            size="xs"
            color="neutral"
            variant="outline"
            trailing-icon="i-lucide-arrow-up-right"
          />
          <UButton
            v-if="code"
            :to="code"
            target="_blank"
            rel="noopener noreferrer"
            :aria-label="`${title} source code (opens in new tab)`"
            label="Code"
            size="xs"
            color="neutral"
            variant="outline"
            icon="i-lucide-github"
          />
        </div>
      </div>
    </template>
  </UCard>
</template>
