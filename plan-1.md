# Plan 1: Foundation & Content Collections Setup

**Goal:** Initialize Astro 5 project, configure TypeScript strict mode, set up 9 content collections, and establish base architecture. **Zero hardcoded content allowed.**

---

## 📦 Dependencies Strategy

**Via CDN (Only 2):**
- Google Fonts (Poppins 400, 500, 600, 700)
- Font Awesome 6.7.1

**Via npm (All Others):**
- Tailwind CSS → `npx astro add tailwind`
- lightgallery + plugins → `npm install lightgallery lg-zoom lg-thumbnail lg-video`
- CountUp.js → `npm install countup.js`
- Chart.js → `npm install chart.js`

**Rationale:** Modern build process, better performance, version control, tree-shaking.

---

## Phase 0: Backup & Branch

### Task 0.1: Create Branch & Backup
- Create branch: `feature/astro-5-migration`
- Create `static-site/` directory
- Copy all files using rsync (exclude .git, node_modules, plan-*.md)
- Verify backup has all 26+ HTML files
- Commit backup with atomic message
- **Reference:** Use `static-site/` for all content verification throughout migration

---

## Phase 1: Astro 5 Initialization

### Task 1.1: Bootstrap Astro Project
- Run: `npm create astro@latest .` (in root, not subdirectory)
- Select: Empty template
- Enable: TypeScript (strict)
- Install dependencies
- Verify: `npm run dev` starts successfully
- **Commit:** "feat(init): bootstrap Astro 5 with TypeScript strict"

### Task 1.2: Configure TypeScript Strict
- Update `tsconfig.json`:
  - Extend: `"astro/tsconfigs/strictest"`
  - Enable: `strictNullChecks`, `noUncheckedIndexedAccess`
- Create `src/env.d.ts` with Astro types
- Run: `npm run check` - should pass
- **Commit:** "chore(ts): configure TypeScript strict mode"

### Task 1.3: Add Tailwind CSS
- Run: `npx astro add tailwind`
- Accept all prompts (auto-install)
- **Note:** Tailwind via npm, NOT CDN (no script tag in HTML)
- Update `tailwind.config.mjs`: add content paths
- Copy `static-site/css/tailwind-custom.css` to `src/styles/global.css`
- Import global CSS in BaseLayout
- **Commit:** "feat(tailwind): add Tailwind CSS integration"

---

## Phase 2: Content Collections Architecture

### Task 2.1: Define Collection Schemas
Create `src/content/config.ts` with 9 collections:

**Collection 1-5 (Original):**
1. `berita` - News articles (markdown)
2. `potensi` - Products/potential (markdown) 
3. `pariwisata` - Tourism destinations (markdown)
4. `akomodasi` - Accommodations (markdown)
5. `warung` - Local stores/restaurants (markdown)

**Collection 6-9 (New - for dynamic content):**
6. `config` - Site settings (JSON, type: 'data')
   - Site metadata, contact info, social links, navigation
7. `pages` - Page-specific content (JSON, type: 'data')
   - Hero sections, welcome text, section content per page
8. `government` - Officials (JSON, type: 'data')
   - Kepala Dusun, Ketua RW, RT leaders with photos
9. `statistics` - Stats/numbers (JSON, type: 'data')
   - 450 warga, 120 KK, 15+ UMKM, 2 pantai, etc.

Define Zod schemas for each with proper validation
- **Commit:** "feat(collections): define 9 content collection schemas"

### Task 2.2: Create Config Collection
Create `src/content/config/site.json`:
- Extract from `static-site/index.html`:
  - Site title: "Dusun Bedalo"
  - Description from meta tags
  - Contact: phone (+6283107581144), email (inikknbedalo@gmail.com)
  - Address: full address from footer
  - Social: Instagram, YouTube, TikTok, Facebook, Twitter URLs
  - Navigation: all 7 nav links (Beranda, Profil, Potensi, etc.)
- **Commit:** "feat(config): add site configuration from original"

### Task 2.3: Create Pages Collection
Extract all page-specific content from `static-site/`:

