import { z } from 'astro:content';

export const pariwisataSchema = ({ image }: { image: () => z.ZodType }) => z.object({
  title: z.string(),
  description: z.string(),
  location: z.string(),
  facilities: z.array(z.string()).optional(),
  activities: z.array(z.string()).optional(),
  entrance: z.string().optional(),
  openingHours: z.string().optional(),
  image: image(),
  imageAlt: z.string(),
  gallery: z.array(z.object({
    src: z.string(),
    alt: z.string(),
  })).optional(),
  mapEmbed: z.string().optional(),
  featured: z.boolean().default(false),
  draft: z.boolean().default(false),
});
