# Migration Plans Update Requirements Summary

## Critical Changes Needed Across All Plans

### 1. **Phase 0 - Backup (ALL PLANS)**
Every plan must start with Phase 0:
- Create migration branch: `feature/astro-5-migration`
- Backup everything to `static-site/` directory
- Use rsync to copy (exclude .git, node_modules)
- Commit backup before doing anything else
- Reference static-site/ throughout migration

### 2. **Use Latest Astro Commands**
Replace all `npm install` commands with proper Astro CLI:
- ❌ `npm install @astrojs/tailwind tailwindcss`
- ✅ `npx astro add tailwind`
- ❌ `npm install lightgallery`
- ✅ `npm install lightgallery lg-zoom lg-thumbnail lg-video`
- Use `npm create astro@latest` for initialization
- Use `npx astro add` for integrations

### 3. **Use CountUp.js (Not Custom)**
- Install: `npm install countup.js`
- Use official CountUp.js library
- No custom implementation
- Reference from CDN or npm package

### 4. **Everything Must Come from Content Collections**

#### Content That MUST Be in Collections (Not Hardcoded):

**Homepage (index.html):**
- ✅ Hero section content (title, description, CTA)
- ✅ Welcome/Greeting section (Sambutan dari Kepala Dusun - currently hardcoded!)
- ✅ Statistics (450 warga, 120 KK, 15+ UMKM, 2 pantai)
- ✅ All section headings and descriptions
- ✅ Featured news, products, destinations

**Profile Page (profil.html):**
- ✅ Government structure (Kepala Dusun, Ketua RW, RT leaders - currently hardcoded!)
- ✅ Vision (visi) and Mission (misi) statements
- ✅ History/About text
- ✅ Demographics data

**Navigation & Footer:**
- ✅ Nav links and labels
- ✅ Social media links
- ✅ Contact information
- ✅ Footer text and links

**Site Settings:**
- ✅ Site title, description
- ✅ Contact details (phone, email)
- ✅ Social media URLs
- ✅ Address information

#### New Collections Needed:

1. **`config` collection** - Site-wide settings:
   ```typescript
   const config = defineCollection({
     type: 'data',
     schema: z.object({
       site: z.object({
         title: z.string(),
         description: z.string(),
         url: z.string(),
         author: z.string(),
       }),
       contact: z.object({
         phone: z.string(),
         whatsapp: z.string(),
         email: z.string().email(),
         address: z.string(),
       }),
       social: z.array(z.object({
         platform: z.string(),
         url: z.string(),
         icon: z.string(),
         label: z.string(),
       })),
       navigation: z.array(z.object({
         label: z.string(),
         href: z.string(),
         order: z.number(),
       })),
     }),
   });
   ```

2. **`pages` collection** - Page-specific content:
   ```typescript
   const pages = defineCollection({
     type: 'data',
     schema: z.object({
       page: z.string(), // 'home', 'profile', etc.
       hero: z.object({
         title: z.string(),
         subtitle: z.string(),
         image: z.string(),
         cta: z.object({
           text: z.string(),
           href: z.string(),
         }).optional(),
       }).optional(),
       sections: z.array(z.object({
         id: z.string(),
         title: z.string(),
         description: z.string().optional(),
         content: z.any(), // Flexible content structure
       })),
     }),
   });
   ```

3. **`government` collection** - Government officials:
   ```typescript
   const government = defineCollection({
     type: 'data',
     schema: z.object({
       name: z.string(),
       position: z.string(),
       role: z.enum(['kepala-dusun', 'ketua-rw', 'ketua-rt']),
       photo: z.string(),
       order: z.number(),
       rt: z.string().optional(), // For RT leaders
     }),
   });
   ```

4. **`statistics` collection** - Dynamic stats:
   ```typescript
   const statistics = defineCollection({
     type: 'data',
     schema: z.object({
       key: z.string(), // 'total-warga', 'total-kk', etc.
       value: z.number(),
       label: z.string(),
       icon: z.string(),
       color: z.string(),
       order: z.number(),
     }),
   });
   ```

### 5. **Create More Astro Components**

Extract EVERYTHING reusable into components:

**New Components Needed:**
- `Hero.astro` - Hero sections (used on multiple pages)
- `Banner.astro` - Page banners
- `WelcomeSection.astro` - Welcome/greeting sections
- `StatsGrid.astro` - Statistics display grid
- `GovernmentCard.astro` - Government official cards
- `VisionMission.astro` - Vision & mission display
- `ContentSection.astro` - Generic content sections
- `FeatureCard.astro` - Feature/capability cards
- `GalleryGrid.astro` - Gallery grid layout
- `SocialLinks.astro` - Social media links
- `ContactInfo.astro` - Contact information display

### 6. **Use Astro's Built-in Image Component**

Replace ALL `<img>` tags with:
```astro
---
import { Image } from 'astro:assets';
import heroImage from '@assets/images/ngedan.webp';
---

<Image 
  src={heroImage} 
  alt="Pantai Ngedan" 
  width={1920}
  height={1080}
  quality={80}
  loading="eager"
/>
```

For public images:
```astro
<Image 
  src="/assets/images/ngedan.webp" 
  alt="Pantai Ngedan" 
  width={1920}
  height={1080}
  inferSize
/>
```

### 7. **Check Actual Original Content**

Before migrating each page, check `static-site/[page].html` for:
- Exact text content
- Section order
- Image paths
- Links
- Any dynamic behavior
- Scripts used (Chart.js, CountUp.js, GLightbox)

**DO NOT** hallucinate or assume content. Reference the backup!

### 8. **Dark Mode Requirements**

Implement proper dark mode:
- Toggle button in header
- localStorage persistence: `localStorage.setItem('theme', 'dark')`
- Tailwind dark: classes: `dark:bg-gray-900`
- System preference detection: `matchMedia('(prefers-color-scheme: dark)')`
- Smooth transition between themes
- Apply to ALL components

### 9. **Typography & Styling**

**Fonts:**
- Keep Google Fonts CDN: Poppins (400, 500, 600, 700)
- Keep Font Awesome CDN: v6.7.1
- Do NOT use npm for fonts

**CSS:**
- Use Tailwind classes primarily
- Migrate `css/tailwind-custom.css` to `src/styles/global.css`
- Keep all custom component classes
- Preserve exact spacing, colors, sizes from original

### 10. **Every Task Must Have Commit**

After EACH individual task:
```bash
git add .
git commit -m "feat(scope): clear description

- Specific change 1
- Specific change 2
- Reference to task number"
```

## Updated Task Examples

### Example 1: Homepage Hero (Should Use Content Collection)

**Wrong (Hardcoded):**
```astro
<section class="hero">
  <h1>Selamat Datang di Dusun Bedalo</h1>
  <p>Menjelajahi Keindahan...</p>
</section>
```

**Correct (From Collection):**
```astro
---
import { getEntry } from 'astro:content';
import Hero from '@components/Hero.astro';

const homePage = await getEntry('pages', 'home');
const hero = homePage.data.hero;
---

<Hero 
  title={hero.title}
  subtitle={hero.subtitle}
  image={hero.image}
  cta={hero.cta}
/>
```

### Example 2: Statistics (Should Use Content Collection)

**Wrong (Hardcoded):**
```astro
<CountUp end={450} />
<p>Jumlah Warga</p>
```

**Correct (From Collection):**
```astro
---
import { getCollection } from 'astro:content';
import StatsGrid from '@components/StatsGrid.astro';

const statistics = await getCollection('statistics');
const sortedStats = statistics.sort((a, b) => a.data.order - b.data.order);
---

<StatsGrid stats={sortedStats} />
```

### Example 3: Government Structure (Should Use Content Collection)

**Wrong (Hardcoded Array):**
```astro
---
const government = {
  kepalaDusun: {
    name: 'Sumindar',
    position: 'Kepala Dusun',
  },
  // ...
};
---
```

**Correct (From Collection):**
```astro
---
import { getCollection } from 'astro:content';

const officials = await getCollection('government');
const kepalaDusun = officials.find(o => o.data.role === 'kepala-dusun');
const ketuaRW = officials.find(o => o.data.role === 'ketua-rw');
const rtLeaders = officials.filter(o => o.data.role === 'ketua-rt')
  .sort((a, b) => a.data.order - b.data.order);
---
```