**home.json** (from `static-site/index.html`):
- Hero: title, subtitle, background image, CTA text
- Welcome section: full "Sambutan Hangat" text (2 paragraphs)
- Potensi section: heading, description
- Pariwisata section: heading, description
- All section titles and descriptions

**profile.json** (from `static-site/profil.html`):
- Hero banner content
- History text (3 paragraphs about Bedalo name origin)
- Vision statement (full text)
- Mission items (5 points)
- Demographics intro text
- Map section text

Create JSON files for all pages
- **Commit:** "feat(pages): extract all page content from HTML"

### Task 2.4: Create Government Collection
Extract from `static-site/profil.html` structure section:

**kepala-dusun.json:**
- name: "Sumindar"
- position: "Kepala Dusun"
- role: "kepala-dusun"
- photo: "/assets/images/cat.jpg"
- order: 1

**ketua-rw.json:**
- name: "Walyono"  
- position: "Ketua RW 10"
- role: "ketua-rw"
- photo: "/assets/images/profil.jpg"
- order: 2

**ketua-rt-01.json, 02.json, 03.json:**
- Extract names: Sukarman, Tugiman, Sugiyanto
- Create JSON for each RT leader

- **Commit:** "feat(government): add officials from profile page"

### Task 2.5: Create Statistics Collection
Extract numbers from `static-site/index.html`:

**total-warga.json:**
- key: "total-warga"
- value: 450
- label: "Jumlah Warga"
- icon: "users"
- color: "blue"
- order: 1

**total-kk.json:**
- value: 120
- label: "Kepala Keluarga"
- icon: "home"
- color: "green"
- order: 2

**total-umkm.json:**
- value: 15
- label: "UMKM Aktif"
- suffix: "+"
- icon: "store"
- color: "purple"
- order: 3

**total-pantai.json:**
- value: 2
- label: "Destinasi Pantai"
- icon: "umbrella-beach"
- color: "orange"
- order: 4

Also create: laki-laki (230), perempuan (220)
- **Commit:** "feat(statistics): add dynamic statistics data"

---

## Phase 3: Base Layouts & Components

### Task 3.1: Create BaseLayout
File: `src/layouts/BaseLayout.astro`
- Fetch site config from collection
- HTML structure with proper meta tags
- SEO: title, description, Open Graph, Twitter cards
- Preconnect: Google Fonts CDN only
- Load: Poppins font (400, 500, 600, 700) from Google Fonts CDN
- Load: Font Awesome 6.7.1 from CDN
- **Note:** Tailwind via npm (already integrated), no Tailwind CDN
- Global CSS import
- Dark mode <html class="dark"> support
- Skip to content link (a11y)
- **Commit:** "feat(layout): create BaseLayout with SEO and dark mode"

### Task 3.2: Create Navbar Component
File: `src/components/layout/Navbar.astro`
- Fetch navigation from config collection
- Logo/title from config
- Desktop menu: map over nav items from collection
- Mobile menu: hamburger + slide-out
- Active page highlighting
- Theme toggle slot
- Accessible: ARIA labels, keyboard nav
- **Commit:** "feat(navbar): create responsive navbar from config"

### Task 3.3: Create Footer Component  
File: `src/components/layout/Footer.astro`
- Fetch from config collection:
  - Quick links (nav items)
  - Contact info (phone, email, address)
  - Social media links (with icons)
- About section text from config
- 4-column grid (lg), responsive
- Current year dynamic
- **Commit:** "feat(footer): create footer from config collection"

### Task 3.4: Create MainLayout
File: `src/layouts/MainLayout.astro`
- Extend BaseLayout
- Include Navbar
- Main content slot
- Include Footer
- Dark mode support throughout
- **Commit:** "feat(layout): create MainLayout wrapper"

---

## Phase 4: Utility Functions & Helpers

### Task 4.1: Date Formatting
File: `src/utils/dateFormat.ts`
- Function: `formatDate(date: Date): string`
- Format: Indonesian locale (e.g., "15 Maret 2024")
- Handle: pubDate, updatedDate
- **Commit:** "feat(utils): add Indonesian date formatter"

