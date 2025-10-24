# Migration Plan 2: Content Collections & Schema Definitions

**Target:** Define and configure all Astro Content Collections with Zod schemas, set up content loaders, and migrate existing content files.

---

## Phase 2.1: Configure Content Collections Foundation

### Task 2.1.1: Create Content Configuration File
**Objective:** Set up the main content collections configuration with TypeScript and Zod validation.

**Actions:**
1. Create `src/content/config.ts`:
   ```typescript
   import { defineCollection, z } from 'astro:content';
   import { glob } from 'astro/loaders';
   
   // Image helper for local images in content
   const imageSchema = z.object({
     src: z.string(),
     alt: z.string(),
     caption: z.string().optional(),
   });
   
   // We'll define collections in subsequent tasks
   export const collections = {};
   ```
2. Run `npm run sync` to generate TypeScript types
3. Verify `astro check` passes without errors

**Success Criteria:**
- Content config file is recognized by Astro
- TypeScript types are generated in `.astro/`
- No compilation errors

**Context7 Reference:**
```typescript
// From Astro docs - Content Collections setup
import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const blog = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/blog' }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    pubDate: z.coerce.date(),
  })
});
```

---

### Task 2.1.2: Define Berita (News) Collection Schema
**Objective:** Create schema for news articles with comprehensive validation.

**Actions:**
1. Update `src/content/config.ts` to include berita collection:
   ```typescript
   const berita = defineCollection({
     loader: glob({
       pattern: '**/*.{md,mdx}',
       base: './src/content/berita',
     }),
     schema: z.object({
       title: z.string(),
       description: z.string(),
       pubDate: z.coerce.date(),
       updatedDate: z.coerce.date().optional(),
       author: z.string().default('Tim KKN Bedalo'),
       image: z.object({
         src: z.string(),
         alt: z.string(),
       }),
       category: z.enum([
         'pembangunan',
         'kegiatan',
         'umkm',
         'wisata',
         'budaya',
         'kesehatan',
         'pendidikan',
         'pengumuman',
       ]),
       tags: z.array(z.string()).default([]),
       featured: z.boolean().default(false),
       draft: z.boolean().default(false),
       readingTime: z.number().optional(),
     }),
   });
   ```
2. Create sample markdown file `src/content/berita/sample-article.md`:
   ```markdown
   ---
   title: "Artikel Contoh"
   description: "Ini adalah artikel contoh untuk testing collection"
   pubDate: 2024-01-15
   author: "Tim KKN Bedalo"
   image:
     src: "/assets/images/ngedan.webp"
     alt: "Pantai Ngedan"
   category: "kegiatan"
   tags: ["kkn", "kegiatan", "masyarakat"]
   featured: true
   draft: false
   ---
   
   # Artikel Contoh
   
   Ini adalah konten artikel contoh untuk menguji Astro Content Collections.
   ```
3. Run `npm run sync` to regenerate types
4. Verify schema validation works

**Success Criteria:**
- Berita collection is properly defined
- Sample article validates against schema
- TypeScript types are generated for BeritaEntry
- Invalid content would throw Zod validation errors

---

### Task 2.1.3: Define Potensi (Products) Collection Schema
**Objective:** Create schema for UMKM products and village resources.

**Actions:**
1. Add potensi collection to `src/content/config.ts`:
   ```typescript
   const potensi = defineCollection({
     loader: glob({
       pattern: '**/*.{md,mdx}',
       base: './src/content/potensi',
     }),
     schema: z.object({
       title: z.string(),
       description: z.string(),
       category: z.enum([
         'umkm',
         'pertanian',
         'perkebunan',
         'kerajinan',
         'kuliner',
         'jasa',
       ]),
       subcategory: z.string().optional(),
       images: z.array(
         z.object({
           src: z.string(),
           alt: z.string(),
           caption: z.string().optional(),
         })
       ),
       price: z.object({
         amount: z.number().optional(),
         unit: z.string().optional(),
         range: z.string().optional(),
         currency: z.string().default('IDR'),
       }).optional(),
       contact: z.object({
         name: z.string().optional(),
         phone: z.string().optional(),
         whatsapp: z.string().optional(),
         email: z.string().email().optional(),
       }).optional(),
       features: z.array(z.string()).default([]),
       availability: z.enum(['tersedia', 'preorder', 'habis']).default('tersedia'),
       featured: z.boolean().default(false),
       publishDate: z.coerce.date().default(() => new Date()),
     }),
   });
   ```
