/**
 * Utility Types
 * Common TypeScript utility types used across the project
 */

// Nullable and Optional types
export type Nullable<T> = T | null;
export type Optional<T> = T | undefined;
export type Maybe<T> = T | null | undefined;

// For API responses
export interface ApiResponse<T> {
  data: T;
  error?: string;
  status: number;
}

// For component props with children
export interface WithChildren {
  children?: any;
}

// For styled components
export interface WithClassName {
  class?: string;
  className?: string;
}

// For pagination
export interface PaginationProps {
  currentPage: number;
  totalPages: number;
  baseUrl?: string;
}

// For SEO metadata
export interface SEOMetadata {
  title: string;
  description: string;
  image?: string;
  imageAlt?: string;
  canonical?: string;
  noindex?: boolean;
  nofollow?: boolean;
}
