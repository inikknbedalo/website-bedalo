# Plan 2: Content Migration from HTML to Collections

**Goal:** Migrate all content from `static-site/` HTML files into Astro Content Collections. Extract text, images, metadata from original pages. **Verify against backup—no hallucinations.**

---

## Phase 1: News Articles (Berita) Collection

### Task 1.1: Analyze Original News Structure
- Review: `static-site/berita/` directory
- Check: `static-site/berita/index.html` (listing page)
- Examine: `static-site/berita/artikel-contoh.html` (detail page)
- Extract: structure, fields, categories, tags
- Note: image paths, author names, dates

### Task 1.2: Create News Schema
File: `src/content/config.ts` (berita section)
- Fields: title, description, pubDate, updatedDate, author
- Image: { src, alt } object
- category: enum (pembangunan, kegiatan, umkm, wisata, budaya, kesehatan, pendidikan, pengumuman)
- tags: array of strings
- featured: boolean
- draft: boolean
- readingTime: number (minutes)

### Task 1.3: Migrate Existing Articles
From `static-site/berita/`:
- Find all article HTML files
- Extract actual content (don't invent)
- Create markdown files: `YYYY-MM-DD-slug.md`
- Copy exact text from HTML
- Extract metadata from HTML meta tags
- **Reference:** Use `cat static-site/berita/artikel-contoh.html | grep -A 10 "content"`

### Task 1.4: Add Sample Articles
Create 5-6 sample news articles:
- Vary categories (kegiatan, pembangunan, umkm)
- Use realistic dates (recent months)
- Include featured images from `static-site/assets/images/`
- Mark some as featured: true
- **Commit:** "feat(berita): migrate and create news articles"

---

## Phase 2: Products/Potential (Potensi) Collection

### Task 2.1: Analyze Original Products
- Review: `static-site/potensi/` directory
- Check files: gula-aren-asli.html, keripik-singkong.html, gaplek.html
- Extract: product structure, pricing, descriptions
- Note: image galleries, product details

### Task 2.2: Create Potensi Schema
Fields:
- title, description, publishDate
- price: number, priceUnit: string
- category: enum (umkm, pertanian, kerajinan, kuliner)
- producer: string (business/person name)
- contact: { phone, whatsapp }
- images: array of { src, alt, caption }
- features: array of strings
- featured: boolean

### Task 2.3: Migrate Existing Products
From `static-site/potensi/*.html`:
- **Gula Aren Asli**: Extract exact description, price, producer
- **Keripik Singkong**: Get all details from HTML
- **Gaplek**: Copy content accurately
- Create markdown files with proper frontmatter
- Include all product images

### Task 2.4: Add Additional Products
Create 5-7 more products:
- Various categories (pertanian, kuliner, kerajinan)
- Realistic prices in IDR
- Contact information
- Multiple images per product
- **Commit:** "feat(potensi): migrate products and add samples"

---

## Phase 3: Tourism (Pariwisata) Collection

### Task 3.1: Analyze Tourism Pages
- Check: `static-site/pariwisata.html`
- Check: `static-site/pariwisata/` subdirectory (if exists)
- Extract: Pantai Ngedan details
- Extract: Pantai Ngluwen details
- Note: location, facilities, access info

### Task 3.2: Create Pariwisata Schema
Fields:
- title, description, publishDate
- location: { address, coordinates, mapUrl }
- category: enum (pantai, bukit, gua, air-terjun, budaya)
- facilities: array of strings
- access: { vehicle, publicTransport, walking }
- openHours: string
- ticketPrice: number (0 if free)
- images: array with gallery
- tips: array of strings
- featured: boolean

### Task 3.3: Migrate Tourist Destinations
From `static-site/`:
- **Pantai Ngedan**: Full description, location, images
- **Pantai Ngluwen**: Complete details
- Extract from actual HTML (don't guess)
- Add Google Maps embed URLs
- Include facility lists
- **Commit:** "feat(pariwisata): migrate tourism destinations"

---

## Phase 4: Accommodations (Akomodasi) Collection

### Task 4.1: Analyze Accommodation Structure
- Review: `static-site/akomodasi/` directory
- Check: `static-site/akomodasi/index.html`
- Check: `static-site/akomodasi/penginapan-contoh-1.html`
- Extract: structure, room types, pricing

### Task 4.2: Create Akomodasi Schema
Fields:
- title (name of place), description, publishDate
- type: enum (homestay, guesthouse, villa, camping)
- address, contact: { phone, whatsapp, email }
- rooms: array of { type, capacity, price, amenities }
- generalFacilities: array
- images: array
- bookingInfo: string
- featured: boolean

### Task 4.3: Migrate Accommodations
From `static-site/akomodasi/*.html`:
- Extract existing accommodation details
- Create 3-5 accommodation entries
- Include room types and pricing
- Add contact information
- **Commit:** "feat(akomodasi): migrate accommodation listings"

---

## Phase 5: Local Stores (Warung) Collection

### Task 5.1: Analyze Warung Structure
- Check: `static-site/warung/` directory (if exists)
- Or check references in other pages
- Determine: what info to include

### Task 5.2: Create Warung Schema
Fields:
- title (warung name), description, publishDate
- owner: string
- category: enum (makanan, minuman, warung-makan, toko-kelontong)
- location: address string
- contact: { phone, whatsapp }
- menuHighlights: array of strings
- openHours: string
- priceRange: enum (murah, sedang, mahal)
- images: array
- featured: boolean

### Task 5.3: Create Warung Entries
Add 4-6 local warung entries:
- Mix of food stalls and small stores
- Realistic names and owners
- Menu highlights
- Contact info
- **Commit:** "feat(warung): add local store listings"

---

## Phase 6: Additional Page Content

### Task 6.1: Complete Pages Collection
Add remaining page content JSON files:

**tentang-kkn.json** (from `static-site/tentang-kkn.html`):
- Extract full KKN program description
- University information
- Team members (if listed)
- Program goals and activities

**kontak.json** (from `static-site/kontak.html`):
- Page heading and description
- Form field labels
- Success/error messages
- Additional contact text

**galeri.json** (from `static-site/galeri.html`):
- Page title and description
- Gallery section headings
- Filter/category labels

**kebijakan-privasi.json** (from `static-site/kebijakan-privasi.html`):
- Extract full privacy policy text
- Section headings
- Last updated date

**peta-situs.json** (from `static-site/peta-situs.html`):
- Sitemap introduction text
- Section headings

**Commit:** "feat(pages): complete all page content extraction"

### Task 6.2: Dashboard Content
**dashboard.json** (from `static-site/dashboard/index.html`):
- Page title and description
- Chart titles and labels
- Filter labels
- Empty state messages
- Stats card labels
- **Reference:** Check exact text from `static-site/dashboard/index.html`
- **Commit:** "feat(pages): add dashboard content data"

### Task 6.3: Survey Content
**survei.json** (from `static-site/survei/index.html`):
- Survey introduction text
- Step titles (Step 1, 2, 3, etc.)
- Question text (all questions)
- Input labels and placeholders
- Button text (Next, Previous, Submit)
- Validation messages
- Success message
- **Reference:** Extract exact questions from HTML
- **Commit:** "feat(pages): add survey form content"

---

## Phase 7: Media Assets Organization

### Task 7.1: Catalog All Images
- List all images in `static-site/assets/images/`
- Categorize: gallery, news, products, profiles, backgrounds
- Note dimensions and formats
- Check: which are used where

### Task 7.2: Optimize and Copy Images
- Copy images to `public/assets/images/` (maintain structure)
- For images to be optimized: copy to `src/assets/images/`
- Convert JPG/PNG to WebP where beneficial
- Resize oversized images (max 1920px width)
- **Commit:** "chore(assets): organize and optimize images"

### Task 7.3: Update Image References
In all markdown collection files:
- Update image paths to match new structure
- Use relative paths: `/assets/images/...`
- Add proper alt text (Indonesian descriptions)
- **Commit:** "fix(collections): update image paths"

---

## Phase 8: Content Validation

### Task 8.1: Verify Collection Data
- Run: `npm run sync` (regenerate types)
- Check: TypeScript validates all collection entries
- Test: Fetch each collection in test page
- Verify: All required fields present
- **Commit:** "test(collections): validate all content data"

### Task 8.2: Cross-Reference with Original
For each collection:
- Compare count: original pages vs collection entries
- Verify: text matches original (sample check)
- Check: all images referenced exist
- Ensure: no made-up content

### Task 8.3: Test Content Queries
Create temporary test page: `src/pages/test-collections.astro`
- Fetch and display items from each collection
- Verify: data structure correct
- Check: images load
- Test: sorting and filtering
- Delete test page after verification
- **Commit:** "test(collections): verify content queries work"

---

## Phase 9: Collection Helper Functions

### Task 9.1: Create Collection Utilities
File: `src/utils/collections.ts`

Functions needed:
- `getBeritaByCategory(category)` - filter news
- `getBeritaByTag(tag)` - filter by tag
- `getFeaturedBerita(limit)` - get featured news
- `getRecentBerita(limit)` - get recent news
- `getPotensiByCategory(category)` - filter products
- `getPariwisataByType(type)` - filter destinations
- `getAllCategories(collection)` - unique categories
- `getAllTags(collection)` - unique tags
- **Commit:** "feat(utils): add collection query helpers"

### Task 9.2: Create Reading Time Calculator
File: `src/utils/readingTime.ts`
- Function: `calculateReadingTime(markdown: string): number`
- Calculate based on word count
- Assume 200 words per minute (Indonesian)
- Return minutes (round up)
- **Commit:** "feat(utils): add reading time calculator"

---

## Phase 10: Documentation

### Task 10.1: Create Content Guide
File: `docs/CONTENT-GUIDE.md`
- Document all 9 collections
- Explain schema for each
- Show example entries
- List required vs optional fields
- Explain file naming conventions

### Task 10.2: Create Adding Content Guide
Document how to:
- Add new news article
- Add new product
- Add new tourism destination
- Update page content
- Modify site configuration
- **Commit:** "docs(content): add content management guide"

---

## Completion Checklist

Before moving to Plan 3:
- [ ] Berita collection: 5-6 articles migrated
- [ ] Potensi collection: 8-10 products added
- [ ] Pariwisata collection: 2+ destinations
- [ ] Akomodasi collection: 3-5 accommodations
- [ ] Warung collection: 4-6 stores
- [ ] Pages collection: all 10+ pages have content
- [ ] Dashboard content extracted accurately
- [ ] Survey questions all captured
- [ ] Images organized and paths updated
- [ ] All content verified against `static-site/`
- [ ] No hallucinated/invented content
- [ ] Collection helpers created
- [ ] Reading time calculator working
- [ ] Content guide documented
- [ ] All migrations committed atomically
- [ ] `npm run sync` generates types correctly
- [ ] Test queries fetch data successfully

**Estimated Time:** 4-5 hours

**Next:** Plan 3 - Component library creation

---

**Key Principle:** Always reference `static-site/` HTML files. Use `grep`, `cat`, or view files directly. Never invent content. If original content is incomplete, note it and create minimal realistic samples.
