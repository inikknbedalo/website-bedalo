import { z } from 'astro:content';

export const beritaSchema = ({ image }: { image: () => z.ZodType }) => z.object({
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
});
