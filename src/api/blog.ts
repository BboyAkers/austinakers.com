import type { BlogPost } from '../types';

const BASE = import.meta.env.VITE_HARPER_URL || '';

export async function getPosts(): Promise<BlogPost[]> {
  const res = await fetch(`${BASE}/BlogPost/`);
  if (!res.ok) throw new Error('Failed to fetch posts');
  return res.json() as Promise<BlogPost[]>;
}

export async function getPostBySlug(slug: string): Promise<BlogPost | null> {
  const res = await fetch(`${BASE}/BlogPost/?slug=${encodeURIComponent(slug)}`);
  if (!res.ok) throw new Error('Failed to fetch post');
  const posts = (await res.json()) as BlogPost[];
  return posts[0] ?? null;
}

export async function savePost(id: string, post: BlogPost): Promise<void> {
  const res = await fetch(`${BASE}/BlogPost/${encodeURIComponent(id)}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(post),
  });
  if (!res.ok) throw new Error('Failed to save post');
}

export async function deletePost(id: string): Promise<void> {
  const res = await fetch(`${BASE}/BlogPost/${encodeURIComponent(id)}`, {
    method: 'DELETE',
  });
  if (!res.ok) throw new Error('Failed to delete post');
}
