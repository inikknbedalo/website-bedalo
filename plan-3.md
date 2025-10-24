# Plan 3: Component Library & UI System

**Goal:** Build comprehensive, reusable component library. Extract all repeated patterns from `static-site/` into Astro components. Support dark mode throughout. Use CountUp.js. **All content from collections, zero hardcoded.**

---

## Phase 1: Core UI Components

### Task 1.1: Card Component
File: `src/components/ui/Card.astro`
- Props: variant (default, hover, bordered), padding, class
- Support dark mode with Tailwind classes
- Flexible slot for content
- **Reference:** Check card patterns in `static-site/index.html`
- **Commit:** "feat(ui): create Card component"

### Task 1.2: Button Component
File: `src/components/ui/Button.astro`
- Props: variant (primary, secondary, outline, ghost), size, href, type, icon
- Support both <a> and <button> tags
- Icon support with Font Awesome
- Dark mode styles
- Accessible: focus states, ARIA
- **Commit:** "feat(ui): create Button component"

### Task 1.3: Badge Component
File: `src/components/ui/Badge.astro`
- Props: variant (default, primary, success, warning, danger, info), size
- For categories, tags, status
- Dark mode colors
- **Commit:** "feat(ui): create Badge component"

### Task 1.4: Section Component
File: `src/components/ui/Section.astro`
- Props: id, padding, background, class
- Wraps content in container with consistent spacing
- Dark mode background options
- **Commit:** "feat(ui): create Section wrapper"

---

## Phase 2: Content Display Components

### Task 2.1: Hero Component
File: `src/components/sections/Hero.astro`
- Props: title, subtitle, image, cta (text, href), overlay
- Full-width hero with background image
- Centered content with gradient overlay
- CTA button
- Dark mode overlay adjustments
- **Reference:** Extract pattern from `static-site/index.html` hero
- **Commit:** "feat(sections): create Hero component"

### Task 2.2: Banner Component
File: `src/components/sections/Banner.astro`
- Props: title, subtitle, background, gradient
- Page header banner (used on internal pages)
- Breadcrumb integration slot
- Dark mode support
- **Reference:** Check `static-site/profil.html` banner
- **Commit:** "feat(sections): create Banner component"

### Task 2.3: WelcomeSection Component
File: `src/components/sections/WelcomeSection.astro`
- Props: heading, content (array of paragraphs), image, imageAlt, ctaText, ctaHref
- Two-column layout: image + text
- Pulls content from pages collection
- Responsive: stacks on mobile
- Dark mode text colors
- **Reference:** "Sambutan Hangat" section from `static-site/index.html`
- **Commit:** "feat(sections): create WelcomeSection component"

### Task 2.4: StatsGrid Component
File: `src/components/sections/StatsGrid.astro`
- Props: stats (from statistics collection)
- Fetches statistics internally if not provided
- Grid layout: 2 cols mobile, 4 cols desktop
- Each stat: number, label, icon
- Uses CountUp.js for animation
- Dark mode styling
- **Reference:** Stats section in `static-site/index.html`
- **Commit:** "feat(sections): create StatsGrid with CountUp.js"

### Task 2.5: FeatureCard Component
File: `src/components/sections/FeatureCard.astro`
- Props: icon, title, description, link (optional)
- Icon circle with background color
- Used for potensi overview, services
- Hover effects
- Dark mode colors
- **Reference:** Feature cards in `static-site/index.html` potensi section
- **Commit:** "feat(sections): create FeatureCard component"

---

## Phase 3: Government & Team Components

### Task 3.1: GovernmentCard Component
File: `src/components/sections/GovernmentCard.astro`
- Props: name, position, photo, role
- Photo with border (colored by role)
- Name and position display
- Role-based styling (kepala-dusun: blue, ketua-rw: green, ketua-rt: purple)
- Dark mode support
- **Reference:** Structure section in `static-site/profil.html`
- **Commit:** "feat(sections): create GovernmentCard component"

### Task 3.2: GovernmentSection Component
File: `src/components/sections/GovernmentSection.astro`
- Fetches government collection internally
- Filters: kepala-dusun (1), ketua-rw (1), ketua-rt (3)
- Hierarchical layout
- Uses GovernmentCard for display
- Section heading from pages collection
- **Commit:** "feat(sections): create GovernmentSection orchestrator"