2. Create sample product files:
   - `src/content/potensi/gula-aren-asli.md`
   - `src/content/potensi/keripik-singkong.md`
   - `src/content/potensi/gaplek.md`
3. Example content for gula-aren-asli.md:
   ```markdown
   ---
   title: "Gula Aren Asli Dusun Bedalo"
   description: "Gula aren murni tanpa campuran, diproses secara tradisional"
   category: "umkm"
   subcategory: "kuliner"
   images:
     - src: "/assets/images/products/gula-aren-1.webp"
       alt: "Gula Aren Dusun Bedalo"
       caption: "Gula aren murni khas Bedalo"
   price:
     amount: 35000
     unit: "per kg"
     currency: "IDR"
   contact:
     phone: "+62-831-0758-1144"
     whatsapp: "6283107581144"
   features:
     - "100% murni tanpa campuran"
     - "Proses tradisional"
     - "Manis alami"
     - "Indeks glikemik rendah"
   availability: "tersedia"
   featured: true
   publishDate: 2024-01-10
   ---
   
   # Gula Aren Asli Dusun Bedalo
   
   Gula aren murni dari hasil sadapan pohon aren lokal...
   ```
4. Sync and validate all product files

**Success Criteria:**
- Potensi collection schema covers all product types
- Price structure handles various pricing models
- Contact information is properly validated
- All three existing products are migrated successfully

---

### Task 2.1.4: Define Pariwisata (Tourism) Collection Schema
**Objective:** Create schema for tourism destinations and attractions.

**Actions:**
1. Add pariwisata collection to `src/content/config.ts`:
   ```typescript
   const pariwisata = defineCollection({
     loader: glob({
       pattern: '**/*.{md,mdx}',
       base: './src/content/pariwisata',
     }),
     schema: z.object({
       title: z.string(),
       description: z.string(),
       type: z.enum([
         'pantai',
         'gunung',
         'air-terjun',
         'gua',
         'budaya',
         'kuliner',
         'lainnya',
       ]),
       location: z.object({
         address: z.string(),
         coordinates: z.object({
           lat: z.number(),
           lng: z.number(),
         }).optional(),
         distance: z.string().optional(),
         accessInfo: z.string().optional(),
       }),
       images: z.array(
         z.object({
           src: z.string(),
           alt: z.string(),
           caption: z.string().optional(),
         })
       ),
       facilities: z.array(z.string()).default([]),
       activities: z.array(z.string()).default([]),
       entryFee: z.object({
         weekday: z.string().optional(),
         weekend: z.string().optional(),
         notes: z.string().optional(),
       }).optional(),
       openingHours: z.string().optional(),
       bestTimeToVisit: z.string().optional(),
       difficulty: z.enum(['mudah', 'sedang', 'sulit']).optional(),
       featured: z.boolean().default(false),
       publishDate: z.coerce.date().default(() => new Date()),
     }),
   });
   ```
2. Migrate existing tourism pages:
   - `src/content/pariwisata/pantai-ngedan.md`
   - `src/content/pariwisata/pantai-ngluwen.md`