### Task 4.2: Collection Helpers
File: `src/utils/collections.ts`
- `getFeaturedEntries(collection, limit)` - get featured items
- `sortByDate(entries, order)` - sort by pubDate/publishDate
- `filterDraft(entries)` - exclude draft: true
- **Commit:** "feat(utils): add collection helper functions"

### Task 4.3: SEO Helpers
File: `src/utils/seo.ts`
- `generateMetaTags(page)` - create meta object
- `getCanonicalURL(path)` - construct canonical
- `getOGImageURL(params)` - OG image URL
- **Commit:** "feat(utils): add SEO helper utilities"

---

## Phase 5: Dark Mode System

### Task 5.1: Theme Script
File: `src/scripts/theme.ts`
- Detect: system preference
- Get: localStorage `theme` value
- Set: <html class="dark"> toggle
- Export: `initTheme()`, `toggleTheme()`
- **Commit:** "feat(theme): add dark mode detection and toggle"

### Task 5.2: ThemeToggle Component
File: `src/components/islands/ThemeToggle.astro`
- Button with sun/moon icons
- Click handler: calls `toggleTheme()`
- Persist to localStorage
- ARIA label
- Place in Navbar
- **Commit:** "feat(theme): create theme toggle button"

### Task 5.3: Dark Mode CSS
Update `src/styles/global.css`:
- Add dark mode color variables
- Tailwind dark: class overrides
- Smooth transitions
- Test: all components support dark mode
- **Commit:** "style(theme): add dark mode styles"

---

## Phase 6: Image Optimization Setup

### Task 6.1: Move Images to src/assets
- Copy images from `public/assets/images/` to `src/assets/images/`
- Keep structure: /gallery, /news, /products, etc.
- Update imports to use Astro Image component
- **Commit:** "chore(assets): organize images for optimization"

### Task 6.2: Create Image Component
File: `src/components/ui/OptimizedImage.astro`
- Props: src, alt, width, height, loading, quality
- Use: `import { Image } from 'astro:assets'`
- Handle: local images (optimized) and external URLs
- Lazy loading by default
- **Commit:** "feat(image): create optimized image wrapper"

---

## Phase 7: Testing & Verification

### Task 7.1: Test Development Server
- Run: `npm run dev`
- Verify: No errors
- Check: Collections loaded correctly
- Test: Theme toggle works
- **Commit:** "test(dev): verify development environment"

### Task 7.2: Type Check
- Run: `npm run check`
- Fix: All TypeScript errors
- Ensure: Strict mode compliance
- **Commit:** "fix(types): resolve TypeScript errors"

### Task 7.3: Build Test
- Run: `npm run build`
- Verify: Successful build
- Check: dist/ output
- Preview: `npm run preview`
- **Commit:** "test(build): verify production build"

---

## Completion Checklist

Before moving to Plan 2:
- [ ] Astro 5 initialized with TypeScript strict
- [ ] Tailwind CSS added via `npx astro add` (npm, not CDN)
- [ ] 9 collections defined with Zod schemas
- [ ] Config collection populated from original site
- [ ] Pages collection has home.json and profile.json
- [ ] Government collection has 5 official entries
- [ ] Statistics collection has 6 stat entries
- [ ] BaseLayout created with SEO and dark mode
- [ ] BaseLayout uses Google Fonts & Font Awesome via CDN only
- [ ] Navbar fetches nav from config collection
- [ ] Footer fetches data from config collection
- [ ] MainLayout combines all layout pieces
- [ ] Dark mode system fully functional
- [ ] Image optimization structure ready
- [ ] All tasks committed atomically
- [ ] `npm run dev` works without errors
- [ ] `npm run check` passes
- [ ] `npm run build` succeeds
- [ ] Zero hardcoded content in any .astro file
- [ ] No unnecessary CDN scripts (only fonts & Font Awesome)

**Estimated Time:** 3-4 hours

**Next:** Plan 2 - Content migration from HTML to collections

---

**Key Principle:** Everything must come from content collections. If you see hardcoded text, numbers, or links in a component—it's wrong. Fetch from collections instead.
