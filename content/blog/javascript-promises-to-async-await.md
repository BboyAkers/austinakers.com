---
id: "3"
slug: javascript-promises-to-async-await
title: "JavaScript Promises: From Callbacks to Async/Await"
date: Nov 3, 2023
readTime: 5 min read
category: JavaScript
tags:
  - JavaScript
  - Async
  - ES2017
excerpt: "The evolution from callback hell to async/await is one of the best quality-of-life improvements in modern JavaScript. Here's how it all fits together."
---

## Callback Hell

Before Promises, JavaScript async code looked like this:

```javascript
fetchUser(id, function(err, user) {
  if (err) return handleError(err);
  fetchPosts(user.id, function(err, posts) {
    if (err) return handleError(err);
    fetchComments(posts[0].id, function(err, comments) {
      // Three levels deep. You get the idea.
    });
  });
});
```

Every level of nesting adds cognitive overhead. Error handling is repeated at every step.

## Promises: A Contract for Async Values

A Promise represents a value that may not exist yet. It's in one of three states: pending, fulfilled, or rejected.

```javascript
const p = new Promise((resolve, reject) => {
  setTimeout(() => resolve('done'), 1000);
});

p.then(value => console.log(value)); // 'done' after 1s
```

The real power is chaining. `.then()` returns a new Promise, letting you flatten nested callbacks into a sequence:

```javascript
fetchUser(id)
  .then(user => fetchPosts(user.id))
  .then(posts => fetchComments(posts[0].id))
  .then(comments => render(comments))
  .catch(err => handleError(err));
```

Single error handler. Flat structure.

## Async/Await: Synchronous-Looking Async

ES2017 gave us `async`/`await` — syntax sugar over Promises that makes async code read like synchronous code:

```javascript
async function loadComments(userId) {
  try {
    const user    = await fetchUser(userId);
    const posts   = await fetchPosts(user.id);
    const comments = await fetchComments(posts[0].id);
    return comments;
  } catch (err) {
    handleError(err);
  }
}
```

## Parallel vs Sequential

Awaiting in a loop is a common footgun:

```javascript
// Slow — waits for each request before starting the next
for (const id of ids) {
  const post = await fetchPost(id); // sequential
}

// Fast — fires all requests at once, waits for all to settle
const posts = await Promise.all(ids.map(id => fetchPost(id)));
```

`Promise.all` is your friend for parallel async work. `Promise.allSettled` is useful when you want all results even if some fail.

The primitives compose well. That's the mark of good API design.
