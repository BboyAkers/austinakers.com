/**
 * useSpotlight — pointer-tracked radial highlight for cards.
 * Sets --mx/--my custom props on the target element; CSS renders the glow.
 * No-ops on touch devices, reduced-motion, or SSR.
 */
export function useSpotlight() {
  const reduced = useReducedMotion()
  const finePointer = ref(false)

  onMounted(() => {
    finePointer.value = window.matchMedia('(pointer: fine)').matches
  })

  function isEnabled() {
    return import.meta.client && finePointer.value && !reduced.value
  }

  function onMove(event: PointerEvent) {
    if (!isEnabled()) return
    const el = event.currentTarget as HTMLElement | null
    if (!el) return
    const rect = el.getBoundingClientRect()
    el.style.setProperty('--mx', `${event.clientX - rect.left}px`)
    el.style.setProperty('--my', `${event.clientY - rect.top}px`)
  }

  function onLeave(event: PointerEvent) {
    const el = event.currentTarget as HTMLElement | null
    if (!el) return
    el.style.removeProperty('--mx')
    el.style.removeProperty('--my')
  }

  return { onMove, onLeave }
}
