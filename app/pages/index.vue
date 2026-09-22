<script setup lang="ts">
const phrases = ['and fast.', 'with a smile.', 'you will love.', 'and accessible.']
const phraseIndex = ref(0)

onMounted(() => {
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches)
    return
  setInterval(() => {
    phraseIndex.value = (phraseIndex.value + 1) % phrases.length
  }, 3200)
})

const route = useRoute()
const router = useRouter()
const tagFilter = computed(() => {
  const tag = route.query.tag
  return typeof tag === 'string' ? tag : 'all'
})

function setTagFilter(tag: string) {
  router.replace({ query: tag === 'all' ? {} : { tag } })
}

const { data: posts } = await useAsyncData('home-posts', () => {
  return queryCollection('blog').order('date', 'DESC').all()
})

const homeTags = computed(() => {
  const counts = new Map<string, number>()
  for (const post of posts.value ?? []) {
    for (const tag of (post.tags ?? []) as string[]) {
      counts.set(tag, (counts.get(tag) ?? 0) + 1)
    }
  }
  return [...counts.entries()].sort((a, b) => b[1] - a[1]).slice(0, 3).map(([tag]) => tag)
})

const filteredPosts = computed(() => {
  const tag = tagFilter.value
  const all = (posts.value ?? []).slice(0, 3)
  if (tag === 'all')
    return all
  return all.filter(post => ((post.tags ?? []) as string[]).includes(tag))
})

function formatDate(value: unknown) {
  const date = new Date(String(value))
  return date.toLocaleDateString('en-US', { month: 'short', day: '2-digit', year: 'numeric' })
}

const socials = [
  { label: 'GitHub profile', icon: 'i-lucide-github', to: 'https://github.com/BboyAkers' },
  { label: 'Bluesky profile', icon: 'i-lucide-cloud', to: 'https://bsky.app/profile/austinakers.com' },
  { label: 'X profile', icon: 'i-lucide-twitter', to: 'https://x.com/tweetmonster999' },
  { label: 'LinkedIn profile', icon: 'i-lucide-linkedin', to: 'https://www.linkedin.com/in/austin-akers-b1966765' },
]
const builtProjects = [
  {
    title: 'Evry Health',
    category: 'Production Platform',
    badge: 'Production',
    description: 'Enterprise healthcare web platform and member portal.',
    link: 'https://evryhealth.com/',
    code: null
  },
  {
    title: 'MetaMask Documentation',
    category: 'Documentation',
    badge: 'Contributor',
    description: 'Developer documentation for the leading Ethereum & Web3 wallet.',
    link: 'https://docs.metamask.io/',
    code: 'https://github.com/MetaMask/metamask-docs'
  },
  {
    title: 'Password Generator',
    category: 'Security Tool',
    description: 'Customizable client-side password generator with entropy rules.',
    link: 'https://passwordgenerator.austinakers.com/',
    code: 'https://github.com/BboyAkers/JavaScript_Projects/tree/master/password-generator'
  },
  {
    title: 'Card Details',
    category: 'Interactive UI',
    description: 'Interactive credit card form with real-time formatting and validation.',
    link: 'https://carddetails.austinakers.com/',
    code: 'https://github.com/BboyAkers/JavaScript_Projects/tree/master/credit-card-details-form'
  },
  {
    title: 'Github User Search',
    category: 'API Web App',
    description: 'GitHub profile search tool displaying repositories, bios, and follower stats.',
    link: 'https://githubsearch.austinakers.com/',
    code: 'https://github.com/BboyAkers/JavaScript_Projects/tree/master/GithubUserSearch'
  },
  {
    title: 'Solar System',
    category: 'Creative Animation',
    description: 'Interactive simulation and visualization of the solar system.',
    link: 'https://solarsystem.austinakers.com/',
    code: 'https://github.com/BboyAkers/Solar-System'
  },
  {
    title: 'Sign Up Form',
    category: 'Form & Validation',
    description: 'Accessible sign-up component with real-time client-side validation.',
    link: 'https://signupform.austinakers.com/',
    code: 'https://github.com/BboyAkers/JavaScript_Projects/tree/master/sign-up-form'
  },
  {
    title: 'Skilled E-Learning Landing Page',
    category: 'Landing Page',
    description: 'Responsive, accessible landing page for an online learning platform.',
    link: 'https://skilledpage.austinakers.com/',
    code: 'https://github.com/BboyAkers/JavaScript_Projects/tree/master/skilled-elearning-landing-page'
  }
]

useSeoMeta({
  title: 'Austin Akers — Senior Software Engineer · Portfolio',
  description: 'Portfolio of a software engineer with frontend and backend experience. Component-driven UI, performance, and accessibility.'
})
</script>

