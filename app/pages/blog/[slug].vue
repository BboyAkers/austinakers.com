<script setup lang="ts">
const route = useRoute()
const slug = computed(() => {
  const param = route.params.slug
  return Array.isArray(param) ? param.join('/') : String(param)
})
const postPath = computed(() => `/blog/${slug.value}`)

const { data: post } = await useAsyncData(`blog-${postPath.value}`, () => {
  return queryCollection('blog').path(postPath.value).first()
})

if (!post.value) {
  throw createError({ statusCode: 404, statusMessage: 'Post not found', fatal: true })
}

const { data: surround } = await useAsyncData(`blog-${postPath.value}-surround`, () => {
  return queryCollectionItemSurroundings('blog', postPath.value, { fields: ['title', 'description'] })
})

const { data: allPosts } = await useAsyncData('blog-related', () => {
  return queryCollection('blog')
    .select('title', 'date', 'tags', 'path')
    .order('date', 'DESC')
    .all()
})

const tags = computed(() => ((post.value?.tags ?? []) as string[]))

const related = computed(() => {
  const current = new Set(tags.value)
  return (allPosts.value ?? [])
    .filter(p => p.path !== postPath.value)
    .map(p => ({
      post: p,
      score: ((p.tags ?? []) as string[]).filter(t => current.has(t)).length
    }))
    .sort((a, b) => b.score - a.score)
    .slice(0, 3)
})

const breadcrumbs = computed(() => [
  { label: 'All writing', to: '/blog' },
  { label: tags.value[0] ?? 'post', to: `/blog?tag=${tags.value[0] ?? ''}` }
])

const progress = ref(0)
let progressRaf = 0

function updateProgress() {
  cancelAnimationFrame(progressRaf)
  progressRaf = requestAnimationFrame(() => {
    const el = document.documentElement
    const max = el.scrollHeight - el.clientHeight
    progress.value = max > 0 ? Math.round((el.scrollTop / max) * 100) : 0
  })
}

onMounted(() => {
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches)
    return
  updateProgress()
  window.addEventListener('scroll', updateProgress, { passive: true })
  onUnmounted(() => {
    window.removeEventListener('scroll', updateProgress)
    cancelAnimationFrame(progressRaf)
  })
})

const toast = useToast()

async function copyLink() {
  try {
    await navigator.clipboard.writeText(window.location.href)
    toast.add({ title: 'Link copied', description: 'Share it around.', color: 'success' })
  }
  catch {
    toast.add({ title: 'Copy blocked', description: 'Long-press the URL to copy it.', color: 'warning' })
  }
}

defineShortcuts({
  arrowleft: () => {
    if (surround.value?.[0]?.path)
      navigateTo(surround.value[0].path)
  },
  arrowright: () => {
    if (surround.value?.[1]?.path)
      navigateTo(surround.value[1].path)
  }
})

function formatDate(value: unknown) {
  const date = new Date(String(value))
  return date.toLocaleDateString('en-US', { month: 'short', day: '2-digit', year: 'numeric' })
}

useSeoMeta({
  title: () => `${post.value?.title} — Austin Akers`,
  description: () => post.value?.description
})

useHead({
  script: [
    {
      type: 'application/ld+json',
      innerHTML: JSON.stringify({
        '@context': 'https://schema.org',
        '@type': 'BlogPosting',
        headline: post.value?.title,
        datePublished: post.value?.date,
        author: { '@type': 'Person', name: 'Austin Akers' }
      })
    }
  ]
})
</script>

