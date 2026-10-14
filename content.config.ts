import { defineCollection, defineContentConfig } from '@nuxt/content'
import { z } from '@nuxt/content'

export default defineContentConfig({
  collections: {
    blog: defineCollection({
      type: 'page',
      source: 'blog/**',
      schema: z.object({
        subtitle: z.string().optional(),
        tags: z.array(z.string()).default([]),
        date: z.string(),
        minutes: z.number().optional()
      })
    }),
    projects: defineCollection({
      type: 'page',
      source: 'projects/**',
      schema: z.object({
        category: z.enum(['Production', 'Open Source', 'Docs', 'Tools', 'UI', 'Creative']),
        role: z.string(),
        stack: z.array(z.string()).default([]),
        featured: z.boolean().default(false),
        order: z.number().default(99),
        year: z.string().optional(),
        image: z.object({
          src: z.string(),
          alt: z.string()
        }).optional(),
        links: z.object({
          live: z.string().optional(),
          code: z.string().optional()
        }).default({})
      })
    }),
    content: defineCollection({
      type: 'page',
      source: {
        include: '**',
        exclude: ['blog/**', 'projects/**']
      }
    })
  }
})
