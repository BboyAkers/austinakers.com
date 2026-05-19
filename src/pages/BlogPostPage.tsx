import { useMemo, useEffect } from 'react';
import { useNavigate } from '@tanstack/react-router';
import { marked } from 'marked';
import type { BlogPost } from '../types';
import { accent } from '../theme';

const AUTHOR = {
  name: 'Austin Akers',
  role: 'Software Engineer',
  bio: 'Building developer tools at Harper. Passionate about the web platform, open source, and making technology accessible to everyone.',
  github: 'https://github.com/BboyAkers',
  twitter: 'https://twitter.com/austinakers',
};

interface BlogPostPageProps {
  post: BlogPost;
  posts: BlogPost[];
}

export function BlogPostPage({ post, posts }: BlogPostPageProps) {
  const navigate = useNavigate();
  const htmlContent = useMemo(
    () => marked.parse(post.content || '') as string,
    [post.content],
  );

  const idx = posts.findIndex(p => p.id === post.id);
  const prevPost = posts[idx + 1] ?? null;
  const nextPost = posts[idx - 1] ?? null;

  useEffect(() => { window.scrollTo({ top: 0 }); }, [post.id]);

  const goToPost = (p: BlogPost) =>
    navigate({ to: '/blog/$slug', params: { slug: p.slug } });

  return (
    <main style={{ paddingTop: 64 }}>
      <div style={{ maxWidth: 720, margin: '0 auto', padding: '40px 32px 0' }}>
        <button
          onClick={() => navigate({ to: '/blog' })}
          style={{ fontFamily: "'Fira Code', monospace", fontSize: 12, color: '#6b7380', background: 'none', border: 'none', cursor: 'pointer', padding: 0, display: 'inline-flex', alignItems: 'center', gap: 6, transition: 'color 120ms' }}
          onMouseEnter={e => (e.currentTarget.style.color = accent)}
          onMouseLeave={e => (e.currentTarget.style.color = '#6b7380')}
        >
          ← Writing
        </button>
      </div>

      <section style={{ maxWidth: 720, margin: '0 auto', padding: '32px 32px 0' }}>
        <div style={{ fontFamily: "'Fira Code', monospace", fontSize: 12, letterSpacing: '0.1em', textTransform: 'uppercase', color: accent, marginBottom: 18 }}>
          <span style={{ color: '#3f4752' }}>// </span>{post.category}
        </div>
        <h1 style={{ fontFamily: "'Ubuntu', sans-serif", fontWeight: 700, fontSize: 'clamp(32px, 5vw, 48px)', color: '#fff', lineHeight: 1.1, letterSpacing: '-0.02em', margin: '0 0 20px' }}>
          {post.title}
        </h1>
        <div style={{ display: 'flex', alignItems: 'center', gap: 16, fontFamily: "'Fira Code', monospace", fontSize: 12, color: '#6b7380', marginBottom: 40 }}>
          <span>{post.date}</span>
          <span style={{ color: '#3f4752' }}>·</span>
          <span>{post.readTime}</span>
          <span style={{ color: '#3f4752' }}>·</span>
          <div style={{ display: 'flex', gap: 6 }}>
            {post.tags.map(tag => (
              <span key={tag} style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.06)', borderRadius: 999, padding: '2px 10px', fontSize: 11 }}>
                {tag}
              </span>
            ))}
          </div>
        </div>
        <div style={{ height: 1, background: 'rgba(255,255,255,0.06)', marginBottom: 48 }} />
      </section>

      <article style={{ maxWidth: 720, margin: '0 auto', padding: '0 32px' }}>
        <div className="md-content" dangerouslySetInnerHTML={{ __html: htmlContent }} />
      </article>

      {/* Author bio */}
      <section style={{ maxWidth: 720, margin: '48px auto 0', padding: '0 32px' }}>
        <div style={{ height: 1, background: 'rgba(255,255,255,0.06)', marginBottom: 40 }} />
        <div style={{ background: '#0b0e13', border: '1px solid rgba(255,255,255,0.06)', borderRadius: 12, padding: '24px', display: 'flex', gap: 20, alignItems: 'flex-start' }}>
          <div style={{
            width: 48, height: 48, borderRadius: '50%',
            background: `linear-gradient(135deg, ${accent}40, #6a2bf040)`,
            border: `1px solid ${accent}30`,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            flexShrink: 0, fontFamily: "'Ubuntu', sans-serif", fontWeight: 700, fontSize: 18, color: accent,
          }}>A</div>
          <div>
            <div style={{ fontFamily: "'Ubuntu', sans-serif", fontWeight: 500, fontSize: 15, color: '#fff', marginBottom: 4 }}>{AUTHOR.name}</div>
            <div style={{ fontFamily: "'Fira Code', monospace", fontSize: 11, color: accent, marginBottom: 10, letterSpacing: '0.06em' }}>
              {AUTHOR.role} @ Harper
            </div>
            <div style={{ fontFamily: "'Ubuntu', sans-serif", fontSize: 14, color: '#6b7380', lineHeight: 1.55 }}>{AUTHOR.bio}</div>
            <div style={{ display: 'flex', gap: 16, marginTop: 12 }}>
              {([['GitHub →', AUTHOR.github], ['Twitter →', AUTHOR.twitter]] as const).map(([label, href]) => (
                <a key={label} href={href} target="_blank" rel="noopener noreferrer"
                   style={{ fontFamily: "'Fira Code', monospace", fontSize: 12, color: '#6b7380', textDecoration: 'none', transition: 'color 120ms' }}
                   onMouseEnter={e => (e.currentTarget.style.color = accent)}
                   onMouseLeave={e => (e.currentTarget.style.color = '#6b7380')}>
                  {label}
                </a>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Prev/Next */}
      {(prevPost ?? nextPost) && (
        <section style={{ maxWidth: 720, margin: '48px auto 0', padding: '0 32px' }}>
          <div style={{ height: 1, background: 'rgba(255,255,255,0.06)', marginBottom: 32 }} />
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
            {prevPost ? (
              <button
                onClick={() => goToPost(prevPost)}
                style={{ background: '#0b0e13', border: '1px solid rgba(255,255,255,0.06)', borderRadius: 10, padding: '16px 20px', cursor: 'pointer', textAlign: 'left', transition: 'border-color 150ms' }}
                onMouseEnter={e => (e.currentTarget.style.borderColor = 'rgba(255,255,255,0.14)')}
                onMouseLeave={e => (e.currentTarget.style.borderColor = 'rgba(255,255,255,0.06)')}
              >
                <div style={{ fontFamily: "'Fira Code', monospace", fontSize: 11, color: '#6b7380', marginBottom: 6 }}>← Older</div>
                <div style={{ fontFamily: "'Ubuntu', sans-serif", fontSize: 14, color: '#e6ebf1', lineHeight: 1.4 }}>{prevPost.title}</div>
              </button>
            ) : <div />}
            {nextPost ? (
              <button
                onClick={() => goToPost(nextPost)}
                style={{ background: '#0b0e13', border: '1px solid rgba(255,255,255,0.06)', borderRadius: 10, padding: '16px 20px', cursor: 'pointer', textAlign: 'right', transition: 'border-color 150ms' }}
                onMouseEnter={e => (e.currentTarget.style.borderColor = 'rgba(255,255,255,0.14)')}
                onMouseLeave={e => (e.currentTarget.style.borderColor = 'rgba(255,255,255,0.06)')}
              >
                <div style={{ fontFamily: "'Fira Code', monospace", fontSize: 11, color: '#6b7380', marginBottom: 6 }}>Newer →</div>
                <div style={{ fontFamily: "'Ubuntu', sans-serif", fontSize: 14, color: '#e6ebf1', lineHeight: 1.4 }}>{nextPost.title}</div>
              </button>
            ) : <div />}
          </div>
        </section>
      )}

      <div style={{ height: 120 }} />
    </main>
  );
}
