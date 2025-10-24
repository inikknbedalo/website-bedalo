/**
 * Content Collection Types
 * Centralized type definitions for all content collections
 */

import type { CollectionEntry } from 'astro:content';

// All available collections
export type ContentCollections = 
  | 'berita'
  | 'pariwisata'
  | 'potensi'
  | 'akomodasi'
  | 'warung'
  | 'pages'
  | 'config'
  | 'government'
  | 'statistics';

// Generic content entry type
export type AnyContentEntry = CollectionEntry<ContentCollections>;

// Specific collection types
export type BeritaEntry = CollectionEntry<'berita'>;
export type PariwisataEntry = CollectionEntry<'pariwisata'>;
export type PotensiEntry = CollectionEntry<'potensi'>;
export type AkomodasiEntry = CollectionEntry<'akomodasi'>;
export type WarungEntry = CollectionEntry<'warung'>;
export type PagesEntry = CollectionEntry<'pages'>;
export type ConfigEntry = CollectionEntry<'config'>;
export type GovernmentEntry = CollectionEntry<'government'>;
export type StatisticsEntry = CollectionEntry<'statistics'>;

// Collection groups
export type TourismEntry = PariwisataEntry | AkomodasiEntry;
export type NewsEntry = BeritaEntry;
export type BusinessEntry = PotensiEntry | WarungEntry;

// Content with slug (for collections that have rendered content)
export type ContentWithSlug = BeritaEntry | PariwisataEntry | PotensiEntry | AkomodasiEntry | WarungEntry;

// Helper type for components that accept multiple collection types
export type ContentCardEntry = BeritaEntry | PariwisataEntry | PotensiEntry | AkomodasiEntry | WarungEntry;
