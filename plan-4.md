# Plan 4: Page Implementation & Dynamic Routes

**Goal:** Build all 26+ pages using components and content collections. Match original design from `static-site/`. Create dynamic routes for collection detail pages. **Verify every page against backup.**

---

## Phase 1: Homepage Implementation

### Task 1.1: Create Homepage Structure
File: `src/pages/index.astro`
- Reference: `static-site/index.html` (check exact content)
- Fetch: home page content from pages collection
- Fetch: site config, featured news, products, destinations
- Fetch: statistics for StatsGrid

### Task 1.2: Implement Homepage Sections
Use components for each section:
1. **Hero**: title, subtitle, image, CTA from pages/home.json
2. **Welcome/Sambutan**: WelcomeSection with content from pages collection (2 paragraphs)
3. **Potensi Overview**: 3 FeatureCards (UMKM, Pertanian, Pariwisata)
4. **Statistics**: StatsGrid with CountUp.js (4 stats)
5. **Tourism Highlight**: Featured destinations preview
6. **Recent News**: 3 latest berita entries with NewsCard
7. **Gallery Preview**: 8 images grid
8. **CTA Section**: Contact/visit call-to-action

**Reference:** Count sections in `static-site/index.html` - match exactly
**Commit:** "feat(pages): implement homepage with all sections"

### Task 1.3: Homepage SEO & Meta
- Set proper title, description from config
- Open Graph tags with featured image
- Structured data: Organization schema
- Canonical URL
- **Commit:** "feat(seo): add homepage meta tags and schema"

---

## Phase 2: Profile Page

### Task 2.1: Create Profile Page
File: `src/pages/profil.astro`
- Reference: `static-site/profil.html` (extract all content)
- Fetch: profile content from pages/profile.json
- Fetch: government collection for structure
- Fetch: statistics for demographics

### Task 2.2: Implement Profile Sections
Use components:
1. **Banner**: Page header with title
2. **Breadcrumb**: Home > Profil
3. **History Section**: 3 paragraphs about Bedalo name origin (from pages collection)
4. **Vision & Mission**: VisionMission component
5. **Government Structure**: GovernmentSection (Kepala Dusun, Ketua RW, 3 RT)
6. **Demographics**: StatsGrid with 4 stats (total KK, warga, laki-laki, perempuan)
7. **Map Section**: Google Maps embed

**Reference:** Verify exact text from `static-site/profil.html`
**Commit:** "feat(pages): implement profile page with government structure"

---

## Phase 3: Potential/Products Pages

### Task 3.1: Potensi Index Page
File: `src/pages/potensi.astro`
- Reference: `static-site/potensi.html`
- Fetch all potensi entries
- Filter by category (optional)
- Display grid of ProductCards
- Category filter buttons
- Pagination if many products

**Commit:** "feat(pages): create potensi listing page"

### Task 3.2: Potensi Detail Page Template
File: `src/pages/potensi/[slug].astro`
- Dynamic route for each product
- Use `getStaticPaths()` to generate routes
- Fetch single potensi entry by slug
- Display: images gallery, title, description, price, producer, contact
- Use lightgallery for image viewing
- Related products section
- Breadcrumb: Home > Potensi > Product Name

**Reference:** Check `static-site/potensi/gula-aren-asli.html` structure
**Commit:** "feat(pages): create potensi detail template"

---

## Phase 4: Tourism Pages

### Task 4.1: Pariwisata Index Page
File: `src/pages/pariwisata.astro`
- Reference: `static-site/pariwisata.html`
- Fetch all pariwisata entries
- Display grid of DestinationCards
- Filter by category (pantai, bukit, etc.)
- Map view option (optional enhancement)

**Commit:** "feat(pages): create tourism listing page"

### Task 4.2: Pariwisata Detail Page Template
File: `src/pages/pariwisata/[slug].astro`
- Dynamic route for destinations
- Fetch single pariwisata entry
- Display: gallery, description, location, facilities, access, hours, price
- Lightgallery for images
- Google Maps embed with location
- Tips section
- Breadcrumb: Home > Pariwisata > Destination Name

