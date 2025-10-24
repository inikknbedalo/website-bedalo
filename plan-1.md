# Migration Plan 1: Project Setup & Foundation Architecture

**Target:** Establish Astro 5 project foundation with TypeScript strict mode, configure base structure, and set up development environment.

---

## Phase 1.1: Initialize Astro 5 Project with TypeScript

### Task 1.1.1: Create New Astro 5 Project
**Objective:** Bootstrap a fresh Astro 5 project with TypeScript strict mode enabled.

**Actions:**
1. Run Astro CLI to create new project:
   ```bash
   npm create astro@latest astro-bedalo -- --template minimal --typescript strict --git
   ```
2. Navigate into the project directory
3. Verify `astro.config.mjs` exists with Astro 5 configuration
4. Confirm `tsconfig.json` has `"strict": true` enabled
5. Install dependencies: `npm install`

**Success Criteria:**
- Project initializes without errors
- `package.json` shows Astro version 5.x
- TypeScript strict mode is active
- Dev server runs successfully: `npm run dev`

**Context7 Reference:**
```typescript
// Expected tsconfig.json structure
{
  "extends": "astro/tsconfigs/strict",
  "compilerOptions": {
    "strictNullChecks": true,
    "allowJs": true
  }
}
```

---

### Task 1.1.2: Configure Git and Migration Branch
**Objective:** Set up version control and create a dedicated migration branch.

**Actions:**
1. Initialize git if not already done: `git init`
2. Create `.gitignore` with Astro-specific patterns:
   ```
   # build output
   dist/
   .astro/
   
   # dependencies
   node_modules/
   
   # environment
   .env
   .env.production
   
   # macOS
   .DS_Store
   ```
3. Create migration branch: `git checkout -b feature/astro-migration`
4. Initial commit: `git add . && git commit -m "chore: initialize Astro 5 project with TypeScript strict mode"`

**Success Criteria:**
- Git repository is properly initialized
- `.gitignore` excludes unnecessary files
- Migration branch is active

---

### Task 1.1.3: Install Essential Dependencies
**Objective:** Add core dependencies required for the project.

**Actions:**
1. Install Astro integrations and tools:
   ```bash
   npm install @astrojs/tailwind tailwindcss
   npm install -D @types/node
   ```
2. Install lightgallery (replacing GLightbox):
   ```bash
   npm install lightgallery
   ```
3. Verify all dependencies resolve correctly: `npm list`

**Success Criteria:**
- All packages install without peer dependency warnings
- `package.json` lists all required dependencies
- No security vulnerabilities: `npm audit`

---

## Phase 1.2: Configure Astro Project Structure

### Task 1.2.1: Configure astro.config.mjs
**Objective:** Set up Astro configuration with Tailwind integration and proper build settings.

**Actions:**
1. Update `astro.config.mjs`:
   ```typescript
   import { defineConfig } from 'astro/config';
   import tailwind from '@astrojs/tailwind';
   
   export default defineConfig({
     site: 'https://bedalo.pages.dev',
     integrations: [
       tailwind({
         applyBaseStyles: false, // We'll use custom styles
       }),
     ],
     output: 'static', // Static site generation
     build: {
       assets: 'assets',
       inlineStylesheets: 'auto',
     },
     vite: {
       build: {
         cssMinify: true,
         minify: 'terser',
       },
     },
     compressHTML: true,
   });
   ```
2. Verify configuration by running dev server
3. Test Tailwind is working with a test component

**Success Criteria:**
- Dev server starts without errors
- Tailwind CSS is properly integrated
- Site configuration matches production URL

---

### Task 1.2.2: Create Core Directory Structure
**Objective:** Establish the src/ directory structure following Astro 5 best practices.

**Actions:**
1. Create the following directory structure:
   ```
   src/
   ├── assets/
   │   └── images/
   ├── components/
   │   ├── ui/
   │   ├── layout/
   │   └── islands/
   ├── content/
   │   ├── berita/
   │   ├── potensi/
   │   ├── pariwisata/
   │   ├── akomodasi/
   │   └── warung/
   ├── layouts/
   ├── pages/
   ├── styles/
   ├── types/
   └── utils/
   ```
