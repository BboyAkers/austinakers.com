/**
 * Global Nuxt UI theme config — Austin Akers Portfolio.
 * Maps designs/token.css values onto component slots/variants.
 * All overrides use Tailwind utilities (incl. arbitrary values for fluid type);
 * no raw CSS values here.
 */
export default defineAppConfig({
  ui: {
    colors: {
      primary: 'emerald',
      neutral: 'slate'
    },

    container: {
      // token --gutter: 20px mobile / 32px desktop
      base: 'w-full max-w-(--ui-container) mx-auto px-5 lg:px-8'
    },

    button: {
      slots: {
        // token --tracking-btn (-0.005em), --fw-semibold (600)
        base: 'font-semibold tracking-[-0.005em]'
      },
      defaultVariants: {
        size: 'lg'
      }
    },

    badge: {
      slots: {
        // token --font-mono for tag/pill labels
        base: 'font-mono'
      }
    },

    card: {
      variants: {
        variant: {
          // token --surface cards on --bg page
          outline: {
            root: 'bg-elevated ring ring-default divide-y divide-default'
          }
        }
      }
    },

    navigationMenu: {
      defaultVariants: {
        color: 'neutral',
        variant: 'link'
      }
    },

    pageHero: {
      slots: {
        // token --fs-h1-hero: clamp(44px, 6vw, 76px), --lh-tight, --fw-extrabold
        title: 'font-display text-[clamp(44px,6vw,76px)] leading-[1.04] tracking-[-0.03em] font-bold text-highlighted',
        // token --fs-lead-hero: 19px
        description: 'text-[19px] text-muted',
        // token eyebrow: mono 12px, 0.08em tracking, uppercase accent
        headline: 'font-mono text-xs tracking-[0.08em] uppercase'
      }
    },

    pageSection: {
      slots: {
        // token --fs-h2-hero: clamp(32px, 4vw, 48px)
        title: 'font-display text-[clamp(32px,4vw,48px)] leading-[1.1] tracking-[-0.025em] font-bold text-highlighted',
        headline: 'font-mono text-xs tracking-[0.08em] uppercase'
      }
    },

    pageCta: {
      slots: {
        title: 'font-display text-[clamp(32px,4vw,48px)] leading-[1.1] tracking-[-0.025em] font-bold text-highlighted'
      }
    },

    pageCard: {
      slots: {
        title: 'font-display text-highlighted',
        leadingIcon: 'size-5 shrink-0 text-highlighted'
      }
    },

    separator: {
      defaultVariants: {
        color: 'neutral'
      }
    },

    modal: {
      slots: {
        // token --radius-lg (18px), reader max width
        content: 'bg-elevated divide-y divide-default flex flex-col focus:outline-none'
      }
    },

    progress: {
      // fluency bars + reading progress: thin track
      defaultVariants: {
        color: 'primary',
        size: 'sm'
      }
    },

    prose: {
      h1: {
        base: 'font-display text-4xl text-highlighted font-bold mb-8 scroll-mt-[calc(45px+var(--ui-header-height))] lg:scroll-mt-(--ui-header-height)'
      },
      h2: {
        base: 'font-display relative text-2xl text-highlighted font-bold mt-12 mb-6 scroll-mt-[calc(48px+45px+var(--ui-header-height))] lg:scroll-mt-[calc(48px+var(--ui-header-height))]'
      },
      h3: {
        base: 'font-display relative text-xl text-highlighted font-semibold mt-8 mb-3 scroll-mt-[calc(32px+45px+var(--ui-header-height))] lg:scroll-mt-[calc(32px+var(--ui-header-height))]'
      },
      pre: {
        // token .code: --bg fill, bordered, mono
        base: 'group font-mono text-[16px]/[1.7] border border-default bg-muted px-4.5 py-4 whitespace-pre-wrap wrap-break-word overflow-x-auto outline-primary/25 focus-visible:outline-3'
      },
      code: {
        base: 'px-1.5 text-sm font-mono rounded-xs font-medium inline-block'
      },
      callout: {
        base: 'group relative block px-4 py-3 rounded-xl text-[15px]/relaxed my-5 text-toned transition-colors'
      }
    }
  }
})
