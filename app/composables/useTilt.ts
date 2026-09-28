/**
 * useTilt — pointer-tracked 3D tilt for the hero portrait.
 * Max ~6deg rotation with perspective; shadow shifts via --tilt-x/--tilt-y.
 * Disabled on touch devices, reduced-motion, or SSR.
 */
export function useTilt(maxDegrees = 6) {
  const reduced = useReducedMotion()
  const finePointer = ref(false)
  const active = ref(false)
  const style = ref<Record<string, string>>({})

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
    // Normalized -0.5..0.5 position within the element
    const px = (event.clientX - rect.left) / rect.width - 0.5
    const py = (event.clientY - rect.top) / rect.height - 0.5
    active.value = true
    style.value = {
      transform: `perspective(1000px) rotateX(${(-py * maxDegrees * 2).toFixed(2)}deg) rotateY(${(px * maxDegrees * 2).toFixed(2)}deg)`,
      '--tilt-x': `${(px * 100).toFixed(1)}%`,
      '--tilt-y': `${(py * 100).toFixed(1)}%`,
    }
  }

  function onLeave() {
    active.value = false
    style.value = {}
  }

  return { active: readonly(active), style: readonly(style), onMove, onLeave }
}