2. Create `.gitkeep` files in empty directories to preserve structure
3. Add README.md in key directories explaining their purpose

**Success Criteria:**
- All directories are created
- Structure follows Astro 5 conventions
- Each directory has a clear purpose documented

---

### Task 1.2.3: Configure TypeScript Path Aliases
**Objective:** Set up import aliases for cleaner imports.

**Actions:**
1. Update `tsconfig.json` with path mappings:
   ```json
   {
     "extends": "astro/tsconfigs/strict",
     "compilerOptions": {
       "strictNullChecks": true,
       "allowJs": true,
       "baseUrl": ".",
       "paths": {
         "@/*": ["src/*"],
         "@components/*": ["src/components/*"],
         "@layouts/*": ["src/layouts/*"],
         "@assets/*": ["src/assets/*"],
         "@content/*": ["src/content/*"],
         "@utils/*": ["src/utils/*"],
         "@types/*": ["src/types/*"],
         "@styles/*": ["src/styles/*"]
       }
     }
   }
   ```
2. Test imports work correctly with a sample component
3. Verify VS Code IntelliSense recognizes the aliases

**Success Criteria:**
- Path aliases resolve correctly
- TypeScript compilation succeeds
- IntelliSense provides autocompletion for aliased paths

---

## Phase 1.3: Configure Styling System

### Task 1.3.1: Set Up Tailwind CSS Configuration
**Objective:** Configure Tailwind with custom theme matching original design.

**Actions:**
1. Create `tailwind.config.mjs`:
   ```javascript
   /** @type {import('tailwindcss').Config} */
   export default {
     content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
     darkMode: 'class',
     theme: {
       extend: {
         fontFamily: {
           sans: ['Poppins', 'system-ui', 'sans-serif'],
         },
         colors: {
           primary: {
             50: '#eff6ff',
             100: '#dbeafe',
             200: '#bfdbfe',
             300: '#93c5fd',
             400: '#60a5fa',
             500: '#3b82f6',
             600: '#2563eb', // Main primary color
             700: '#1d4ed8',
             800: '#1e40af',
             900: '#1e3a8a',
           },
         },
       },
     },
     plugins: [
       require('@tailwindcss/typography'),
       require('@tailwindcss/forms'),
     ],
   };
   ```
2. Install Tailwind plugins:
   ```bash
   npm install @tailwindcss/typography @tailwindcss/forms
   ```
3. Test Tailwind classes render correctly

**Success Criteria:**
- Tailwind configuration matches original color scheme
- Poppins font is properly configured
- Dark mode class strategy is set
- Plugins are functional

---

### Task 1.3.2: Create Global Styles
**Objective:** Port existing custom CSS to Astro-compatible global styles.

**Actions:**
1. Create `src/styles/global.css`:
   ```css
   @tailwind base;
   @tailwind components;
   @tailwind utilities;
   
   @layer base {
     html {
       @apply scroll-smooth;
     }
     
     body {
       @apply font-sans bg-gray-50 text-gray-900 antialiased;
     }
     
     /* Dark mode overrides */
     .dark body {
       @apply bg-gray-900 text-gray-100;
     }
   }
   
   @layer components {
     .btn-primary {
       @apply inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors duration-200;
     }
     
     .card {
       @apply bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-200;
     }
     
     .dark .card {
       @apply bg-gray-800;
     }
   }
   
   @layer utilities {
     .text-balance {
       text-wrap: balance;
     }
   }
   ```
2. Review original `css/tailwind-custom.css` for additional patterns
3. Port relevant custom component classes
4. Document any CSS that will be replaced by Tailwind utilities

**Success Criteria:**
- Global styles compile without errors
- Original design patterns are preserved
- Dark mode styles are properly configured
- Custom component classes are available globally

---

