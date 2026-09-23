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
  return queryCollection('blog')
    .select('title', 'description', 'date', 'tags', 'minutes', 'path')
    .order('date', 'DESC')
    .all()
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

function formatDate(value: unknown) {
  const date = new Date(String(value))
  return date.toLocaleDateString('en-US', { month: 'short', day: '2-digit', year: 'numeric' })
}

useSeoMeta({
  title: 'Blog — Austin Akers',
  description: 'Technical notes on web tech, performance, accessibility, and more. Filter by tag or search.'
})
</script>

<template>
  <UPageSection
    headline="Blog · notes for startup engineers"
    title="Short posts, usable patterns."
    description="One technical note per week — web tech, performance, accessibility, and more. Filter by tag or search."
  >
    <template #header>
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
</template>
