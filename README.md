# Dusun Bedalo Website

🌐 Website resmi Dusun Bedalo, Krambilsawit, Saptosari, Gunungkidul - Dibuat dengan Astro 5

## 🚀 Tech Stack

- **Framework**: [Astro 5.0](https://astro.build)
- **Styling**: [Tailwind CSS v4](https://tailwindcss.com) (via npm)
- **Language**: TypeScript (strict mode)
- **Content**: Astro Content Collections API
- **Animations**: CountUp.js (via npm)
- **Icons**: Font Awesome 6.7.1 (CDN only)
- **Fonts**: Google Fonts Poppins (CDN only)

## ✨ Features

- ✅ **Dynamic Content** - Zero hardcoded text, all from collections
- ✅ **Dark Mode** - System preference + manual toggle
- ✅ **SEO Optimized** - Sitemap, meta tags, structured data
- ✅ **Responsive** - Mobile-first design
- ✅ **Type-Safe** - TypeScript strict mode
- ✅ **Fast** - Prefetching, optimized builds
- ✅ **Accessible** - ARIA labels, keyboard navigation

## 📦 Installation

```bash
# Install dependencies
npm install

# Start development server
npm run dev
```

## 🧞 Commands

| Command                 | Action                                      |
| :---------------------- | :------------------------------------------ |
| `npm install`           | Installs dependencies                       |
| `npm run dev`           | Starts local dev server at `localhost:4321` |
| `npm run build`         | Build production site to `./dist/`          |
| `npm run preview`       | Preview build locally                       |
| `npm run sync`          | Generate TypeScript types from collections  |
| `npm run lint`          | Run ESLint                                  |
| `npm run format`        | Format code with Prettier                   |
| `npm run format:check`  | Check code formatting                       |
| `npm run check`         | TypeScript type checking                    |

## 📝 Content Management

### Adding News Article

Create file in `src/content/berita/YYYY-MM-DD-slug.md`:

```markdown
---
title: 'Judul Berita'
description: 'Deskripsi singkat'
pubDate: 2024-10-24
author: 'Nama Penulis'
category: 'kegiatan'
tags: ['tag1', 'tag2']
featured: false
draft: false
image:
  url: '/assets/images/berita/image.webp'
  alt: 'Deskripsi gambar'
---

Konten berita dalam format markdown...
```

## 🚀 Deployment

### Cloudflare Pages

1. Push to GitHub repository
2. Connect repository in Cloudflare Pages
3. Configure build settings:
   - **Build command**: `npm run build`
   - **Build output**: `dist`
   - **Node version**: 18 or 20

## 📄 License

This project was created for Dusun Bedalo by KKN 117 UIN Sunan Kalijaga Yogyakarta.

---

Made with ❤️ for Dusun Bedalo