**Reference:** Check how destinations displayed in `static-site/`
**Commit:** "feat(pages): create tourism detail template"

---

## Phase 5: News/Berita Pages

### Task 5.1: Berita Index Page
File: `src/pages/berita/index.astro`
- Reference: `static-site/berita/index.html`
- Fetch all non-draft berita entries
- Sort by date (newest first)
- Display grid of NewsCards
- Category filter
- Pagination (10 per page)
- Featured news section

**Commit:** "feat(pages): create news listing page"

### Task 5.2: Berita Detail Page Template
File: `src/pages/berita/[slug].astro`
- Dynamic route for articles
- Fetch single berita entry
- Use ArticleLayout
- Render markdown content
- Display: featured image, author, date, category, tags
- Reading time
- Social sharing buttons
- Related articles sidebar
- Breadcrumb: Home > Berita > Article Title

**Reference:** Check `static-site/berita/artikel-contoh.html`
**Commit:** "feat(pages): create news article template"

### Task 5.3: Berita Category Pages
File: `src/pages/berita/tag/[tag].astro`
- Filter berita by tag
- Display matching articles
- Show tag name in heading
- **Commit:** "feat(pages): create news tag filter pages"

---

## Phase 6: Accommodation Pages

### Task 6.1: Akomodasi Index Page
File: `src/pages/akomodasi/index.astro`
- Reference: `static-site/akomodasi/index.html`
- Fetch all akomodasi entries
- Display grid of AccommodationCards
- Filter by type
- Sort by price (optional)

**Commit:** "feat(pages): create accommodation listing page"

### Task 6.2: Akomodasi Detail Page Template
File: `src/pages/akomodasi/[slug].astro`
- Dynamic route for accommodations
- Fetch single akomodasi entry
- Display: images, description, room types with prices, facilities, contact
- Booking information
- Lightgallery for images
- Contact buttons (WhatsApp, phone)
- Breadcrumb: Home > Akomodasi > Name

**Reference:** Check `static-site/akomodasi/penginapan-contoh-1.html`
**Commit:** "feat(pages): create accommodation detail template"

---

## Phase 7: Warung Pages

### Task 7.1: Warung Index Page
File: `src/pages/warung/index.astro`
- Fetch all warung entries
- Display grid of WarungCards
- Filter by category (makanan, toko, etc.)
- Sort alphabetically

**Commit:** "feat(pages): create warung listing page"

### Task 7.2: Warung Detail Page Template
File: `src/pages/warung/[slug].astro`
- Dynamic route for each warung
- Display: name, owner, description, menu highlights, hours, location, contact
- Images if available
- Map location
- Breadcrumb: Home > Warung > Name

**Commit:** "feat(pages): create warung detail template"

---

## Phase 8: Gallery Page

### Task 8.1: Create Gallery Page
File: `src/pages/galeri.astro`
- Reference: `static-site/galeri.html` (check structure)
- Fetch gallery content from pages collection
- Display images using GalleryGrid
- Support both images and videos
- Category tabs (Kegiatan, Wisata, Budaya, etc.)
- Lightgallery integration
- Masonry or grid layout

**Reference:** Count actual galleries and categories in `static-site/galeri.html`
**Commit:** "feat(pages): create gallery with lightgallery"

### Task 8.2: Lightgallery Configuration
- Configure lightgallery options
- Enable: zoom, thumbnail, video support
- Test with images and videos
- Ensure responsive behavior
- **Commit:** "feat(gallery): configure lightgallery for media"

---

## Phase 9: Dashboard Page

### Task 9.1: Analyze Dashboard Structure
- Reference: `static-site/dashboard/index.html` (check carefully)
- Extract: chart types, data structure, filters
- Note: password protection mechanism
- Check: Chart.js usage and configuration