### Task 1.3.3: Configure Lightgallery Styles
**Objective:** Set up lightgallery CSS imports for gallery functionality.

**Actions:**
1. Create `src/styles/lightgallery.css`:
   ```css
   /* Import lightgallery core styles */
   @import 'lightgallery/css/lightgallery.css';
   @import 'lightgallery/css/lg-zoom.css';
   @import 'lightgallery/css/lg-thumbnail.css';
   @import 'lightgallery/css/lg-video.css';
   
   /* Custom theme overrides */
   .lg-backdrop {
     @apply bg-black/90;
   }
   
   .lg-toolbar {
     @apply bg-black/50;
   }
   
   /* Dark mode adjustments */
   .dark .lg-toolbar {
     @apply bg-gray-900/50;
   }
   ```
2. Install lightgallery plugins:
   ```bash
   npm install lightgallery lg-zoom lg-thumbnail lg-video
   ```
3. Test import paths resolve correctly

**Success Criteria:**
- Lightgallery styles are imported correctly
- Plugins are installed and accessible
- Custom theme overrides apply properly

---

## Phase 1.4: Create Base Layout Components

### Task 1.4.1: Create Base HTML Layout
**Objective:** Build the foundational HTML structure with SEO metadata.

**Actions:**
1. Create `src/layouts/BaseLayout.astro`:
   ```astro
   ---
   import '@styles/global.css';
   import '@styles/lightgallery.css';
   
   interface Props {
     title: string;
     description: string;
     image?: string;
     canonicalURL?: string;
   }
   
   const {
     title,
     description,
     image = '/assets/images/ngedan.webp',
     canonicalURL = new URL(Astro.url.pathname, Astro.site),
   } = Astro.props;
   
   const siteTitle = `${title} | Dusun Bedalo`;
   const ogImage = new URL(image, Astro.site);
   ---
   
   <!doctype html>
   <html lang="id" class="scroll-smooth">
     <head>
       <meta charset="UTF-8" />
       <meta name="viewport" content="width=device-width, initial-scale=1.0" />
       <meta name="theme-color" content="#2563eb" />
       
       <!-- SEO Meta Tags -->
       <title>{siteTitle}</title>
       <meta name="description" content={description} />
       <link rel="canonical" href={canonicalURL} />
       
       <!-- Open Graph / Facebook -->
       <meta property="og:type" content="website" />
       <meta property="og:url" content={canonicalURL} />
       <meta property="og:title" content={siteTitle} />
       <meta property="og:description" content={description} />
       <meta property="og:image" content={ogImage} />
       <meta property="og:locale" content="id_ID" />
       <meta property="og:site_name" content="Dusun Bedalo" />
       
       <!-- Twitter Card -->
       <meta name="twitter:card" content="summary_large_image" />
       <meta name="twitter:url" content={canonicalURL} />
       <meta name="twitter:title" content={siteTitle} />
       <meta name="twitter:description" content={description} />
       <meta name="twitter:image" content={ogImage} />
       
       <!-- Favicons -->
       <link rel="icon" type="image/svg+xml" href="/icon.svg" />
       <link rel="apple-touch-icon" href="/icon.svg" />
       <link rel="manifest" href="/site.webmanifest" />
       
       <!-- Preconnect for Performance -->
       <link rel="preconnect" href="https://fonts.googleapis.com" />
       <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
       
       <!-- Google Fonts -->
       <link
         href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700&display=swap"
         rel="stylesheet"
       />
       
       <!-- Font Awesome CDN -->
       <link
         rel="stylesheet"
         href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.7.1/css/all.min.css"
         integrity="sha512-5Hs3dF2AEPkpNAR7UiOHba+lRSJNeM2ECkwxUIxC1Q/FLycGTbNapWXB4tP889k5T5Ju8fs4b1P5z/iB4nMfSQ=="
         crossorigin="anonymous"
         referrerpolicy="no-referrer"
       />
     </head>
     
     <body>
       <!-- Skip to main content link for accessibility -->
       <a
         href="#main-content"
         class="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:px-4 focus:py-2 focus:bg-blue-600 focus:text-white focus:rounded"
       >
         Lompat ke konten utama
       </a>
       
       <slot />
     </body>
   </html>
   ```
