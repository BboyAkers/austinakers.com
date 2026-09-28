<script setup lang="ts">
const props = withDefaults(defineProps<{
  /** Stagger delay in ms. Clamped to 0–400. */
  delay?: number
  /** Entrance direction. On small screens left/right fall back to up. */
  direction?: 'up' | 'left' | 'right' | 'none'
}>(), {
  delay: 0,
  direction: 'up',
})

let sharedObserver: IntersectionObserver | undefined

function getObserver() {
  if (!sharedObserver) {
    sharedObserver = new IntersectionObserver((entries) => {
      for (const entry of entries) {
        if (entry.isIntersecting) {
          sharedObserver?.unobserve(entry.target)
          entry.target.dispatchEvent(new CustomEvent('reveal:show', { bubbles: false }))
        }
      }
    }, { threshold: 0.01, rootMargin: '0px 0px -20px 0px' })
  }
  return sharedObserver
}

// Visible during SSR / no-JS so content is never hidden without scripts.
// Flips to hidden on client mount when animation will run.
const revealed = ref(import.meta.server)
const el = useTemplateRef<HTMLElement>('el')

const clampDelay = computed(() => Math.max(0, Math.min(400, props.delay ?? 0)))

const hiddenClass = computed(() => {
  switch (props.direction) {
    case 'left':
      return 'opacity-0 translate-y-[18px] md:translate-y-0 md:-translate-x-[36px]'
    case 'right':
      return 'opacity-0 translate-y-[18px] md:translate-y-0 md:translate-x-[36px]'
    case 'none':
      return 'opacity-0'
    case 'up':
    default:
      return 'opacity-0 translate-y-[18px]'
  }
})

function show() {
  revealed.value = true
}

onMounted(() => {
  const node = el.value
  if (!node) {
    revealed.value = true
    return
  }
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches || !('IntersectionObserver' in window)) {
    revealed.value = true
    return
  }
  revealed.value = false
  node.addEventListener('reveal:show', show, { once: true })
  getObserver().observe(node)
  onUnmounted(() => {
    node.removeEventListener('reveal:show', show)
    sharedObserver?.unobserve(node)
  })
})
</script>

<template>
  <div
    ref="el"
    :data-revealed="revealed || undefined"
    :style="revealed ? undefined : { transitionDelay: `${clampDelay}ms` }"
    :class="revealed ? 'opacity-100 translate-y-0 md:translate-x-0' : hiddenClass"
    class="transition-[opacity,transform] duration-600 ease-out motion-reduce:opacity-100 motion-reduce:translate-y-0 motion-reduce:md:translate-x-0 motion-reduce:transition-none"
  >
    <slot />
  </div>
</template>
