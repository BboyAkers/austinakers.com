import { useState } from 'react';
import { useNavigate } from '@tanstack/react-router';
import { PostCard } from '../components/PostCard';
import type { BlogPost } from '../types';

interface CmsTab {
  label: string;
  desc: string;
  code: string;
}

const CMS_TABS: CmsTab[] = [
  {
    label: 'Schema',
    desc: 'One GraphQL schema file defines the BlogPost table. Harper instantly exposes a typed REST API. No controllers, no ORM, no migrations.',
    code: `# schema.graphql — the CMS schema

type BlogPost @table @export {
  id:       ID     @primaryKey
  slug:     String @indexed
  title:    String
  date:     String
  category: String
  tags:     [String]
  readTime: String
  excerpt:  String
  content:  String  # raw markdown
}

# Harper auto-exposes:
# GET  /BlogPost/
# GET  /BlogPost/?slug=my-post
# POST /BlogPost/
# PUT  /BlogPost/:id`,
  },
  {
    label: 'Seed',
    desc: 'A tiny resource syncs markdown files into the BlogPost table on startup. Write a post, push to git, the deploy seeds it automatically.',
    code: `// resources/seed.js — sync markdown files to Harper

import { tables } from 'harperdb';
import { readdir, readFile } from 'fs/promises';
import matter from 'gray-matter';

// Runs on startup, upserts all content/blog/*.md
const files = await readdir('./content/blog');

for (const file of files) {
  const raw  = await readFile(\`./content/blog/\${file}\`, 'utf8');
  const { data, content } = matter(raw);

  await tables.BlogPost.upsert({
    ...data,   // frontmatter: title, date, tags…
    content,   // raw markdown body
  });
}`,
  },
  {
    label: 'React',
    desc: "The React app fetches posts directly from Harper's REST API. Standard fetch calls. No client SDK, no GraphQL client, no adapter.",
    code: `// api/blog.js — fetch posts from Harper REST API

const BASE = import.meta.env.VITE_HARPER_URL || '';

export async function getPosts() {
  const res = await fetch(\`\${BASE}/BlogPost/\`);
  return res.json();
}

export async function getPostBySlug(slug) {
  const res = await fetch(
    \`\${BASE}/BlogPost/?slug=\${encodeURIComponent(slug)}\`
  );
  const [post] = await res.json();
  return post;
}`,
  },
  {
    label: 'Deploy',
    desc: "One command scaffolds the full stack. Another deploys to Harper Fabric's global edge network — database, API, cache, and React app in a single process.",
    code: `# Scaffold a new React + Harper app
$ npm create harper@latest my-site
$ cd my-site

# Develop locally
$ harper dev .

# Deploy to Harper Fabric (global edge)
$ harper deploy . \\
    project=austinakers-com \\
    target="https://my-site.fabric.harper.fast/" \\
    restart=rolling \\
    replicated=true

# Same API. Same schema. Just… everywhere.`,
  },
];

function SpeakingSection() {
  const [activeTab, setActiveTab] = useState(0);
  const tab = CMS_TABS[activeTab]!;

  return (
    <section className="max-w-275 mx-auto px-4 sm:px-6 lg:px-8 pt-16 sm:pt-24">
      <div className="font-mono text-[13px] tracking-[0.14em] uppercase text-accent mb-4">
        <span className="text-fg-4">// </span>Speaking
      </div>
      <div>
        <div>
          <h2 className="font-sans font-bold text-[28px] sm:text-[34px] text-white leading-[1.15] tracking-[-0.02em] m-0 mb-4">
            Global:
          </h2>

          <ul className="mb-4 list-disc list-inside">
            <li>2025 RenderATL: "Trials and Tribulations of Self-Hosting Next.js" w/ Ethan Arrowood</li>
            <li>2024 JavaScript Global Summit: "Demystifying the ECMAScript Specification"</li>
            <li>2024 TypeScript Global Summit: "Contributing to a TypeScript Monorepo Migration"</li>
            <li>2023 Vue.js Global Summit: "Building a Vuetify Component"</li>
            <li>2021 Vue.js Global Summit: "What's new in Vuetify 3"</li>
            <li>2021 OpenJS World by OpenJS Foundation: "Upgrading to Fastify 3"</li>
            <li>2021 JS World Conference by Frontend Love: "The Cost of Bad Code and Pipelines"</li>
          </ul>
          <h2 className="font-sans font-bold text-[28px] sm:text-[34px] text-white leading-[1.15] tracking-[-0.02em] m-0 mb-4">
            National:
          </h2>

          <ul className="mb-4 list-disc list-inside">
            <li>2024-current 3x YearUp: Guest Speaker on Software Development for ~200 students</li>
            <li>2022 ETHDenver: "5 Lessons Learned Contributing to an Ethereum Open Source Project"</li>
            <li>2021 Texas Computer Science Teachers Association: Panelist discussing Software Development Trends and Growth</li>
            <li>2019 BitBlockBoom: "How to Effectively Evaluate Cryptocurrencies"</li>
          </ul>

          <h2 className="font-sans font-bold text-[28px] sm:text-[34px] text-white leading-[1.15] tracking-[-0.02em] m-0 mb-4">
            Community Events:
          </h2>

          <ul className="mb-4 list-disc list-inside">
            <li>2022-2024 MS Open Source Bootcamp: Speaker and Mentor</li>
            <li>2017-2024 Dallas Software Developers: Various topics on JavaScript and Front-End Development</li>
            <li>2021 Women Who Code: Panelist for Front-End Development</li>
            <li>2018-2020 General Assembly: Invited to speak at various events</li>
            <li>2016-2020 Coding Dojo: Invited to speak at various events and mentor engineers</li>
            <li>Many Others!</li>
          </ul>

          <div className="flex flex-col gap-2.5 mt-6">
            {['One schema file', 'REST API auto-generated', 'Built-in cache layer', 'Markdown sync on deploy'].map((item, i) => (
              <div key={i} className="flex items-center gap-2.5">
                <span className="font-mono text-accent text-[12px]">✓</span>
                <span className="font-sans text-sm text-fg-2">{item}</span>
              </div>
            ))}
          </div>
          <div className="mt-7">
            <a
              href="https://docs.harperdb.io"
              target="_blank"
              rel="noopener noreferrer"
              className="font-sans text-sm text-accent no-underline inline-flex items-center gap-1.5"
            >
              Harper Docs
              <img src="/green-arrow.png" className="h-3" alt="" />
            </a>
          </div>
        </div>
        {/* 
        <div>
          <div>
            testing
          </div>
        </div> */}
      </div >
    </section >
  );
}

