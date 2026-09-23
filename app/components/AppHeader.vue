<script setup lang="ts">
const open = ref(false)
const route = useRoute()
const colorMode = useColorMode()

const navItems = [
  { label: 'Home', to: '/' },
  { label: 'Work', to: '/work' },
  { label: 'Blog', to: '/blog' }
]

function isActive(to: string) {
  return to === '/' ? route.path === '/' : route.path.startsWith(to)
}

watch(() => route.fullPath, () => {
  open.value = false
})

useHead({
  bodyAttrs: computed(() => open.value ? { class: 'overflow-hidden' } : {})
})
</script>

<template>
  <header class="bg-default/75 backdrop-blur-sm border-b border-default h-(--ui-header-height) sticky top-0 z-50">
    <div class="w-full max-w-(--ui-container) mx-auto px-5 lg:px-8 flex items-center justify-between gap-3 h-full">
      <div class="lg:flex-1 flex items-center gap-1.5">
        <ULink to="/" aria-label="austinakers.com home" class="flex items-center gap-2.5">
          <span class="grid size-7 place-items-center rounded-[9px] bg-inverted font-mono text-sm font-bold text-inverted">AA</span>
          <span class="font-display text-[19px] font-bold tracking-[-0.02em] text-highlighted">austinakers.com</span>
        </ULink>
      </div>

      <nav class="hidden lg:flex" aria-label="Primary">
        <ul class="isolate min-w-0 flex items-center">
          <li v-for="item in navItems" :key="item.to" class="min-w-0 py-2">
            <ULink
              :to="item.to"
              :aria-current="isActive(item.to) ? 'page' : undefined"
              :class="isActive(item.to)
                ? 'group relative w-full flex items-center gap-1.5 font-medium text-sm px-2.5 py-1.5 text-highlighted'
                : 'group relative w-full flex items-center gap-1.5 font-medium text-sm px-2.5 py-1.5 text-muted hover:text-highlighted transition-colors'"
            >
              <span class="truncate">{{ item.label }}</span>
            </ULink>
          </li>
        </ul>
      </nav>

      <div class="flex items-center justify-end lg:flex-1 gap-1.5">
        <UButton
          :aria-label="colorMode.value === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'"
          :icon="colorMode.value === 'dark' ? 'i-lucide-sun' : 'i-lucide-moon'"
          color="neutral"
          variant="outline"
          square
          @click="colorMode.preference = colorMode.value === 'dark' ? 'light' : 'dark'"
        />
        <UButton
          :aria-label="open ? 'Close menu' : 'Open menu'"
          :aria-expanded="open"
          aria-controls="mobile-nav"
          :icon="open ? 'i-lucide-x' : 'i-lucide-menu'"
          color="neutral"
          variant="ghost"
          square
          class="-me-1.5 lg:hidden"
          @click="open = !open"
        />
      </div>
    </div>

    <div v-if="open" id="mobile-nav" class="lg:hidden fixed inset-x-0 top-(--ui-header-height) bottom-0 z-40 overflow-y-auto bg-default border-t border-default">
      <nav aria-label="Mobile" class="w-full max-w-(--ui-container) mx-auto px-5 pt-4 pb-8">
        <ul class="w-full flex flex-col gap-1">
          <li v-for="item in navItems" :key="item.to" class="py-1">
            <ULink
              :to="item.to"
              :aria-current="isActive(item.to) ? 'page' : undefined"
              :class="isActive(item.to)
                ? 'block text-2xl font-display font-bold py-3.5 px-3 tracking-[-0.02em] rounded-xl transition-colors text-highlighted'
                : 'block text-2xl font-display font-bold py-3.5 px-3 tracking-[-0.02em] rounded-xl transition-colors text-muted hover:text-highlighted'"
            >
              {{ item.label }}
            </ULink>
          </li>
        </ul>
      </nav>
    </div>
  </header>
</template>