3. Example for pantai-ngedan.md:
   ```markdown
   ---
   title: "Pantai Ngedan"
   description: "Pantai eksotis dengan pemandangan sunset menakjubkan"
   type: "pantai"
   location:
     address: "Dusun Bedalo, Desa Krambilsawit, Kec. Saptosari, Gunungkidul"
     coordinates:
       lat: -8.1847
       lng: 110.5571
     distance: "~3 km dari pusat dusun"
     accessInfo: "Dapat diakses dengan motor atau mobil"
   images:
     - src: "/assets/images/ngedan.webp"
       alt: "Pantai Ngedan sunset"
       caption: "Sunset di Pantai Ngedan"
   facilities:
     - "Area parkir"
     - "Gazebo"
     - "Toilet"
     - "Warung makan"
   activities:
     - "Berenang"
     - "Fotografi"
     - "Mancing"
     - "Menikmati sunset"
   entryFee:
     weekday: "Rp 5.000"
     weekend: "Rp 10.000"
     notes: "Harga dapat berubah sewaktu-waktu"
   openingHours: "24 jam"
   bestTimeToVisit: "Sore hari (16:00 - 18:00) untuk menikmati sunset"
   difficulty: "mudah"
   featured: true
   publishDate: 2024-01-05
   ---
   
   # Pantai Ngedan
   
   Pantai Ngedan adalah destinasi wisata unggulan...
   ```
4. Validate both tourism destination files

**Success Criteria:**
- Pariwisata schema covers all destination types
- Location data structure supports maps integration
- Facilities and activities are flexible arrays
- Both beaches are successfully migrated

---

### Task 2.1.5: Define Akomodasi (Accommodation) Collection Schema
**Objective:** Create schema for lodging listings.

**Actions:**
1. Add akomodasi collection to `src/content/config.ts`:
   ```typescript
   const akomodasi = defineCollection({
     loader: glob({
       pattern: '**/*.{md,mdx}',
       base: './src/content/akomodasi',
     }),
     schema: z.object({
       name: z.string(),
       description: z.string(),
       type: z.enum(['homestay', 'guesthouse', 'villa', 'camping', 'hotel']),
       images: z.array(
         z.object({
           src: z.string(),
           alt: z.string(),
           caption: z.string().optional(),
         })
       ),
       location: z.object({
         address: z.string(),
         distanceToBeach: z.string().optional(),
         coordinates: z.object({
           lat: z.number(),
           lng: z.number(),
         }).optional(),
       }),
       capacity: z.object({
         rooms: z.number(),
         guests: z.number(),
         beds: z.number().optional(),
       }),
       pricing: z.object({
         perNight: z.number(),
         perWeek: z.number().optional(),
         perMonth: z.number().optional(),
         currency: z.string().default('IDR'),
         notes: z.string().optional(),
       }),
       amenities: z.array(z.string()).default([]),
       houseRules: z.array(z.string()).default([]),
       contact: z.object({
         owner: z.string(),
         phone: z.string(),
         whatsapp: z.string().optional(),
         email: z.string().email().optional(),
       }),
       availability: z.enum(['tersedia', 'penuh', 'tutup']).default('tersedia'),
       rating: z.number().min(0).max(5).optional(),
       featured: z.boolean().default(false),
       publishDate: z.coerce.date().default(() => new Date()),
     }),
   });
   ```
2. Create sample accommodation:
   - `src/content/akomodasi/homestay-bedalo-1.md`
3. Example content:
   ```markdown
   ---
   name: "Homestay Bedalo Asri"
   description: "Penginapan nyaman dengan pemandangan hijau"
   type: "homestay"
   images:
     - src: "/assets/images/accommodations/homestay-1.webp"
       alt: "Homestay Bedalo Asri"
   location:
     address: "RT 02, Dusun Bedalo, Krambilsawit"
     distanceToBeach: "2 km ke Pantai Ngedan"
   capacity:
     rooms: 3
     guests: 10
     beds: 5
   pricing:
     perNight: 150000
     perWeek: 900000
     currency: "IDR"
     notes: "Harga sudah termasuk sarapan"
   amenities:
     - "WiFi gratis"
     - "Dapur bersama"
     - "Kamar mandi dalam"
     - "Parkir gratis"
     - "Teras"
   houseRules:
     - "Check-in: 14:00"
     - "Check-out: 12:00"
     - "Tidak merokok di dalam ruangan"
     - "Hewan peliharaan tidak diperbolehkan"
   contact:
     owner: "Pak Sumindar"
     phone: "+62-831-0758-1144"
     whatsapp: "6283107581144"
   availability: "tersedia"
   featured: true
   publishDate: 2024-01-08
   ---
   
   # Homestay Bedalo Asri
   
   Homestay nyaman di tengah dusun...
   ```