## Plan-Specific Updates

### Plan 1 Updates:
- Add Phase 0 for backup
- Add config, pages, government, statistics collections setup
- Use `npx astro add tailwind`
- Add all necessary component files
- Set up dark mode from start

### Plan 2 Updates:
- Define 9 collections total (not 5):
  1. berita
  2. potensi
  3. pariwisata
  4. akomodasi
  5. warung
  6. config (site settings)
  7. pages (page content)
  8. government (officials)
  9. statistics (stats)
- All collections must use proper Zod schemas
- Migrate sambutan text to pages collection
- Migrate vision/mission to pages collection
- Migrate government data to government collection
- Migrate stats to statistics collection

### Plan 3 Updates:
- Create Hero, Banner, StatsGrid components
- Create VisionMission, GovernmentCard components
- Create WelcomeSection component
- Use CountUp.js (not custom)
- All components must accept data from collections (no hardcoded props)
- Implement full dark mode support in all components

### Plan 4 Updates:
- Check `static-site/index.html` for exact homepage content
- Check `static-site/profil.html` for exact profile content
- Check `static-site/dashboard/index.html` for dashboard
- Check `static-site/survei/index.html` for survey
- Check `static-site/galeri.html` for gallery
- Use actual text content (don't hallucinate)
- Verify Chart.js usage in dashboard
- Verify form fields in survey
- Use lightgallery (not GLightbox)
- Every page must pull from collections

### Plan 5 Updates:
- Final content verification against static-site/
- Ensure zero hardcoded content remains
- Dark mode works on all pages
- All images use Astro Image component
- CountUp.js properly integrated
- Chart.js dashboard works
- lightgallery works for images AND videos
- Performance meets target (Lighthouse 95+)

## Commit Strategy

Each task gets ONE commit. Format:
```
<type>(<scope>): <description>

- Detail 1
- Detail 2

Task: Plan X, Phase X.X, Task X.X.X
```

Types: feat, fix, chore, docs, style, refactor, test

## Testing Checklist Per Phase

After each phase:
- [ ] `npm run dev` starts without errors
- [ ] `npm run build` completes successfully
- [ ] `npm run check` (TypeScript) passes
- [ ] All pages load correctly
- [ ] No console errors
- [ ] Content displays from collections (not hardcoded)
- [ ] Dark mode works
- [ ] Images load properly
- [ ] Commit made with clear message

## Reference Commands

```bash
# Check original content
cat static-site/index.html | grep -A 10 "section-name"

# Start dev server
npm run dev

# Build
npm run build

# TypeScript check
npm run check

# Preview build
npm run preview

# Format code
npm run format

# Add Astro integration
npx astro add tailwind
npx astro add sitemap
```

## Content Collection File Structure

```
src/content/
├── config.ts                    # Schema definitions
├── berita/                      # News articles
├── potensi/                     # Products
├── pariwisata/                  # Tourism
├── akomodasi/                   # Accommodation
├── warung/                      # Local stores
├── config/                      # Site settings
│   └── site.json
├── pages/                       # Page content
│   ├── home.json
│   ├── profile.json
│   └── ...
├── government/                  # Officials
│   ├── kepala-dusun.json
│   ├── ketua-rw.json
│   └── ketua-rt-01.json
└── statistics/                  # Stats
    ├── total-warga.json
    ├── total-kk.json
    └── ...
```

## Important Notes

1. **NEVER hardcode content** - Everything from collections
2. **Reference static-site/** - Don't guess original content
3. **Use Astro CLI** - `npx astro add` not `npm install`
4. **Commit after each task** - Atomic, clear messages
5. **Test incrementally** - Don't wait until the end
6. **Dark mode everywhere** - Every component supports it
7. **Astro Image** - All images use `<Image />`
8. **CountUp.js** - Use official library
9. **lightgallery** - For images AND videos
10. **UI in Indonesian** - Code/variables in English

---

This document should be used to update all 5 plan files comprehensively.
Each plan needs significant revision based on these requirements.
