import { getEntry } from 'astro:content';

const siteConfigEntry = await getEntry('config', 'site');

if (!siteConfigEntry || !('site' in siteConfigEntry.data)) {
  throw new Error('Site configuration not found');
}

const siteConfig = siteConfigEntry.data;
export const ARTICLES_PER_PAGE = siteConfig.constants?.pagination.articlesPerPage ?? 6;