4. Validate accommodation content

**Success Criteria:**
- Akomodasi schema handles all lodging types
- Pricing structure is flexible
- Amenities and rules are well-structured
- Sample accommodation validates successfully

---

### Task 2.1.6: Define Warung (Local Stores) Collection Schema
**Objective:** Create schema for local business directory.

**Actions:**
1. Add warung collection to `src/content/config.ts`:
   ```typescript
   const warung = defineCollection({
     loader: glob({
       pattern: '**/*.{md,mdx}',
       base: './src/content/warung',
     }),
     schema: z.object({
       name: z.string(),
       description: z.string(),
       type: z.enum([
         'warung-makan',
         'toko-kelontong',
         'toko-bangunan',
         'bengkel',
         'jasa',
         'lainnya',
       ]),
       owner: z.string(),
       images: z.array(
         z.object({
           src: z.string(),
           alt: z.string(),
         })
       ).optional(),
       location: z.object({
         address: z.string(),
         rt: z.string().optional(),
         landmark: z.string().optional(),
       }),
       products: z.array(z.string()).default([]),
       services: z.array(z.string()).default([]),
       openingHours: z.object({
         weekdays: z.string(),
         weekends: z.string().optional(),
         notes: z.string().optional(),
       }).optional(),
       contact: z.object({
         phone: z.string().optional(),
         whatsapp: z.string().optional(),
       }).optional(),
       paymentMethods: z.array(
         z.enum(['tunai', 'transfer', 'e-wallet', 'qris'])
       ).default(['tunai']),
       featured: z.boolean().default(false),
       publishDate: z.coerce.date().default(() => new Date()),
     }),
   });
   ```
2. Create sample warung entry:
   - `src/content/warung/warung-bu-sri.md`
3. Example content:
   ```markdown
   ---
   name: "Warung Bu Sri"
   description: "Warung makan dengan menu masakan rumahan"
   type: "warung-makan"
   owner: "Ibu Sri"
   location:
     address: "RT 01, Dusun Bedalo"
     landmark: "Dekat balai dusun"
   products:
     - "Nasi goreng"
     - "Mie goreng"
     - "Pecel"
     - "Soto ayam"
   services:
     - "Makan di tempat"
     - "Bungkus"
   openingHours:
     weekdays: "07:00 - 20:00"
     weekends: "07:00 - 21:00"
   contact:
     phone: "+62-812-xxxx-xxxx"
   paymentMethods:
     - "tunai"
     - "transfer"
   featured: false
   publishDate: 2024-01-12
   ---
   
   # Warung Bu Sri
   
   Warung makan dengan cita rasa rumahan...
   ```
4. Validate warung content

**Success Criteria:**
- Warung schema covers various business types
- Opening hours structure is flexible
- Payment methods are well-defined
- Sample entry validates correctly

---

## Phase 2.2: Export Collections and Generate Types

### Task 2.2.1: Complete Collections Export
**Objective:** Export all defined collections in content config.

**Actions:**
1. Update `src/content/config.ts` final export:
   ```typescript
   import { defineCollection, z } from 'astro:content';
   import { glob } from 'astro/loaders';
   
   // [All collection definitions from previous tasks]
   
   export const collections = {
     berita,
     potensi,
     pariwisata,
     akomodasi,
     warung,
   };
   ```
2. Run `npm run sync` to generate TypeScript types
3. Verify `.astro/types.d.ts` is created with all collection types
4. Test that IntelliSense recognizes collection names

**Success Criteria:**
- All five collections are exported
- TypeScript types are generated
- No compilation errors
- IntelliSense works for `getCollection('berita')` etc.

---

### Task 2.2.2: Update Type Definitions
**Objective:** Export collection types for use across the project.

