<script setup lang="ts">
const route = useRoute()
const projectPath = computed(() => `/projects/${String(route.params.slug)}`)

const { data: project } = await useAsyncData(`project-${projectPath.value}`, () => {
  return queryCollection('projects').path(projectPath.value).first()
})

// Only featured projects have case-study pages; the rest live as grid cards.
if (!project.value || !project.value.featured) {
  throw createError({ statusCode: 404, statusMessage: 'Project not found', fatal: true })
}

const { data: featured } = await useAsyncData('projects-featured-nav', () => {
  return queryCollection('projects')
    .where('featured', '=', true)
    .select('title', 'path', 'order')
    .order('order', 'ASC')
    .all()
})

const neighbors = computed(() => {
  const list = featured.value ?? []
  const index = list.findIndex(p => p.path === projectPath.value)
  return {
    prev: index > 0 ? list[index - 1] : undefined,
    next: index >= 0 && index < list.length - 1 ? list[index + 1] : undefined
  }
})

const breadcrumbs = computed(() => [
  { label: 'Projects', to: '/projects' },
  { label: project.value?.title ?? 'Case study' }
])

useSeoMeta({
  title: () => `${project.value?.title} — Case study · Austin Akers`,
  description: () => project.value?.description,
  ogTitle: () => `${project.value?.title} — Austin Akers`,
  ogDescription: () => project.value?.description,
  ogImage: () => project.value?.image ? `${project.value.image.src}-1280w.webp` : undefined
})

useHead({
  link: project.value?.image
    ? [{
        rel: 'preload',
        as: 'image',
        type: 'image/avif',
        imagesrcset: `${project.value.image.src}-640w.avif 640w, ${project.value.image.src}-1280w.avif 1280w`,
        imagesizes: '(max-width: 960px) 100vw, 960px',
        fetchpriority: 'high'
      }]
    : [],
  script: [{
    type: 'application/ld+json',
    innerHTML: JSON.stringify({
      '@context': 'https://schema.org',
      '@type': 'CreativeWork',
      name: project.value?.title,
      description: project.value?.description,
      url: project.value?.links?.live,
      author: { '@type': 'Person', name: 'Austin Akers' }
    })
  }]
})
</script>