interface HomePageProps {
  posts: BlogPost[];
}

export function HomePage({ posts }: HomePageProps) {
  const navigate = useNavigate();
  const recent = [...posts]
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    .slice(0, 3);

  return (
    <main className="pt-16">
      {/* Hero */}
      <section className="max-w-[1100px] mx-auto px-4 sm:px-6 lg:px-8 pt-20 sm:pt-[120px] pb-14 sm:pb-[80px] relative">
        <div className="absolute top-16 -left-24 sm:top-20 sm:-left-20 w-[360px] sm:w-[500px] h-[280px] sm:h-[400px] bg-[radial-gradient(ellipse_at_center,#2dd4a014_0%,transparent_70%)] pointer-events-none" />
        <div className="relative">
          <div className="font-mono text-[12px] sm:text-[13px] tracking-[0.14em] uppercase text-accent mb-5 sm:mb-7">
            <span className="text-fg-4">// </span>SOFTWARE ENGINEER
          </div>
          <h1 className="font-sans font-bold text-[clamp(42px,15vw,88px)] leading-[0.95] tracking-[-0.025em] text-white m-0 mb-5 sm:mb-7">
            Austin<br />Akers
          </h1>
          <p className="font-sans text-[16px] sm:text-[18px] leading-[1.65] text-fg-2 max-w-[500px] m-0 mb-7 sm:mb-9">
            Building developer tools at{' '}
            <a
              href="https://harper.fast"
              target="_blank"
              rel="noopener noreferrer"
              className="text-accent no-underline border-b border-accent/30"
            >
              Harper
            </a>
            . Writing about JavaScript, the web platform, and open source.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 sm:items-center">
            <button
              onClick={() => navigate({ to: '/blog' })}
              className="font-sans font-medium text-sm bg-accent text-on-accent border-none rounded-lg py-3 px-[22px] cursor-pointer inline-flex items-center justify-center gap-2 transition-[background] duration-[120ms] hover:bg-accent-hover"
            >
              Read Writing
              <img
                src="/green-arrow.png"
                className="h-3 [filter:invert(1)_brightness(0)]"
                alt=""
              />
            </button>
            <a
              href="https://github.com/BboyAkers"
              target="_blank"
              rel="noopener noreferrer"
              className="font-sans font-normal text-sm text-fg-2 no-underline inline-flex items-center gap-2 py-2 sm:py-3 px-1 transition-colors duration-[120ms] hover:text-white"
            >
              <img src="/github-white.png" className="h-4 opacity-60" alt="" />
              BboyAkers
            </a>
          </div>
        </div>
      </section>

      {/* Recent Writing */}
      <section className="max-w-[1100px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-baseline justify-between gap-4 mb-6 sm:mb-8">
          <div className="font-mono text-[13px] tracking-[0.14em] uppercase text-accent">
            <span className="text-fg-4">// </span>RECENT WRITING
          </div>
          <button
            onClick={() => navigate({ to: '/blog' })}
            className="font-sans text-[13px] text-fg-3 bg-transparent border-none cursor-pointer p-0 transition-colors duration-[120ms] hover:text-accent"
          >
            All posts →
          </button>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
          {recent.map(post => (
            <PostCard key={post.id} post={post} layout="grid" />
          ))}
        </div>
      </section>

      <SpeakingSection />
      <div className="h-16 sm:h-[120px]" />
    </main>
  );
}
