<script setup lang="ts">
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

const revealed = ref(false)
const el = useTemplateRef<HTMLElement>('el')

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
    :class="revealed ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-[18px]'"
    class="transition-[opacity,transform] duration-600 ease-out motion-reduce:opacity-100 motion-reduce:translate-y-0 motion-reduce:transition-none"
  >
    <slot />
  </div>
</template>