<template>
  <UPageSection :ui="{ container: 'pt-8 sm:pt-12 lg:pt-16 pb-6 sm:pb-8 lg:pb-10' }">
    <template #body>
      <div class="mx-auto max-w-[960px]">
        <UBreadcrumb :items="breadcrumbs" />

        <header class="mt-5">
          <p class="font-mono text-xs uppercase tracking-[0.08em] text-primary">
            Case study · {{ project?.category }}
          </p>
          <h1 class="mt-2 font-display text-[clamp(34px,5vw,56px)] font-bold leading-[1.06] tracking-[-0.03em] text-highlighted text-balance">
            {{ project?.title }}
          </h1>
          <p class="mt-3.5 max-w-[62ch] text-lg text-muted text-pretty">
            {{ project?.description }}
          </p>

          <dl class="mt-6 grid grid-cols-2 gap-x-6 gap-y-4 border-y border-default py-4 sm:grid-cols-[auto_auto_1fr]">
            <div>
              <dt class="font-mono text-xs uppercase tracking-[0.08em] text-muted">
                Role
              </dt>
              <dd class="mt-1 text-sm font-semibold text-highlighted">
                {{ project?.role }}
              </dd>
            </div>
            <div v-if="project?.year">
              <dt class="font-mono text-xs uppercase tracking-[0.08em] text-muted">
                Timeline
              </dt>
              <dd class="mt-1 text-sm font-semibold text-highlighted tabular-nums">
                {{ project.year }}
              </dd>
            </div>
            <div class="col-span-2 sm:col-span-1">
              <dt class="font-mono text-xs uppercase tracking-[0.08em] text-muted">
                Stack
              </dt>
              <dd class="mt-1.5">
                <ul class="flex flex-wrap gap-1.5">
                  <li v-for="tech in project?.stack" :key="tech">
                    <TagBadge :label="tech" />
                  </li>
                </ul>
              </dd>
            </div>
          </dl>

          <div v-if="project?.links?.live || project?.links?.code" class="mt-5 flex flex-wrap gap-2">
            <UButton
              v-if="project?.links?.live"
              :to="project.links.live"
              target="_blank"
              rel="noopener noreferrer"
              label="Visit live site"
              trailing-icon="i-lucide-arrow-up-right"
            />
            <UButton
              v-if="project?.links?.code"
              :to="project.links.code"
              target="_blank"
              rel="noopener noreferrer"
              label="View source"
              icon="i-lucide-github"
              color="neutral"
              variant="outline"
            />
          </div>
        </header>

        <div class="mt-8 overflow-hidden rounded-(--ui-radius) ring ring-default shadow-[0_24px_64px_-32px_var(--ui-text-highlighted)]/25">
          <ProjectImage
            :src="project?.image?.src"
            :alt="project?.image?.alt"
            :title="project?.title ?? ''"
            sizes="(max-width: 960px) 100vw, 960px"
            priority
          />
        </div>
      </div>
    </template>
  </UPageSection>

  <UPageSection :ui="{ container: 'py-0 sm:py-0 lg:py-0' }">
    <template #body>
      <div class="mx-auto max-w-[960px]">
        <UPage :ui="{ root: 'flex flex-col lg:grid lg:grid-cols-12 lg:gap-10', center: 'lg:col-span-8', right: 'lg:col-span-4 order-first lg:order-last' }">
          <UPageBody :ui="{ base: 'mt-0' }">
            <article aria-label="Case study" class="min-w-0 max-w-[68ch] text-lg/[1.75]">
              <ContentRenderer v-if="project" :value="project" />
            </article>
          </UPageBody>
          <template #right>
            <UPageAside :ui="{ root: 'block overflow-visible py-0 lg:py-8 lg:max-h-[calc(100vh-var(--ui-header-height))] lg:sticky lg:top-(--ui-header-height)' }">
              <UContentToc
                :links="project?.body?.toc?.links"
                highlight
                title="In this case study"
                :ui="{
                  root: 'mb-6 lg:mb-0',
                  container: 'py-2 lg:py-0 border-b border-default/60 lg:border-0',
                  trigger: 'text-xs font-mono uppercase tracking-[0.08em] text-muted font-semibold mb-3',
                  link: 'text-[13.5px] py-1.5 transition-colors'
                }"
              />
            </UPageAside>
          </template>
        </UPage>
      </div>
    </template>
  </UPageSection>

  <UPageSection :ui="{ container: 'pt-10 sm:pt-12 lg:pt-16' }">
    <template #body>
      <nav aria-label="More case studies" class="mx-auto grid max-w-[960px] grid-cols-1 gap-4 sm:grid-cols-2">
        <NuxtLink
          v-if="neighbors.prev"
          :to="neighbors.prev.path"
          class="group rounded-(--ui-radius) bg-elevated p-5 ring ring-default transition-[box-shadow,transform] duration-150 hover:-translate-y-0.5 hover:ring-inverted motion-reduce:hover:translate-y-0"
        >
          <span class="flex items-center gap-1.5 font-mono text-xs text-muted">
            <UIcon name="i-lucide-arrow-left" class="size-3.5 transition-transform group-hover:-translate-x-0.5" />
            Previous case study
          </span>
          <span class="mt-1.5 block font-display text-lg font-bold text-highlighted">{{ neighbors.prev.title }}</span>
        </NuxtLink>
        <span v-else aria-hidden="true" class="hidden sm:block" />
        <NuxtLink
          v-if="neighbors.next"
          :to="neighbors.next.path"
          class="group rounded-(--ui-radius) bg-elevated p-5 text-right ring ring-default transition-[box-shadow,transform] duration-150 hover:-translate-y-0.5 hover:ring-inverted motion-reduce:hover:translate-y-0"
        >
          <span class="flex items-center justify-end gap-1.5 font-mono text-xs text-muted">
            Next case study
            <UIcon name="i-lucide-arrow-right" class="size-3.5 transition-transform group-hover:translate-x-0.5" />
          </span>
          <span class="mt-1.5 block font-display text-lg font-bold text-highlighted">{{ neighbors.next.title }}</span>
        </NuxtLink>
      </nav>
      <div class="mt-8 text-center">
        <UButton to="/projects" label="All projects" color="neutral" variant="ghost" icon="i-lucide-layout-grid" />
      </div>
    </template>
  </UPageSection>
</template>
