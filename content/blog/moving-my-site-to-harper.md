---
id: "2"
slug: moving-my-site-to-harper
title: "Moving My Site to Harper: A Developer's CMS Journey"
date: Jul 8, 2024
readTime: 6 min read
category: Harper
tags:
  - Harper
  - React
  - CMS
  - Node.js
excerpt: "I rebuilt my personal site on Harper. One schema file. Zero Redis. Markdown blog posts served through a REST API I didn't have to write."
---

## The Problem with Most CMS Tools

I've used Nuxt Content, Contentful, Sanity, and Notion-as-a-CMS (yes, I tried it). Every one adds a layer between my markdown and my React component. Either I'm paying for a SaaS, managing a separate Postgres instance, or running a background process that rebuilds static files on every commit.

I just want to write markdown and have it show up on my site.

## What Harper Changes

With Harper, the CMS is not a separate service. It's a table in your Harper instance — same process as your application runtime, cache layer, and real-time broker.

Here's the entire schema for my blog:

```graphql
# schema.graphql

type BlogPost @table @export {
  id:       ID     @primaryKey
  slug:     String @indexed
  title:    String
  date:     String
  category: String
  tags:     [String]
  readTime: String
  excerpt:  String
  content:  String  # raw markdown
}
```

That's it. Harper reads this file and exposes:

```bash
GET  /BlogPost/                    # list all posts
GET  /BlogPost/?slug=my-post       # get one by slug
POST /BlogPost/                    # create a post
PUT  /BlogPost/:id                 # update a post
```

No controllers. No ORM. No migrations. The schema IS the API.

## The React Side

In my React app (scaffolded with `npm create harper@latest`), fetching posts is a single call:

```javascript
// api/blog.js
const BASE = process.env.HARPER_URL;

export async function getPosts() {
  const res = await fetch(`${BASE}/BlogPost/?sort(-date)`);
  return res.json();
}

export async function getPost(slug) {
  const res = await fetch(`${BASE}/BlogPost/?slug=${slug}`);
  const posts = await res.json();
  return posts[0];
}
```

## No Redis. Seriously.

Harper has a built-in cache layer. I can set a TTL on the BlogPost table and Harper handles cache invalidation automatically:

```graphql
type BlogPost @table(expiration: 3600) @export {
  # ...same fields
}
```

Cache misses hit the database. Cache hits return in under 1ms. Same URL, same response, no Redis config.

## Markdown Seeding

I keep markdown files in `/content/blog/`. A small Harper resource reads them on startup and upserts into the BlogPost table:

```javascript
// resources/seed.js
import { tables } from 'harperdb';
import { readdir, readFile } from 'fs/promises';
import matter from 'gray-matter';

const files = await readdir('./content/blog');
for (const file of files) {
  const raw = await readFile(`./content/blog/${file}`, 'utf8');
  const { data, content } = matter(raw);
  await tables.BlogPost.upsert({ ...data, content });
}
```

## The Result

My site now runs on a single Harper process: database, API, cache, application. No separate database server, no Redis, no webhook to rebuild on content changes.

Three files. That's the whole backend.
