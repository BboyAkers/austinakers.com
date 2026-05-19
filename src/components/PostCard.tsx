import { useState } from 'react';
import { useNavigate } from '@tanstack/react-router';
import type { BlogPost } from '../types';
import { accent } from '../theme';

interface PostCardProps {
  post: BlogPost;
  layout?: 'grid' | 'list';
}

export function PostCard({ post, layout = 'grid' }: PostCardProps) {
  const [hovered, setHovered] = useState(false);
  const navigate = useNavigate();

  const goToPost = () => navigate({ to: '/blog/$slug', params: { slug: post.slug } });

  if (layout === 'list') {
    return (
      <button
        onClick={goToPost}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        style={{
          display: 'flex', alignItems: 'flex-start', gap: 32,
          background: hovered ? '#11161d' : 'transparent',
          border: `1px solid ${hovered ? 'rgba(255,255,255,0.10)' : 'rgba(255,255,255,0.06)'}`,
          borderRadius: 12, padding: '20px 24px',
          cursor: 'pointer', textAlign: 'left', width: '100%',
          transition: 'all 200ms ease',
        }}
      >
        <div style={{ minWidth: 90, fontFamily: "'Fira Code', monospace", fontSize: 12, color: '#6b7380', paddingTop: 3 }}>
          {post.date}
        </div>
        <div style={{ flex: 1 }}>
          <div style={{ fontFamily: "'Fira Code', monospace", fontSize: 11, color: accent, letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: 6 }}>
            {post.category}
          </div>
          <div style={{ fontFamily: "'Ubuntu', sans-serif", fontWeight: 500, fontSize: 18, color: '#fff', lineHeight: 1.3, marginBottom: 8 }}>
            {post.title}
          </div>
          <div style={{ fontFamily: "'Ubuntu', sans-serif", fontSize: 14, color: '#6b7380', lineHeight: 1.5 }}>
            {post.excerpt}
          </div>
        </div>
        <div style={{ fontFamily: "'Fira Code', monospace", fontSize: 11, color: '#3f4752', whiteSpace: 'nowrap', paddingTop: 3 }}>
          {post.readTime}
        </div>
      </button>
    );
  }

  return (
    <button
      onClick={goToPost}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        background: hovered ? '#11161d' : '#0b0e13',
        border: `1px solid ${hovered ? 'rgba(45,212,160,0.18)' : 'rgba(255,255,255,0.06)'}`,
        borderRadius: 12,
        padding: '24px',
        cursor: 'pointer',
        textAlign: 'left',
        transition: 'all 200ms ease',
        boxShadow: hovered ? '0 4px 24px rgba(0,0,0,0.5)' : '0 2px 8px rgba(0,0,0,0.3)',
      }}
    >
      <div style={{ fontFamily: "'Fira Code', monospace", fontSize: 11, color: accent, letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: 12 }}>
        <span style={{ color: '#3f4752' }}>// </span>{post.category}
      </div>
      <div style={{ fontFamily: "'Ubuntu', sans-serif", fontWeight: 500, fontSize: 19, color: '#fff', lineHeight: 1.3, marginBottom: 10 }}>
        {post.title}
      </div>
      <div style={{ fontFamily: "'Ubuntu', sans-serif", fontSize: 14, color: '#6b7380', lineHeight: 1.55, marginBottom: 20 }}>
        {post.excerpt}
      </div>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <div style={{ display: 'flex', gap: 8 }}>
          {post.tags.slice(0, 2).map(tag => (
            <span key={tag} style={{
              fontFamily: "'Fira Code', monospace", fontSize: 11,
              color: '#6b7380', background: 'rgba(255,255,255,0.04)',
              border: '1px solid rgba(255,255,255,0.06)',
              borderRadius: 999, padding: '3px 10px',
            }}>{tag}</span>
          ))}
        </div>
        <span style={{ fontFamily: "'Fira Code', monospace", fontSize: 11, color: '#3f4752' }}>
          {post.readTime}
        </span>
      </div>
    </button>
  );
}
