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

const socials = [
  { label: 'GitHub profile', icon: 'i-lucide-github', to: 'https://github.com/BboyAkers' },
  { label: 'Bluesky profile', icon: 'i-lucide-cloud', to: 'https://bsky.app/profile/austinakers.com' },
  { label: 'X profile', icon: 'i-lucide-twitter', to: 'https://x.com/tweetmonster999' },
  { label: 'LinkedIn profile', icon: 'i-lucide-linkedin', to: 'https://www.linkedin.com/in/austin-akers-b1966765' },
]

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

const copied = ref(false)
let copiedTimer: ReturnType<typeof setTimeout> | undefined

async function copyLink() {
  try {
    await navigator.clipboard.writeText(window.location.href)
    copied.value = true
    clearTimeout(copiedTimer)
    copiedTimer = setTimeout(() => {
      copied.value = false
    }, 2000)
  }
  catch {
    copied.value = false
  }
}

onUnmounted(() => clearTimeout(copiedTimer))

function scrollToTop() {
  window.scrollTo({ top: 0, behavior: 'smooth' })
}

onMounted(() => {
  if (!import.meta.client)
    return
  const onKey = (event: KeyboardEvent) => {
    const target = event.target as HTMLElement | null
    if (target && (target.tagName === 'INPUT' || target.tagName === 'TEXTAREA' || target.isContentEditable))
      return
    if (event.key === 'ArrowLeft' && surround.value?.[0]?.path)
      navigateTo(surround.value[0].path)
    else if (event.key === 'ArrowRight' && surround.value?.[1]?.path)
      navigateTo(surround.value[1].path)
  }
  window.addEventListener('keydown', onKey)
  onUnmounted(() => window.removeEventListener('keydown', onKey))
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

  <UPageSection :ui="{ container: 'pt-8 sm:pt-12 lg:pt-16 pb-4 sm:pb-6 lg:pb-8' }">
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

  <UPageSection :ui="{ container: 'py-0' }">
    <template #body>
      <UPage :ui="{ root: 'flex flex-col lg:grid lg:grid-cols-12 lg:gap-10 xl:gap-12', center: 'lg:col-span-8', right: 'lg:col-span-4 order-first lg:order-last' }">
        <UPageBody :ui="{ base: 'mt-0 space-y-12' }">
          <article aria-label="Article body" class="min-w-0 max-w-[68ch] text-lg/[1.75]">
            <ContentRenderer v-if="post" :value="post" />
          </article>
        </UPageBody>
        <template #right>
          <UPageAside :ui="{ root: 'block overflow-visible lg:overflow-y-auto py-0 lg:py-8 lg:max-h-[calc(100vh-var(--ui-header-height))] lg:sticky lg:top-(--ui-header-height)' }">
            <UContentToc
              :links="post?.body?.toc?.links"
              highlight
              :title="'On this page'"
              :ui="{
                root: 'mb-6 lg:mb-0',
                container: 'py-2 lg:py-0 border-b border-default/60 lg:border-0',
                trigger: 'text-xs font-mono uppercase tracking-[0.08em] text-muted font-semibold mb-3',
                link: 'text-[13.5px] py-1.5 transition-colors',
                linkText: 'whitespace-normal break-words line-clamp-2 leading-snug'
              }"
            >
              <template #bottom>
                <div class="pt-5 border-t border-default/60 flex flex-col gap-2">
                  <div class="flex items-center gap-2">
                    <UButton
                      :label="copied ? 'Copied!' : 'Copy link'"
                      color="neutral"
                      variant="outline"
                      size="sm"
                      :icon="copied ? 'i-lucide-check' : 'i-lucide-link'"
                      class="flex-1 justify-center text-xs font-mono"
                      role="status"
                      @click="copyLink"
                    />
                    <UButton
                      aria-label="Scroll to top"
                      color="neutral"
                      variant="outline"
                      size="sm"
                      icon="i-lucide-arrow-up"
                      class="text-xs font-mono px-2.5"
                      @click="scrollToTop"
                    />
                  </div>
                </div>
              </template>
            </UContentToc>
          </UPageAside>
        </template>
      </UPage>
    </template>
    <template #footer>
      <Reveal>
        <div class="mx-auto max-w-[560px] text-center">
          <div class="flex flex-wrap justify-center gap-2">
         <UButton
          v-for="social in socials"
          :key="social.label"
          :aria-label="social.label"
          :icon="social.icon"
          :to="social.to"
          color="neutral"
          variant="outline"
          square
          size="xl"
          class="rounded-xl"
        />
          </div>
        </div>
      </Reveal>
    </template>
  </UPageSection>
</template>