2. Verify the layout compiles without errors
3. Test that SEO meta tags populate correctly

**Success Criteria:**
- Layout renders HTML5 semantic structure
- SEO metadata is dynamic and correct
- Accessibility skip link is present
- Fonts and icons load from CDN

---

### Task 1.4.2: Create Type Definitions
**Objective:** Define reusable TypeScript interfaces for common data structures.

**Actions:**
1. Create `src/types/common.ts`:
   ```typescript
   export interface SEOProps {
     title: string;
     description: string;
     image?: string;
     canonicalURL?: string | URL;
     keywords?: string[];
   }
   
   export interface NavigationLink {
     label: string;
     href: string;
     icon?: string;
   }
   
   export interface SocialLink {
     platform: string;
     url: string;
     icon: string;
     label: string;
   }
   
   export interface ContactInfo {
     name: string;
     position: string;
     phone?: string;
     email?: string;
     photo?: string;
   }
   ```
2. Create `src/types/content.ts`:
   ```typescript
   import type { CollectionEntry } from 'astro:content';
   
   // Re-export collection entry types for convenience
   export type BeritaEntry = CollectionEntry<'berita'>;
   export type PotensiEntry = CollectionEntry<'potensi'>;
   export type PariwisataEntry = CollectionEntry<'pariwisata'>;
   export type AkomodasiEntry = CollectionEntry<'akomodasi'>;
   export type WarungEntry = CollectionEntry<'warung'>;
   
   export interface GalleryImage {
     src: string;
     alt: string;
     caption?: string;
     thumbnail?: string;
   }
   
   export interface GalleryVideo {
     src: string;
     poster?: string;
     title: string;
     description?: string;
   }
   ```
3. Verify TypeScript can import and use these types

**Success Criteria:**
- All type definitions are valid TypeScript
- Types are reusable across the project
- IntelliSense provides type hints

---

## Phase 1.5: Create Utility Functions

### Task 1.5.1: Create Date Formatting Utilities
**Objective:** Build helper functions for consistent date formatting in Indonesian.

**Actions:**
1. Create `src/utils/dateFormat.ts`:
   ```typescript
   export function formatDate(date: Date | string): string {
     const d = typeof date === 'string' ? new Date(date) : date;
     
     const months = [
       'Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni',
       'Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember'
     ];
     
     const day = d.getDate();
     const month = months[d.getMonth()];
     const year = d.getFullYear();
     
     return `${day} ${month} ${year}`;
   }
   
   export function formatDateShort(date: Date | string): string {
     const d = typeof date === 'string' ? new Date(date) : date;
     return d.toLocaleDateString('id-ID', {
       year: 'numeric',
       month: 'short',
       day: 'numeric',
     });
   }
   
   export function getReadingTime(content: string): number {
     const wordsPerMinute = 200;
     const wordCount = content.trim().split(/\s+/).length;
     return Math.ceil(wordCount / wordsPerMinute);
   }
   ```
2. Add unit tests for date utilities (optional but recommended)
3. Test functions with various date formats

**Success Criteria:**
- Date functions return properly formatted Indonesian dates
- Reading time calculation is accurate
- Functions handle edge cases (invalid dates, empty strings)

---

### Task 1.5.2: Create Slug Utilities
**Objective:** Build functions for URL-safe slug generation and validation.

**Actions:**
1. Create `src/utils/slug.ts`:
   ```typescript
   export function slugify(text: string): string {
     return text
       .toString()
       .toLowerCase()
       .normalize('NFD')
       .replace(/[\u0300-\u036f]/g, '') // Remove accents
       .replace(/[^a-z0-9\s-]/g, '') // Remove special characters
       .trim()
       .replace(/\s+/g, '-') // Replace spaces with hyphens
       .replace(/-+/g, '-'); // Remove consecutive hyphens
   }
   
   export function getIdFromFilename(filename: string): string {
     return filename.replace(/\.(md|mdx|json)$/, '');
   }
   
   export function extractSlugFromPath(path: string): string {
     const parts = path.split('/');
     const filename = parts[parts.length - 1];
     return getIdFromFilename(filename);
   }
   ```
