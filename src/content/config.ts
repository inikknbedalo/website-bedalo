import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';
import { beritaSchema, potensiSchema, pariwisataSchema } from './schemas';

// Collection 1: News articles
const berita = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/berita' }),
  schema: beritaSchema,
});

// Collection 2: Products/Potential (UMKM)
const potensi = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/potensi' }),
  schema: potensiSchema,
});

// Collection 3: Tourism destinations
const pariwisata = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/pariwisata' }),
  schema: ({ image }) => z.object({
    title: z.string(),
    description: z.string(),
    location: z.string(),
    facilities: z.array(z.string()).optional(),
    activities: z.array(z.string()).optional(),
    entrance: z.string().optional(),
    openingHours: z.string().optional(),
    image: image(),
    imageAlt: z.string(),
    gallery: z.array(image()).optional(),
    galleryAlts: z.array(z.string()).optional(),
    featured: z.boolean().default(false),
    draft: z.boolean().default(false),
  }),
});

// Collection 4: Accommodations
const akomodasi = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/akomodasi' }),
  schema: ({ image }) => z.object({
    title: z.string(),
    description: z.string(),
    type: z.enum(['homestay', 'penginapan', 'hotel', 'villa']),
    address: z.string(),
    contact: z.string(),
    price: z.string(),
    facilities: z.array(z.string()).optional(),
    capacity: z.number().optional(),
    image: image(),
    imageAlt: z.string(),
    draft: z.boolean().default(false),
  }),
});

// Collection 5: Local stores/restaurants (Warung)
const warung = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/warung' }),
  schema: ({ image }) => z.object({
    title: z.string(),
    description: z.string(),
    type: z.enum(['warung', 'restoran', 'kafe', 'toko']),
    owner: z.string(),
    address: z.string(),
    contact: z.string().optional(),
    openingHours: z.string().optional(),
    specialties: z.array(z.string()).optional(),
    image: image(),
    imageAlt: z.string(),
    draft: z.boolean().default(false),
  }),
});

// Collection 6: Site configuration (JSON)
const config = defineCollection({
  loader: glob({ pattern: '*.json', base: './src/content/config' }),
  schema: z.union([
    // site.json schema
    z.object({
      site: z.object({
        title: z.string(),
        description: z.string(),
        url: z.string().url(),
        author: z.string(),
        locale: z.string().default('id_ID'),
      }),
      contact: z.object({
        phone: z.string(),
        whatsapp: z.string().optional(),
        email: z.string().email(),
        address: z.string(),
        maps: z.string().url().optional(),
      }),
      social: z.object({
        instagram: z.string().url().optional(),
        youtube: z.string().url().optional(),
        tiktok: z.string().url().optional(),
        facebook: z.string().url().optional(),
        twitter: z.string().url().optional(),
      }),
      navigation: z.array(
        z.object({
          label: z.string(),
          href: z.string(),
          primary: z.boolean().default(false),
        })
      ),
      constants: z.object({
        pagination: z.object({
          articlesPerPage: z.number().default(6),
          itemsPerPage: z.number().default(10),
        }),
      }).optional(),
      seo: z.object({
        organization: z.object({
          name: z.string(),
          type: z.string(),
          url: z.string().url(),
          logo: z.string().url(),
        }),
        defaultImage: z.string().url(),
        schemaContext: z.string().url(),
      }).optional(),
    }),
    // dashboard.json schema
    z.object({
      spreadsheetId: z.string(),
      sheetName: z.string(),
      refreshInterval: z.number(),
      maxRetries: z.number(),
      retryDelay: z.number(),
      sessionKey: z.string(),
      sessionDuration: z.number(),
      itemsPerPage: z.number(),
    }),
    // resources.json schema
    z.object({
      fonts: z.array(
        z.object({
          name: z.string(),
          url: z.string().url(),
          weights: z.array(z.number()),
          preconnect: z.array(z.string().url()),
        })
      ),
      cdns: z.array(
        z.object({
          name: z.string(),
          url: z.string().url(),
          version: z.string(),
          preconnect: z.string().url(),
          integrity: z.string().optional(),
        })
      ),
      theme: z.object({
        primaryColor: z.string(),
        favicon: z.string(),
        appleTouchIcon: z.string(),
        manifest: z.string(),
      }),
    }),
    // ui.json schema
    z.object({
      animations: z.object({
        countUpDuration: z.number(),
        intersectionThreshold: z.number(),
        useEasing: z.boolean(),
        useGrouping: z.boolean(),
      }),
      transitions: z.object({
        defaultDuration: z.number(),
        hoverScale: z.number(),
        hoverTranslateY: z.number(),
      }),
    }),
    // sharing.json schema
    z.object({
      platforms: z.array(
        z.object({
          name: z.string(),
          label: z.string(),
          icon: z.string(),
          urlTemplate: z.string(),
          enabled: z.boolean(),
        })
      ),
    }),
  ]),
});

