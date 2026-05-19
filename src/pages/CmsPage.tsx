import { useState } from 'react';
import { savePost, deletePost } from '../api/blog';
import type { BlogPost } from '../types';
import { accent } from '../theme';

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

const labelStyle: React.CSSProperties = {
  display: 'block',
  fontFamily: "'Fira Code', monospace",
  fontSize: 11,
  color: '#6b7380',
  marginBottom: 6,
  letterSpacing: '0.04em',
};

const inputStyle: React.CSSProperties = {
  width: '100%',
  background: '#0d1117',
  border: '1px solid rgba(255,255,255,0.09)',
  borderRadius: 6,
  color: '#e6edf3',
  fontFamily: "'Ubuntu', sans-serif",
  fontSize: 14,
  padding: '9px 12px',
  outline: 'none',
  boxSizing: 'border-box',
  transition: 'border-color 150ms',
};

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
    setForm((prev) => {
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
        tags: form.tags ? form.tags.split(',').map((t) => t.trim()).filter(Boolean) : [],
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
    <div style={{ maxWidth: 1100, margin: '0 auto', padding: '100px 32px 80px' }}>
      {/* ── Header ── */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 40 }}>
        <div>
          {mode === 'form' ? (
            <button
              onClick={() => setMode('list')}
              style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#a7b0bc', fontFamily: "'Ubuntu', sans-serif", fontSize: 14, padding: 0, display: 'flex', alignItems: 'center', gap: 6 }}
            >
              ← posts
            </button>
          ) : (
            <>
              <h1 style={{ fontFamily: "'Ubuntu', sans-serif", fontWeight: 700, fontSize: 28, color: '#fff', margin: 0 }}>
                Blog CMS
              </h1>
              <p style={{ fontFamily: "'Fira Code', monospace", fontSize: 12, color: '#6b7380', margin: '6px 0 0' }}>
                // {posts.length} post{posts.length !== 1 ? 's' : ''}
              </p>
            </>
          )}
        </div>

        {mode === 'list' ? (
          <button
            onClick={openNew}
            style={{ background: accent, color: '#07090c', fontFamily: "'Ubuntu', sans-serif", fontWeight: 600, fontSize: 14, border: 'none', borderRadius: 6, padding: '9px 20px', cursor: 'pointer' }}
          >
            + New Post
          </button>
        ) : (
          <div style={{ display: 'flex', gap: 10 }}>
            <button
              onClick={() => setMode('list')}
              style={{ background: 'none', border: '1px solid rgba(255,255,255,0.1)', borderRadius: 6, color: '#a7b0bc', fontFamily: "'Ubuntu', sans-serif", fontSize: 14, padding: '8px 16px', cursor: 'pointer' }}
            >
              Cancel
            </button>
            <button
              onClick={handleSave}
              disabled={saving}
              style={{ background: accent, color: '#07090c', fontFamily: "'Ubuntu', sans-serif", fontWeight: 600, fontSize: 14, border: 'none', borderRadius: 6, padding: '9px 20px', cursor: 'pointer', opacity: saving ? 0.65 : 1 }}
            >
              {saving ? 'Saving…' : editingId ? 'Save Changes' : 'Create Post'}
            </button>
          </div>
        )}
      </div>

      {/* ── Error banner ── */}
      {error && (
        <div style={{ background: 'rgba(239,68,68,0.1)', border: '1px solid rgba(239,68,68,0.25)', borderRadius: 6, padding: '12px 16px', color: '#f87171', fontFamily: "'Ubuntu', sans-serif", fontSize: 14, marginBottom: 28 }}>
          {error}
        </div>
      )}

      {/* ── List ── */}
      {mode === 'list' && (
        <div style={{ border: '1px solid rgba(255,255,255,0.06)', borderRadius: 10, overflow: 'hidden' }}>
          {posts.length === 0 ? (
            <div style={{ padding: 56, textAlign: 'center', fontFamily: "'Fira Code', monospace", fontSize: 13, color: '#3f4752' }}>
              // no posts yet — create one above
            </div>
          ) : (
            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
              <thead>
                <tr style={{ background: '#0d1117', borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
                  {['Title', 'Category', 'Date', 'Read Time', ''].map((h) => (
                    <th key={h} style={{ fontFamily: "'Fira Code', monospace", fontSize: 11, color: '#6b7380', fontWeight: 400, padding: '12px 20px', textAlign: 'left', letterSpacing: '0.04em' }}>
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {posts.map((post, i) => (
                  <tr
                    key={post.id}
                    style={{ borderBottom: i < posts.length - 1 ? '1px solid rgba(255,255,255,0.04)' : 'none', transition: 'background 120ms' }}
                    onMouseEnter={(e) => (e.currentTarget.style.background = 'rgba(255,255,255,0.02)')}
                    onMouseLeave={(e) => (e.currentTarget.style.background = 'transparent')}
                  >
                    <td style={{ padding: '15px 20px', fontFamily: "'Ubuntu', sans-serif", fontSize: 14, color: '#e6edf3', fontWeight: 500 }}>
                      {post.title}
                    </td>
                    <td style={{ padding: '15px 20px', fontFamily: "'Fira Code', monospace", fontSize: 12, color: accent }}>
                      {post.category || '—'}
                    </td>
                    <td style={{ padding: '15px 20px', fontFamily: "'Fira Code', monospace", fontSize: 12, color: '#6b7380' }}>
                      {post.date || '—'}
                    </td>
                    <td style={{ padding: '15px 20px', fontFamily: "'Fira Code', monospace", fontSize: 12, color: '#6b7380' }}>
                      {post.readTime || '—'}
                    </td>
                    <td style={{ padding: '15px 20px' }}>
                      <div style={{ display: 'flex', gap: 8, justifyContent: 'flex-end' }}>
                        <button
                          onClick={() => openEdit(post)}
                          style={{ background: 'none', border: '1px solid rgba(255,255,255,0.1)', borderRadius: 5, color: '#a7b0bc', fontFamily: "'Ubuntu', sans-serif", fontSize: 13, padding: '5px 13px', cursor: 'pointer' }}
                        >
                          Edit
                        </button>

                        {deleteConfirm === post.id ? (
                          <>
                            <button
                              onClick={() => handleDelete(post.id)}
                              style={{ background: 'rgba(239,68,68,0.15)', border: '1px solid rgba(239,68,68,0.3)', borderRadius: 5, color: '#f87171', fontFamily: "'Ubuntu', sans-serif", fontSize: 13, padding: '5px 13px', cursor: 'pointer' }}
                            >
                              Confirm delete
                            </button>
                            <button
                              onClick={() => setDeleteConfirm(null)}
                              style={{ background: 'none', border: '1px solid rgba(255,255,255,0.08)', borderRadius: 5, color: '#6b7380', fontFamily: "'Ubuntu', sans-serif", fontSize: 13, padding: '5px 13px', cursor: 'pointer' }}
                            >
                              Cancel
                            </button>
                          </>
                        ) : (
                          <button
                            onClick={() => setDeleteConfirm(post.id)}
                            style={{ background: 'none', border: '1px solid rgba(239,68,68,0.2)', borderRadius: 5, color: '#f87171', fontFamily: "'Ubuntu', sans-serif", fontSize: 13, padding: '5px 13px', cursor: 'pointer' }}
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

      {/* ── Form ── */}
      {mode === 'form' && (
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20 }}>
          <div style={{ gridColumn: '1 / -1' }}>
            <label style={labelStyle}>title</label>
            <input style={inputStyle} value={form.title} placeholder="Post title"
              onChange={(e) => handleChange('title', e.target.value)}
              onFocus={(e) => (e.currentTarget.style.borderColor = accent)}
              onBlur={(e) => (e.currentTarget.style.borderColor = 'rgba(255,255,255,0.09)')}
            />
          </div>

          <div>
            <label style={labelStyle}>slug</label>
            <input style={inputStyle} value={form.slug} placeholder="post-url-slug"
              onChange={(e) => handleChange('slug', e.target.value)}
              onFocus={(e) => (e.currentTarget.style.borderColor = accent)}
              onBlur={(e) => (e.currentTarget.style.borderColor = 'rgba(255,255,255,0.09)')}
            />
          </div>

          <div>
            <label style={labelStyle}>date</label>
            <input style={inputStyle} value={form.date} placeholder="Jan 1, 2025"
              onChange={(e) => handleChange('date', e.target.value)}
              onFocus={(e) => (e.currentTarget.style.borderColor = accent)}
              onBlur={(e) => (e.currentTarget.style.borderColor = 'rgba(255,255,255,0.09)')}
            />
          </div>

          <div>
            <label style={labelStyle}>category</label>
            <input style={inputStyle} value={form.category} placeholder="JavaScript"
              onChange={(e) => handleChange('category', e.target.value)}
              onFocus={(e) => (e.currentTarget.style.borderColor = accent)}
              onBlur={(e) => (e.currentTarget.style.borderColor = 'rgba(255,255,255,0.09)')}
            />
          </div>

          <div>
            <label style={labelStyle}>read time</label>
            <input style={inputStyle} value={form.readTime} placeholder="5 min read"
              onChange={(e) => handleChange('readTime', e.target.value)}
              onFocus={(e) => (e.currentTarget.style.borderColor = accent)}
              onBlur={(e) => (e.currentTarget.style.borderColor = 'rgba(255,255,255,0.09)')}
            />
          </div>

          <div style={{ gridColumn: '1 / -1' }}>
            <label style={labelStyle}>tags (comma-separated)</label>
            <input style={inputStyle} value={form.tags} placeholder="React, JavaScript, Harper"
              onChange={(e) => handleChange('tags', e.target.value)}
              onFocus={(e) => (e.currentTarget.style.borderColor = accent)}
              onBlur={(e) => (e.currentTarget.style.borderColor = 'rgba(255,255,255,0.09)')}
            />
          </div>

          <div style={{ gridColumn: '1 / -1' }}>
            <label style={labelStyle}>excerpt</label>
            <textarea style={{ ...inputStyle, resize: 'vertical', minHeight: 80 }}
              value={form.excerpt} placeholder="Brief description of the post…"
              onChange={(e) => handleChange('excerpt', e.target.value)}
              onFocus={(e) => (e.currentTarget.style.borderColor = accent)}
              onBlur={(e) => (e.currentTarget.style.borderColor = 'rgba(255,255,255,0.09)')}
            />
          </div>

          <div style={{ gridColumn: '1 / -1' }}>
            <label style={labelStyle}>content (markdown)</label>
            <textarea
              style={{ ...inputStyle, resize: 'vertical', minHeight: 420, fontFamily: "'Fira Code', monospace", fontSize: 13, lineHeight: 1.65 }}
              value={form.content} placeholder="Write your post in markdown…"
              onChange={(e) => handleChange('content', e.target.value)}
              onFocus={(e) => (e.currentTarget.style.borderColor = accent)}
              onBlur={(e) => (e.currentTarget.style.borderColor = 'rgba(255,255,255,0.09)')}
            />
          </div>

          <div style={{ gridColumn: '1 / -1', display: 'flex', justifyContent: 'flex-end', gap: 10, paddingTop: 8 }}>
            <button onClick={() => setMode('list')}
              style={{ background: 'none', border: '1px solid rgba(255,255,255,0.1)', borderRadius: 6, color: '#a7b0bc', fontFamily: "'Ubuntu', sans-serif", fontSize: 14, padding: '9px 18px', cursor: 'pointer' }}
            >
              Cancel
            </button>
            <button onClick={handleSave} disabled={saving}
              style={{ background: accent, color: '#07090c', fontFamily: "'Ubuntu', sans-serif", fontWeight: 600, fontSize: 14, border: 'none', borderRadius: 6, padding: '9px 22px', cursor: 'pointer', opacity: saving ? 0.65 : 1 }}
            >
              {saving ? 'Saving…' : editingId ? 'Save Changes' : 'Create Post'}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
