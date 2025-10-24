import type { CollectionEntry } from 'astro:content';

type ContentCollection = 'berita' | 'potensi' | 'pariwisata' | 'akomodasi' | 'warung';

export function getFeaturedEntries<T extends ContentCollection>(
  entries: CollectionEntry<T>[],
  limit?: number
): CollectionEntry<T>[] {
  const featured = entries.filter((entry) => {
    const data = entry.data as { featured?: boolean; draft?: boolean };
    return data.featured === true && data.draft !== true;
  });

  return limit ? featured.slice(0, limit) : featured;
}

export function sortByDate<T extends ContentCollection>(
  entries: CollectionEntry<T>[],
  order: 'asc' | 'desc' = 'desc'
): CollectionEntry<T>[] {
  return entries.sort((a, b) => {
    const dateA = (a.data as { pubDate?: Date }).pubDate;
    const dateB = (b.data as { pubDate?: Date }).pubDate;

    if (!dateA || !dateB) return 0;

    const comparison = dateA.getTime() - dateB.getTime();
    return order === 'asc' ? comparison : -comparison;
  });
}

export function filterDraft<T extends ContentCollection>(
  entries: CollectionEntry<T>[]
): CollectionEntry<T>[] {
  return entries.filter((entry) => {
    const data = entry.data as { draft?: boolean };
    return data.draft !== true;
  });
}

export function filterByCategory<T extends ContentCollection>(
  entries: CollectionEntry<T>[],
  category: string
): CollectionEntry<T>[] {
  return entries.filter((entry) => {
    const data = entry.data as { category?: string };
    return data.category === category;
  });
}

export function filterByTag<T extends 'berita'>(
  entries: CollectionEntry<T>[],
  tag: string
): CollectionEntry<T>[] {
  return entries.filter((entry) => {
    const data = entry.data as { tags?: string[] };
    return data.tags?.includes(tag);
  });
}

export function groupByCategory<T extends ContentCollection>(
  entries: CollectionEntry<T>[]
): Map<string, CollectionEntry<T>[]> {
  const grouped = new Map<string, CollectionEntry<T>[]>();

  entries.forEach((entry) => {
    const data = entry.data as { category?: string };
    const category = data.category || 'lainnya';

    if (!grouped.has(category)) {
      grouped.set(category, []);
    }

    const categoryEntries = grouped.get(category);
    if (categoryEntries) {
      categoryEntries.push(entry);
    }
  });

  return grouped;
}
