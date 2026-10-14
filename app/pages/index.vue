<script setup lang="ts">
const phrases = [
  "and fast.",
  "with a smile.",
  "you will love.",
  "and accessible.",
];
const phraseIndex = ref(0);

onMounted(() => {
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
  const interval = setInterval(() => {
    phraseIndex.value = (phraseIndex.value + 1) % phrases.length;
  }, 3200);
  onUnmounted(() => clearInterval(interval));
});

const route = useRoute();
const tagFilter = computed(() => {
  const tag = route.query.tag;
  return typeof tag === "string" ? tag : "all";
});

const { data: posts } = await useAsyncData("home-posts", () => {
  return queryCollection("blog")
    .select("title", "description", "date", "tags", "minutes", "path")
    .order("date", "DESC")
    .all();
});

const filteredPosts = computed(() => {
  const tag = tagFilter.value;
  const all = (posts.value ?? []).slice(0, 3);
  if (tag === "all") return all;
  return all.filter((post) => ((post.tags ?? []) as string[]).includes(tag));
});

function formatDate(value: unknown) {
  const date = new Date(String(value));
  return date.toLocaleDateString("en-US", {
    month: "short",
    day: "2-digit",
    year: "numeric",
  });
}

const socials = [
  {
    label: "GitHub profile",
    icon: "i-lucide-github",
    to: "https://github.com/BboyAkers",
  },
  {
    label: "Bluesky profile",
    icon: "i-lucide-cloud",
    to: "https://bsky.app/profile/austinakers.com",
  },
  {
    label: "X profile",
    icon: "i-lucide-twitter",
    to: "https://x.com/tweetmonster999",
  },
  {
    label: "LinkedIn profile",
    icon: "i-lucide-linkedin",
    to: "https://www.linkedin.com/in/austin-akers-b1966765",
  },
];
const { data: featuredProjects } = await useAsyncData("home-featured-projects", () => {
  return queryCollection("projects")
    .where("featured", "=", true)
    .select("title", "description", "category", "role", "stack", "year", "image", "links", "path", "order")
    .order("order", "ASC")
    .limit(4)
    .all();
});

useSeoMeta({
  title: "Austin Akers — Senior Software Engineer · Portfolio",
  description:
    "Portfolio of a software engineer with frontend and backend experience. Component-driven UI, performance, and accessibility.",
});

useHead({
  link: [
    {
      rel: "preload",
      as: "image",
      href: "/images/hero/austin-akers-768w.avif",
      imagesrcset:
        "/images/hero/austin-akers-480w.avif 480w, /images/hero/austin-akers-768w.avif 768w, /images/hero/austin-akers-1120w.avif 1120w",
      imagesizes: "(max-width: 640px) 100vw, 560px",
      fetchpriority: "high",
    },
  ],
});
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
      <span aria-hidden="true">{{ phrases[phraseIndex] }}</span
      ><span
        aria-hidden="true"
        class="ml-0.5 inline-block h-[1em] w-[3px] animate-pulse bg-highlighted align-[-0.12em] motion-reduce:hidden"
      ></span>
      <span class="sr-only">{{ phrases[phraseIndex] }}</span>
    </template>

    <template #description>
      I'm a husband, father, and engineer. I enjoy contributing to open source,
      uplifting others, playing cello, and breakdancing.
    </template>

    <template #links>
      <UButton label="See selected work" to="#work" />
      <UButton
        label="Read the blog"
        to="#blog"
        color="neutral"
        variant="ghost"
        trailing-icon="i-lucide-arrow-right"
      />
    </template>

    <template #default>
      <div>
        <UCard
          variant="outline"
          class="overflow-hidden p-0 shadow-[0_24px_64px_-32px_var(--ui-text-highlighted)]/25"
        >
          <picture>
            <source
              type="image/avif"
              srcset="
                /images/hero/austin-akers-480w.avif   480w,
                /images/hero/austin-akers-768w.avif   768w,
                /images/hero/austin-akers-1120w.avif 1120w
              "
              sizes="(max-width: 640px) 100vw, 560px"
            />
            <source
              type="image/webp"
              srcset="
                /images/hero/austin-akers-480w.webp   480w,
                /images/hero/austin-akers-768w.webp   768w,
                /images/hero/austin-akers-1120w.webp 1120w
              "
              sizes="(max-width: 640px) 100vw, 560px"
            />
            <img
              src="/images/hero/austin-akers-768w.avif"
              alt="Portrait of Austin Akers, smiling in a light patterned shirt"
              width="1120"
              height="840"
              fetchpriority="high"
              decoding="async"
              class="aspect-[4/3] w-full object-cover"
            />
          </picture>
          <template #footer>
            <p class="text-center font-mono text-[13px] text-muted">
              Austin Akers — Senior Software Engineer
            </p>
          </template>
        </UCard>
        <div class="mt-4 flex items-center justify-center gap-2">
          <UButton
            label="me@austinakers.com"
            to="mailto:me@austinakers.com"
            color="neutral"
            variant="outline"
          />
          <UButton
            label="Download resume"
            to="/Austin_Akers_2026_Updated.pdf"
            download
            color="neutral"
            variant="ghost"
            trailing-icon="i-lucide-arrow-right"
          />
        </div>
      </div>
    </template>

    <template #footer>
      <div class="flex flex-wrap items-center gap-2">
        <UButton
          as="link"
          v-for="social in socials"
          :key="social.label"
          :aria-label="social.label"
          :icon="social.icon"
          :to="social.to"
          color="neutral"
          variant="outline"
          square
          target="_blank"
          size="xl"
          class="rounded-xl"
        />
      </div>
    </template>
  </UPageHero>

  <USeparator />

  <UPageSection id="blog" headline="Blog" title="Recent posts">
    <template #links>
      <UButton
        label="View all posts"
        to="/blog"
        color="neutral"
        variant="ghost"
        trailing-icon="i-lucide-arrow-right"
      />
    </template>
    <template #body>
      <div>
        <PostRow
          v-for="post in filteredPosts"
          :key="post.path"
          :date="formatDate(post.date)"
          :title="post.title"
          :description="post.description"
          :tags="post.tags as string[]"
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
    title="Featured work"
    description="Selected case studies from production platforms, developer tooling, and open source contributions."
  >
    <template #links>
      <UButton
        label="View all projects"
        to="/projects"
        color="neutral"
        variant="ghost"
        trailing-icon="i-lucide-arrow-right"
      />
    </template>

    <template #body>
      <div class="grid grid-cols-1 gap-6 md:grid-cols-2">
        <Reveal
          v-for="project in featuredProjects"
          :key="project.path"
          class="h-full"
        >
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
          />
        </Reveal>
      </div>
    </template>
  </UPageSection>
</template>
