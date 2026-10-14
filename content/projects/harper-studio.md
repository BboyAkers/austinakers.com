---
title: Harper Studio
description: A distributed database management UI and orchestration layer for Harper, built from the ground up with React and TanStack. Harper Studio is the interface developers used to manage Harper clusters.
category: Production
role: Developer Experience Engineer
stack: [React, TypeScript, TanStack, DBMS UI]
featured: true
order: 1
year: 2024 – 2026
image:
  src: /images/projects/harper-studio
  alt: Harper Fabric Studio sign-in and platform interface
links:
  live: https://fabric.harper.fast/#/sign-in
  code: https://github.com/HarperFast/studio
---

## Overview

Harper is a distributed database and application platform. Studio is the interface developers use to manage it: organizations, clusters, databases, tables, applications, and deployments, all from the browser.

I architected and built the new Studio, a distributed **DBMS UI and orchestration layer**, from the ground up with React and the TanStack libraries, while keeping the legacy database management interfaces running and optimized during the platform transition.

## What I built

- **The foundation.** Routing, data fetching, and state built on TanStack, structured so new management surfaces could ship without re-plumbing the app.
- **Database browsing that respects real data.** Rendering JSON objects directly in table cells instead of flattening them to `[object Object]`.
- **Application lifecycle flows.** Import and create package improvements, a redeploy package reference modal, and guarding the create flow against duplicate submissions.
- **Access management.** SSH key management with validated forms and correctly wired authorization links during application import.

## Documentation alongside the product

Shipping the UI was half the job. I also wrote the matching docs in Harper's documentation repo: Studio itself, organization management, application and database management, Grafana, cluster editing, and the API tab, so the product and its docs launched together.

## Outcome

Studio became the primary way developers interact with Harper clusters, and the codebase is open source. I merged more than 50 pull requests into it across the build and the following iterations.
