# 🚀 Astro 5 Best Practices Implementation Guide

Complete reference for implementing Astro best practices in the Dusun Bedalo website migration.

---

## 📦 Table of Contents

1. [Prefetching](#prefetching)
2. [Image Optimization](#image-optimization)
3. [ESLint Configuration](#eslint-configuration)
4. [Prettier Configuration](#prettier-configuration)
5. [Build Optimizations](#build-optimizations)
6. [Performance Tips](#performance-tips)

---

## 🔗 Prefetching

### What is Prefetching?

Prefetching loads pages in the background before users click links, making navigation feel instant.

### Configuration in `astro.config.mjs`

```javascript
import { defineConfig } from 'astro/config';

export default defineConfig({
  // Enable prefetching globally
  prefetch: {
    prefetchAll: true,          // Enable for all internal links
    defaultStrategy: 'viewport', // Prefetch when link enters viewport
  }
});
```

### Strategies Available

| Strategy | When It Prefetches | Best For |
|----------|-------------------|----------|
| `hover` | On mouseover/focus | Desktop navigation |
| `tap` | On touch/click (mobile-first) | Mobile-first sites |
| `viewport` | When link enters viewport | Most sites (recommended) |
| `load` | Immediately on page load | Critical pages only |

### Usage in Components

```astro
<!-- Automatic (if prefetchAll: true) -->
<a href="/potensi">Potensi Dusun</a>

<!-- Explicit opt-in -->
<a href="/pariwisata" data-astro-prefetch>Pariwisata</a>

<!-- Override strategy -->
<a href="/berita" data-astro-prefetch="hover">Berita</a>

<!-- Opt-out specific link -->
<a href="/dashboard" data-astro-prefetch="false">Dashboard</a>
```

### Programmatic Prefetching

```astro
<script>
import { prefetch } from 'astro:prefetch';

// Prefetch on button click
const button = document.getElementById('cta');
button?.addEventListener('click', () => {
  prefetch('/getting-started');
});

// Prefetch with options
prefetch('/about', { 
  eagerness: 'moderate',
  ignoreSlowConnection: true 
});
</script>
```

### Best Practices

✅ **Do:**
- Enable `prefetchAll` for content-heavy sites
- Use `viewport` strategy for balanced performance
- Opt-out external links automatically (Astro does this)
- Test on slow connections

❌ **Don't:**
- Prefetch authenticated pages (dashboard, admin)
- Prefetch pages with dynamic user data
- Prefetch external links
- Use `load` strategy for all pages (bandwidth waste)

### Implementation in Our Project

```javascript
// astro.config.mjs
export default defineConfig({
  prefetch: {
    prefetchAll: true,
    defaultStrategy: 'viewport'
  }
});
```

**Applied to:**
- All navbar links
- Footer links
- Content cards (berita, potensi, pariwisata)
- Pagination links
- Related content links

---

## 🖼️ Image Optimization

### Built-in Astro Image Component

Use `<Image />` component for automatic optimization:

```astro
---
import { Image } from 'astro:assets';
import heroImage from '../assets/hero.jpg';
---

<Image 
  src={heroImage} 
  alt="Dusun Bedalo"
  width={1200}
  height={600}
  loading="lazy"
  decoding="async"
/>
```

### Configuration in `astro.config.mjs`

```javascript
export default defineConfig({
  image: {
    // Use Sharp service (default, best quality)
    service: {
      entrypoint: 'astro/assets/services/sharp'
    },
    
    // Authorize remote domains
    domains: ['images.unsplash.com'],
    
    // Authorize URL patterns
    remotePatterns: [{
      protocol: 'https',
      hostname: '**.amazonaws.com',
    }],
  }
});
```

### Priority Loading

For above-the-fold images (hero, banner):

```astro
<Image 
  src={heroImage} 
  alt="Hero"
  priority  {/* No lazy loading, high priority fetch */}
/>
```

### Responsive Images

```astro
<Image 
  src={productImage}
  alt="Product"
  widths={[320, 640, 1024, 1280]}
  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
/>
```

### Best Practices

✅ **Do:**
- Use `<Image />` for all local images
- Set explicit width/height (prevents CLS)
- Use `loading="lazy"` for below-fold images
- Use `priority` for hero images
- Optimize source images before adding to project
- Use WebP/AVIF formats when possible

❌ **Don't:**
- Use `<img>` tags for local images
- Forget alt text (accessibility!)
- Load full-res images on mobile
- Skip width/height (causes layout shift)

---

## 🔍 ESLint Configuration

### Installation

```bash
npm install --save-dev eslint eslint-plugin-astro @typescript-eslint/parser eslint-plugin-jsx-a11y
```

### Configuration File: `eslint.config.js`

```javascript
import eslintPluginAstro from 'eslint-plugin-astro';

export default [
  // Recommended base config
  ...eslintPluginAstro.configs.recommended,
  
  // Accessibility rules
  ...eslintPluginAstro.configs['jsx-a11y-recommended'],
  
  {
    rules: {
      // Custom rules
      'astro/no-set-html-directive': 'error',
      'astro/no-unused-define-vars-in-style': 'error',
    }
  },
  
  // TypeScript configuration for .astro files
  {
    files: ['*.astro'],
    parser: 'astro-eslint-parser',
    parserOptions: {
      parser: '@typescript-eslint/parser',
      extraFileExtensions: ['.astro']
    }
  }
];
```

### Package.json Scripts

```json
{
  "scripts": {
    "lint": "eslint . --ext .js,.ts,.astro",
    "lint:fix": "eslint . --ext .js,.ts,.astro --fix"
  }
}
```

### VS Code Integration

Add to `.vscode/settings.json`:

```json
{
  "eslint.validate": [
    "javascript",
    "typescript",
    "astro"
  ]
}
```

### Common Rules

```javascript
{
  rules: {
    // Prevent conflicting directives
    'astro/no-conflict-set-directives': 'error',
    
    // Ensure proper HTML attributes
    'astro/no-deprecated-astro-canonicalurl': 'error',
    'astro/no-deprecated-astro-fetchcontent': 'error',
    'astro/no-deprecated-astro-resolve': 'error',
    
    // Style best practices
    'astro/no-unused-define-vars-in-style': 'error',
    
    // Accessibility
    'jsx-a11y/alt-text': 'error',
    'jsx-a11y/anchor-has-content': 'error',
    'jsx-a11y/aria-props': 'error',
    'jsx-a11y/no-autofocus': 'warn',
  }
}
```

---

## 💅 Prettier Configuration

### Installation

```bash
npm install --save-dev prettier prettier-plugin-astro
```

### Configuration File: `.prettierrc.mjs`

```javascript
/** @type {import("prettier").Config} */
export default {
  // Plugin
  plugins: ['prettier-plugin-astro'],
  
  // Astro-specific override
  overrides: [
    {
      files: '*.astro',
      options: {
        parser: 'astro',
      },
    },
  ],
  
  // General formatting
  semi: true,
  singleQuote: true,
  tabWidth: 2,
  useTabs: false,
  trailingComma: 'es5',
  printWidth: 100,
  bracketSpacing: true,
  arrowParens: 'always',
};
```

### Ignore File: `.prettierignore`

```
# Dependencies
node_modules/
.pnpm-store/

# Build outputs
dist/
.astro/

# Environment files
.env*

# Static backup
static-site/

# Package manager
package-lock.json
pnpm-lock.yaml
yarn.lock
```

### Package.json Scripts

```json
{
  "scripts": {
    "format": "prettier --write \"**/*.{js,ts,astro,json,md}\"",
    "format:check": "prettier --check \"**/*.{js,ts,astro,json,md}\""
  }
}
```

### VS Code Integration

Add to `.vscode/settings.json`:

```json
{
  "editor.defaultFormatter": "esbenp.prettier-vscode",
  "editor.formatOnSave": true,
  "prettier.documentSelectors": ["**/*.astro"],
  "[astro]": {
    "editor.defaultFormatter": "esbenp.prettier-vscode"
  }
}
```

### Pre-commit Hook (Optional)

Using `husky` and `lint-staged`:

```bash
npm install --save-dev husky lint-staged
npx husky install
npx husky add .husky/pre-commit "npx lint-staged"
```

`package.json`:

```json
{
  "lint-staged": {
    "*.{js,ts,astro}": ["eslint --fix", "prettier --write"],
    "*.{json,md}": ["prettier --write"]
  }
}
```

---

## ⚡ Build Optimizations

### Configuration in `astro.config.mjs`

```javascript
import { defineConfig } from 'astro/config';

export default defineConfig({
  // Output configuration
  output: 'static',
  
  // Build optimizations
  build: {
    inlineStylesheets: 'auto',  // Auto-inline small CSS
    
    // Build concurrency (careful with memory)
    concurrency: 2,
  },
  
  // Compress HTML (default true)
  compressHTML: true,
  
  // Vite optimizations
  vite: {
    build: {
      // Chunk splitting strategy
      rollupOptions: {
        output: {
          manualChunks: {
            // Vendor chunks
            'vendor-react': ['react', 'react-dom'],
            'vendor-charts': ['chart.js'],
            'vendor-gallery': ['lightgallery'],
          }
        }
      },
      
      // CSS code splitting
      cssCodeSplit: true,
      
      // Minification
      minify: 'esbuild',
      
      // Source maps for production debugging
      sourcemap: false,
    },
    
    // Dependency optimization
    optimizeDeps: {
      include: ['countup.js', 'chart.js'],
    }
  }
});
```

### Asset Optimization

```javascript
// astro.config.mjs
export default defineConfig({
  vite: {
    build: {
      // Asset size limit for inlining (bytes)
      assetsInlineLimit: 4096,
      
      // Chunk size warnings
      chunkSizeWarningLimit: 500,
    }
  }
});
```

### Adapter Configuration

For Cloudflare Pages:

```bash
npx astro add cloudflare
```

```javascript
import cloudflare from '@astrojs/cloudflare';

export default defineConfig({
  output: 'static',
  adapter: cloudflare(),
});
```

---

## 🎯 Performance Tips

### 1. Minimize JavaScript

```astro
---
// Run at build time (server-side)
const data = await fetchData();
---

<!-- No JS sent to client -->
<div>{data.title}</div>
```

### 2. Use Islands Architecture

```astro
---
import InteractiveComponent from '../components/Interactive';
---

<!-- Only this component gets JS -->
<InteractiveComponent client:load />

<!-- No JS here -->
<StaticContent />
```

### 3. Lazy Load Components

```astro
<!-- Load when visible -->
<Gallery client:visible />

<!-- Load when browser is idle -->
<Comments client:idle />

<!-- Load only after interaction -->
<Modal client:only="react" />
```

### 4. Optimize Fonts

```html
<!-- Preconnect to font CDN -->
<link rel="preconnect" href="https://fonts.googleapis.com" />
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />

<!-- Load with display: swap -->
<link 
  href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;600&display=swap" 
  rel="stylesheet" 
/>
```

### 5. Critical CSS

Astro automatically extracts critical CSS. Enhance with:

```javascript
// astro.config.mjs
export default defineConfig({
  build: {
    inlineStylesheets: 'auto'  // Inline critical CSS
  }
});
```

### 6. Resource Hints

```astro
<head>
  <!-- Preconnect to critical origins -->
  <link rel="preconnect" href="https://fonts.googleapis.com" />
  
  <!-- DNS prefetch for less critical -->
  <link rel="dns-prefetch" href="https://analytics.google.com" />
  
  <!-- Preload critical assets -->
  <link rel="preload" as="image" href="/hero.webp" />
</head>
```

### 7. Code Splitting

```javascript
// Dynamic imports
const { default: HeavyComponent } = await import('./HeavyComponent.astro');
```

---

## ✅ Checklist

Before deployment, verify:

### Configuration
- [ ] `prefetch: true` enabled with `viewport` strategy
- [ ] Image service configured (Sharp)
- [ ] Build optimizations applied
- [ ] ESLint configured with Astro plugin
- [ ] Prettier configured with Astro plugin
- [ ] All lint checks pass
- [ ] All files formatted

### Performance
- [ ] Lighthouse Performance: 95+
- [ ] Largest Contentful Paint < 2.5s
- [ ] First Input Delay < 100ms
- [ ] Cumulative Layout Shift < 0.1
- [ ] Images optimized and lazy loaded
- [ ] Fonts load efficiently
- [ ] Critical CSS inlined

### Code Quality
- [ ] No ESLint errors
- [ ] No TypeScript errors (`npm run check`)
- [ ] Consistent code formatting
- [ ] Accessibility rules passing
- [ ] No console errors in production

---

## 📚 References

- **Astro Docs:** https://docs.astro.build
- **Prefetching Guide:** https://docs.astro.build/en/guides/prefetch/
- **Image Optimization:** https://docs.astro.build/en/guides/images/
- **ESLint Plugin:** https://github.com/ota-meshi/eslint-plugin-astro
- **Prettier Plugin:** https://github.com/withastro/prettier-plugin-astro

---

Last Updated: 2025-01-24  
Status: PRODUCTION READY ✅
