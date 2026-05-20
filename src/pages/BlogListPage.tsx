import { useState } from 'react';
import { PostCard } from '../components/PostCard';
import type { BlogPost } from '../types';

interface BlogListPageProps {
  posts: BlogPost[];
}

export function BlogListPage({ posts }: BlogListPageProps) {
  const categories = ['All', ...Array.from(new Set(posts.map(p => p.category)))];
  const [activeCategory, setActiveCategory] = useState('All');

  const filtered =
    activeCategory === 'All' ? posts : posts.filter(p => p.category === activeCategory);

  return (
    <main className="pt-16">
      <section className="max-w-[1100px] mx-auto px-8 pt-20 pb-12">
        <div className="font-mono text-[13px] tracking-[0.14em] uppercase text-accent mb-5">
          <span className="text-fg-4">// </span>WRITING
        </div>
        <h1 className="font-sans font-bold text-[52px] text-white leading-[1.05] tracking-[-0.025em] m-0 mb-4">
          Everything I've written.
        </h1>
        <p className="font-sans text-[17px] text-fg-3 leading-[1.6] m-0 max-w-[480px]">
          JavaScript, the web platform, developer tooling, and occasionally whatever I'm thinking
          about.
        </p>
      </section>

      <section className="max-w-[1100px] mx-auto px-8 pb-10">
        <div className="flex gap-2 flex-wrap">
          {categories.map(cat => {
            const isActive = cat === activeCategory;
            return (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`font-mono text-[12px] rounded-full py-[6px] px-4 cursor-pointer transition-all duration-[120ms] ${
                  isActive
                    ? 'text-accent bg-accent/[0.08] border border-accent/[0.31]'
                    : 'text-fg-3 bg-transparent border border-white/[0.08] hover:text-fg-2 hover:border-white/[0.16]'
                }`}
              >
                {cat}
              </button>
            );
          })}
        </div>
      </section>

      <section className="max-w-[1100px] mx-auto px-8">
        <div className="flex flex-col gap-2">
          {filtered.map(post => (
            <PostCard key={post.id} post={post} layout="list" />
          ))}
        </div>
        {filtered.length === 0 && (
          <div className="text-center py-20 font-mono text-[13px] text-fg-4">
            // No posts in this category yet
          </div>
        )}
      </section>

      <div className="h-[120px]" />
    </main>
  );
}
