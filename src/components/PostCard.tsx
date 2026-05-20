import { useNavigate } from '@tanstack/react-router';
import type { BlogPost } from '../types';

interface PostCardProps {
  post: BlogPost;
  layout?: 'grid' | 'list';
}

export function PostCard({ post, layout = 'grid' }: PostCardProps) {
  const navigate = useNavigate();
  const goToPost = () => navigate({ to: '/blog/$slug', params: { slug: post.slug } });

  if (layout === 'list') {
    return (
      <button
        onClick={goToPost}
        className="flex items-start gap-8 bg-transparent border border-white/[0.06] rounded-xl py-5 px-6 cursor-pointer text-left w-full transition-all duration-200 hover:bg-bg-2 hover:border-white/10"
      >
        <div className="min-w-[90px] font-mono text-[12px] text-fg-3 pt-[3px]">
          {post.date}
        </div>
        <div className="flex-1">
          <div className="font-mono text-[11px] text-accent tracking-[0.1em] uppercase mb-[6px]">
            {post.category}
          </div>
          <div className="font-sans font-medium text-[18px] text-white leading-[1.3] mb-2">
            {post.title}
          </div>
          <div className="font-sans text-sm text-fg-3 leading-[1.5]">
            {post.excerpt}
          </div>
        </div>
        <div className="font-mono text-[11px] text-fg-4 whitespace-nowrap pt-[3px]">
          {post.readTime}
        </div>
      </button>
    );
  }

  return (
    <button
      onClick={goToPost}
      className="bg-bg-1 border border-white/[0.06] rounded-xl p-6 cursor-pointer text-left transition-all duration-200 shadow-[0_2px_8px_rgba(0,0,0,0.3)] hover:bg-bg-2 hover:border-accent/[0.18] hover:shadow-[0_4px_24px_rgba(0,0,0,0.5)]"
    >
      <div className="font-mono text-[11px] text-accent tracking-[0.1em] uppercase mb-3">
        <span className="text-fg-4">// </span>{post.category}
      </div>
      <div className="font-sans font-medium text-[19px] text-white leading-[1.3] mb-[10px]">
        {post.title}
      </div>
      <div className="font-sans text-sm text-fg-3 leading-[1.55] mb-5">
        {post.excerpt}
      </div>
      <div className="flex items-center justify-between">
        <div className="flex gap-2">
          {post.tags.slice(0, 2).map(tag => (
            <span
              key={tag}
              className="font-mono text-[11px] text-fg-3 bg-white/[0.04] border border-white/[0.06] rounded-full py-[3px] px-[10px]"
            >
              {tag}
            </span>
          ))}
        </div>
        <span className="font-mono text-[11px] text-fg-4">{post.readTime}</span>
      </div>
    </button>
  );
}
