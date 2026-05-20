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

function HarperCmsSection() {
  const [activeTab, setActiveTab] = useState(0);
  const tab = CMS_TABS[activeTab]!;

  return (
    <section className="max-w-[1100px] mx-auto px-8 pt-24">
      <div className="font-mono text-[13px] tracking-[0.14em] uppercase text-accent mb-4">
        <span className="text-fg-4">// </span>HOW IT'S BUILT
      </div>
      <div className="grid grid-cols-[1fr_1.5fr] gap-14 items-start">
        <div>
          <h2 className="font-sans font-bold text-[34px] text-white leading-[1.15] tracking-[-0.02em] m-0 mb-4">
            Harper as a CMS.
          </h2>
          <p className="font-sans text-[16px] text-fg-2 leading-[1.65] m-0 mb-5">
            {tab.desc}
          </p>
          <div className="flex flex-col gap-[10px] mt-6">
            {['One schema file', 'REST API auto-generated', 'Built-in cache layer', 'Markdown sync on deploy'].map((item, i) => (
              <div key={i} className="flex items-center gap-[10px]">
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
              className="font-sans text-sm text-accent no-underline inline-flex items-center gap-[6px]"
            >
              Harper Docs
              <img src="/green-arrow.png" className="h-3" alt="" />
            </a>
          </div>
        </div>

        <div>
          <div className="flex gap-1">
            {CMS_TABS.map((t, i) => (
              <button
                key={i}
                onClick={() => setActiveTab(i)}
                className={`font-mono text-[12px] rounded-t-[6px] px-4 py-2 cursor-pointer transition-colors duration-[120ms] relative ${
                  i === activeTab
                    ? 'text-accent bg-[#0d1117] border border-white/[0.08] z-[1] -mb-px'
                    : 'text-fg-3 bg-transparent border border-transparent'
                }`}
                style={i === activeTab ? { borderBottomColor: '#0d1117' } : undefined}
              >
                {t.label}
              </button>
            ))}
          </div>
          <pre className="bg-[#0d1117] border border-white/[0.08] rounded-[0_8px_8px_8px] p-6 m-0 font-mono text-[13px] leading-[1.65] text-fg-1 overflow-auto min-h-[280px]">
            <code className="bg-transparent border-0 p-0">
              {tab.code.split('\n').map((line, i) => {
                const isComment = line.trim().startsWith('#') || line.trim().startsWith('//');
                return (
                  <div key={i} className={isComment ? 'text-fg-3' : ''}>
                    {line || ' '}
                  </div>
                );
              })}
            </code>
          </pre>
        </div>
      </div>
    </section>
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
      <section className="max-w-[1100px] mx-auto px-8 pt-[120px] pb-[80px] relative">
        <div className="absolute top-20 -left-20 w-[500px] h-[400px] bg-[radial-gradient(ellipse_at_center,#2dd4a014_0%,transparent_70%)] pointer-events-none" />
        <div className="relative">
          <div className="font-mono text-[13px] tracking-[0.14em] uppercase text-accent mb-7">
            <span className="text-fg-4">// </span>SOFTWARE ENGINEER
          </div>
          <h1 className="font-sans font-bold text-[clamp(52px,7vw,88px)] leading-none tracking-[-0.025em] text-white m-0 mb-7">
            Austin<br />Akers
          </h1>
          <p className="font-sans text-[18px] leading-[1.65] text-fg-2 max-w-[500px] m-0 mb-9">
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
          <div className="flex gap-3 items-center">
            <button
              onClick={() => navigate({ to: '/blog' })}
              className="font-sans font-medium text-sm bg-accent text-on-accent border-none rounded-lg py-3 px-[22px] cursor-pointer inline-flex items-center gap-2 transition-[background] duration-[120ms] hover:bg-accent-hover"
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
              className="font-sans font-normal text-sm text-fg-2 no-underline inline-flex items-center gap-2 py-3 px-1 transition-colors duration-[120ms] hover:text-white"
            >
              <img src="/github-white.png" className="h-4 opacity-60" alt="" />
              BboyAkers
            </a>
          </div>
        </div>
      </section>

      {/* Recent Writing */}
      <section className="max-w-[1100px] mx-auto px-8">
        <div className="flex items-baseline justify-between mb-8">
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
        <div className="grid grid-cols-3 gap-5">
          {recent.map(post => (
            <PostCard key={post.id} post={post} layout="grid" />
          ))}
        </div>
      </section>

      <HarperCmsSection />
      <div className="h-[120px]" />
    </main>
  );
}
