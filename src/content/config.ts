import { defineCollection, z } from 'astro:content';
import { glob, file } from 'astro/loaders';

// Collection 1: News articles
const berita = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/berita' }),
  schema: ({ image }) => z.object({
    title: z.string(),
    description: z.string(),
    pubDate: z.coerce.date(),
    updatedDate: z.coerce.date().optional(),
    author: z.string(),
    image: image(),
    imageAlt: z.string(),
    imageCaption: z.string().optional(),
    category: z.string(),
    tags: z.array(z.string()).optional(),
    draft: z.boolean().default(false),
  }),
});

// Collection 2: Products/Potential (UMKM)
const potensi = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/potensi' }),
  schema: ({ image }) => z.object({
    title: z.string(),
    description: z.string(),
    publishDate: z.coerce.date().optional(),
    category: z.enum(['pertanian', 'kerajinan', 'kuliner', 'jasa', 'lainnya']),
    owner: z.string(),
    contact: z.string().optional(),
    price: z.string().optional(),
    image: image(),
    imageAlt: z.string(),
    featured: z.boolean().default(false),
    draft: z.boolean().default(false),
  }),
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
  schema: z.object({
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
  }),
});

// Collection 7: Page-specific content (JSON)
const pages = defineCollection({
  loader: glob({ pattern: '**/*.json', base: './src/content/pages' }),
  schema: ({ image }) => z.object({
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
};
