interface MetaTags {
  title: string;
  description: string;
  canonical: string;
  ogImage: string;
  ogType?: string;
}

interface PageInfo {
  title: string;
  description: string;
  path: string;
  image?: string;
  type?: string;
}

export function generateMetaTags(page: PageInfo, siteUrl: string): MetaTags {
  const canonical = new URL(page.path, siteUrl).href;
  const ogImage = page.image || `${siteUrl}/assets/images/ngedan.webp`;

  return {
    title: page.title,
    description: page.description,
    canonical,
    ogImage,
    ogType: page.type || 'website',
  };
}

export function getCanonicalURL(path: string, siteUrl: string): string {
  return new URL(path, siteUrl).href;
}

export function getOGImageURL(
  params: {
    title?: string;
    category?: string;
  },
  siteUrl: string
): string {
  const searchParams = new URLSearchParams();

  if (params.title) {
    searchParams.set('title', params.title);
  }

  if (params.category) {
    searchParams.set('category', params.category);
  }

  const queryString = searchParams.toString();
  return queryString ? `${siteUrl}/og-image?${queryString}` : `${siteUrl}/og-image`;
}

export function generateStructuredData(data: {
  type: 'WebSite' | 'Organization' | 'Article' | 'LocalBusiness';
  name?: string;
  description?: string;
  url?: string;
  author?: string;
  datePublished?: string;
  dateModified?: string;
  image?: string;
}): string {
  const structuredData = {
    '@context': 'https://schema.org',
    '@type': data.type,
    ...data,
  };

  return JSON.stringify(structuredData);
}
