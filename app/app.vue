<script setup lang="ts">
const year = new Date().getFullYear()
</script>

<template>
  <div class="isolate">
    <a
      href="#content"
      class="sr-only focus:not-sr-only focus:absolute focus:top-2 focus:left-2 focus:z-50 focus:rounded-[10px] focus:bg-elevated focus:ring focus:ring-default focus:px-4 focus:py-2.5 focus:text-sm focus:font-semibold focus:text-highlighted"
    >
      Skip to content
    </a>

    <AppHeader />

    <main id="content" class="min-h-[calc(100vh-var(--ui-header-height))]">
      <NuxtPage />
    </main>

    <footer>
      <div class="w-full max-w-(--ui-container) mx-auto px-5 lg:px-8 py-8 lg:py-4 lg:flex lg:items-center lg:justify-between lg:gap-x-3">
        <div class="lg:flex-1 flex items-center justify-center lg:justify-end gap-x-1.5 lg:order-3">
          <p class="font-mono text-[13px] text-muted">
            Nuxt 4 · Tailwind v4 · me@austinakers.com
          </p>
        </div>
        <div class="flex items-center justify-center lg:justify-start lg:flex-1 gap-x-1.5 mt-3 lg:mt-0 lg:order-1">
          <p class="text-sm text-muted">
            © Austin Akers · {{ year }}
          </p>
        </div>
      </div>
    </footer>
  </div>
</template>