<template>
  <UPageHero orientation="horizontal">
    <template #headline>
      <div class="flex flex-col items-start gap-3.5">
        <p class="font-mono text-xs uppercase tracking-[0.08em] text-primary">
          Your favorite extroverted engineer
        </p>
      </div>
    </template>

    <template #title>
      Hi, I'm Austin — I make interfaces feel friendly
      <span aria-hidden="true">{{ phrases[phraseIndex] }}</span><span aria-hidden="true" class="ml-0.5 inline-block h-[1em] w-[3px] animate-pulse bg-highlighted align-[-0.12em] motion-reduce:hidden" ></span>
      <span class="sr-only">{{ phrases[phraseIndex] }}</span>
    </template>

    <template #description>
      I'm an husband, father, and engineer. I enjoy contributing to open source, uplifting others, playing cello, and breakdancing.
    </template>

    <template #links>
      <UButton label="See selected work" to="#work" />
      <UButton label="Read the blog" to="#blog" color="neutral" variant="ghost" trailing-icon="i-lucide-arrow-right" />
    </template>

    <template #default>
      <Reveal>
        <UCard variant="outline" class="overflow-hidden p-0 shadow-[0_24px_64px_-32px_var(--ui-text-highlighted)]/25">
          <NuxtImg
            src="/images/profile-austin-akers.jpg"
            alt="Portrait of Austin Akers, smiling in a light patterned shirt"
            width="1200"
            height="927"
            fetchpriority="high"
            densities="1x 2x"
            class="aspect-[4/3] w-full object-cover object-[center_18%]"
          />
          <template #footer>
            <p class="text-center font-mono text-[13px] text-muted">
              Austin Akers — Senior Software Engineer
            </p>
          </template>
        </UCard>
        <div class="mt-4 flex items-center justify-center gap-2">
          <UButton label="me@austinakers.com" to="mailto:me@austinakers.com" color="neutral" variant="outline" />
          <UButton label="Download resume" to="/Austin_Akers_2026_Updated.pdf" download color="neutral" variant="ghost" trailing-icon="i-lucide-arrow-right" />
        </div>
      </Reveal>
    </template>

    <template #footer>
      <div class="flex flex-wrap items-center gap-2">
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
    </template>
  </UPageHero>

  <USeparator />

  <UPageSection id="blog" headline="Blog" title="My blog posts.">
    <template #links>
      <UButton label="View all posts" to="/blog" color="neutral" variant="ghost" trailing-icon="i-lucide-arrow-right" />
    </template>
    <template #body>
      <Reveal>
        <div class="mb-3 flex flex-wrap gap-2" role="group" aria-label="Filter posts by tag">
          <UButton
            label="All"
            size="sm"
            :color="tagFilter === 'all' ? 'neutral' : 'neutral'"
            :variant="tagFilter === 'all' ? 'solid' : 'outline'"
            :aria-pressed="tagFilter === 'all'"
            class="rounded-full font-mono text-xs font-normal"
            @click="setTagFilter('all')"
          />
          <UButton
            v-for="tag in homeTags"
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
      </Reveal>
      <div>
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
          title="No posts match this tag"
          description="Try a different tag to keep reading."
        />
      </div>
    </template>
  </UPageSection>

  <USeparator />

  <UPageSection
    id="work"
    headline="Portfolio"
    title="Some Stuff I've Built:"
    description="A collection of web applications, open-source documentation contributions, frontend tools, and other various things I've built and/or contributed to."
  >
    <template #links>
      <UButton
        label="View full career timeline"
        to="/work"
        color="neutral"
        variant="ghost"
        trailing-icon="i-lucide-arrow-right"
      />
    </template>

    <template #body>
      <UPageGrid class="grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
        <Reveal
          v-for="project in builtProjects"
          :key="project.title"
          class="h-full"
        >
          <UCard
            variant="outline"
            class="flex h-full flex-col justify-between transition-[border-color,transform,box-shadow] duration-150 ease-out hover:-translate-y-1 hover:ring-inverted hover:shadow-lg"
          >
            <div>
              <div class="flex items-center justify-between gap-2">
                <span class="font-mono text-xs text-muted">
                  {{ project.category }}
                </span>
                <UBadge
                  v-if="project.badge"
                  :label="project.badge"
                  color="primary"
                  variant="soft"
                  size="sm"
                  class="rounded-full font-mono text-[11px]"
                />
              </div>

              <h3 class="mt-2.5 font-display text-base font-bold text-highlighted">
                {{ project.title }}
              </h3>

              <p class="mt-1.5 text-xs/relaxed text-muted">
                {{ project.description }}
              </p>
            </div>

            <template #footer>
              <div class="flex flex-wrap items-center gap-2">
                <UButton
                  :to="project.link"
                  target="_blank"
                  rel="noopener noreferrer"
                  label="Link"
                  size="xs"
                  color="neutral"
                  variant="outline"
                  trailing-icon="i-lucide-arrow-up-right"
                />
                <UButton
                  v-if="project.code"
                  :to="project.code"
                  target="_blank"
                  rel="noopener noreferrer"
                  label="Code"
                  size="xs"
                  color="neutral"
                  variant="ghost"
                  icon="i-lucide-github"
                />
              </div>
            </template>
          </UCard>
        </Reveal>
      </UPageGrid>
    </template>
  </UPageSection>
</template>
