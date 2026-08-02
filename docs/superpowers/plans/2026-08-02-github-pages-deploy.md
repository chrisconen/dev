# GitHub Pages deployment Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Publish the Astro build of `chrisconen/dev` to GitHub Pages so `chrisconen.dev` no longer serves GitHub's 404 page.

**Architecture:** GitHub Actions builds the static Astro artifact from `dist/` on pushes to `main`, uploads it through the Pages artifact action, then deploys it with the least required Pages and OIDC permissions. `public/CNAME` is copied into the build artifact so the custom-domain association is durable.

**Tech Stack:** Astro 5, Node.js 20, GitHub Actions, GitHub Pages.

---

### Task 1: Add custom-domain artifact metadata

**Files:**
- Create: `public/CNAME`

- [ ] **Step 1: Create the CNAME file**

```text
chrisconen.dev
```

- [ ] **Step 2: Build locally**

Run: `npm run build`
Expected: `dist/CNAME` exists and `dist/index.html` is generated.

### Task 2: Add GitHub Pages deployment workflow

**Files:**
- Create: `.github/workflows/deploy-pages.yml`

- [ ] **Step 1: Configure a push-only workflow**

Use `actions/checkout@v4`, `actions/setup-node@v4` with Node 20 and npm cache, then run `npm ci` and `npm run build`.

- [ ] **Step 2: Upload and deploy the artifact**

Use `actions/configure-pages@v5`, `actions/upload-pages-artifact@v3` with `path: ./dist`, and `actions/deploy-pages@v4`. Give the workflow `contents: read`, `pages: write`, and `id-token: write` permissions.

- [ ] **Step 3: Verify locally**

Run: `npm ci && npm run build && test "$(tr -d '\r\n' < dist/CNAME)" = "chrisconen.dev"`
Expected: build succeeds and the artifact contains the custom domain.
