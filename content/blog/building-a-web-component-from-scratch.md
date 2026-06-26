---
id: "1"
slug: building-a-web-component-from-scratch
title: Building a Web Component from Scratch
date: Mar 12, 2024
readTime: 8 min read
category: Web Development
tags:
  - JavaScript
  - Web Components
  - HTML
excerpt: "Web components let you define custom HTML elements with encapsulated behavior. Here's how to build one — no framework required."
---

## Why Web Components?

Most developers reach for React, Vue, or Angular without a second thought. But the platform ships a powerful primitive: custom elements with encapsulated styles, templates, and behavior — no build step required.

Web components work in every framework. Build them once, use them anywhere.

## The Three APIs

Web components are built from three browser APIs working together:

- **Custom Elements** — define new HTML tags with lifecycle callbacks
- **Shadow DOM** — attach an isolated DOM subtree to any element
- **HTML Templates** — define reusable markup fragments

## Setting Up the Element

```javascript
class CounterElement extends HTMLElement {
  static observedAttributes = ['count'];

  constructor() {
    super();
    // Attach shadow root in "open" mode
    this.attachShadow({ mode: 'open' });
    this._count = 0;
  }

  connectedCallback() {
    this.render();
    this.shadowRoot
      .querySelector('button')
      .addEventListener('click', () => this.increment());
  }

  increment() {
    this._count++;
    this.shadowRoot.querySelector('.count').textContent = this._count;
  }

  render() {
    this.shadowRoot.innerHTML = `
      <style>
        :host { display: inline-flex; align-items: center; gap: 8px; }
        .count { font-size: 1.5rem; min-width: 2ch; text-align: center; }
        button { padding: 4px 12px; cursor: pointer; }
      </style>
      <button>+</button>
      <span class="count">${this._count}</span>
    `;
  }
}

customElements.define('my-counter', CounterElement);
```

## Using It in HTML

```html
<!-- Works in any HTML file, zero dependencies -->
<my-counter></my-counter>
```

## Reactive Attributes

The `observedAttributes` static getter, combined with `attributeChangedCallback`, lets your element react to HTML attribute changes — the same way built-in elements do:

```javascript
attributeChangedCallback(name, oldValue, newValue) {
  if (name === 'count') {
    this._count = parseInt(newValue, 10);
    this.shadowRoot.querySelector('.count').textContent = this._count;
  }
}
```

## The Case for the Platform

Shadow DOM is the most misunderstood piece. It isn't just style scoping — it's a true encapsulation boundary. Events dispatched inside won't bubble outside unless you set `composed: true`. Styles defined outside won't pierce it unless you expose custom properties.

This isolation makes web components a great fit for design systems and embeddable widgets. Your `<my-button>` behaves the same whether dropped into a Next.js app or a static HTML page.

## What I'd Build Differently

If I were starting over, I'd:

1. Use declarative shadow DOM (`shadowrootmode="open"`) for server rendering support
2. Adopt the `@property` decorator pattern from Lit for cleaner attribute-to-property sync
3. Write tests using `@web/test-runner` with the WTR playwright launcher

The platform has come a long way. Web components are worth your time.
