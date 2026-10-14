<script setup lang="ts">
/**
 * Responsive project screenshot.
 * `src` is a base path (no width/extension). Files are expected at
 * `${src}-640w.{avif,webp}` and `${src}-1280w.{avif,webp}`, captured at 16:10.
 * When `src` is missing, renders a quiet labelled frame so the slot is obvious.
 */
const props = withDefaults(defineProps<{
  src?: string
  alt?: string
  title: string
  sizes?: string
  priority?: boolean
}>(), {
  src: undefined,
  alt: '',
  sizes: '(max-width: 640px) 100vw, 50vw',
  priority: false
})

const srcset = (ext: 'avif' | 'webp') =>
  `${props.src}-640w.${ext} 640w, ${props.src}-1280w.${ext} 1280w`

const initials = computed(() =>
  props.title
    .replace(/[^\p{L}\p{N}\s]/gu, ' ')
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map(word => word[0]?.toUpperCase())
    .join('')
)
</script>

<template>
  <picture v-if="src" class="block overflow-hidden bg-muted">
    <source type="image/avif" :srcset="srcset('avif')" :sizes="sizes">
    <source type="image/webp" :srcset="srcset('webp')" :sizes="sizes">
    <img
      :src="`${src}-1280w.webp`"
      :alt="alt"
      width="1280"
      height="800"
      :loading="priority ? 'eager' : 'lazy'"
      :fetchpriority="priority ? 'high' : 'auto'"
      decoding="async"
      class="aspect-[16/10] w-full object-cover object-top transition-transform duration-500 ease-out group-hover:scale-[1.02] motion-reduce:transition-none motion-reduce:group-hover:scale-100"
    >
  </picture>
  <div
    v-else
    role="img"
    :aria-label="`${title} — screenshot coming soon`"
    class="relative grid aspect-[16/10] w-full place-items-center overflow-hidden bg-muted bg-[radial-gradient(var(--ui-border)_1px,transparent_1px)] bg-size-[18px_18px]"
  >
    <span aria-hidden="true" class="grid size-16 place-items-center rounded-2xl bg-elevated font-mono text-xl font-bold text-primary ring ring-default">
      {{ initials }}
    </span>
  </div>
</template>
