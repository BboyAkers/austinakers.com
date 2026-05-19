---
id: "5"
slug: understanding-hnsw-vector-search
title: Understanding HNSW Vector Search
date: Apr 22, 2024
readTime: 7 min read
category: AI & ML
tags:
  - AI
  - Vector Search
  - Harper
  - JavaScript
excerpt: "HNSW is the algorithm behind most vector search systems. Here's an intuitive explanation and how to use it with Harper — no separate vector database required."
---

## What Is a Vector Index?

Vector databases store embeddings — arrays of floating-point numbers that represent the "meaning" of content in high-dimensional space. Semantically similar content produces embeddings that are close together.

The job of a vector index is to answer: "Given this query vector, find the K nearest stored vectors." Do that fast, at scale, and you have semantic search, recommendation systems, and RAG pipelines.

## The Naive Approach

Compare your query against every stored vector, sort by distance, return the top K. Exact, but O(n) per query. With millions of embeddings, this is unusable in real time.

## Hierarchical Navigable Small World (HNSW)

HNSW builds a layered graph structure for approximate nearest neighbor (ANN) search in O(log n) time. The "approximate" part means you might miss the absolute nearest neighbor occasionally — but results are good enough for semantic search.

The core insight is borrowed from skip lists: build multiple layers of graphs with decreasing density. The top layer is sparse, with long-range connections. The bottom layer is dense, with local connections.

Search starts at the top layer and greedily traverses toward the query. At each layer, you descend when you can't get closer. The final traversal at the dense bottom layer finds the actual candidates.

## Using HNSW in Harper

Harper has HNSW built in as a table field type. No separate vector database:

```graphql
type Article @table @export {
  id:        ID     @primaryKey
  title:     String
  content:   String
  embedding: [Float] @indexed(type: "HNSW")
}
```

Insert with an embedding from your model of choice:

```javascript
const embedding = await getEmbedding(article.content);

await fetch('/Article', {
  method: 'POST',
  body: JSON.stringify({ ...article, embedding }),
});
```

Semantic search — same API:

```javascript
const queryEmbedding = await getEmbedding('fast caching strategies');

const results = await tables.Article.search({
  select: ['title', 'content', '$distance'],
  sort: {
    attribute: 'embedding',
    target: queryEmbedding,
  },
  limit: 5,
});
```

## The Tradeoff

ANN search trades perfect recall for speed. HNSW tuning parameters (M, efConstruction, ef) control this balance. Harper's defaults work well for most production workloads.

For most semantic search use cases, HNSW at default settings beats "exact but slow" by several orders of magnitude without meaningful accuracy loss.
