<script setup lang="ts">
import type { NavigationMenuItem } from '@nuxt/ui'

const navItems = computed<NavigationMenuItem[]>(() => [
  { label: 'Home', to: '/' },
  { label: 'Work', to: '/work' },
  { label: 'Blog', to: '/blog' }
])

const year = new Date().getFullYear()
</script>

<template>
  <UApp>
    <a
      href="#content"
      class="sr-only focus:not-sr-only focus:absolute focus:top-2 focus:left-2 focus:z-50 focus:rounded-[10px] focus:bg-elevated focus:ring focus:ring-default focus:px-4 focus:py-2.5 focus:text-sm focus:font-semibold focus:text-highlighted"
    >
      Skip to content
    </a>

    <UHeader>
      <template #title>
        <ULink to="/" class="flex items-center gap-2.5" aria-label="austinakers.com home">
          <span class="grid size-7 place-items-center rounded-[9px] bg-inverted font-mono text-sm font-bold text-inverted">A</span>
          <span class="font-display text-[19px] font-bold tracking-[-0.02em] text-highlighted">austinakers.com</span>
        </ULink>
      </template>

      <UNavigationMenu :items="navItems" />

      <template #right>
        <UColorModeButton variant="outline" color="neutral" />
      </template>

      <template #body>
        <UNavigationMenu :items="navItems" orientation="vertical" class="-mx-2.5" />
      </template>
    </UHeader>

    <UMain id="content">
      <NuxtPage />
    </UMain>

    <UFooter>
      <template #left>
        <p class="text-sm text-muted">
          © Austin Akers · {{ year }}
        </p>
      </template>

      <template #right>
        <p class="font-mono text-[13px] text-muted">
          Nuxt 4 · Tailwind v4 · me@austinakers.com
        </p>
      </template>
    </UFooter>
  </UApp>
</template>
