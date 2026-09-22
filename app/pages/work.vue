<script setup lang="ts">
const roles = [
  {
    id: 'timeline-harper-devrel',
    current: true,
    role: 'Head of Developer Relations',
    company: 'Harper',
    date: 'Nov 2025 – Sep 2026',
    points: [
      'Architected and deployed an autonomous 5-agent LLM pipeline for DevRel content generation, cutting delivery time and turnaround by 60%+.',
      'Led developer education, community strategy, and technical onboarding demos for enterprise partners across the Harper ecosystem.',
      'Hosted the Harper SELECT * podcast — deep-dives with ecosystem leaders on distributed systems, DBMS architecture, and open-source tooling.'
    ],
    tags: ['LLM orchestration', 'DevRel', 'distributed systems']
  },
  {
    id: 'timeline-harper-dx',
    current: false,
    role: 'Developer Experience Engineer',
    company: 'Harper',
    date: 'Oct 2024 – Nov 2025',
    points: [
      'Built a new distributed DBMS UI and orchestration layer from the ground up with React and TanStack libraries.',
      'Designed and shipped the Harper Server Log Viewer within one week — 300%+ increase in forward deployment engineers independently debugging customer issues.',
      'Maintained and optimized legacy database management interfaces during the platform transition.'
    ],
    tags: ['React', 'TanStack', 'DBMS UI']
  },
  {
    id: 'timeline-spring',
    current: false,
    role: 'Senior Software Engineer',
    company: 'Spring Health',
    date: 'Mar 2023 – Oct 2024',
    points: [
      'Core contributor to an enterprise monorepo upgrade from Node 14 to 21 (240+ deps); led the JS → TypeScript migration.',
      'Engineered the late-cancellation workflow and UI — ~34% fewer care-support tickets, ~25% lower ops expense per appointment.',
      'Co-built the insurance integration interface, materially reducing member intake failures and insurance-related support inquiries.',
      'Founded the bi-weekly Front-End Learning Group — 30+ engineers per session on framework architecture, state management, and performance.'
    ],
    tags: ['TypeScript', 'monorepo', 'mentorship']
  },
  {
    id: 'timeline-microsoft',
    current: false,
    role: 'Software Engineer II',
    company: 'Microsoft',
    date: 'Aug 2020 – Feb 2023',
    points: [
      'Pivoted Microsoft Certifications off Credly by building a W3C-compliant Verifiable Credential Service + credential-issuing UI.',
      'Co-engineered a high-volume parsing and migration engine for Channel 9 — 95%+ of video archives (back to the early 2000s) migrated into Microsoft Learn.',
      'Owned the Fastify 2.x → 3.x upgrade and type-system refactor powering the core rendering engine for docs.microsoft.com.',
      'Migrated docs.microsoft.com telemetry to a modular frontend analytics layer with parallel execution and vendor decoupling.'
    ],
    tags: ['Fastify', 'Node.js', 'telemetry']
  },
  {
    id: 'timeline-allstate',
    current: false,
    role: 'Senior User Interface Engineer',
    company: 'Allstate',
    date: 'May 2018 – Aug 2020',
    points: [
      'Co-led performance re-architecture of the MileWise app — 300% improvement in load times via optimized client-side data flows.',
      'Led the Angular 2.0 MVP redesign; consolidated shared components into Allstate\'s unified Angular Pattern Library.',
      'Built reusable UI components and docs for the enterprise React Pattern Library.',
      'Awarded the org-wide "Be The Leader Award" twice (Mar + Apr 2019) for cross-team technical leadership.'
    ],
    tags: ['Angular', 'React', 'performance']
  },
  {
    id: 'timeline-early',
    current: false,
    role: 'Front-End & Software Roles',
    company: 'Early career · contract + full-time',
    date: '2016 – 2018',
    points: [
      'Shipped production client apps, responsive UIs, and SPA architectures across IntelliCentrics, Ambit Energy, Cambium Learning Group, Wavcatcher, Pixels and Profit, and Speetra.'
    ],
    tags: ['SPAs', 'responsive UI', 'client work']
  }
]

useSeoMeta({
  title: 'Work History - Austin Akers',
  description: 'Career timeline: over a decade of building production web applications from startups to large enterprises.'
})
</script>

<template>
  <UPageSection
    headline="Career timeline"
    title="Over a decade of building production web applications from startups to large enterprises."
    description="Full history from my resume — most recent first. Each stop shaped how I build for UX, performance, accessibility, and documentation."
  >
    <template #body>
      <div class="relative mx-auto mt-2 max-w-[980px]">
        <span aria-hidden="true" class="absolute top-2.5 bottom-2.5 left-3.5 w-0.5 rounded-full bg-border md:left-1/2 md:-translate-x-1/2" />
        <div class="grid">
          <article
            v-for="(item, index) in roles"
            :key="item.id"
            class="relative grid grid-cols-[28px_1fr] items-start gap-4 py-4 first:pt-0 last:pb-0 md:grid-cols-[1fr_72px_1fr] md:gap-0 md:py-[22px]"
          >
            <span
              aria-hidden="true"
              :class="item.current
                ? 'border-primary shadow-[0_0_0_6px_var(--ui-primary)]/10'
                : 'border-default'"
              class="z-10 mt-1 grid size-7 place-items-center rounded-full border-2 bg-elevated col-start-1 row-start-1 md:col-start-2 md:row-start-1 md:mt-2 md:size-[30px] md:justify-self-center"
            >
              <span :class="item.current ? 'bg-primary' : 'bg-border'" class="size-2 rounded-full md:size-[9px]" />
            </span>
            <Reveal
              :class="index % 2 === 0
                ? 'md:col-start-1 md:row-start-1 md:after:-right-[26px]'
                : 'md:col-start-3 md:row-start-1 md:after:-left-[26px]'"
              class="relative col-start-2 row-start-1 min-w-0 after:hidden md:after:block after:absolute after:top-[22px] after:h-0.5 after:w-[26px] after:bg-border"
            >
              <UCard
                variant="outline"
                class="transition-[border-color,transform] duration-150 ease-out hover:-translate-y-0.5 hover:ring-inverted"
              >
                <div class="flex flex-wrap items-baseline justify-between gap-x-3 gap-y-1">
                  <div>
                    <h2 class="font-display text-lg font-bold text-highlighted">
                      {{ item.role }}
                    </h2>
                    <p class="mt-0.5 text-[15px] font-semibold text-highlighted">
                      {{ item.company }}
                    </p>
                  </div>
                  <p class="font-mono text-xs whitespace-nowrap text-muted tabular-nums">
                    {{ item.date }}
                  </p>
                </div>
                <ul class="mt-3 grid gap-1.5 pl-[18px] text-[15px]/relaxed text-muted marker:text-primary">
                  <li v-for="point in item.points" :key="point" class="list-disc">
                    {{ point }}
                  </li>
                </ul>
                <div class="mt-3 flex flex-wrap gap-2">
                  <TagBadge v-for="tag in item.tags" :key="tag" :label="tag" />
                </div>
              </UCard>
            </Reveal>
          </article>
        </div>
      </div>
    </template>
    <template #footer>
      <Reveal>
        <div class="flex flex-wrap items-center gap-3">
          <UButton label="Download full resume (PDF)" to="/Austin_Akers_2026_Updated.pdf" download color="neutral" variant="outline" />
        </div>
      </Reveal>
    </template>
  </UPageSection>
</template>