**Actions:**
1. Update `src/types/content.ts`:
   ```typescript
   import type { CollectionEntry } from 'astro:content';
   
   // Collection entry types
   export type BeritaEntry = CollectionEntry<'berita'>;
   export type PotensiEntry = CollectionEntry<'potensi'>;
   export type PariwisataEntry = CollectionEntry<'pariwisata'>;
   export type AkomodasiEntry = CollectionEntry<'akomodasi'>;
   export type WarungEntry = CollectionEntry<'warung'>;
   
   // Utility types for frontmatter access
   export type BeritaData = BeritaEntry['data'];
   export type PotensiData = PotensiEntry['data'];
   export type PariwisataData = PariwisataEntry['data'];
   export type AkomodasiData = AkomodasiEntry['data'];
   export type WarungData = WarungEntry['data'];
   
   // Helper type for rendered content
   export type RenderedEntry<T extends CollectionEntry<any>> = {
     entry: T;
     Content: any;
     headings: { depth: number; slug: string; text: string }[];
   };
   ```
2. Create helper functions file `src/utils/collections.ts`:
   ```typescript
   import { getCollection, getEntry, type CollectionEntry } from 'astro:content';
   
   /**
    * Get all published (non-draft) entries from a collection
    */
   export async function getPublishedEntries<T extends keyof typeof collections>(
     collection: T
   ) {
     const entries = await getCollection(collection);
     return entries.filter((entry) => {
       const data = entry.data as any;
       return !data.draft;
     });
   }
   
   /**
    * Get featured entries from a collection
    */
   export async function getFeaturedEntries<T extends keyof typeof collections>(
     collection: T
   ) {
     const entries = await getCollection(collection);
     return entries.filter((entry) => {
       const data = entry.data as any;
       return data.featured === true && !data.draft;
     });
   }
   
   /**
    * Get entries sorted by date (newest first)
    */
   export async function getEntriesByDate<T extends keyof typeof collections>(
     collection: T,
     limit?: number
   ) {
     const entries = await getCollection(collection);
     const sortedEntries = entries
       .filter((entry) => {
         const data = entry.data as any;
         return !data.draft;
       })
       .sort((a, b) => {
         const dateA = (a.data as any).pubDate || (a.data as any).publishDate;
         const dateB = (b.data as any).pubDate || (b.data as any).publishDate;
         return new Date(dateB).getTime() - new Date(dateA).getTime();
       });
     
     return limit ? sortedEntries.slice(0, limit) : sortedEntries;
   }
   ```
3. Test helper functions work with TypeScript inference

**Success Criteria:**
- All collection types are properly exported
- Helper functions provide type safety
- IntelliSense shows correct types

---

## Phase 2.3: Migrate Existing Content

### Task 2.3.1: Migrate News Articles
**Objective:** Convert existing news HTML to markdown content.

**Actions:**
1. Review existing `berita/artikel-contoh.html`
2. Extract content and metadata
3. Create markdown file with proper frontmatter
4. Create at least 3 sample news articles:
   - `src/content/berita/pembangunan-jalan-desa.md`
   - `src/content/berita/festival-budaya-bedalo.md`
   - `src/content/berita/pelatihan-umkm.md`
5. Example migration:
   ```markdown
   ---
   title: "Pembangunan Jalan Desa Meningkatkan Akses Wisata"
   description: "Proyek pembangunan jalan desa untuk memudahkan akses ke destinasi wisata"
   pubDate: 2024-02-10
   author: "Tim KKN Bedalo"
   image:
     src: "/assets/images/news/jalan-desa.webp"
     alt: "Pembangunan jalan desa"
   category: "pembangunan"
   tags: ["infrastruktur", "wisata", "pembangunan"]
   featured: true
   draft: false
   ---
   
   # Pembangunan Jalan Desa Meningkatkan Akses Wisata
   
   Dusun Bedalo kini memiliki akses jalan yang lebih baik...
   
   ## Dampak Positif
   
   Pembangunan ini memberikan dampak:
   - Akses lebih mudah ke pantai
   - Meningkatkan kunjungan wisatawan
   - Mendukung ekonomi lokal
   ```
6. Validate all news articles