2. Test slug generation with Indonesian characters
3. Verify slugs are URL-safe

**Success Criteria:**
- Slugs are properly sanitized
- Indonesian characters are handled correctly
- Slugs are URL-safe and SEO-friendly

---

### Task 1.5.3: Create Image Optimization Helpers
**Objective:** Build utilities for responsive image handling.

**Actions:**
1. Create `src/utils/images.ts`:
   ```typescript
   export interface ImageMetadata {
     src: string;
     width: number;
     height: number;
     format: string;
   }
   
   export function getImagePath(filename: string): string {
     return `/assets/images/${filename}`;
   }
   
   export function generateSrcSet(
     basePath: string,
     widths: number[] = [320, 640, 960, 1280, 1920]
   ): string {
     return widths
       .map((width) => `${basePath}?w=${width} ${width}w`)
       .join(', ');
   }
   
   export function getImageAlt(
     filename: string,
     fallback: string = 'Gambar Dusun Bedalo'
   ): string {
     const name = filename.replace(/\.(jpg|jpeg|png|webp|svg)$/i, '');
     return name.replace(/[-_]/g, ' ').replace(/\b\w/g, (l) => l.toUpperCase()) || fallback;
   }
   ```
2. Test image path generation
3. Verify srcset generation for responsive images

**Success Criteria:**
- Image paths resolve correctly
- Srcset generates multiple widths
- Alt text extraction works properly

---

## Phase 1.6: Migration Documentation & Testing

### Task 1.6.1: Document Project Structure
**Objective:** Create comprehensive documentation for the new structure.

**Actions:**
1. Update root `README.md` with Astro-specific information:
   ```markdown
   # Website Dusun Bedalo - Astro 5
   
   ## Project Structure
   
   ```
   astro-bedalo/
   ├── src/
   │   ├── assets/       # Static assets (images, etc.)
   │   ├── components/   # Reusable Astro components
   │   ├── content/      # Content collections (markdown, JSON)
   │   ├── layouts/      # Page layouts
   │   ├── pages/        # File-based routing
   │   ├── styles/       # Global styles
   │   ├── types/        # TypeScript type definitions
   │   └── utils/        # Utility functions
   ├── public/           # Static files (served as-is)
   └── astro.config.mjs  # Astro configuration
   ```
   
   ## Development
   
   ```bash
   npm run dev          # Start dev server
   npm run build        # Build for production
   npm run preview      # Preview production build
   npm run astro        # Run Astro CLI
   ```
   
   ## Tech Stack
   
   - **Framework:** Astro 5
   - **Language:** TypeScript (strict mode)
   - **Styling:** Tailwind CSS 3.x
   - **Gallery:** lightgallery
   - **Fonts:** Google Fonts (Poppins) via CDN
   - **Icons:** Font Awesome 6.7.1 via CDN
   ```
2. Create `MIGRATION.md` tracking migration progress
3. Document any deviations from original implementation

**Success Criteria:**
- Documentation is clear and comprehensive
- README includes all necessary commands
- Migration status is tracked

---

### Task 1.6.2: Set Up Development Scripts
**Objective:** Configure package.json with helpful development scripts.

**Actions:**
1. Update `package.json` scripts:
   ```json
   {
     "scripts": {
       "dev": "astro dev",
       "build": "astro check && astro build",
       "preview": "astro preview",
       "astro": "astro",
       "check": "astro check",
       "sync": "astro sync",
       "format": "prettier --write .",
       "lint": "prettier --check ."
     }
   }
   ```
2. Install Prettier for code formatting:
   ```bash
   npm install -D prettier prettier-plugin-astro
   ```
