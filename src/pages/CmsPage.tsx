import { useState } from 'react';
import { savePost, deletePost } from '../api/blog';
import type { BlogPost } from '../types';

interface PostForm {
  id: string;
  title: string;
  slug: string;
  date: string;
  category: string;
  tags: string;
  readTime: string;
  excerpt: string;
  content: string;
}

interface CmsPageProps {
  posts: BlogPost[];
  onRefresh: () => void;
}

type Mode = 'list' | 'form';

const slugify = (str: string) =>
  str.toLowerCase().trim().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');

const EMPTY_FORM: PostForm = {
  id: '',
  title: '',
  slug: '',
  date: '',
  category: '',
  tags: '',
  readTime: '',
  excerpt: '',
  content: '',
};

const labelCls =
  'block font-mono text-[11px] text-fg-3 mb-[6px] tracking-[0.04em]';

const inputCls =
  'w-full bg-[#0d1117] border border-white/[0.09] rounded-[6px] text-fg-1 font-sans text-sm py-[9px] px-3 outline-none transition-[border-color] duration-150 focus:border-accent';

export function CmsPage({ posts, onRefresh }: CmsPageProps) {
  const [mode, setMode] = useState<Mode>('list');
  const [form, setForm] = useState<PostForm>(EMPTY_FORM);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [deleteConfirm, setDeleteConfirm] = useState<string | null>(null);

  const openNew = () => {
    setForm({ ...EMPTY_FORM, id: String(Date.now()) });
    setEditingId(null);
    setError(null);
    setMode('form');
  };

  const openEdit = (post: BlogPost) => {
    setForm({
      id: post.id,
      title: post.title,
      slug: post.slug,
      date: post.date,
      category: post.category,
      tags: post.tags.join(', '),
      readTime: post.readTime,
      excerpt: post.excerpt,
      content: post.content,
    });
    setEditingId(post.id);
    setError(null);
    setMode('form');
  };

  const handleChange = (key: keyof PostForm, value: string) => {
    setForm(prev => {
      const next = { ...prev, [key]: value };
      if (key === 'title' && !editingId) next.slug = slugify(value);
      return next;
    });
  };

  const handleSave = async () => {
    if (!form.title.trim()) return setError('Title is required');
    if (!form.slug.trim()) return setError('Slug is required');
    setSaving(true);
    setError(null);
    try {
      const post: BlogPost = {
        ...form,
        tags: form.tags ? form.tags.split(',').map(t => t.trim()).filter(Boolean) : [],
      };
      await savePost(form.id, post);
      onRefresh();
      setMode('list');
    } catch (e) {
      setError((e as Error).message);
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id: string) => {
    try {
      await deletePost(id);
      setDeleteConfirm(null);
      onRefresh();
    } catch (e) {
      setError((e as Error).message);
    }
  };

  return (
    <div className="max-w-[1100px] mx-auto px-8 pt-[100px] pb-20">
      {/* Header */}
      <div className="flex items-center justify-between mb-10">
        <div>
          {mode === 'form' ? (
            <button
              onClick={() => setMode('list')}
              className="bg-transparent border-none cursor-pointer text-fg-2 font-sans text-sm p-0 flex items-center gap-[6px]"
            >
              ← posts
            </button>
          ) : (
            <>
              <h1 className="font-sans font-bold text-[28px] text-white m-0">Blog CMS</h1>
              <p className="font-mono text-[12px] text-fg-3 mt-[6px] m-0">
                // {posts.length} post{posts.length !== 1 ? 's' : ''}
              </p>
            </>
          )}
        </div>

        {mode === 'list' ? (
          <button
            onClick={openNew}
            className="bg-accent text-bg-0 font-sans font-semibold text-sm border-none rounded-md py-[9px] px-5 cursor-pointer"
          >
            + New Post
          </button>
        ) : (
          <div className="flex gap-[10px]">
            <button
              onClick={() => setMode('list')}
              className="bg-transparent border border-white/10 rounded-md text-fg-2 font-sans text-sm py-2 px-4 cursor-pointer"
            >
              Cancel
            </button>
            <button
              onClick={handleSave}
              disabled={saving}
              className="bg-accent text-bg-0 font-sans font-semibold text-sm border-none rounded-md py-[9px] px-[22px] cursor-pointer disabled:opacity-65"
            >
              {saving ? 'Saving…' : editingId ? 'Save Changes' : 'Create Post'}
            </button>
          </div>
        )}
      </div>

      {/* Error banner */}
      {error && (
        <div className="bg-red-500/10 border border-red-500/25 rounded-md py-3 px-4 text-red-400 font-sans text-sm mb-7">
          {error}
        </div>
      )}

      {/* List */}
      {mode === 'list' && (
        <div className="border border-white/[0.06] rounded-[10px] overflow-hidden">
          {posts.length === 0 ? (
            <div className="py-14 text-center font-mono text-[13px] text-fg-4">
              // no posts yet — create one above
            </div>
          ) : (
            <table className="w-full border-collapse">
              <thead>
                <tr className="bg-[#0d1117] border-b border-white/[0.06]">
                  {['Title', 'Category', 'Date', 'Read Time', ''].map(h => (
                    <th
                      key={h}
                      className="font-mono text-[11px] text-fg-3 font-normal py-3 px-5 text-left tracking-[0.04em]"
                    >
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {posts.map((post, i) => (
                  <tr
                    key={post.id}
                    className={`transition-[background] duration-[120ms] hover:bg-white/[0.02] ${
                      i < posts.length - 1 ? 'border-b border-white/[0.04]' : ''
                    }`}
                  >
                    <td className="py-[15px] px-5 font-sans text-sm text-fg-1 font-medium">
                      {post.title}
                    </td>
                    <td className="py-[15px] px-5 font-mono text-[12px] text-accent">
                      {post.category || '—'}
                    </td>
                    <td className="py-[15px] px-5 font-mono text-[12px] text-fg-3">
                      {post.date || '—'}
                    </td>
                    <td className="py-[15px] px-5 font-mono text-[12px] text-fg-3">
                      {post.readTime || '—'}
                    </td>
                    <td className="py-[15px] px-5">
                      <div className="flex gap-2 justify-end">
                        <button
                          onClick={() => openEdit(post)}
                          className="bg-transparent border border-white/10 rounded-[5px] text-fg-2 font-sans text-[13px] py-[5px] px-[13px] cursor-pointer"
                        >
                          Edit
                        </button>

                        {deleteConfirm === post.id ? (
                          <>
                            <button
                              onClick={() => handleDelete(post.id)}
                              className="bg-red-500/15 border border-red-500/30 rounded-[5px] text-red-400 font-sans text-[13px] py-[5px] px-[13px] cursor-pointer"
                            >
                              Confirm delete
                            </button>
                            <button
                              onClick={() => setDeleteConfirm(null)}
                              className="bg-transparent border border-white/[0.08] rounded-[5px] text-fg-3 font-sans text-[13px] py-[5px] px-[13px] cursor-pointer"
                            >
                              Cancel
                            </button>
                          </>
                        ) : (
                          <button
                            onClick={() => setDeleteConfirm(post.id)}
                            className="bg-transparent border border-red-500/20 rounded-[5px] text-red-400 font-sans text-[13px] py-[5px] px-[13px] cursor-pointer"
                          >
                            Delete
                          </button>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      )}

      {/* Form */}
      {mode === 'form' && (
        <div className="grid grid-cols-2 gap-5">
          <div className="col-span-2">
            <label className={labelCls}>title</label>
            <input
              className={inputCls}
              value={form.title}
              placeholder="Post title"
              onChange={e => handleChange('title', e.target.value)}
            />
          </div>

          <div>
            <label className={labelCls}>slug</label>
            <input
              className={inputCls}
              value={form.slug}
              placeholder="post-url-slug"
              onChange={e => handleChange('slug', e.target.value)}
            />
          </div>

          <div>
            <label className={labelCls}>date</label>
            <input
              className={inputCls}
              value={form.date}
              placeholder="Jan 1, 2025"
              onChange={e => handleChange('date', e.target.value)}
            />
          </div>

          <div>
            <label className={labelCls}>category</label>
            <input
              className={inputCls}
              value={form.category}
              placeholder="JavaScript"
              onChange={e => handleChange('category', e.target.value)}
            />
          </div>

          <div>
            <label className={labelCls}>read time</label>
            <input
              className={inputCls}
              value={form.readTime}
              placeholder="5 min read"
              onChange={e => handleChange('readTime', e.target.value)}
            />
          </div>

          <div className="col-span-2">
            <label className={labelCls}>tags (comma-separated)</label>
            <input
              className={inputCls}
              value={form.tags}
              placeholder="React, JavaScript, Harper"
              onChange={e => handleChange('tags', e.target.value)}
            />
          </div>

          <div className="col-span-2">
            <label className={labelCls}>excerpt</label>
            <textarea
              className={`${inputCls} resize-y min-h-[80px]`}
              value={form.excerpt}
              placeholder="Brief description of the post…"
              onChange={e => handleChange('excerpt', e.target.value)}
            />
          </div>

          <div className="col-span-2">
            <label className={labelCls}>content (markdown)</label>
            <textarea
              className={`${inputCls} resize-y min-h-[420px] font-mono text-[13px] leading-[1.65]`}
              value={form.content}
              placeholder="Write your post in markdown…"
              onChange={e => handleChange('content', e.target.value)}
            />
          </div>

          <div className="col-span-2 flex justify-end gap-[10px] pt-2">
            <button
              onClick={() => setMode('list')}
              className="bg-transparent border border-white/10 rounded-md text-fg-2 font-sans text-sm py-[9px] px-[18px] cursor-pointer"
            >
              Cancel
            </button>
            <button
              onClick={handleSave}
              disabled={saving}
              className="bg-accent text-bg-0 font-sans font-semibold text-sm border-none rounded-md py-[9px] px-[22px] cursor-pointer disabled:opacity-65"
            >
              {saving ? 'Saving…' : editingId ? 'Save Changes' : 'Create Post'}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
