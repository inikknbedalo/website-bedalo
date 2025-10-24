import { z } from 'astro:content';

export const potensiSchema = ({ image }: { image: () => z.ZodType }) => z.object({
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
});