3. Create `.prettierrc`:
   ```json
   {
     "semi": true,
     "singleQuote": true,
     "tabWidth": 2,
     "trailingComma": "es5",
     "printWidth": 100,
     "plugins": ["prettier-plugin-astro"],
     "overrides": [
       {
         "files": "*.astro",
         "options": {
           "parser": "astro"
         }
       }
     ]
   }
   ```

**Success Criteria:**
- All scripts run without errors
- Prettier formats code consistently
- Astro check validates TypeScript

---

### Task 1.6.3: Verify Foundation Setup
**Objective:** Test that all foundation components work together.

**Actions:**
1. Create a test page `src/pages/test.astro`:
   ```astro
   ---
   import BaseLayout from '@layouts/BaseLayout.astro';
   import { formatDate } from '@utils/dateFormat';
   
   const testDate = new Date();
   ---
   
   <BaseLayout
     title="Test Page"
     description="Testing Astro 5 setup"
   >
     <main id="main-content" class="container mx-auto px-6 py-12">
       <h1 class="text-4xl font-bold text-blue-600 mb-4">
         Astro 5 Setup Test
       </h1>
       <p class="text-lg mb-4">
         If you can see this page with proper styling, the foundation is working!
       </p>
       <p class="mb-4">
         Current date: {formatDate(testDate)}
       </p>
       <button class="btn-primary">
         <i class="fas fa-check mr-2"></i>
         Test Button
       </button>
       <div class="card mt-6 p-6">
         <h2 class="text-2xl font-semibold mb-2">Card Component</h2>
         <p>This card uses Tailwind utility classes.</p>
       </div>
     </main>
   </BaseLayout>
   ```
2. Run dev server and visit `/test`
3. Verify:
   - Page renders correctly
   - Tailwind styles apply
   - Font Awesome icons display
   - Poppins font is used
   - Date formatting works
   - Path aliases resolve
4. Test dark mode toggle (prepare for next phase)

**Success Criteria:**
- Test page renders without errors
- All styles and fonts load correctly
- TypeScript path aliases work
- Utility functions execute properly
- No console errors in browser

---

## Phase 1.7: Commit Foundation Work

### Task 1.7.1: Final Foundation Commit
**Objective:** Commit all foundation work with clear documentation.

**Actions:**
1. Stage all changes: `git add .`
2. Review changes: `git status`
3. Commit with descriptive message:
   ```bash
   git commit -m "feat: establish Astro 5 foundation with TypeScript strict mode
   
   - Initialize Astro 5 project with strict TypeScript
   - Configure Tailwind CSS with custom theme
   - Set up lightgallery for media galleries
   - Create base layout with SEO metadata
   - Define TypeScript interfaces for common data
   - Implement utility functions (dates, slugs, images)
   - Configure path aliases for clean imports
   - Add development scripts and Prettier
   - Document project structure
   
   All core infrastructure is now in place for content migration."
   ```
4. Verify commit includes all necessary files
5. Push to remote if applicable

**Success Criteria:**
- Clean commit with no untracked files
- Commit message follows conventional commits
- All foundation files are included
- Git history is clean and logical

---

## Completion Checklist for Plan 1

Before moving to Plan 2, verify:

- [x] Astro 5 project initialized with TypeScript strict mode
- [x] All dependencies installed (Tailwind, lightgallery, etc.)
- [x] Directory structure established following Astro conventions
- [x] `astro.config.mjs` properly configured
- [x] TypeScript path aliases working
- [x] Tailwind CSS configured with custom theme
- [x] Global styles created and importing correctly
- [x] Base layout component created with full SEO support
- [x] Type definitions created for common data structures
- [x] Utility functions implemented (dates, slugs, images)
- [x] Development scripts configured
- [x] Prettier set up for consistent formatting
- [x] Test page confirms everything works
- [x] Documentation updated (README, MIGRATION.md)
- [x] Foundation work committed to Git

**Estimated Time:** 3-4 hours

**Next Steps:** Proceed to Plan 2 for Content Collections setup and schema definitions.
