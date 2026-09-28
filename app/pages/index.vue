<script setup lang="ts">
const phrases = [
  "and fast.",
  "with a smile.",
  "you will love.",
  "and accessible.",
];
const phraseIndex = ref(0);
const reducedMotion = useReducedMotion();
const tilt = useTilt(6);
const spotlight = useSpotlight();
const mounted = ref(false);
const heroRoot = useTemplateRef<HTMLElement>("heroRoot");

onMounted(() => {
  // Trigger the one-shot hero entrance (CSS keyed off .is-mounted).
  requestAnimationFrame(() => {
    mounted.value = true;
  });
  if (reducedMotion.value) return;
  let heroVisible = true;
  const node = heroRoot.value;
  const observer =
    "IntersectionObserver" in window && node
      ? new IntersectionObserver(
          (entries) => {
            heroVisible = entries[0]?.isIntersecting ?? true;
          },
          { threshold: 0 },
        )
      : undefined;
  observer?.observe(node as Element);
  const interval = setInterval(() => {
    if (document.hidden || !heroVisible) return;
    phraseIndex.value = (phraseIndex.value + 1) % phrases.length;
  }, 3200);
  onUnmounted(() => {
    clearInterval(interval);
    observer?.disconnect();
  });
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
const builtProjects = [
  {
    title: "Evry Health",
    category: "Production Platform",
    badge: "Production",
    description: "Enterprise healthcare web platform and member portal.",
    link: "https://evryhealth.com/",
    code: null,
  },
  {
    title: "MetaMask Documentation",
    category: "Documentation",
    badge: "Contributor",
    description:
      "Developer documentation for the leading Ethereum & Web3 wallet.",
    link: "https://docs.metamask.io/",
    code: "https://github.com/MetaMask/metamask-docs",
  },
  {
    title: "Password Generator",
    category: "Security Tool",
    description:
      "Customizable client-side password generator with entropy rules.",
    link: "https://passwordgenerator.austinakers.com/",
    code: "https://github.com/BboyAkers/JavaScript_Projects/tree/master/password-generator",
  },
  {
    title: "Card Details",
    category: "Interactive UI",
    description:
      "Interactive credit card form with real-time formatting and validation.",
    link: "https://carddetails.austinakers.com/",
    code: "https://github.com/BboyAkers/JavaScript_Projects/tree/master/credit-card-details-form",
  },
  {
    title: "Github User Search",
    category: "API Web App",
    description:
      "GitHub profile search tool displaying repositories, bios, and follower stats.",
    link: "https://githubsearch.austinakers.com/",
    code: "https://github.com/BboyAkers/JavaScript_Projects/tree/master/GithubUserSearch",
  },
  {
    title: "Solar System",
    category: "Creative Animation",
    description:
      "Interactive simulation and visualization of the solar system.",
    link: "https://solarsystem.austinakers.com/",
    code: "https://github.com/BboyAkers/Solar-System",
  },
  {
    title: "Sign Up Form",
    category: "Form & Validation",
    description:
      "Accessible sign-up component with real-time client-side validation.",
    link: "https://signupform.austinakers.com/",
    code: "https://github.com/BboyAkers/JavaScript_Projects/tree/master/sign-up-form",
  },
  {
    title: "Skilled E-Learning Landing Page",
    category: "Landing Page",
    description:
      "Responsive, accessible landing page for an online learning platform.",
    link: "https://skilledpage.austinakers.com/",
    code: "https://github.com/BboyAkers/JavaScript_Projects/tree/master/skilled-elearning-landing-page",
  },
];

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
  <div
    ref="heroRoot"
    :class="mounted ? 'is-mounted' : undefined"
    class="relative overflow-clip"
  >
    <div
      aria-hidden="true"
      class="motion-aurora pointer-events-none absolute -top-32 -left-24 -z-10 h-[420px] w-[420px] rounded-full opacity-40 blur-3xl motion-reduce:hidden"
      style="
        background: radial-gradient(
          closest-side,
          color-mix(in oklch, var(--ui-primary) 26%, transparent),
          transparent
        );
      "
    />
    <div
      aria-hidden="true"
      class="motion-aurora pointer-events-none absolute -right-28 -bottom-24 -z-10 h-[380px] w-[380px] rounded-full opacity-30 blur-3xl motion-reduce:hidden"
      style="
        background: radial-gradient(
          closest-side,
          color-mix(in oklch, var(--ui-primary) 20%, transparent),
          transparent
        );
        animation-delay: -9s;
      "
    />
    <UPageHero orientation="horizontal">
      <template #headline>
        <div
          class="motion-hero-enter flex flex-col items-start gap-3.5"
          style="--hero-delay: 0ms"
        >
          <p class="font-mono text-xs uppercase tracking-[0.08em] text-primary">
            Your favorite extroverted engineer
          </p>
        </div>
      </template>

      <template #title>
        <span
          class="motion-hero-enter inline-block"
          style="--hero-delay: 80ms"
        >
          Hi, I'm Austin — I make interfaces feel friendly
          <span aria-hidden="true" class="motion-phrase-mask"
            ><Transition name="phrase-roll" mode="out-in"
              ><span :key="phraseIndex">{{
                phrases[phraseIndex]
              }}</span></Transition
            ></span
          ><span
            aria-hidden="true"
            class="ml-0.5 inline-block h-[1em] w-[3px] animate-pulse bg-highlighted align-[-0.12em] motion-reduce:hidden"
          ></span>
          <span class="sr-only">{{ phrases[phraseIndex] }}</span>
        </span>
      </template>

      <template #description>
        <span
          class="motion-hero-enter inline-block"
          style="--hero-delay: 160ms"
        >
          I'm a husband, father, and engineer. I enjoy contributing to open
          source, uplifting others, playing cello, and breakdancing.
        </span>
      </template>

      <template #links>
        <span
          class="motion-hero-enter inline-flex flex-wrap gap-x-6 gap-y-3"
          style="--hero-delay: 240ms"
        >
          <UButton label="See selected work" to="#work" class="motion-press" />
          <UButton
            label="Read the blog"
            to="#blog"
            color="neutral"
            variant="ghost"
            trailing-icon="i-lucide-arrow-right"
            class="motion-press"
          />
        </span>
      </template>

      <template #default>
        <div class="motion-hero-enter" style="--hero-delay: 320ms">
          <div
            class="motion-tilt"
            :style="tilt.style.value"
            :data-tilting="tilt.active.value || undefined"
            @pointermove="tilt.onMove"
            @pointerleave="tilt.onLeave"
          >
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
          </div>
          <div class="mt-4 flex items-center justify-center gap-2">
            <UButton
              label="me@austinakers.com"
              to="mailto:me@austinakers.com"
              color="neutral"
              variant="outline"
              class="motion-press"
            />
            <UButton
              label="Download resume"
              to="/Austin_Akers_2026_Updated.pdf"
              download
              color="neutral"
              variant="ghost"
              trailing-icon="i-lucide-arrow-right"
              class="motion-press"
            />
          </div>
        </div>
      </template>

      <template #footer>
        <div
          class="motion-hero-enter flex flex-wrap items-center gap-2"
          style="--hero-delay: 400ms"
        >
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
            class="motion-press rounded-xl"
          />
        </div>
      </template>
    </UPageHero>
  </div>

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
      <TransitionGroup name="post-list" tag="div">
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
          key="empty"
          title="No posts match this tag"
          description="Try a different tag to keep reading."
        />
      </TransitionGroup>
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
          v-for="(project, projectIndex) in builtProjects"
          :key="project.title"
          :delay="(projectIndex % 4) * 70"
          class="h-full"
        >
          <UCard
            variant="outline"
            class="motion-spotlight flex h-full flex-col justify-between transition-[border-color,transform,box-shadow] duration-150 ease-out hover:-translate-y-1 hover:ring-inverted hover:shadow-lg"
            @pointermove="spotlight.onMove"
            @pointerleave="spotlight.onLeave"
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

              <h3
                class="mt-2.5 font-display text-base font-bold text-highlighted"
              >
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
