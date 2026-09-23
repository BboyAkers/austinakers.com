<script setup lang="ts">
const revealed = ref(false)
const el = useTemplateRef<HTMLElement>('el')

onMounted(() => {
  const node = el.value
  if (!node) {
    revealed.value = true
    return
  }
  if (import.meta.client && window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    revealed.value = true
    return
  }
  if (!('IntersectionObserver' in window)) {
    revealed.value = true
    return
  }
  const io = new IntersectionObserver((entries) => {
    for (const entry of entries) {
      if (entry.isIntersecting) {
        revealed.value = true
        io.disconnect()
      }
    }
  }, { threshold: 0.01, rootMargin: '0px 0px -20px 0px' })
  io.observe(node)
  onUnmounted(() => io.disconnect())
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
