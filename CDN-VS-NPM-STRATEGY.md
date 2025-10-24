# 📦 Dependencies Strategy: CDN vs npm

This document clarifies which libraries use CDN and which use npm in the Astro 5 migration.

---

## 🎯 Quick Reference

| Library | Method | Reason |
|---------|--------|--------|
| **Google Fonts (Poppins)** | ✅ CDN | Standard practice, cached globally, simple |
| **Font Awesome** | ✅ CDN | Icon fonts, fast delivery, cached |
| **Tailwind CSS** | ❌ npm | Better DX, tree-shaking, autoprefixer |
| **lightgallery** | ❌ npm | Module imports, tree-shaking, type safety |
| **CountUp.js** | ❌ npm | Official package, better control, types |
| **Chart.js** | ❌ npm | Module system, better types, tree-shaking |

---

## ✅ Via CDN (Keep These)

### 1. Google Fonts (Poppins)

**Why CDN:**
- Industry standard for web fonts
- Globally cached by browsers
- Simple implementation
- Cross-origin optimization
- No build step needed

**Implementation:**
```html
<!-- In BaseLayout.astro <head> -->
<link rel="preconnect" href="https://fonts.googleapis.com" />
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
<link 
  href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700&display=swap" 
  rel="stylesheet" 
/>
```

**Location:** `src/layouts/BaseLayout.astro`

---

### 2. Font Awesome

**Why CDN:**
- Icon fonts widely cached
- No bundle size impact
- Simple class-based usage
- Fast CDN delivery
- Automatic updates (if using latest URL)

**Implementation:**
```html
<!-- In BaseLayout.astro <head> -->
<link 
  rel="stylesheet" 
  href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.7.1/css/all.min.css"
  integrity="sha512-..."
  crossorigin="anonymous"
/>
```

**Location:** `src/layouts/BaseLayout.astro`

**Usage:**
```html
<i class="fas fa-home"></i>
<i class="fab fa-instagram"></i>
```

---

## ❌ Via npm (Install These)

### 3. Tailwind CSS

**Why npm (Not CDN):**
- Tree-shaking removes unused CSS
- Autoprefixer for better browser support
- JIT mode for smaller output
- Custom configuration
- Better developer experience
- PostCSS integration

**Installation:**
```bash
npx astro add tailwind
```

**Config:** `tailwind.config.mjs`

**NO script tag in HTML!**

**Plan Reference:** Plan 1, Task 1.3

---

### 4. lightgallery

**Why npm (Not CDN):**
- Module imports (better code organization)
- Tree-shaking (only include used plugins)
- TypeScript definitions
- Version control
- Better integration with Astro

**Installation:**
```bash
npm install lightgallery lg-zoom lg-thumbnail lg-video
```

**Usage:**
```typescript
import lightGallery from 'lightgallery';
import lgZoom from 'lg-zoom';
import lgThumbnail from 'lg-thumbnail';
import lgVideo from 'lg-video';

// Initialize
lightGallery(element, {
  plugins: [lgZoom, lgThumbnail, lgVideo],
  // options
});
```

**Plan Reference:** Plan 3, Task 5.2

---

### 5. CountUp.js

**Why npm (Not CDN):**
- Official package with types
- Better control over initialization
- Import only what's needed
- Works with Astro's build system
- Easier testing

**Installation:**
```bash
npm install countup.js
```

**Usage:**
```typescript
import { CountUp } from 'countup.js';

const countUp = new CountUp('target', 450, {
  duration: 2,
  useEasing: true,
});
countUp.start();
```

**Plan Reference:** Plan 3, Task 6.1-6.2

---

### 6. Chart.js

**Why npm (Not CDN):**
- Module imports for better organization
- Tree-shaking (only include needed chart types)
- TypeScript support
- Better with Vite build process
- Easier version management

**Installation:**
```bash
npm install chart.js
```

**Usage:**
```typescript
import {
  Chart,
  BarController,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js';

Chart.register(
  BarController,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const chart = new Chart(ctx, {
  type: 'bar',
  data: chartData,
  options: chartOptions
});
```

**Plan Reference:** Plan 4, Task 9.2-9.3

---

## 🚫 DO NOT Use CDN For

### ❌ Tailwind CSS CDN
```html
<!-- WRONG - Don't do this -->
<script src="https://cdn.tailwindcss.com"></script>
```

