<script setup lang="ts">
withDefaults(defineProps<{
  title: string
  description?: string
  category: string
  role: string
  stack?: string[]
  year?: string
  image?: { src: string, alt: string }
  live?: string
  code?: string
}>(), {
  description: '',
  stack: () => [],
  year: undefined,
  image: undefined,
  live: undefined,
  code: undefined
})
</script>

<template>
  <UCard
    variant="outline"
    :ui="{ body: 'p-0 sm:p-0' }"
    class="group flex h-full flex-col overflow-hidden transition-[transform,box-shadow] duration-150 ease-out hover:-translate-y-1 hover:shadow-lg hover:ring-inverted focus-within:ring-inverted motion-reduce:hover:translate-y-0"
  >
    <ProjectImage
      v-if="image"
      :src="image.src"
      :alt="image.alt"
      :title="title"
      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 360px"
      class="border-b border-default"
    />

    <div class="flex flex-1 flex-col p-4 sm:p-5">
      <div class="flex items-center justify-between gap-2 font-mono text-xs text-muted">
        <span>{{ category }}</span>
        <span v-if="year" class="tabular-nums">{{ year }}</span>
      </div>

      <h3 class="mt-2 font-display text-base font-bold text-highlighted">
        {{ title }}
      </h3>
      <p class="mt-0.5 text-xs font-semibold text-toned">
        {{ role }}
      </p>
      <p class="mt-2 text-sm/relaxed text-muted">
        {{ description }}
      </p>

      <ul v-if="stack.length" class="mt-3 flex flex-wrap gap-1.5" aria-label="Tech stack">
        <li v-for="tech in stack" :key="tech">
          <TagBadge :label="tech" />
        </li>
      </ul>
    </div>

    <template v-if="live || code" #footer>
      <div class="flex flex-wrap items-center gap-2">
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
          :label="category === 'Open Source' || category === 'Docs' ? 'Pull requests' : 'Code'"
          size="xs"
          color="neutral"
          variant="outline"
          icon="i-lucide-github"
        />
      </div>
    </template>
  </UCard>
</template>
