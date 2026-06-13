import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

// The "writing" collection: SEO/marketing articles authored as Markdown files
// in src/content/writing/. The frontmatter contract below is the delivery
// spec for authors — see NEXUS-BLOG-BRIEF.md. Anything with draft: true is
// excluded from the published listing and from the sitemap.
const writing = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/writing' }),
  schema: z.object({
    // Used as the <h1> and, unless seoTitle is set, the <title>.
    title: z.string(),
    // The <title> shown in Google's result. Lead with the searchable term,
    // not the brand. Falls back to `title` when omitted.
    seoTitle: z.string().optional(),
    // The meta description (~150–160 chars), and the listing teaser.
    description: z.string(),
    // ISO date, e.g. 2026-06-20. Sorted desc in the listing.
    pubDate: z.coerce.date(),
    updatedDate: z.coerce.date().optional(),
    // The primary search query this post targets (one phrase).
    primaryKeyword: z.string(),
    // Secondary phrases the post should also rank for.
    keywords: z.array(z.string()).default([]),
    tags: z.array(z.string()).default([]),
    // true keeps the post out of production until it is ready.
    draft: z.boolean().default(false),
  }),
});

export const collections = { writing };