---

## Phase 4: Vision & Mission Components

### Task 4.1: VisionMission Component
File: `src/components/sections/VisionMission.astro`
- Props: visi (string), misi (array of strings)
- Two-card layout: Vision (left) + Mission (right)
- Icon: eye for visi, bullseye for misi
- Mission: numbered list
- Dark mode styling
- **Reference:** Visi & Misi section in `static-site/profil.html`
- **Commit:** "feat(sections): create VisionMission component"

---

## Phase 5: Gallery Components

### Task 5.1: GalleryGrid Component
File: `src/components/sections/GalleryGrid.astro`
- Props: images (array of {src, alt, type: 'image'|'video'}), columns
- Grid layout: responsive columns
- Masonry or equal height
- Hover effects
- Lightgallery integration
- Supports both images and videos
- **Reference:** Gallery grid in `static-site/galeri.html`
- **Commit:** "feat(gallery): create GalleryGrid component"

### Task 5.2: Lightgallery Integration
File: `src/scripts/lightgallery.ts`
- Install: `npm install lightgallery lg-zoom lg-thumbnail lg-video`
- Initialize lightgallery on gallery grids
- Support image and video lightbox
- Thumbnail navigation
- Zoom functionality
- **Reference:** GLightbox usage in `static-site/`
- **Commit:** "feat(gallery): integrate lightgallery for images and videos"

---

## Phase 6: CountUp.js Integration

### Task 6.1: Install CountUp.js
- Run: `npm install countup.js`
- Create wrapper component

### Task 6.2: CountUp Component
File: `src/components/ui/CountUp.astro`
- Props: end, duration, suffix, prefix, decimals, options
- Use official CountUp.js library
- IntersectionObserver: trigger on scroll into view
- Initialize on mount (client-side script)
- **Commit:** "feat(ui): create CountUp component wrapper"

### Task 6.3: Integrate CountUp in StatsGrid
Update StatsGrid component:
- Use CountUp for number animation
- Pass props: end value, suffix
- Trigger animation when visible
- **Commit:** "feat(stats): integrate CountUp.js animations"

---

## Phase 7: Content Collection Components

### Task 7.1: NewsCard Component
File: `src/components/content/NewsCard.astro`
- Props: article (berita entry)
- Display: image, category badge, title, excerpt, date
- Link to article detail page
- Hover effects
- Dark mode styling
- **Reference:** News cards in `static-site/berita/index.html`
- **Commit:** "feat(content): create NewsCard component"

### Task 7.2: ProductCard Component
File: `src/components/content/ProductCard.astro`
- Props: product (potensi entry)
- Display: image, title, price, category, excerpt
- Link to product detail
- Price formatting (IDR)
- **Reference:** Product cards in `static-site/potensi.html`
- **Commit:** "feat(content): create ProductCard component"

### Task 7.3: DestinationCard Component
File: `src/components/content/DestinationCard.astro`
- Props: destination (pariwisata entry)
- Display: image, title, location, category, description
- Link to destination page
- Location icon and text
- **Reference:** Destination cards in `static-site/pariwisata.html`
- **Commit:** "feat(content): create DestinationCard component"

### Task 7.4: AccommodationCard Component
File: `src/components/content/AccommodationCard.astro`
- Props: accommodation (akomodasi entry)
- Display: image, title, type, price range, contact
- Link to detail page
- **Commit:** "feat(content): create AccommodationCard component"

### Task 7.5: WarungCard Component
File: `src/components/content/WarungCard.astro`
- Props: warung entry
- Display: title, owner, category, location, contact
- Featured menu items
- **Commit:** "feat(content): create WarungCard component"

---

## Phase 8: Form Components

### Task 8.1: FormField Component
File: `src/components/ui/FormField.astro`
- Props: label, name, type, placeholder, required, error
- Consistent form field styling
- Error message display
- Dark mode input styling
- Accessible labels
- **Commit:** "feat(ui): create FormField component"

### Task 8.2: FormTextarea Component
File: `src/components/ui/FormTextarea.astro`
- Similar to FormField but for textarea
- Proper sizing and styling
- **Commit:** "feat(ui): create FormTextarea component"

### Task 8.3: FormSelect Component
File: `src/components/ui/FormSelect.astro`
- Props: label, name, options, required, error
- Dropdown select styling
- Dark mode support
- **Commit:** "feat(ui): create FormSelect component"

