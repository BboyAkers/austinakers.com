import { useMemo, useEffect } from 'react';
import { useNavigate } from '@tanstack/react-router';
import { marked } from 'marked';
import type { BlogPost } from '../types';

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

  useEffect(() => {
    window.scrollTo({ top: 0 });
  }, [post.id]);

  const goToPost = (p: BlogPost) =>
    navigate({ to: '/blog/$slug', params: { slug: p.slug } });

  return (
    <main className="pt-16">
      <div className="max-w-[720px] mx-auto px-8 pt-10">
        <button
          onClick={() => navigate({ to: '/blog' })}
          className="font-mono text-[12px] text-fg-3 bg-transparent border-none cursor-pointer p-0 inline-flex items-center gap-[6px] transition-colors duration-[120ms] hover:text-accent"
        >
          ← Writing
        </button>
      </div>

      <section className="max-w-[720px] mx-auto px-8 pt-8">
        <div className="font-mono text-[12px] tracking-[0.1em] uppercase text-accent mb-[18px]">
          <span className="text-fg-4">// </span>{post.category}
        </div>
        <h1 className="font-sans font-bold text-[clamp(32px,5vw,48px)] text-white leading-[1.1] tracking-[-0.02em] m-0 mb-5">
          {post.title}
        </h1>
        <div className="flex items-center gap-4 font-mono text-[12px] text-fg-3 mb-10">
          <span>{post.date}</span>
          <span className="text-fg-4">·</span>
          <span>{post.readTime}</span>
          <span className="text-fg-4">·</span>
          <div className="flex gap-[6px]">
            {post.tags.map(tag => (
              <span
                key={tag}
                className="bg-white/[0.04] border border-white/[0.06] rounded-full py-[2px] px-[10px] text-[11px]"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
        <div className="h-px bg-white/[0.06] mb-12" />
      </section>

      <article className="max-w-[720px] mx-auto px-8">
        <div className="md-content" dangerouslySetInnerHTML={{ __html: htmlContent }} />
      </article>

      {/* Author bio */}
      <section className="max-w-[720px] mx-auto mt-12 px-8">
        <div className="h-px bg-white/[0.06] mb-10" />
        <div className="bg-bg-1 border border-white/[0.06] rounded-xl p-6 flex gap-5 items-start">
          <div className="w-12 h-12 rounded-full bg-[linear-gradient(135deg,#2dd4a040,#6a2bf040)] border border-[#2dd4a030] flex items-center justify-center shrink-0 font-sans font-bold text-[18px] text-accent">
            A
          </div>
          <div>
            <div className="font-sans font-medium text-[15px] text-white mb-1">{AUTHOR.name}</div>
            <div className="font-mono text-[11px] text-accent mb-[10px] tracking-[0.06em]">
              {AUTHOR.role} @ Harper
            </div>
            <div className="font-sans text-sm text-fg-3 leading-[1.55]">{AUTHOR.bio}</div>
            <div className="flex gap-4 mt-3">
              {([['GitHub →', AUTHOR.github], ['Twitter →', AUTHOR.twitter]] as const).map(
                ([label, href]) => (
                  <a
                    key={label}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-mono text-[12px] text-fg-3 no-underline transition-colors duration-[120ms] hover:text-accent"
                  >
                    {label}
                  </a>
                ),
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Prev/Next */}
      {(prevPost ?? nextPost) && (
        <section className="max-w-[720px] mx-auto mt-12 px-8">
          <div className="h-px bg-white/[0.06] mb-8" />
          <div className="grid grid-cols-2 gap-4">
            {prevPost ? (
              <button
                onClick={() => goToPost(prevPost)}
                className="bg-bg-1 border border-white/[0.06] rounded-[10px] py-4 px-5 cursor-pointer text-left transition-[border-color] duration-150 hover:border-white/[0.14]"
              >
                <div className="font-mono text-[11px] text-fg-3 mb-[6px]">← Older</div>
                <div className="font-sans text-sm text-fg-1 leading-[1.4]">{prevPost.title}</div>
              </button>
            ) : (
              <div />
            )}
            {nextPost ? (
              <button
                onClick={() => goToPost(nextPost)}
                className="bg-bg-1 border border-white/[0.06] rounded-[10px] py-4 px-5 cursor-pointer text-right transition-[border-color] duration-150 hover:border-white/[0.14]"
              >
                <div className="font-mono text-[11px] text-fg-3 mb-[6px]">Newer →</div>
                <div className="font-sans text-sm text-fg-1 leading-[1.4]">{nextPost.title}</div>
              </button>
            ) : (
              <div />
            )}
          </div>
        </section>
      )}

      <div className="h-[120px]" />
    </main>
  );
}
