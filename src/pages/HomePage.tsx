import { useState } from 'react';
import { useNavigate } from '@tanstack/react-router';
import { PostCard } from '../components/PostCard';
import type { BlogPost } from '../types';
import { accent } from '../theme';

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
    <section style={{ maxWidth: 1100, margin: '0 auto', padding: '96px 32px 0' }}>
      <div style={{ fontFamily: "'Fira Code', monospace", fontSize: 13, letterSpacing: '0.14em', textTransform: 'uppercase', color: accent, marginBottom: 16 }}>
        <span style={{ color: '#3f4752' }}>// </span>HOW IT'S BUILT
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1.5fr', gap: 56, alignItems: 'start' }}>
        <div>
          <h2 style={{ fontFamily: "'Ubuntu', sans-serif", fontWeight: 700, fontSize: 34, color: '#fff', lineHeight: 1.15, letterSpacing: '-0.02em', margin: '0 0 16px' }}>
            Harper as a CMS.
          </h2>
          <p style={{ fontFamily: "'Ubuntu', sans-serif", fontSize: 16, color: '#a7b0bc', lineHeight: 1.65, margin: '0 0 20px' }}>
            {tab.desc}
          </p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10, marginTop: 24 }}>
            {['One schema file', 'REST API auto-generated', 'Built-in cache layer', 'Markdown sync on deploy'].map((item, i) => (
              <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                <span style={{ fontFamily: "'Fira Code', monospace", color: accent, fontSize: 12 }}>✓</span>
                <span style={{ fontFamily: "'Ubuntu', sans-serif", fontSize: 14, color: '#a7b0bc' }}>{item}</span>
              </div>
            ))}
          </div>
          <div style={{ marginTop: 28 }}>
            <a href="https://docs.harperdb.io" target="_blank" rel="noopener noreferrer"
               style={{ fontFamily: "'Ubuntu', sans-serif", fontSize: 14, color: accent, textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: 6 }}>
              Harper Docs
              <img src="/green-arrow.png" style={{ height: 12 }} alt="" />
            </a>
          </div>
        </div>

        <div>
          <div style={{ display: 'flex', gap: 4, marginBottom: 0 }}>
            {CMS_TABS.map((t, i) => (
              <button key={i} onClick={() => setActiveTab(i)} style={{
                fontFamily: "'Fira Code', monospace", fontSize: 12,
                color: i === activeTab ? accent : '#6b7380',
                background: i === activeTab ? '#0d1117' : 'transparent',
                border: `1px solid ${i === activeTab ? 'rgba(255,255,255,0.08)' : 'transparent'}`,
                borderBottom: i === activeTab ? '1px solid #0d1117' : '1px solid transparent',
                borderRadius: '6px 6px 0 0',
                padding: '8px 16px',
                cursor: 'pointer',
                transition: 'color 120ms',
                position: 'relative',
                zIndex: 1,
                marginBottom: i === activeTab ? -1 : 0,
              }}>{t.label}</button>
            ))}
          </div>
          <pre style={{
            background: '#0d1117',
            border: '1px solid rgba(255,255,255,0.08)',
            borderRadius: '0 8px 8px 8px',
            padding: '24px', margin: 0,
            fontFamily: "'Fira Code', monospace", fontSize: 13, lineHeight: 1.65,
            color: '#e6ebf1', overflow: 'auto', minHeight: 280,
          }}>
            <code style={{ background: 'none', border: 'none', padding: 0, fontSize: 'inherit', color: 'inherit' }}>
              {tab.code.split('\n').map((line, i) => {
                const isComment = line.trim().startsWith('#') || line.trim().startsWith('//');
                return <div key={i} style={isComment ? { color: '#6b7380' } : {}}>{line || ' '}</div>;
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
  const recent = [...posts].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()).slice(0, 3);

  return (
    <main style={{ paddingTop: 64 }}>
      {/* Hero */}
      <section style={{ maxWidth: 1100, margin: '0 auto', padding: '120px 32px 80px', position: 'relative' }}>
        <div style={{
          position: 'absolute', top: 80, left: -80,
          width: 500, height: 400,
          background: `radial-gradient(ellipse at center, ${accent}14 0%, transparent 70%)`,
          pointerEvents: 'none',
        }} />
        <div style={{ position: 'relative' }}>
          <div style={{ fontFamily: "'Fira Code', monospace", fontSize: 13, letterSpacing: '0.14em', textTransform: 'uppercase', color: accent, marginBottom: 28 }}>
            <span style={{ color: '#3f4752' }}>// </span>SOFTWARE ENGINEER
          </div>
          <h1 style={{
            fontFamily: "'Ubuntu', sans-serif", fontWeight: 700,
            fontSize: 'clamp(52px, 7vw, 88px)', lineHeight: 1.0,
            letterSpacing: '-0.025em', color: '#fff', margin: '0 0 28px',
          }}>
            Austin<br />Akers
          </h1>
          <p style={{ fontFamily: "'Ubuntu', sans-serif", fontSize: 18, lineHeight: 1.65, color: '#a7b0bc', maxWidth: 500, margin: '0 0 36px' }}>
            Building developer tools at{' '}
            <a href="https://harper.fast" target="_blank" rel="noopener noreferrer"
               style={{ color: accent, textDecoration: 'none', borderBottom: `1px solid ${accent}40` }}>
              Harper
            </a>
            . Writing about JavaScript, the web platform, and open source.
          </p>
          <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
            <button
              onClick={() => navigate({ to: '/blog' })}
              style={{
                fontFamily: "'Ubuntu', sans-serif", fontWeight: 500, fontSize: 14,
                background: accent, color: '#07231c', border: 'none', borderRadius: 8,
                padding: '12px 22px', cursor: 'pointer',
                display: 'inline-flex', alignItems: 'center', gap: 8, transition: 'background 120ms',
              }}
              onMouseEnter={e => (e.currentTarget.style.background = '#5ee7b8')}
              onMouseLeave={e => (e.currentTarget.style.background = accent)}
            >
              Read Writing
              <img src="/green-arrow.png" style={{ height: 12, filter: 'invert(1) brightness(0)' }} alt="" />
            </button>
            <a href="https://github.com/BboyAkers" target="_blank" rel="noopener noreferrer"
               style={{
                 fontFamily: "'Ubuntu', sans-serif", fontWeight: 400, fontSize: 14,
                 color: '#a7b0bc', textDecoration: 'none',
                 display: 'inline-flex', alignItems: 'center', gap: 8,
                 padding: '12px 4px', transition: 'color 120ms',
               }}
               onMouseEnter={e => (e.currentTarget.style.color = '#fff')}
               onMouseLeave={e => (e.currentTarget.style.color = '#a7b0bc')}>
              <img src="/github-white.png" style={{ height: 16, opacity: 0.6 }} alt="" />
              BboyAkers
            </a>
          </div>
        </div>
      </section>

      {/* Recent Writing */}
      <section style={{ maxWidth: 1100, margin: '0 auto', padding: '0 32px' }}>
        <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', marginBottom: 32 }}>
          <div style={{ fontFamily: "'Fira Code', monospace", fontSize: 13, letterSpacing: '0.14em', textTransform: 'uppercase', color: accent }}>
            <span style={{ color: '#3f4752' }}>// </span>RECENT WRITING
          </div>
          <button
            onClick={() => navigate({ to: '/blog' })}
            style={{ fontFamily: "'Ubuntu', sans-serif", fontSize: 13, color: '#6b7380', background: 'none', border: 'none', cursor: 'pointer', padding: 0, transition: 'color 120ms' }}
            onMouseEnter={e => (e.currentTarget.style.color = accent)}
            onMouseLeave={e => (e.currentTarget.style.color = '#6b7380')}
          >All posts →</button>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 20 }}>
          {recent.map(post => (
            <PostCard key={post.id} post={post} layout="grid" />
          ))}
        </div>
      </section>

      <HarperCmsSection />
      <div style={{ height: 120 }} />
    </main>
  );
}