**Success Criteria:**
- At least 3 news articles created
- All articles validate against berita schema
- Images paths are correct
- Frontmatter is complete and accurate

---

### Task 2.3.2: Migrate Product Pages
**Objective:** Convert product HTML pages to markdown.

**Actions:**
1. Review existing product pages:
   - `potensi/gula-aren-asli.html`
   - `potensi/keripik-singkong.html`
   - `potensi/gaplek.html`
2. Extract structured data (price, features, contact)
3. Convert to markdown with proper frontmatter (already done in Task 2.1.3)
4. Ensure all product images are referenced correctly
5. Add additional sample products if needed:
   - `src/content/potensi/kopi-bedalo.md`
   - `src/content/potensi/sayuran-organik.md`

**Success Criteria:**
- All 3 existing products are migrated
- Product schemas validate
- Images and contact info are preserved
- Content structure is clean and readable

---

### Task 2.3.3: Migrate Tourism Destinations
**Objective:** Convert tourism HTML to markdown (already started in Task 2.1.4).

**Actions:**
1. Complete migration of:
   - Pantai Ngedan
   - Pantai Ngluwen
2. Ensure location data is accurate
3. Add facility and activity lists
4. Include access information
5. Add photos to `/public/assets/images/tourism/`
6. Validate both destinations

**Success Criteria:**
- Both beaches fully migrated
- Location coordinates are accurate
- Facilities and activities lists are comprehensive
- Images are properly referenced

---

### Task 2.3.4: Create Accommodation Entries
**Objective:** Migrate accommodation directory to content collection.

**Actions:**
1. Review existing `akomodasi/` directory
2. Create at least 2-3 accommodation entries
3. Gather real data if available, or create realistic placeholders
4. Ensure pricing and contact info are current
5. Add photos to `/public/assets/images/accommodations/`

**Success Criteria:**
- At least 2 accommodations are created
- All required fields are filled
- Contact information is accurate
- Amenities lists are complete

---

### Task 2.3.5: Create Warung Directory Entries
**Objective:** Populate warung collection with local businesses.

**Actions:**
1. Create 3-5 warung entries based on local businesses
2. Gather opening hours and contact information
3. Add business photos if available
4. Include product/service lists
5. Organize by business type

**Success Criteria:**
- At least 3 warung entries created
- Business information is accurate
- Contact details are current
- Opening hours are specified

---

## Phase 2.4: Content Validation & Testing

### Task 2.4.1: Validate All Content Collections
**Objective:** Ensure all content passes Zod schema validation.

**Actions:**
1. Run `npm run build` to trigger validation
2. Fix any schema validation errors
3. Check that required fields are present
4. Verify date formats are correct
5. Ensure enums match allowed values
6. Test with intentionally invalid data to confirm validation works

**Success Criteria:**
- Build completes without validation errors
- All content entries are valid
- Schema catches invalid data appropriately
- TypeScript types are correct

---

### Task 2.4.2: Test Content Queries
**Objective:** Verify content can be queried correctly.

**Actions:**
1. Create test page `src/pages/test-collections.astro`:
   ```astro
   ---
   import { getCollection } from 'astro:content';
   import { getPublishedEntries, getFeaturedEntries } from '@utils/collections';
   
   const allBerita = await getCollection('berita');
   const publishedBerita = await getPublishedEntries('berita');
   const featuredBerita = await getFeaturedEntries('berita');
   
   const allPotensi = await getCollection('potensi');
   const allPariwisata = await getCollection('pariwisata');
   const allAkomodasi = await getCollection('akomodasi');
   const allWarung = await getCollection('warung');
   ---
   
   <html>
     <body>
       <h1>Content Collections Test</h1>
       
       <h2>Berita ({allBerita.length} total)</h2>
       <ul>
         {publishedBerita.map((entry) => (
           <li>{entry.data.title} - {entry.data.category}</li>
         ))}
       </ul>
       
       <h2>Featured Berita ({featuredBerita.length})</h2>
       <ul>
         {featuredBerita.map((entry) => (
           <li>{entry.data.title}</li>
         ))}
       </ul>
       
       <h2>Potensi ({allPotensi.length})</h2>
       <ul>
         {allPotensi.map((entry) => (
           <li>{entry.data.title} - {entry.data.category}</li>
         ))}
       </ul>
       
       <h2>Pariwisata ({allPariwisata.length})</h2>
       <ul>
         {allPariwisata.map((entry) => (
           <li>{entry.data.title} - {entry.data.type}</li>
         ))}
       </ul>
       
       <h2>Akomodasi ({allAkomodasi.length})</h2>
       <ul>
         {allAkomodasi.map((entry) => (
           <li>{entry.data.name} - {entry.data.type}</li>
         ))}
       </ul>
       
       <h2>Warung ({allWarung.length})</h2>
       <ul>
         {allWarung.map((entry) => (
           <li>{entry.data.name} - {entry.data.type}</li>
         ))}
       </ul>
     </body>
   </html>
   ```
