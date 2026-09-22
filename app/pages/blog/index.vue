<script setup lang="ts">
const route = useRoute()
const router = useRouter()

const tagFilter = computed(() => {
  const tag = route.query.tag
  return typeof tag === 'string' ? tag : 'all'
})

function setTagFilter(tag: string) {
  router.replace({ query: { ...route.query, ...(tag === 'all' ? { tag: undefined } : { tag }) } })
}

const search = ref(typeof route.query.q === 'string' ? route.query.q : '')
let searchTimer: ReturnType<typeof setTimeout> | undefined

watch(search, (value) => {
  clearTimeout(searchTimer)
  searchTimer = setTimeout(() => {
    router.replace({ query: { ...route.query, ...(value ? { q: value } : { q: undefined }) } })
  }, 200)
})

function clearFilters() {
  search.value = ''
  router.replace({ query: {} })
}

const { data: posts } = await useAsyncData('blog-posts', () => {
  return queryCollection('blog').order('date', 'DESC').all()
})

const allTags = computed(() => {
  const counts = new Map<string, number>()
  for (const post of posts.value ?? []) {
    for (const tag of (post.tags ?? []) as string[]) {
      counts.set(tag, (counts.get(tag) ?? 0) + 1)
    }
  }
  return [...counts.entries()].sort((a, b) => b[1] - a[1]).map(([tag]) => tag)
})

const filteredPosts = computed(() => {
  const tag = tagFilter.value
  const q = search.value.trim().toLowerCase()
  return (posts.value ?? []).filter((post) => {
    const tags = (post.tags ?? []) as string[]
    const matchesTag = tag === 'all' || tags.includes(tag)
    const matchesQuery = !q
      || post.title.toLowerCase().includes(q)
      || (post.description ?? '').toLowerCase().includes(q)
      || tags.join(' ').toLowerCase().includes(q)
    return matchesTag && matchesQuery
  })
})

const selectedPath = computed(() => {
  const post = route.query.post
  if (typeof post === 'string' && (posts.value ?? []).some(p => p.path === post))
    return post
  return filteredPosts.value[0]?.path ?? posts.value?.[0]?.path
})

const selectedPost = computed(() => (posts.value ?? []).find(p => p.path === selectedPath.value))

function selectPost(path: string) {
  router.replace({ query: { ...route.query, post: path } })
}

function formatDate(value: unknown) {
  const date = new Date(String(value))
  return date.toLocaleDateString('en-US', { month: 'short', day: '2-digit', year: 'numeric' })
}

useSeoMeta({
  title: 'Blog — Austin Akers',
  description: 'Technical notes on Vue, Nuxt, performance, and accessibility. Filter by tag, read in-page.'
})
</script>

<template>
  <UPageSection
    headline="Blog · notes for startup engineers"
    title="Short posts, usable patterns."
    description="One technical note per week — Vue and Nuxt patterns, performance budgets, accessibility fixes. Filter by tag or search, then read right here."
  >
    <template #body>
      <Reveal>
        <div class="grid grid-cols-1 items-center gap-3 lg:grid-cols-[1fr_280px]">
          <div class="flex flex-wrap gap-2" role="group" aria-label="Filter posts by tag">
            <UButton
              label="All"
              size="sm"
              color="neutral"
              :variant="tagFilter === 'all' ? 'solid' : 'outline'"
              :aria-pressed="tagFilter === 'all'"
              class="rounded-full font-mono text-xs font-normal"
              @click="setTagFilter('all')"
            />
            <UButton
              v-for="tag in allTags"
              :key="tag"
              :label="tag"
              size="sm"
              color="neutral"
              :variant="tagFilter === tag ? 'solid' : 'outline'"
              :aria-pressed="tagFilter === tag"
              class="rounded-full font-mono text-xs font-normal"
              @click="setTagFilter(tag)"
            />
          </div>
          <div>
            <label for="blog-search" class="sr-only">Search posts</label>
            <UInput
              id="blog-search"
              v-model="search"
              type="search"
              icon="i-lucide-search"
              placeholder="Search posts…"
              size="lg"
            />
          </div>
        </div>
        <p class="mt-6 font-mono text-[13px] text-muted" role="status">
          Showing {{ filteredPosts.length }} of {{ posts?.length ?? 0 }} posts
        </p>
      </Reveal>
    </template>
  </UPageSection>

  <USeparator />

  <UPageSection>
    <template #body>
      <h2 class="font-display text-[22px] font-bold tracking-[-0.025em] text-highlighted">
        All posts
      </h2>
      <div class="mt-3">
        <PostRow
          v-for="post in filteredPosts"
          :key="post.path"
          :date="formatDate(post.date)"
          :title="post.title"
          :description="post.description"
          :tags="(post.tags as string[])"
          :minutes="post.minutes"
          :to="post.path"
          @click="selectPost(post.path)"
        />
        <UEmpty
          v-if="filteredPosts.length === 0"
          title="No posts match these filters"
          description="Try a different search or tag."
          :actions="[{ label: 'Clear filters', color: 'neutral', variant: 'outline', onClick: clearFilters }]"
        />
      </div>
    </template>
  </UPageSection>

  <USeparator />

  <UPageSection v-if="selectedPost">
    <template #body>
      <div class="grid grid-cols-1 items-start gap-12 lg:grid-cols-[1fr_240px]">
        <Reveal>
          <article aria-live="polite">
            <p class="font-mono text-xs uppercase tracking-[0.08em] text-primary">
              {{ ((selectedPost.tags ?? []) as string[]).join(' · ') }}
            </p>
            <h2 class="mt-2 font-display text-[clamp(26px,3.4vw,38px)] font-bold leading-[1.12] tracking-[-0.025em] text-highlighted">
              {{ selectedPost.title }}
            </h2>
            <p class="mt-2 font-mono text-[13px] text-muted tabular-nums">
              {{ formatDate(selectedPost.date) }} · {{ selectedPost.minutes }} min read
            </p>
            <p class="mt-4 text-[17px]/[1.7] text-highlighted">
              {{ selectedPost.description }}
            </p>
            <ContentRenderer :value="selectedPost" class="mt-4 text-[17px]/[1.7] [&_h2]:mt-8 [&_h2]:text-[22px] [&_img]:my-4 [&_img]:rounded-xl [&_pre]:my-4" />
          </article>
        </Reveal>
        <UPageAside>
          <UCard variant="outline">
            <p class="mb-2 font-mono text-[13px] text-muted">
              ON THIS PAGE
            </p>
            <UContentToc :links="selectedPost.body?.toc?.links" />
            <div class="mt-4 border-t border-default pt-4">
              <div class="flex flex-wrap gap-2">
                <UButton label="Open full page" :to="selectedPost.path" color="neutral" variant="outline" trailing-icon="i-lucide-arrow-right" />
                <UButton label="Share on X" to="#" color="neutral" variant="outline" />
                <UButton label="Follow for more" to="/#contact" color="neutral" variant="ghost" trailing-icon="i-lucide-arrow-right" />
              </div>
            </div>
          </UCard>
        </UPageAside>
      </div>
    </template>
  </UPageSection>

  <USeparator />

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