### Task 9.2: Install Chart.js
- Run: `npm install chart.js`
- No CDN script tags needed
- Import in component files
- **Commit:** "chore(deps): add Chart.js for dashboard"

### Task 9.3: Create Dashboard Page
File: `src/pages/dashboard/index.astro`
- Password-protected login screen
- Fetch dashboard content from pages collection
- Import Chart.js modules
- Display statistics cards
- Create charts: demographics, aspirations, categories
- Filter controls
- Export functionality (optional)

**Reference:** Match exact layout from `static-site/dashboard/index.html`
**Commit:** "feat(pages): create dashboard with Chart.js"

### Task 9.4: Dashboard Client-Side Logic
File: `src/scripts/dashboard.ts`
- Password validation
- Chart initialization
- Data fetching/processing
- Filter interactions
- Update charts dynamically
- **Commit:** "feat(dashboard): add client-side interactions"

---

## Phase 10: Survey Page

### Task 10.1: Analyze Survey Structure
- Reference: `static-site/survei/index.html` (extract all questions)
- Note: multi-step form structure
- Check: question types, validation rules
- List all steps and fields

### Task 10.2: Create Survey Page
File: `src/pages/survei/index.astro`
- Fetch survey content from pages collection (questions, labels)
- Multi-step form structure (Step 1, 2, 3, etc.)
- Progress indicator
- Previous/Next buttons
- Client-side validation
- Success message on completion

**Reference:** Match question order from `static-site/survei/index.html`
**Commit:** "feat(pages): create multi-step survey form"

### Task 10.3: Survey Form Logic
File: `src/scripts/survey.ts`
- Step navigation (next, previous)
- Form data persistence (localStorage)
- Validation per step
- Submit to endpoint (or save to localStorage)
- Reset after submission
- **Commit:** "feat(survey): add form navigation and validation"

---

## Phase 11: Utility Pages

### Task 11.1: Contact Page
File: `src/pages/kontak.astro`
- Reference: `static-site/kontak.html`
- Fetch contact content from pages collection
- Contact form with fields: name, email, phone, subject, message
- Use FormField components
- Display ContactInfo component (phone, email, address)
- Google Maps embed
- Form validation
- Success/error messages

**Commit:** "feat(pages): create contact page with form"

### Task 11.2: About KKN Page
File: `src/pages/tentang-kkn.astro`
- Reference: `static-site/tentang-kkn.html`
- Fetch content from pages/tentang-kkn.json
- Display: program description, university info, team members
- Images if available
- Program timeline/activities

**Commit:** "feat(pages): create about KKN page"

### Task 11.3: Sitemap Page
File: `src/pages/peta-situs.astro`
- Reference: `static-site/peta-situs.html`
- Fetch navigation from config
- Organized list of all pages
- Group by section (Profil, Potensi, Pariwisata, etc.)
- Links to all main and sub-pages

**Commit:** "feat(pages): create sitemap page"

### Task 11.4: Privacy Policy Page
File: `src/pages/kebijakan-privasi.astro`
- Reference: `static-site/kebijakan-privasi.html`
- Fetch content from pages/kebijakan-privasi.json
- Display privacy policy text
- Sections with headings
- Last updated date

**Commit:** "feat(pages): create privacy policy page"

### Task 11.5: Custom 404 Page
File: `src/pages/404.astro`
- Reference: `static-site/404.html` (if exists)
- Display friendly error message
- Links to homepage and main sections
- Search functionality (optional)
- Same layout as other pages (Navbar, Footer)

**Commit:** "feat(pages): create custom 404 page"

---

## Phase 12: Image Optimization

### Task 12.1: Implement Astro Image Component
- Replace all `<img>` tags with Astro's `<Image />` component
- Import images from `src/assets/images/` for optimization
- Use `public/` for images that shouldn't be processed
- Set proper width, height, alt text
- Use lazy loading where appropriate

**Commit:** "feat(images): implement Astro Image optimization"

