/**
 * useReducedMotion — SSR-safe prefers-reduced-motion flag.
 * Single source of truth; replaces ad-hoc matchMedia checks across pages.
 */
export function useReducedMotion() {
  const reduced = ref(false)

  onMounted(() => {
    const query = window.matchMedia('(prefers-reduced-motion: reduce)')
    reduced.value = query.matches
    const onChange = (event: MediaQueryListEvent) => {
      reduced.value = event.matches
    }
    query.addEventListener('change', onChange)
    onUnmounted(() => query.removeEventListener('change', onChange))
  })

  return readonly(reduced)
}