// Collection 7: Page-specific content (JSON)
const pages = defineCollection({
  loader: glob({ pattern: '**/*.json', base: './src/content/pages' }),
  schema: ({ image }) => z.union([
    // Standard page schema
    z.object({
      page: z.string(),
      hero: z.object({
        title: z.string(),
        subtitle: z.string(),
        image: image(),
        imageAlt: z.string(),
        cta: z.object({
          text: z.string(),
          href: z.string(),
        }).optional(),
      }).optional(),
      welcome: z.object({
        title: z.string(),
        content: z.string(),
        profile: z.object({
          name: z.string(),
          title: z.string(),
          photo: image(),
          photoAlt: z.string(),
          link: z.string(),
        }).optional(),
      }).optional(),
      intro: z.object({
        content: z.string(),
        title: z.string().optional(),
        subtitle: z.string().optional(),
        image: image().optional(),
        imageAlt: z.string().optional(),
      }).optional(),
      team: z.object({
        title: z.string(),
        members: z.array(z.object({
          name: z.string(),
          major: z.string(),
          photo: image(),
          photoAlt: z.string(),
        })),
      }).optional(),
      gallery: z.object({
        images: z.array(z.object({
          src: image(),
          alt: z.string(),
          category: z.string().optional(),
        })),
      }).optional(),
      categories: z.array(z.string()).optional(),
      sections: z.array(z.object({
        id: z.string(),
        title: z.string(),
        subtitle: z.string().optional(),
        content: z.string().optional(),
        items: z.array(z.any()).optional(),
        cta: z.object({
          text: z.string(),
          href: z.string(),
        }).optional(),
        images: z.array(z.union([
          image(),
          z.object({
            src: image(),
            alt: z.string(),
            category: z.string().optional(),
          })
        ])).optional(),
        imageAlts: z.array(z.string()).optional(),
        showOfficials: z.boolean().optional(),
        videos: z.array(z.object({
          url: z.string(),
          title: z.string(),
          thumbnail: z.string(),
        })).optional(),
      })).optional(),
    }),
    // Privacy policy schema
    z.object({
      page: z.literal('privacy-policy'),
      title: z.string(),
      subtitle: z.string(),
      lastUpdated: z.string(),
      sections: z.array(
        z.object({
          id: z.string(),
          title: z.string(),
          icon: z.string(),
          iconColor: z.string(),
          content: z.array(z.string()),
          list: z.array(z.string()).optional(),
          note: z.string().optional(),
        })
      ),
    }),
    // 404 page schema
    z.object({
      page: z.literal('404'),
      title: z.string(),
      message: z.string(),
      icon: z.string(),
      iconColor: z.string(),
      actions: z.array(
        z.object({
          label: z.string(),
          href: z.string(),
          icon: z.string(),
          variant: z.enum(['primary', 'secondary']),
        })
      ),
    }),
  ]),
});

// Collection 8: Government officials (JSON)
const government = defineCollection({
  loader: glob({ pattern: '*.json', base: './src/content/government' }),
  schema: ({ image }) => z.object({
    officials: z.array(
      z.object({
        id: z.string(),
        name: z.string(),
        position: z.string(),
        period: z.string().optional(),
        photo: image(),
        photoAlt: z.string(),
        contact: z.string().optional(),
        description: z.string().optional(),
      })
    ),
  }),
});

// Collection 9: Statistics (JSON)
const statistics = defineCollection({
  loader: glob({ pattern: '*.json', base: './src/content/statistics' }),
  schema: z.object({
    stats: z.array(
      z.object({
        id: z.string(),
        label: z.string(),
        value: z.string(),
        suffix: z.string().optional(),
        icon: z.string(),
        description: z.string().optional(),
      })
    ),
  }),
});

// Collection 10: Forms (JSON)
const forms = defineCollection({
  loader: glob({ pattern: '*.json', base: './src/content/forms' }),
  schema: z.object({
    formId: z.string(),
    formType: z.enum(['google-forms', 'custom']),
    formAction: z.string().url(),
    title: z.string(),
    description: z.string(),
    fields: z.array(
      z.object({
        id: z.string(),
        name: z.string(),
        label: z.string(),
        type: z.enum(['text', 'email', 'tel', 'textarea', 'select', 'radio', 'checkbox']),
        placeholder: z.string().optional(),
        rows: z.number().optional(),
        required: z.boolean().default(false),
        options: z.array(z.string()).optional(),
      })
    ),
    successMessage: z.object({
      icon: z.string(),
      title: z.string(),
      message: z.string(),
      buttonText: z.string(),
    }),
    errorMessage: z.object({
      icon: z.string(),
      title: z.string(),
      message: z.string(),
      buttonText: z.string(),
    }).optional(),
  }),
});

// Collection 11: Surveys (JSON)
const surveys = defineCollection({
  loader: glob({ pattern: '*.json', base: './src/content/surveys' }),
  schema: z.union([
    // teams.json schema
    z.object({
      title: z.string(),
      description: z.string(),
      databaseUrl: z.string().url(),
      teams: z.array(
        z.object({
          id: z.number(),
          name: z.string(),
          color: z.string(),
          description: z.string(),
          forms: z.array(
            z.object({
              title: z.string(),
              url: z.string().url(),
              color: z.string(),
            })
          ),
        })
      ),
      colorClasses: z.record(z.string()).optional(),
    }),
    // schedule.json schema
    z.object({
      schedule: z.array(
        z.object({
          day: z.number(),
          title: z.string(),
          color: z.string(),
          sessions: z.array(
            z.object({
              time: z.string(),
              title: z.string(),
              description: z.string(),
            })
          ),
        })
      ),
    }),
    // guidelines.json schema
    z.object({
      guidelines: z.array(
        z.object({
          id: z.string(),
          icon: z.string(),
          iconColor: z.string(),
          title: z.string(),
          description: z.string(),
        })
      ),
    }),
  ]),
});

export const collections = {
  berita,
  potensi,
  pariwisata,
  akomodasi,
  warung,
  config,
  pages,
  government,
  statistics,
  forms,
  surveys,
};