### Task 12.2: Optimize Collection Images
- Update collection markdown files
- Use optimized image paths
- Ensure alt text in Indonesian
- Set appropriate sizes
- **Commit:** "feat(images): optimize collection images"

---

## Phase 13: Navigation & Links

### Task 13.1: Verify All Internal Links
- Check all `href` attributes
- Ensure: relative paths for internal links
- Fix: any broken links
- Test: navigation between pages
- Verify: breadcrumbs work correctly

**Commit:** "fix(nav): verify and fix all internal links"

### Task 13.2: Active Link Highlighting
- Update Navbar component
- Highlight current page in navigation
- Use Astro.url.pathname for detection
- Apply active styles

**Commit:** "feat(nav): add active link highlighting"

---

## Phase 14: Testing & Verification

### Task 14.1: Content Verification
For each page, verify against `static-site/`:
- [ ] Homepage: all sections present, correct order
- [ ] Profile: government structure, vision/mission accurate
- [ ] Potensi: products match, details correct
- [ ] Pariwisata: destinations complete
- [ ] Berita: articles display properly
- [ ] Akomodasi: listings accurate
- [ ] Warung: stores present
- [ ] Gallery: images load, lightgallery works
- [ ] Dashboard: charts render, functionality works
- [ ] Survey: all questions present, form works
- [ ] Contact: form fields correct
- [ ] Utility pages: content complete

### Task 14.2: Responsive Testing
Test all pages on:
- Mobile (375px, 428px)
- Tablet (768px, 1024px)
- Desktop (1280px, 1920px)
- Verify: layout adapts correctly
- Check: mobile menus work
- Test: touch interactions

**Commit:** "test(pages): verify responsive behavior"

### Task 14.3: Dark Mode Testing
- Test every page in dark mode
- Check: text readable, contrast sufficient
- Verify: images display well
- Test: hover states, focus indicators
- Fix: any dark mode issues

**Commit:** "test(theme): verify dark mode on all pages"

### Task 14.4: Accessibility Testing
- Run: Lighthouse accessibility audit
- Check: ARIA labels present
- Verify: keyboard navigation works
- Test: screen reader compatibility
- Ensure: focus indicators visible
- Fix: any a11y issues (target: 95+ score)

**Commit:** "fix(a11y): ensure accessibility compliance"

### Task 14.5: Performance Testing
- Run: Lighthouse performance audit
- Check: LCP, FID, CLS metrics
- Optimize: images if needed
- Lazy load: below-fold content
- Minimize: layout shifts
- Target: 95+ performance score

**Commit:** "perf: optimize page performance"

---

## Completion Checklist

Before moving to Plan 5:
- [ ] Homepage implemented with all sections
- [ ] Profile page with government structure
- [ ] Potensi index and detail pages
- [ ] Pariwisata index and detail pages
- [ ] Berita index, detail, and tag pages
- [ ] Akomodasi index and detail pages
- [ ] Warung index and detail pages
- [ ] Gallery with lightgallery (images + videos)
- [ ] Chart.js installed via npm (not CDN)
- [ ] Dashboard with Chart.js working
- [ ] Survey multi-step form functional
- [ ] Contact page with form
- [ ] About KKN page
- [ ] Sitemap page
- [ ] Privacy policy page
- [ ] Custom 404 page
- [ ] All images use Astro Image component
- [ ] All internal links working
- [ ] Active navigation highlighting
- [ ] Content verified against static-site/
- [ ] Responsive on all devices
- [ ] Dark mode works on all pages
- [ ] Accessibility score 95+
- [ ] Performance score 95+
- [ ] All pages committed atomically
- [ ] Only Google Fonts & Font Awesome use CDN

**Estimated Time:** 8-10 hours

**Next:** Plan 5 - Final optimizations and deployment

---

**Key Principle:** Every page must be verified against `static-site/` HTML files. Use `grep` or view files directly to ensure accuracy. No invented content. If something is unclear, note it and create minimal realistic samples based on patterns from other pages.