---

## Phase 9: Navigation Enhancements

### Task 9.1: Breadcrumb Component
File: `src/components/layout/Breadcrumb.astro`
- Props: items (array of {label, href})
- Displays navigation path
- Home icon for root
- Current page not clickable
- ARIA breadcrumb nav
- **Reference:** Breadcrumbs in various pages
- **Commit:** "feat(nav): create Breadcrumb component"

### Task 9.2: Pagination Component
File: `src/components/ui/Pagination.astro`
- Props: currentPage, totalPages, baseUrl
- Previous/Next buttons
- Page numbers (with ellipsis for many pages)
- Disabled state styling
- **Commit:** "feat(ui): create Pagination component"

---

## Phase 10: Layout Components

### Task 10.1: ContentLayout
File: `src/layouts/ContentLayout.astro`
- Extends MainLayout
- Props: title, description, image, breadcrumbs, sidebar
- Optional sidebar support
- Breadcrumb integration
- Container with proper spacing
- **Commit:** "feat(layout): create ContentLayout template"

### Task 10.2: ArticleLayout
File: `src/layouts/ArticleLayout.astro`
- Extends ContentLayout
- Props: title, description, pubDate, author, image, category, tags
- Article metadata display
- Reading time
- Social sharing buttons
- Related articles sidebar
- **Commit:** "feat(layout): create ArticleLayout template"

---

## Phase 11: Social & Contact Components

### Task 11.1: SocialLinks Component
File: `src/components/ui/SocialLinks.astro`
- Fetches social links from config collection
- Renders icon buttons for each platform
- Props: size, variant (icons only or with labels)
- Dark mode styling
- Opens in new tab
- **Commit:** "feat(ui): create SocialLinks component"

### Task 11.2: ContactInfo Component
File: `src/components/sections/ContactInfo.astro`
- Fetches contact from config collection
- Displays: phone, email, address
- Icons with text
- Clickable: tel:, mailto: links
- **Commit:** "feat(sections): create ContactInfo component"

---

## Phase 12: Testing & Documentation

### Task 12.1: Component Showcase Page
File: `src/pages/component-showcase.astro`
- Display all components
- Test variants and props
- Verify dark mode
- Check responsiveness
- Delete after verification
- **Commit:** "test(components): create showcase page"

### Task 12.2: Component Documentation
File: `docs/COMPONENTS.md`
- Document all components
- List props for each
- Show usage examples
- Explain when to use each
- **Commit:** "docs(components): document component library"

### Task 12.3: Dark Mode Testing
- Test every component in dark mode
- Verify color contrast (accessibility)
- Check hover states
- Ensure readable text
- Fix any issues
- **Commit:** "fix(theme): ensure all components support dark mode"

---

## Completion Checklist

Before moving to Plan 4:
- [ ] Card, Button, Badge, Section components created
- [ ] Hero, Banner, WelcomeSection components working
- [ ] StatsGrid with CountUp.js animating
- [ ] FeatureCard, GovernmentCard components built
- [ ] VisionMission component displaying correctly
- [ ] GalleryGrid with lightgallery integration
- [ ] lightgallery installed via npm (not CDN)
- [ ] lightgallery handles images AND videos
- [ ] CountUp.js (official library) installed via npm
- [ ] NewsCard, ProductCard, DestinationCard created
- [ ] AccommodationCard, WarungCard components done
- [ ] Form components (Field, Textarea, Select) ready
- [ ] Breadcrumb and Pagination components
- [ ] ContentLayout and ArticleLayout templates
- [ ] SocialLinks and ContactInfo components
- [ ] All components fetch from collections (zero hardcoded content)
- [ ] Dark mode fully supported across all components
- [ ] Responsive on mobile, tablet, desktop
- [ ] Accessibility: ARIA labels, keyboard nav, focus states
- [ ] Component showcase tested
- [ ] Documentation complete
- [ ] All components committed atomically
- [ ] No CDN scripts except fonts & Font Awesome

**Estimated Time:** 6-7 hours

**Next:** Plan 4 - Page implementation with components

---

**Key Principle:** Components are reusable, fetch data from collections, support dark mode, and maintain the original design aesthetic from `static-site/`. Always pass data as props or fetch from collections—never hardcode content inside components.
