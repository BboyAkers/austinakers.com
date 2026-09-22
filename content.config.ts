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
    content: defineCollection({
      type: 'page',
      source: {
        include: '**',
        exclude: ['blog/**']
      }
    })
  }
})
