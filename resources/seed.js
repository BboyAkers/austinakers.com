// import { tables } from 'harperdb';
// import { readdir, readFile } from 'fs/promises';
// import matter from 'gray-matter';
// import { fileURLToPath } from 'url';
// import { join, dirname } from 'path';

// const { BlogPost } = tables;

// const __dirname = dirname(fileURLToPath(import.meta.url));
// const blogDir = join(__dirname, '..', 'content', 'blog');

// try {
//   const files = await readdir(blogDir);
//   for (const file of files) {
//     if (!file.endsWith('.md')) continue;
//     const raw = await readFile(join(blogDir, file), 'utf8');
//     const { data, content } = matter(raw);
//     const post = { ...data, content: content.trim() };
//     if (Array.isArray(post.tags)) {
//       post.tags = post.tags;
//     }
//     await BlogPost.put(post.id, post);
//   }
//   console.log(`[seed] Synced ${files.filter(f => f.endsWith('.md')).length} blog posts`);
// } catch (err) {
//   console.error('[seed] Failed to seed blog posts:', err.message);
// }
