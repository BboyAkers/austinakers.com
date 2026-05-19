import { useState } from 'react';
import { PostCard } from '../components/PostCard';
import type { BlogPost } from '../types';
import { accent } from '../theme';

interface BlogListPageProps {
  posts: BlogPost[];
}

export function BlogListPage({ posts }: BlogListPageProps) {
  const categories = ['All', ...Array.from(new Set(posts.map(p => p.category)))];
  const [activeCategory, setActiveCategory] = useState('All');

  const filtered = activeCategory === 'All'
    ? posts
    : posts.filter(p => p.category === activeCategory);

  return (
    <main style={{ paddingTop: 64 }}>
      <section style={{ maxWidth: 1100, margin: '0 auto', padding: '80px 32px 48px' }}>
        <div style={{ fontFamily: "'Fira Code', monospace", fontSize: 13, letterSpacing: '0.14em', textTransform: 'uppercase', color: accent, marginBottom: 20 }}>
          <span style={{ color: '#3f4752' }}>// </span>WRITING
        </div>
        <h1 style={{ fontFamily: "'Ubuntu', sans-serif", fontWeight: 700, fontSize: 52, color: '#fff', lineHeight: 1.05, letterSpacing: '-0.025em', margin: '0 0 16px' }}>
          Everything I've written.
        </h1>
        <p style={{ fontFamily: "'Ubuntu', sans-serif", fontSize: 17, color: '#6b7380', lineHeight: 1.6, margin: 0, maxWidth: 480 }}>
          JavaScript, the web platform, developer tooling, and occasionally whatever I'm thinking about.
        </p>
      </section>

      <section style={{ maxWidth: 1100, margin: '0 auto', padding: '0 32px 40px' }}>
        <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
          {categories.map(cat => {
            const isActive = cat === activeCategory;
            return (
              <button key={cat} onClick={() => setActiveCategory(cat)} style={{
                fontFamily: "'Fira Code', monospace", fontSize: 12,
                color: isActive ? accent : '#6b7380',
                background: isActive ? 'rgba(45,212,160,0.08)' : 'transparent',
                border: `1px solid ${isActive ? `${accent}50` : 'rgba(255,255,255,0.08)'}`,
                borderRadius: 999, padding: '6px 16px',
                cursor: 'pointer', transition: 'all 120ms',
              }}
              onMouseEnter={e => { if (!isActive) { e.currentTarget.style.color = '#a7b0bc'; e.currentTarget.style.borderColor = 'rgba(255,255,255,0.16)'; }}}
              onMouseLeave={e => { if (!isActive) { e.currentTarget.style.color = '#6b7380'; e.currentTarget.style.borderColor = 'rgba(255,255,255,0.08)'; }}}
              >
                {cat}
              </button>
            );
          })}
        </div>
      </section>

      <section style={{ maxWidth: 1100, margin: '0 auto', padding: '0 32px' }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          {filtered.map(post => (
            <PostCard key={post.id} post={post} layout="list" />
          ))}
        </div>
        {filtered.length === 0 && (
          <div style={{ textAlign: 'center', padding: '80px 0', fontFamily: "'Fira Code', monospace", fontSize: 13, color: '#3f4752' }}>
            // No posts in this category yet
          </div>
        )}
      </section>

      <div style={{ height: 120 }} />
    </main>
  );
}