2. Visit `/test-collections` in browser
3. Verify all collections return expected data
4. Test that helper functions work correctly

**Success Criteria:**
- All collections query successfully
- Counts are accurate
- Helper functions filter correctly
- No runtime errors

---

### Task 2.4.3: Test Content Rendering
**Objective:** Verify markdown content renders correctly.

**Actions:**
1. Create test page for rendering `src/pages/test-render.astro`:
   ```astro
   ---
   import { getEntry, render } from 'astro:content';
   
   const beritaEntry = await getEntry('berita', 'sample-article');
   if (!beritaEntry) {
     throw new Error('Sample article not found');
   }
   
   const { Content, headings } = await render(beritaEntry);
   ---
   
   <html>
     <body>
       <h1>{beritaEntry.data.title}</h1>
       <p>Author: {beritaEntry.data.author}</p>
       <p>Date: {beritaEntry.data.pubDate.toLocaleDateString('id-ID')}</p>
       
       <h2>Table of Contents</h2>
       <ul>
         {headings.map((heading) => (
           <li style={`margin-left: ${heading.depth * 1}rem`}>
             <a href={`#${heading.slug}`}>{heading.text}</a>
           </li>
         ))}
       </ul>
       
       <article>
         <Content />
       </article>
     </body>
   </html>
   ```
2. Visit `/test-render` in browser
3. Verify markdown renders to HTML correctly
4. Test that headings are extracted
5. Verify images in markdown display correctly

**Success Criteria:**
- Content component renders markdown to HTML
- Headings are correctly extracted
- Links and images work
- Styling applies correctly

---

## Phase 2.5: Documentation & Commit

### Task 2.5.1: Document Content Schema
**Objective:** Create comprehensive documentation for content collections.

**Actions:**
1. Create `docs/CONTENT-COLLECTIONS.md`:
   ```markdown
   # Content Collections Documentation
   
   ## Overview
   
   This project uses Astro Content Collections for all structured content.
   All content is validated using Zod schemas.
   
   ## Collections
   
   ### Berita (News)
   
   Location: `src/content/berita/`
   
   **Schema:**
   - `title` (string, required)
   - `description` (string, required)
   - `pubDate` (date, required)
   - `updatedDate` (date, optional)
   - `author` (string, default: "Tim KKN Bedalo")
   - `image` (object with src and alt)
   - `category` (enum: pembangunan, kegiatan, umkm, wisata, etc.)
   - `tags` (array of strings)
   - `featured` (boolean, default: false)
   - `draft` (boolean, default: false)
   
   **Example:**
   ```markdown
   ---
   title: "Judul Artikel"
   description: "Ringkasan artikel"
   pubDate: 2024-01-15
   author: "Nama Penulis"
   image:
     src: "/path/to/image.webp"
     alt: "Deskripsi gambar"
   category: "kegiatan"
   tags: ["tag1", "tag2"]
   featured: true
   ---
   
   # Konten Artikel
   ```
   
   [Continue for each collection...]
   
   ## Adding New Content
   
   1. Create a new `.md` or `.mdx` file in the appropriate collection folder
   2. Add required frontmatter fields
   3. Write content in markdown
   4. Run `npm run sync` to generate types
   5. Content will be available via `getCollection('collection-name')`
   
   ## Querying Content
   
   ```typescript
   import { getCollection, getEntry } from 'astro:content';
   
   // Get all entries
   const allNews = await getCollection('berita');
   
   // Get specific entry
   const article = await getEntry('berita', 'article-slug');
   
   // Filter entries
   const featured = await getCollection('berita', ({ data }) => {
     return data.featured === true;
   });
   ```
   ```
2. Add examples for each collection
3. Document helper functions

**Success Criteria:**
- Documentation is comprehensive and clear
- Examples are accurate and tested
- Schema fields are fully documented

---

### Task 2.5.2: Update Project README
**Objective:** Update main README with content collections information.

**Actions:**
1. Add section to README about content structure:
   ```markdown
   ## Content Management
   
   All content is managed through Astro Content Collections:
   
   - **Berita** (`src/content/berita/`): News articles and updates
   - **Potensi** (`src/content/potensi/`): Local products and UMKM
   - **Pariwisata** (`src/content/pariwisata/`): Tourism destinations
   - **Akomodasi** (`src/content/akomodasi/`): Accommodation listings
   - **Warung** (`src/content/warung/`): Local business directory
   
   See [Content Collections Documentation](docs/CONTENT-COLLECTIONS.md) for details.
   
   ### Adding New Content
   
   ```bash
   # 1. Create new markdown file in appropriate collection
   # 2. Add frontmatter with required fields
   # 3. Sync types
   npm run sync
   # 4. Build to validate
   npm run build
   ```
   ```
2. Update development workflow section
3. Add content contribution guidelines

**Success Criteria:**
- README is updated with content information
- Instructions are clear and actionable
- Links to detailed documentation work

---

### Task 2.5.3: Commit Content Collections Work
**Objective:** Commit all content collections setup and content migration.

**Actions:**
1. Review all changes: `git status`
2. Ensure all new files are tracked
3. Stage changes: `git add .`
4. Commit with detailed message:
   ```bash
   git commit -m "feat: implement content collections with Zod schemas
   
   Content Collections:
   - Define berita collection for news articles
   - Define potensi collection for products/UMKM
   - Define pariwisata collection for tourism destinations
   - Define akomodasi collection for accommodations
   - Define warung collection for local businesses
   
   Content Migration:
   - Migrate 3+ news articles to markdown
   - Migrate all product pages (gula aren, keripik, gaplek)
   - Migrate tourism destinations (Pantai Ngedan, Ngluwen)
   - Create accommodation entries
   - Create warung directory entries
   
   Utilities:
   - Add helper functions for querying collections
   - Add type definitions for all collections
   - Create content validation tests
   
   Documentation:
   - Add comprehensive content collections docs
   - Update README with content management guide
   - Document schema fields and examples
   
   All content validates successfully with Zod schemas."
   ```

**Success Criteria:**
- All content collection files are committed
- Commit message is descriptive and follows conventions
- Git history is clean
- No sensitive data is committed

---

## Completion Checklist for Plan 2

Before moving to Plan 3, verify:

- [x] Content config file created with all collections
- [x] Berita collection schema defined and validated
- [x] Potensi collection schema defined and validated
- [x] Pariwisata collection schema defined and validated
- [x] Akomodasi collection schema defined and validated
- [x] Warung collection schema defined and validated
- [x] All collections exported correctly
- [x] TypeScript types generated successfully
- [x] Type definitions updated for collections
- [x] Helper functions created for querying
- [x] At least 3 news articles migrated
- [x] All 3 product pages migrated
- [x] Both tourism destinations migrated
- [x] At least 2 accommodation entries created
- [x] At least 3 warung entries created
- [x] All content validates without errors
- [x] Content queries work correctly
- [x] Content renders properly
- [x] Test pages verify functionality
- [x] Content collections documentation written
- [x] README updated with content information
- [x] All work committed to Git

**Estimated Time:** 4-5 hours

**Next Steps:** Proceed to Plan 3 for reusable UI components and layout implementation.
