<script setup lang="ts">
const route = useRoute()
const router = useRouter()

const { data: projects } = await useAsyncData('projects-all', () => {
  return queryCollection('projects')
    .select('title', 'description', 'category', 'role', 'stack', 'featured', 'order', 'year', 'image', 'links', 'path')
    .order('order', 'ASC')
    .all()
})

const featured = computed(() => (projects.value ?? []).filter(p => p.featured))
const others = computed(() => (projects.value ?? []).filter(p => !p.featured))

const categoryOrder = ['Production', 'Open Source', 'Docs', 'Tools', 'UI', 'Creative']
const categories = computed(() => {
  const present = new Set(others.value.map(p => p.category))
  return categoryOrder.filter(c => present.has(c as typeof others.value[number]['category']))
})

const categoryFilter = computed(() => {
  const value = route.query.category
  return typeof value === 'string' && categories.value.includes(value) ? value : 'all'
})

function setCategory(category: string) {
  router.replace({ query: { ...route.query, category: category === 'all' ? undefined : category } })
}

const filtered = computed(() => {
  const category = categoryFilter.value
  return category === 'all' ? others.value : others.value.filter(p => p.category === category)
})

function countFor(category: string) {
  return category === 'all' ? others.value.length : others.value.filter(p => p.category === category).length
}

useSeoMeta({
  title: 'Projects — Austin Akers',
  description: 'Selected case studies, production work, open source contributions, and side projects by Austin Akers, senior software engineer.',
  ogTitle: 'Projects — Austin Akers',
  ogDescription: 'Selected case studies, production work, open source contributions, and side projects.'
})
</script>

<template>
  <UPageSection :ui="{ container: 'pb-8 sm:pb-12 lg:pb-16' }">
    <template #body>
      <header class="max-w-3xl">
        <p class="font-mono text-xs uppercase tracking-[0.08em] text-primary">
          Portfolio
        </p>
        <h1 class="mt-3 font-display text-[clamp(36px,5vw,60px)] leading-[1.05] tracking-[-0.03em] font-bold text-highlighted text-balance">
          Things I've built, shipped, and contributed to.
        </h1>
        <p class="mt-4 max-w-[62ch] text-lg text-muted text-pretty">
          Case studies from production work, open source contributions to projects like MetaMask and Vue Router, and the small experiments that keep my craft sharp.
        </p>
      </header>

      <section aria-labelledby="featured-heading" class="mt-12 sm:mt-16">
        <div class="flex items-baseline justify-between gap-4">
          <h2 id="featured-heading" class="font-display text-[22px] font-bold tracking-[-0.025em] text-highlighted">
            Featured case studies
          </h2>
          <p class="font-mono text-[13px] text-muted tabular-nums">
            {{ String(featured.length).padStart(2, '0') }}
          </p>
        </div>

        <div class="mt-5 grid grid-cols-1 gap-6 md:grid-cols-2">
          <Reveal v-for="(project, index) in featured" :key="project.path" class="h-full">
            <ProjectFeatureCard
              :title="project.title"
              :description="project.description"
              :category="project.category"
              :role="project.role"
              :stack="project.stack"
              :year="project.year"
              :image="project.image"
              :live="project.links?.live"
              :code="project.links?.code"
              :to="project.path"
              :priority="index < 2"
            />
          </Reveal>
        </div>
      </section>
    </template>
  </UPageSection>

  <USeparator />

  <UPageSection :ui="{ container: 'pt-12 sm:pt-16 lg:pt-20' }">
    <template #body>
      <section aria-labelledby="all-heading">
        <h2 id="all-heading" class="font-display text-[22px] font-bold tracking-[-0.025em] text-highlighted">
          More work
        </h2>
        <p class="mt-1.5 max-w-[62ch] text-muted">
          Production features from my roles, merged open source pull requests, and side projects.
        </p>

        <div class="mt-5 flex flex-wrap gap-2" role="group" aria-label="Filter projects by category">
          <UButton
            label="All"
            size="sm"
            color="neutral"
            :variant="categoryFilter === 'all' ? 'solid' : 'outline'"
            :aria-pressed="categoryFilter === 'all'"
            class="rounded-full font-mono text-xs font-normal"
            @click="setCategory('all')"
          >
            <template #trailing>
              <span class="tabular-nums opacity-60">{{ countFor('all') }}</span>
            </template>
          </UButton>
          <UButton
            v-for="category in categories"
            :key="category"
            :label="category"
            size="sm"
            color="neutral"
            :variant="categoryFilter === category ? 'solid' : 'outline'"
            :aria-pressed="categoryFilter === category"
            class="rounded-full font-mono text-xs font-normal"
            @click="setCategory(category)"
          >
            <template #trailing>
              <span class="tabular-nums opacity-60">{{ countFor(category) }}</span>
            </template>
          </UButton>
        </div>

        <p class="mt-4 font-mono text-[13px] text-muted" role="status">
          Showing {{ filtered.length }} of {{ others.length }} projects
        </p>

        <ul class="mt-4 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          <li v-for="project in filtered" :key="project.path">
            <Reveal class="h-full">
              <ProjectCard
                :title="project.title"
                :description="project.description"
                :category="project.category"
                :role="project.role"
                :stack="project.stack"
                :year="project.year"
                :image="project.image"
                :live="project.links?.live"
                :code="project.links?.code"
              />
            </Reveal>
          </li>
        </ul>

        <UEmpty
          v-if="filtered.length === 0"
          title="No projects in this category"
          description="Try another category."
          :actions="[{ label: 'Show all', color: 'neutral', variant: 'outline', onClick: () => setCategory('all') }]"
        />
      </section>
    </template>
  </UPageSection>
</template>