**Problems:**
- Large bundle size (all CSS included)
- No tree-shaking
- No autoprefixer
- No custom config
- Slower than built CSS

**Correct:** `npx astro add tailwind`

---

### ❌ GLightbox CDN
```html
<!-- WRONG - Don't use GLightbox at all -->
<script src="https://cdn.jsdelivr.net/npm/glightbox@3.3.0/dist/js/glightbox.min.js"></script>
```

**Correct:** Use lightgallery via npm instead

---

### ❌ CountUp.js CDN
```html
<!-- WRONG - Don't do this -->
<script src="https://cdn.jsdelivr.net/npm/countup.js@2.8.0/dist/countUp.umd.js"></script>
```

**Correct:** `npm install countup.js` and import as module

---

### ❌ Chart.js CDN
```html
<!-- WRONG - Don't do this -->
<script src="https://cdn.jsdelivr.net/npm/chart.js@4.4.7/dist/chart.umd.min.js"></script>
```

**Correct:** `npm install chart.js` and import as module

---

## 📝 Migration Checklist

When migrating from static site to Astro:

- [ ] **Remove** Tailwind CDN script tag
- [ ] **Remove** GLightbox CDN script and CSS
- [ ] **Remove** CountUp.js CDN script
- [ ] **Remove** Chart.js CDN script
- [ ] **Keep** Google Fonts link tag
- [ ] **Keep** Font Awesome link tag
- [ ] Install Tailwind via `npx astro add tailwind`
- [ ] Install lightgallery via npm
- [ ] Install CountUp.js via npm
- [ ] Install Chart.js via npm
- [ ] Import libraries as ES modules in components
- [ ] Remove any `<script src="https://cdn...">` except fonts

---

## 🎨 BaseLayout <head> Example

```astro
---
// src/layouts/BaseLayout.astro
import '../styles/global.css'; // Includes Tailwind
---

<!DOCTYPE html>
<html lang="id">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    
    <!-- Preconnect to Google Fonts (CDN) -->
    <link rel="preconnect" href="https://fonts.googleapis.com" />
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
    
    <!-- Google Fonts - Poppins (CDN) -->
    <link 
      href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700&display=swap" 
      rel="stylesheet" 
    />
    
    <!-- Font Awesome (CDN) -->
    <link 
      rel="stylesheet" 
      href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.7.1/css/all.min.css"
      integrity="sha512-..."
      crossorigin="anonymous"
      referrerpolicy="no-referrer"
    />
    
    <!-- NO OTHER CDN SCRIPTS -->
    <!-- Tailwind, lightgallery, CountUp, Chart.js are npm packages -->
    
    <title>{title}</title>
    <!-- Rest of meta tags -->
  </head>
  <body>
    <slot />
  </body>
</html>
```

---

## 🔍 Verification Commands

Check that you're NOT using CDN incorrectly:

```bash
# Search for CDN script tags (should only find fonts/FA)
grep -r "cdn\|CDN" src/ --include="*.astro" --include="*.html"

# Should NOT find: tailwind, lightbox, countup, chart
# Should ONLY find: fonts.googleapis.com, font-awesome

# Verify npm packages installed
npm list countup.js lightgallery chart.js

# Check no CDN in build output
npm run build
grep -r "cdn.tailwindcss\|cdn.jsdelivr" dist/ || echo "✅ No CDN found"
```

---

## 📚 Plan References

- **Plan 1, Task 1.3:** Tailwind CSS via npm
- **Plan 1, Task 3.1:** BaseLayout with Google Fonts & Font Awesome CDN
- **Plan 3, Task 5.2:** lightgallery via npm
- **Plan 3, Task 6.1:** CountUp.js via npm
- **Plan 4, Task 9.2:** Chart.js via npm
- **Plan 5, Task 2.2:** Asset preloading (fonts only)

---

## ✅ Summary

**2 via CDN:**
1. Google Fonts (Poppins)
2. Font Awesome

**4 via npm:**
1. Tailwind CSS
2. lightgallery
3. CountUp.js
4. Chart.js

**Rationale:** Modern build tools (Vite) handle npm packages better with tree-shaking, code splitting, and optimization. Only fonts stay on CDN because they're globally cached and simple.

---

Last Updated: 2024-10-24
Status: FINAL ✅