<template>
  <UProgress v-model="progress" size="xs" class="fixed inset-x-0 top-0 z-30 rounded-none motion-reduce:hidden" aria-hidden="true" />

  <UPageSection>
    <template #body>
      <div class="mx-auto max-w-[880px]">
        <Reveal>
          <UBreadcrumb :items="breadcrumbs" />
          <div class="mt-5">
            <p class="font-mono text-xs uppercase tracking-[0.08em] text-primary">
              {{ tags.join(' · ') }}
            </p>
            <h1 class="mt-2 font-display text-[clamp(34px,5vw,56px)] font-bold leading-[1.06] tracking-[-0.03em] text-highlighted">
              {{ post?.title }}
            </h1>
            <p class="mt-3.5 max-w-[62ch] text-lg text-muted">
              {{ post?.description }}
            </p>
            <p class="mt-3 font-mono text-[13px] text-muted tabular-nums">
              {{ formatDate(post?.date) }} · {{ post?.minutes }} min
            </p>
            <div class="mt-3 flex flex-wrap gap-1.5" aria-label="Post tags">
              <TagBadge v-for="tag in tags" :key="tag" :label="tag" :to="`/blog?tag=${tag}`" />
            </div>
          </div>
        </Reveal>
      </div>
    </template>
  </UPageSection>

  <UPageSection>
    <template #body>
      <UContainer>
        <UPage>
          <UPageBody>
            <Reveal>
              <article aria-label="Article body" class="min-w-0 max-w-[68ch] text-lg/[1.75]">
                <ContentRenderer v-if="post" :value="post" />
              </article>
            </Reveal>
            <USeparator class="my-10" />
            <UContentSurround :surround="surround" />
          </UPageBody>
          <template #right>
            <UPageAside>
              <UCard variant="outline">
                <p class="mb-2 font-mono text-[13px] text-muted">
                  ON THIS PAGE
                </p>
                <UContentToc :links="post?.body?.toc?.links" />
                <div class="mt-4 border-t border-default pt-4">
                  <div class="flex flex-wrap gap-2">
                    <UButton label="Copy link" color="neutral" variant="outline" @click="copyLink" />
                    <UButton label="Follow for more" to="/#contact" color="neutral" variant="ghost" trailing-icon="i-lucide-arrow-right" />
                  </div>
                </div>
              </UCard>
            </UPageAside>
          </template>
        </UPage>
      </UContainer>
    </template>
  </UPageSection>

  <UPageSection>
    <template #body>
      <div class="mx-auto max-w-[880px]">
        <Reveal>
          <h2 class="font-display text-[clamp(26px,3.4vw,38px)] font-bold leading-[1.12] tracking-[-0.025em] text-highlighted">
            Keep reading
          </h2>
          <UPageGrid class="mt-5">
            <UPageCard
              v-for="item in related"
              :key="item.post.path"
              :to="item.post.path"
              :title="item.post.title"
              variant="outline"
            >
              <template #body>
                <p class="font-mono text-[13px] text-muted tabular-nums">
                  {{ formatDate(item.post.date) }}
                </p>
              </template>
              <template #footer>
                <div class="flex flex-wrap gap-1.5">
                  <TagBadge v-for="tag in ((item.post.tags ?? []) as string[])" :key="tag" :label="tag" />
                </div>
              </template>
            </UPageCard>
          </UPageGrid>
        </Reveal>
      </div>
    </template>
  </UPageSection>

  <UPageSection>
    <template #body>
      <Reveal>
        <div class="mx-auto max-w-[560px] text-center">
          <h2 class="font-display text-[clamp(26px,3.4vw,38px)] font-bold leading-[1.12] tracking-[-0.025em] text-highlighted">
            One note a week. No spam.
          </h2>
          <p class="mx-auto mt-4 text-lg text-muted">
            Join the list — weekly patterns, honest post-mortems, zero growth-hack nonsense.
          </p>
          <div class="mt-6 flex flex-wrap justify-center gap-2">
            <UButton label="Follow on X" to="#" />
            <UButton label="GitHub" to="#" color="neutral" variant="outline" />
            <UButton label="RSS" to="/blog" color="neutral" variant="ghost" icon="i-lucide-rss" />
          </div>
        </div>
      </Reveal>
    </template>
  </UPageSection>
</template>
