# 🏞️ Website Dusun Bedalo

<div align="center">

![Dusun Bedalo](assets/images/ngedan.webp)

**A Modern, Community-Focused Village Website**

[![License](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)
[![HTML5](https://img.shields.io/badge/HTML5-E34F26?logo=html5&logoColor=white)](https://html.spec.whatwg.org/)
[![TailwindCSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
[![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?logo=javascript&logoColor=black)](https://www.javascript.com/)

[🌐 Live Demo](https://bedalo.pages.dev) | [📖 Documentation](#documentation) | [🚀 Getting Started](#getting-started)

</div>

---

## 📋 Table of Contents

- [About](#about)
- [Features](#features)
- [Technology Stack](#technology-stack)
- [Project Structure](#project-structure)
- [Getting Started](#getting-started)
- [Pages Overview](#pages-overview)
- [Components & Modules](#components--modules)
- [Customization Guide](#customization-guide)
- [Deployment](#deployment)
- [Browser Support](#browser-support)
- [Performance](#performance)
- [Contributing](#contributing)
- [License](#license)
- [Credits](#credits)
- [Contact](#contact)

---

## 🎯 About

**Website Dusun Bedalo** is a modern, responsive, and feature-rich community website designed to showcase the beauty, culture, and potential of Dusun Bedalo, a hamlet located in Krambilsawit Village, Saptosari District, Gunungkidul Regency, Special Region of Yogyakarta, Indonesia.

This website was developed as part of the **KKN (Kuliah Kerja Nyata) Program Angkatan 117** by students from **UIN Sunan Kalijaga Yogyakarta** to support the digital transformation and community development of Dusun Bedalo.

### 🎓 Project Context

- **Program**: KKN Reguler Angkatan 117
- **Institution**: UIN Sunan Kalijaga Yogyakarta
- **Location**: Dusun Bedalo, Desa Krambilsawit, Kec. Saptosari, Kab. Gunungkidul, DIY
- **Purpose**: Digital transformation, tourism promotion, community engagement

### 🌟 Mission

The website aims to:
- Promote local tourism destinations (Pantai Ngedan, Pantai Ngluwen)
- Showcase local products and UMKM (Micro, Small, and Medium Enterprises)
- Provide transparent information about village governance
- Foster community engagement through digital platforms
- Support economic development through online exposure

---

## ✨ Features

### 🎨 User Interface & Experience
- **Fully Responsive Design** - Optimized for desktop, tablet, and mobile devices
- **Modern UI/UX** - Clean, intuitive interface with Tailwind CSS
- **Smooth Animations** - AOS (Animate On Scroll) library integration
- **Interactive Gallery** - GLightbox for beautiful image lightbox
- **Mobile-First Approach** - Mobile menu with smooth transitions
- **Accessibility Compliant** - Semantic HTML and ARIA labels

### 📱 Core Pages
1. **Homepage (Beranda)** - Hero section, village overview, featured content
2. **Profile (Profil)** - Village history, vision & mission, demographics, leadership structure
3. **Potential (Potensi)** - UMKM products, agriculture, natural resources
4. **Tourism (Pariwisata)** - Tourist destinations, accommodations, local attractions
5. **Gallery (Galeri)** - Photo collection of village activities and landscapes
6. **News (Berita)** - Latest updates, articles, and announcements
7. **Contact (Kontak)** - Contact form, location map, official contacts
8. **About KKN** - Information about the KKN team and program

### 🔧 Advanced Features
- **Product Showcase** - Dedicated pages for local products (Gula Aren, Keripik Singkong, Gaplek)
- **Accommodation Directory** - Listing of homestays and guesthouses
- **Digital Survey System** - Community digitalization survey module
- **Aspirations Dashboard** - Community feedback collection and visualization
- **Warung (Local Store) Directory** - Local businesses and services
- **Tag-based Article System** - Organized news by categories
- **Sitemap (Peta Situs)** - Complete site navigation structure
- **Privacy Policy** - GDPR-compliant privacy documentation
- **SEO Optimized** - Meta tags, robots.txt, semantic HTML
- **Fast Loading** - Optimized assets and CDN usage

### 📊 Dashboard Features
- **Real-time Statistics** - Dynamic data visualization with Chart.js
- **Responsive Charts** - Line charts, doughnut charts, bar charts
- **Data Analytics** - Community aspirations tracking and analysis
- **Date-based Filtering** - Interactive data exploration

---

## 🛠️ Technology Stack

### Frontend Technologies
| Technology | Purpose | Version |
|------------|---------|---------|
| **HTML5** | Markup & Structure | Latest |
| **CSS3** | Styling | Latest |
| **JavaScript (ES6+)** | Interactivity | Latest |
| **Tailwind CSS** | Utility-first CSS Framework | 3.x (CDN) |
| **Font Awesome** | Icon Library | 6.5.1 |
| **Google Fonts** | Typography (Poppins) | Latest |

### JavaScript Libraries
| Library | Purpose | Version |
|---------|---------|---------|
| **AOS** | Scroll Animations | 2.3.4 |
| **GLightbox** | Image Lightbox | Latest |
| **CountUp.js** | Number Animation | 2.0.7 |
| **Chart.js** | Data Visualization | 4.4.0 |
| **chartjs-adapter-date-fns** | Date Handling for Charts | Latest |

### Performance Optimizations
- **Preconnect Links** - DNS prefetching for external resources
- **Lazy Loading** - Deferred image loading
- **CDN Delivery** - Fast content delivery via CDN
- **Minified Assets** - Optimized CSS and JavaScript
- **Browser Caching** - Efficient resource caching

### Development Tools
- **Git** - Version control
- **VS Code** - Code editor (recommended)
- **Live Server** - Local development server

---

## 📁 Project Structure

```
website-bedalo/
├── 📄 index.html                 # Homepage
├── 📄 profil.html                # Village profile page
├── 📄 potensi.html               # Village potential page
├── 📄 pariwisata.html            # Tourism page
├── 📄 galeri.html                # Photo gallery
├── 📄 kontak.html                # Contact page
├── 📄 tentang-kkn.html           # About KKN team
├── 📄 kebijakan-privasi.html     # Privacy policy
├── 📄 peta-situs.html            # Sitemap
├── 📄 404.html                   # 404 error page
├── 📄 robots.txt                 # SEO robots file
├── 🖼️ icon.svg                   # Website favicon
│
├── 📂 assets/                    # Static assets
│   └── 📂 images/                # Image files
│       ├── ngedan.webp           # Beach images
│       ├── kkn-team.webp         # Team photos
│       ├── profil.jpg            # Profile pictures
│       ├── cat.jpg               # Village head photo
│       └── *.svg                 # SVG placeholders
│
├── 📂 css/                       # Stylesheets
│   └── 📄 tailwind-custom.css    # Custom Tailwind components
│
├── 📂 js/                        # JavaScript files
│   └── 📄 script.js              # Main JavaScript file
│
├── 📂 components/                # Reusable components
│   ├── 📄 header.html            # Header component
│   └── 📄 footer.html            # Footer component
│
├── 📂 berita/                    # News section
│   ├── 📄 index.html             # News listing page
│   ├── 📄 artikel-contoh.html    # Sample article
│   ├── 📂 js/
│   │   └── 📄 script.js          # News page scripts
│   └── 📂 tag/
│       └── 📄 pembangunan.html   # News by tag
│
├── 📂 potensi/                   # Local products
│   ├── 📄 gula-aren-asli.html    # Palm sugar product
│   ├── 📄 keripik-singkong.html  # Cassava chips product
│   └── 📄 gaplek.html            # Dried cassava product
│
├── 📂 pariwisata/                # Tourism destinations
│   ├── 📄 pantai-ngedan.html     # Ngedan Beach
│   └── 📄 pantai-ngluwen.html    # Ngluwen Beach
│
├── 📂 akomodasi/                 # Accommodations
│   ├── 📄 index.html             # Accommodation listing
│   └── 📄 penginapan-contoh-1.html # Sample lodging
│
├── 📂 warung/                    # Local stores
│   ├── 📄 index.html             # Store directory
│   └── 📄 warung.html            # Store details
│
├── 📂 survei/                    # Survey module
│   ├── 📄 index.html             # Survey interface
│   ├── 📂 css/
│   │   └── 📄 styles.css         # Survey styles
│   └── 📂 js/
│       └── 📄 script.js          # Survey logic
│
├── 📂 dashboard/                 # Analytics dashboard
│   ├── 📄 index.html             # Dashboard interface
│   └── 📂 js/
│       └── 📄 (dashboard scripts)
│
├── 📂 .github/                   # GitHub configurations
│   └── 📂 prompts/               # AI prompts and templates
│
├── 📂 .vscode/                   # VS Code settings
│   └── 📄 settings.json          # Editor configuration
│
└── 📄 README.md                  # This file
```

### 📊 Project Statistics
- **Total HTML Pages**: 26
- **CSS Files**: 2
- **JavaScript Files**: 5
- **Image Assets**: 6+
- **Main Sections**: 8
- **Product Pages**: 3
- **Tourism Destinations**: 2

---

## 🚀 Getting Started

### Prerequisites

To run this project locally, you need:
- A modern web browser (Chrome, Firefox, Safari, Edge)
- A local web server (optional but recommended)
- Basic knowledge of HTML/CSS/JavaScript (for customization)

### Installation & Setup

#### Method 1: Simple File Opening (Not Recommended)
```bash
# Clone the repository
git clone https://github.com/yourusername/website-bedalo.git

# Navigate to the project
cd website-bedalo

# Open index.html in your browser
# Note: Some features may not work due to CORS restrictions
```

#### Method 2: Using Python HTTP Server (Recommended)
```bash
# Clone the repository
git clone https://github.com/yourusername/website-bedalo.git

# Navigate to the project
cd website-bedalo

# Start Python HTTP Server
# For Python 3.x:
python -m http.server 8000

# For Python 2.x:
python -m SimpleHTTPServer 8000

# Open browser and visit:
# http://localhost:8000
```

#### Method 3: Using Node.js http-server
```bash
# Install http-server globally (one-time)
npm install -g http-server

# Clone and navigate to project
git clone https://github.com/yourusername/website-bedalo.git
cd website-bedalo

# Start the server
http-server -p 8000

# Open browser and visit:
# http://localhost:8000
```

#### Method 4: Using VS Code Live Server (Best for Development)
1. Install **Live Server** extension in VS Code
2. Open the project folder in VS Code
3. Right-click on `index.html`
4. Select "Open with Live Server"
5. Website opens automatically with live reload

### Quick Start Checklist

- [ ] Clone or download the repository
- [ ] Choose a local server method
- [ ] Start the server
- [ ] Open browser to `http://localhost:8000`
- [ ] Explore the website!

---

## 📖 Pages Overview

### 🏠 Homepage (`index.html`)
The main landing page featuring:
- **Hero Section**: Full-width banner with Pantai Ngedan image
- **Village Leader Welcome**: Message from the village head (Kepala Dusun)
- **Potential Overview**: Cards showcasing UMKM, agriculture, and tourism
- **Tourism Highlights**: Visual grid of tourist destinations
- **Featured Gallery**: Quick photo gallery preview
- **Call-to-Action**: Links to detailed pages

### 👥 Profile Page (`profil.html`)
Comprehensive village information:
- Village history and background
- Vision and mission statements
- Demographic statistics (with CountUp animations)
- Organizational structure
- Leadership team
- Interactive location map
- Geographic and administrative data

### 🌾 Potential Page (`potensi.html`)
Showcasing village resources:
- **UMKM Section**: Local products and handicrafts
- **Agriculture Section**: Farming and plantation products
- **Product Cards**: Gula Aren, Keripik Singkong, Gaplek
- **Contact Information**: How to purchase products
- **Business Opportunities**: Investment potential

### 🏖️ Tourism Page (`pariwisata.html`)
Tourism destination guide:
- **Pantai Ngedan**: Beach description, facilities, access
- **Pantai Ngluwen**: Hidden gem beach information
- **Photo Galleries**: High-quality destination images
- **Accommodation Links**: Nearby lodging options
- **Travel Tips**: Best times to visit, transportation
- **Activities**: Things to do in the area

### 🖼️ Gallery Page (`galeri.html`)
Visual showcase:
- Grid layout for photos
- GLightbox integration for fullscreen viewing
- Categories: Landscape, Activities, Culture, Events
- Touch-friendly navigation
- Share functionality

### 📰 News Page (`berita/index.html`)
News and articles system:
- Dynamic article listing
- Pagination controls
- Article preview cards
- Tag-based filtering
- Publication dates
- Read more functionality
- Sample articles included

### 📧 Contact Page (`kontak.html`)
Communication hub:
- **Aspirations Form**: Submit community feedback (Google Forms integration)
- **Modal Confirmation**: Success/error messages
- **Contact Directory**: Village officials contact information
- **Location Map**: Embedded interactive map
- **Social Media Links**: Instagram, YouTube, TikTok, Facebook, Twitter
- **Email & Phone**: Direct contact methods

### 🎓 About KKN Page (`tentang-kkn.html`)
Team information:
- KKN program overview
- Team member profiles
- Project objectives
- Activities documentation
- Achievement highlights
- Contact information

### 📦 Product Detail Pages
Individual product showcases:
- **Gula Aren Asli** (`potensi/gula-aren-asli.html`): Palm sugar product
- **Keripik Singkong** (`potensi/keripik-singkong.html`): Cassava chips
- **Gaplek** (`potensi/gaplek.html`): Dried cassava

Each includes:
- Detailed description
- Product images
- Benefits and uses
- Pricing information
- Order/contact details

### 🏨 Accommodation Pages
Lodging information:
- **Accommodation Index** (`akomodasi/index.html`): Full listing
- **Sample Lodging** (`akomodasi/penginapan-contoh-1.html`): Detailed example
- Features, pricing, amenities
- Booking information
- Contact details

### 🏪 Warung Directory (`warung/`)
Local business listings:
- Store profiles
- Products/services offered
- Contact information
- Operating hours
- Location details

### 📊 Dashboard (`dashboard/index.html`)
Analytics and monitoring:
- **Community Aspirations Statistics**
- **Chart.js Visualizations**:
  - Line charts for trends
  - Doughnut charts for categories
  - Bar charts for comparisons
- Time-based filtering
- Real-time data updates (requires backend integration)
- Export capabilities

### 📝 Survey Module (`survei/index.html`)
Digitalization survey:
- Multi-step survey form
- Progress tracking
- Data collection for digital literacy
- Community engagement tool
- Results visualization

### 🚫 Error Page (`404.html`)
Custom 404 page:
- Friendly error message
- Navigation links
- Return to homepage button
- Consistent branding

---

## 🧩 Components & Modules

### Header Component
```html
<!-- Sticky navigation bar -->
- Logo/Site title
- Desktop navigation menu
- Mobile hamburger menu
- Active page highlighting
- Smooth scroll behavior
```

**Features**:
- Responsive breakpoints
- Z-index layering for modals
- Accessibility (ARIA labels)
- Mobile menu toggle animation

### Footer Component
```html
<!-- Site footer with multiple sections -->
- Village information
- Quick links
- Contact details
- Social media icons
- Copyright notice
```

**Sections**:
- Direct Links (Tautan Langsung)
- About Us (Tentang Kami)
- Contact Info (Hubungi Kami)
- Social Media (5 platforms)

### JavaScript Modules

#### Main Script (`js/script.js`)
Core functionality:
```javascript
// Mobile menu toggle
// AOS initialization
// GLightbox setup
// CountUp animations with Intersection Observer
// Form submission handling
// Modal controls
```

#### News Script (`berita/js/script.js`)
News page specific:
```javascript
// Article data management
// Pagination logic
// Dynamic content rendering
// Tag filtering
```

#### Survey Script (`survei/js/script.js`)
Survey functionality:
```javascript
// Form validation
// Multi-step navigation
// Data collection
// Progress tracking
```

#### Dashboard Script (`dashboard/js/`)
Analytics dashboard:
```javascript
// Chart.js initialization
// Data fetching and parsing
// Dynamic chart updates
// Filter controls
```

---

## 🎨 Customization Guide

### Changing Colors

The website uses a blue color scheme. To change the primary color:

1. **Update Tailwind Classes** in HTML:
```html
<!-- Replace blue-600 with your color -->
<button class="bg-blue-600 hover:bg-blue-700">
  <!-- Change to: -->
<button class="bg-purple-600 hover:bg-purple-700">
```

2. **Update Custom CSS** (`css/tailwind-custom.css`):
```css
/* Find and replace color values */
.btn-primary {
  background-color: #2563eb; /* Change this */
}
```

3. **Common Color Classes**:
- Primary: `blue-600` (#2563eb)
- Hover: `blue-700` (#1d4ed8)
- Text: `blue-600`
- Borders: `border-blue-600`

### Customizing Content

#### Update Village Information
Edit the homepage welcome section:
```html
<!-- File: index.html -->
<section id="profil">
  <h2>Sambutan Hangat dari Kami</h2>
  <p>Your custom welcome message...</p>
</section>
```

#### Change Images
1. Add your images to `assets/images/`
2. Update image sources:
```html
<img src="assets/images/your-image.webp" alt="Description">
```

#### Modify Navigation
Edit the navigation menu:
```html
<!-- File: index.html (header section) -->
<nav>
  <a href="/your-page.html">Your Link</a>
</nav>
```

### Adding New Pages

1. **Create new HTML file**:
```bash
touch your-page.html
```

2. **Copy structure from existing page**:
```html
<!doctype html>
<html lang="id">
<head>
  <!-- Copy head section from index.html -->
</head>
<body>
  <!-- Copy header from index.html -->
  
  <main>
    <!-- Your content here -->
  </main>
  
  <!-- Copy footer from index.html -->
  <!-- Copy scripts from index.html -->
</body>
</html>
```

3. **Add to navigation menu** in all pages

### Customizing Animations

Modify AOS (Animate On Scroll) settings:
```javascript
// File: js/script.js
AOS.init({
  duration: 800,    // Animation duration (ms)
  once: true,       // Animate only once
  offset: 100,      // Trigger offset (px)
  delay: 0,         // Animation delay (ms)
  easing: 'ease',   // Easing function
});
```

Add animations to elements:
```html
<div data-aos="fade-up" data-aos-delay="200">
  Content
</div>
```

**Available Animations**:
- `fade-up`, `fade-down`, `fade-left`, `fade-right`
- `zoom-in`, `zoom-out`
- `flip-left`, `flip-right`
- `slide-up`, `slide-down`

### Font Customization

Change the font family:

1. **Update Google Fonts import** in HTML:
```html
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet" />
```

2. **Update CSS**:
```css
/* File: css/tailwind-custom.css */
body {
  font-family: "Inter", system-ui, sans-serif;
}
```

---

## 🚀 Deployment

### Deploying to Cloudflare Pages

1. **Create Cloudflare Pages project**:
```bash
# Install Wrangler CLI
npm install -g wrangler

# Login to Cloudflare
wrangler login

# Deploy
wrangler pages publish . --project-name=dusun-bedalo
```

2. **Or use Cloudflare Dashboard**:
   - Go to Cloudflare Pages
   - Connect your GitHub repository
   - Set build settings:
     - Build command: (none)
     - Build output directory: `/`
   - Deploy!

**Current deployment**: `https://bedalo.pages.dev`

### Deploying to Netlify

1. **Install Netlify CLI**:
```bash
npm install -g netlify-cli
```

2. **Deploy**:
```bash
# Login to Netlify
netlify login

# Initialize site
netlify init

# Deploy
netlify deploy --prod
```

3. **Or use Netlify Dashboard**:
   - Drag and drop the project folder
   - Automatic deployment

### Deploying to Vercel

```bash
# Install Vercel CLI
npm install -g vercel

# Deploy
vercel

# Production deployment
vercel --prod
```

### Deploying to GitHub Pages

1. **Create repository** on GitHub
2. **Push your code**:
```bash
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin https://github.com/yourusername/website-bedalo.git
git push -u origin main
```

3. **Enable GitHub Pages**:
   - Go to repository Settings
   - Scroll to "Pages"
   - Select branch: `main`
   - Folder: `/ (root)`
   - Save

4. **Access at**: `https://yourusername.github.io/website-bedalo/`

### Deploying to Traditional Hosting (cPanel)

1. **Prepare files**:
```bash
# Create zip archive
zip -r website-bedalo.zip . -x "*.git*" ".vscode/*"
```

2. **Upload via cPanel**:
   - Login to cPanel
   - Go to File Manager
   - Navigate to `public_html`
   - Upload zip file
   - Extract files

3. **Or use FTP**:
```bash
# Using lftp
lftp ftp://username@yourserver.com
cd public_html
mirror -R website-bedalo/
```

---

## 🌐 Browser Support

### Supported Browsers

| Browser | Minimum Version | Recommended |
|---------|----------------|-------------|
| Chrome | 90+ | Latest |
| Firefox | 88+ | Latest |
| Safari | 14+ | Latest |
| Edge | 90+ | Latest |
| Opera | 76+ | Latest |
| Samsung Internet | 14+ | Latest |

### Mobile Support

- ✅ iOS Safari 14+
- ✅ Chrome for Android
- ✅ Firefox for Android
- ✅ Samsung Internet
- ✅ UC Browser
- ✅ Opera Mobile

### Feature Detection

The website uses modern JavaScript features:
- ES6+ syntax (arrow functions, template literals)
- Fetch API
- IntersectionObserver API
- CSS Grid & Flexbox
- CSS Custom Properties (variables)

### Fallbacks

For older browsers:
- Graceful degradation for animations
- Polyfills loaded via CDN when needed
- Alternative layouts for non-grid browsers

---

## ⚡ Performance

### Optimization Techniques

1. **Image Optimization**:
   - WebP format for modern browsers
   - Lazy loading with `loading="lazy"`
   - Responsive images with `srcset`
   - Optimized dimensions
   - Compressed file sizes

2. **CSS Optimization**:
   - Tailwind CSS purged (in production)
   - Critical CSS inlined
   - Minimal custom CSS
   - CSS combined and minified

3. **JavaScript Optimization**:
   - Deferred script loading
   - Async loading for non-critical scripts
   - Event delegation
   - Intersection Observer for animations
   - Minimal DOM manipulation

4. **Network Optimization**:
   - CDN for libraries
   - DNS prefetch/preconnect
   - Browser caching
   - Gzip compression
   - HTTP/2 multiplexing

### Performance Metrics

Target Lighthouse scores:
- **Performance**: 90+
- **Accessibility**: 95+
- **Best Practices**: 95+
- **SEO**: 100

### Loading Times

Expected loading times (3G network):
- **First Contentful Paint**: < 2s
- **Time to Interactive**: < 4s
- **Largest Contentful Paint**: < 3s
- **Total Blocking Time**: < 300ms
- **Cumulative Layout Shift**: < 0.1

### Testing Performance

```bash
# Using Lighthouse CLI
npm install -g lighthouse
lighthouse http://localhost:8000 --view

# Using WebPageTest
# Visit https://www.webpagetest.org/

# Using Chrome DevTools
# Open DevTools > Lighthouse tab > Generate Report
```

---

## 🤝 Contributing

We welcome contributions! Here's how you can help:

### Contribution Guidelines

1. **Fork the repository**
2. **Create a feature branch**:
```bash
git checkout -b feature/amazing-feature
```

3. **Make your changes**:
   - Follow existing code style
   - Test on multiple browsers
   - Ensure responsive design
   - Add comments for complex logic

4. **Commit your changes**:
```bash
git commit -m "Add amazing feature"
```

5. **Push to the branch**:
```bash
git push origin feature/amazing-feature
```

6. **Open a Pull Request**

### Code Style Guide

#### HTML
- Use semantic HTML5 elements
- Proper indentation (2 spaces)
- Alt text for all images
- ARIA labels for accessibility

#### CSS
- Follow BEM naming convention for custom classes
- Use Tailwind utility classes when possible
- Mobile-first approach
- Consistent spacing

#### JavaScript
- ES6+ syntax
- Descriptive variable names
- Comments for complex logic
- Error handling
- No console.log in production

### Areas for Contribution

- 🐛 **Bug Fixes**: Report and fix bugs
- ✨ **New Features**: Add new functionality
- 📝 **Documentation**: Improve docs
- 🎨 **Design**: UI/UX improvements
- 🌍 **Translations**: Add language support
- ♿ **Accessibility**: Enhance accessibility
- ⚡ **Performance**: Optimize loading speed

### Reporting Issues

When reporting bugs, include:
- Browser and version
- Operating system
- Steps to reproduce
- Expected vs actual behavior
- Screenshots (if applicable)

---

## 📜 License

This project is licensed under the **MIT License**.

```
MIT License

Copyright (c) 2024 KKN 117 UIN Sunan Kalijaga Yogyakarta

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
```

### Third-Party Licenses

This project uses the following open-source libraries:
- **Tailwind CSS** - MIT License
- **Font Awesome** - Font Awesome Free License
- **AOS** - MIT License
- **GLightbox** - MIT License
- **CountUp.js** - MIT License
- **Chart.js** - MIT License

---

## 🙏 Credits

### Development Team

**KKN Reguler Angkatan 117**  
**UIN Sunan Kalijaga Yogyakarta**

### Special Thanks

- **Dusun Bedalo Community** - For support and collaboration
- **Sumindar** - Kepala Dusun Bedalo
- **Village Officials** - For providing information and resources
- **Local UMKM Owners** - For showcasing their products
- **Residents** - For their participation and feedback

### Technologies & Resources

- [Tailwind CSS](https://tailwindcss.com/) - CSS Framework
- [Font Awesome](https://fontawesome.com/) - Icon Library
- [Google Fonts](https://fonts.google.com/) - Typography
- [AOS](https://michalsnik.github.io/aos/) - Animation Library
- [GLightbox](https://biati-digital.github.io/glightbox/) - Lightbox
- [Chart.js](https://www.chartjs.org/) - Charting Library
- [Cloudflare Pages](https://pages.cloudflare.com/) - Hosting

### Inspiration

This project was inspired by:
- Modern village digitalization initiatives
- Community-driven development projects
- Open-source web templates
- Indonesian smart village programs

---

## 📞 Contact

### Website Support

For questions or support regarding this website:

- **Email**: inikknbedalo@gmail.com
- **Phone**: +62 831-0758-1144
- **Location**: Dusun Bedalo, Desa Krambilsawit, Kec. Saptosari, Kab. Gunungkidul, DIY

### Social Media

Stay connected with Dusun Bedalo:

- **Instagram**: [@your-instagram](https://instagram.com/your-username)
- **YouTube**: [Your Channel](https://youtube.com/your-channel)
- **TikTok**: [@your-tiktok](https://tiktok.com/@your-username)
- **Facebook**: [Your Page](https://facebook.com/your-profile)
- **Twitter/X**: [@your-handle](https://x.com/your-handle)

### Project Repository

- **GitHub**: [github.com/yourusername/website-bedalo](https://github.com/yourusername/website-bedalo)
- **Issues**: Report bugs or request features
- **Discussions**: Community discussions and Q&A

---

## 🗺️ Roadmap

### Upcoming Features

#### Phase 1 (Q1 2025)
- [ ] Multi-language support (English, Javanese)
- [ ] Advanced search functionality
- [ ] User comments on news articles
- [ ] Newsletter subscription
- [ ] Enhanced mobile app (PWA)

#### Phase 2 (Q2 2025)
- [ ] E-commerce integration for UMKM
- [ ] Online booking system for accommodations
- [ ] Interactive 360° virtual tours
- [ ] Live chat support
- [ ] Advanced analytics dashboard

#### Phase 3 (Q3 2025)
- [ ] Mobile applications (iOS/Android)
- [ ] Community forum
- [ ] Event management system
- [ ] Digital payment integration
- [ ] Visitor statistics and heatmaps

#### Long-term Goals
- [ ] Smart village IoT integration
- [ ] AI-powered chatbot
- [ ] Augmented reality features
- [ ] Community mobile app
- [ ] Integration with government systems

---

## 📚 Additional Resources

### Documentation

- [HTML5 Specification](https://html.spec.whatwg.org/)
- [CSS3 Reference](https://developer.mozilla.org/en-US/docs/Web/CSS)
- [JavaScript Guide](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide)
- [Tailwind CSS Docs](https://tailwindcss.com/docs)

### Tutorials & Guides

- [Responsive Web Design](https://web.dev/responsive-web-design-basics/)
- [Web Accessibility](https://www.w3.org/WAI/fundamentals/)
- [SEO Best Practices](https://developers.google.com/search/docs)
- [Web Performance](https://web.dev/performance/)

### Community

- [Stack Overflow](https://stackoverflow.com/) - Q&A
- [MDN Web Docs](https://developer.mozilla.org/) - Reference
- [CSS-Tricks](https://css-tricks.com/) - CSS Tips
- [Smashing Magazine](https://www.smashingmagazine.com/) - Web Design

---

## 🎉 Acknowledgments

This website is a testament to the power of community collaboration and digital transformation. We are grateful to everyone who contributed to making this project a reality.

### Impact

- **Digital Presence**: Establishing Dusun Bedalo's online identity
- **Tourism Promotion**: Showcasing local attractions to wider audience
- **Economic Development**: Supporting local UMKM through online exposure
- **Community Engagement**: Facilitating citizen participation
- **Knowledge Sharing**: Documenting village history and culture

### Future Vision

We envision this website as a catalyst for Dusun Bedalo's continued growth and development, serving as a model for digital transformation in rural communities across Indonesia.

---

<div align="center">

**Made with ❤️ by KKN 117 UIN Sunan Kalijaga Yogyakarta**

**For Dusun Bedalo, Gunungkidul, DIY**

[⬆ Back to Top](#-website-dusun-bedalo)

---

*Last Updated: October 2024*

</div>
