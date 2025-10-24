# Migration Plan 3: Reusable Components & Layout System

**Target:** Build comprehensive component library matching original design, implement navigation and footer, create layout templates, and establish client-side interactivity with islands.

---

## Phase 3.1: Core UI Components

### Task 3.1.1: Create Card Component
**Objective:** Build a reusable card component matching original design patterns.

**Actions:**
1. Create `src/components/ui/Card.astro`:
   ```astro
   ---
   interface Props {
     variant?: 'default' | 'hover' | 'bordered';
     padding?: 'none' | 'sm' | 'md' | 'lg';
     class?: string;
   }
   
   const {
     variant = 'default',
     padding = 'md',
     class: className = '',
   } = Astro.props;
   
   const paddingClasses = {
     none: '',
     sm: 'p-4',
     md: 'p-6',
     lg: 'p-8',
   };
   
   const variantClasses = {
     default: 'bg-white dark:bg-gray-800 rounded-lg shadow-md',
     hover: 'bg-white dark:bg-gray-800 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-200',
     bordered: 'bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700',
   };
   ---
   
   <div
     class={`${variantClasses[variant]} ${paddingClasses[padding]} ${className}`}
   >
     <slot />
   </div>
   ```
2. Create usage examples in test page
3. Test with different variants and padding options
4. Verify dark mode styles work correctly

**Success Criteria:**
- Card component renders consistently
- All variants display correctly
- Dark mode styling works
- Component is reusable across pages

---

### Task 3.1.2: Create Button Component
**Objective:** Build button component with multiple styles and sizes.

**Actions:**
1. Create `src/components/ui/Button.astro`:
   ```astro
   ---
   interface Props {
     variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
     size?: 'sm' | 'md' | 'lg';
     href?: string;
     type?: 'button' | 'submit' | 'reset';
     class?: string;
     icon?: string;
     iconPosition?: 'left' | 'right';
   }
   
   const {
     variant = 'primary',
     size = 'md',
     href,
     type = 'button',
     class: className = '',
     icon,
     iconPosition = 'left',
   } = Astro.props;
   
   const sizeClasses = {
     sm: 'px-4 py-2 text-sm',
     md: 'px-6 py-3 text-base',
     lg: 'px-8 py-4 text-lg',
   };
   
   const variantClasses = {
     primary: 'bg-blue-600 hover:bg-blue-700 text-white border-transparent',
     secondary: 'bg-gray-600 hover:bg-gray-700 text-white border-transparent',
     outline: 'bg-transparent hover:bg-blue-50 dark:hover:bg-gray-800 text-blue-600 dark:text-blue-400 border-blue-600 dark:border-blue-400',
     ghost: 'bg-transparent hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-700 dark:text-gray-300 border-transparent',
   };
   
   const baseClasses = 'inline-flex items-center justify-center font-medium rounded-md border transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500';
   
   const Tag = href ? 'a' : 'button';
   const additionalProps = href ? { href } : { type };
   ---
   
   <Tag
     class={`${baseClasses} ${sizeClasses[size]} ${variantClasses[variant]} ${className}`}
     {...additionalProps}
   >
     {icon && iconPosition === 'left' && (
       <i class={`fas fa-${icon} mr-2`}></i>
     )}
     <slot />
     {icon && iconPosition === 'right' && (
       <i class={`fas fa-${icon} ml-2`}></i>
     )}
   </Tag>
   ```
2. Test all button variants
3. Test as both link and button elements
4. Verify icon positioning works

**Success Criteria:**
- Button renders correctly in all variants
- Links and buttons behave properly
- Icons display in correct positions
- Hover and focus states work
- Dark mode styling is correct

---

### Task 3.1.3: Create Badge Component
**Objective:** Build badge component for categories, tags, and status indicators.

**Actions:**
1. Create `src/components/ui/Badge.astro`:
   ```astro
   ---
   interface Props {
     variant?: 'default' | 'primary' | 'success' | 'warning' | 'danger' | 'info';
     size?: 'sm' | 'md' | 'lg';
     class?: string;
   }
   
   const {
     variant = 'default',
     size = 'md',
     class: className = '',
   } = Astro.props;
   
   const sizeClasses = {
     sm: 'px-2 py-0.5 text-xs',
     md: 'px-2.5 py-1 text-sm',
     lg: 'px-3 py-1.5 text-base',
   };
   
   const variantClasses = {
     default: 'bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200',
     primary: 'bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200',
     success: 'bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200',
     warning: 'bg-yellow-100 dark:bg-yellow-900 text-yellow-800 dark:text-yellow-200',
     danger: 'bg-red-100 dark:bg-red-900 text-red-800 dark:text-red-200',
     info: 'bg-cyan-100 dark:bg-cyan-900 text-cyan-800 dark:text-cyan-200',
   };
   
   const baseClasses = 'inline-flex items-center font-medium rounded-full';
   ---
   
   <span class={`${baseClasses} ${sizeClasses[size]} ${variantClasses[variant]} ${className}`}>
     <slot />
   </span>
   ```
2. Test with different content types (text, numbers, icons)
3. Verify sizing is consistent
4. Test dark mode variants

**Success Criteria:**
- Badge displays correctly in all variants
- Sizes are proportional
- Colors are accessible (contrast ratios)
- Dark mode works properly

---

### Task 3.1.4: Create Image Component
**Objective:** Build optimized image component with lazy loading and responsive support.

**Actions:**
1. Create `src/components/ui/OptimizedImage.astro`:
   ```astro
   ---
   import { Image } from 'astro:assets';
   
   interface Props {
     src: string;
     alt: string;
     width?: number;
     height?: number;
     sizes?: string;
     class?: string;
     loading?: 'lazy' | 'eager';
     decoding?: 'async' | 'sync' | 'auto';
     quality?: number;
   }
   
   const {
     src,
     alt,
     width,
     height,
     sizes = '(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw',
     class: className = '',
     loading = 'lazy',
     decoding = 'async',
     quality = 80,
   } = Astro.props;
   
   // Determine if src is a local import or external URL
   const isExternal = src.startsWith('http') || src.startsWith('//');
   ---
   
   {isExternal ? (
     <img
       src={src}
       alt={alt}
       width={width}
       height={height}
       loading={loading}
       decoding={decoding}
       class={className}
     />
   ) : (
     <Image
       src={src}
       alt={alt}
       width={width}
       height={height}
       sizes={sizes}
       loading={loading}
       decoding={decoding}
       quality={quality}
       class={className}
     />
   )}
   ```
2. Test with both local and external images
3. Verify lazy loading works
4. Test responsive image behavior

**Success Criteria:**
- Local images are optimized automatically
- External images render correctly
- Lazy loading functions properly
- Responsive sizes work on different viewports

---

### Task 3.1.5: Create Section Component
**Objective:** Build section wrapper for consistent page layouts.

**Actions:**
1. Create `src/components/ui/Section.astro`:
   ```astro
   ---
   interface Props {
     id?: string;
     padding?: 'none' | 'sm' | 'md' | 'lg' | 'xl';
     background?: 'transparent' | 'gray' | 'white';
     class?: string;
   }
   
   const {
     id,
     padding = 'lg',
     background = 'transparent',
     class: className = '',
   } = Astro.props;
   
   const paddingClasses = {
     none: '',
     sm: 'py-8',
     md: 'py-12',
     lg: 'py-16',
     xl: 'py-24',
   };
   
   const backgroundClasses = {
     transparent: 'bg-transparent',
     gray: 'bg-gray-50 dark:bg-gray-900',
     white: 'bg-white dark:bg-gray-800',
   };
   ---
   
   <section
     id={id}
     class={`${paddingClasses[padding]} ${backgroundClasses[background]} ${className}`}
   >
     <div class="container mx-auto px-6">
       <slot />
     </div>
   </section>
   ```
2. Test section spacing on different screen sizes
3. Verify container width is consistent
4. Test dark mode backgrounds

**Success Criteria:**
- Section creates consistent spacing
- Container respects max-width
- Background variants work correctly
- Dark mode styling applies properly

---

## Phase 3.2: Navigation Components

### Task 3.2.1: Create Navbar Component
**Objective:** Build responsive navigation bar matching original design.

**Actions:**
1. Create `src/components/layout/Navbar.astro`:
   ```astro
   ---
   interface Props {
     currentPath?: string;
   }
   
   const { currentPath = Astro.url.pathname } = Astro.props;
   
   const navLinks = [
     { label: 'Beranda', href: '/' },
     { label: 'Profil', href: '/profil' },
     { label: 'Potensi', href: '/potensi' },
     { label: 'Pariwisata', href: '/pariwisata' },
     { label: 'Galeri', href: '/galeri' },
     { label: 'Berita', href: '/berita' },
     { label: 'Kontak', href: '/kontak' },
   ];
   
   function isActive(href: string): boolean {
     if (href === '/') {
       return currentPath === '/';
     }
     return currentPath.startsWith(href);
   }
   ---
   
   <header class="sticky top-0 z-50 bg-white dark:bg-gray-800 shadow-md">
     <nav
       class="container mx-auto flex items-center justify-between px-6 py-4"
       role="navigation"
       aria-label="Navigasi utama"
     >
       <!-- Logo/Brand -->
       <a href="/" class="flex items-center space-x-2 text-xl font-bold text-blue-600 dark:text-blue-400">
         <i class="fas fa-mountain"></i>
         <span>Dusun Bedalo</span>
       </a>
       
       <!-- Desktop Navigation -->
       <div class="hidden lg:flex items-center space-x-1">
         {navLinks.map((link) => (
           <a
             href={link.href}
             class={`px-4 py-2 rounded-md font-medium transition-colors duration-200 ${
               isActive(link.href)
                 ? 'bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-300'
                 : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
             }`}
             aria-current={isActive(link.href) ? 'page' : undefined}
           >
             {link.label}
           </a>
         ))}
       </div>
       
       <!-- Theme Toggle & Mobile Menu Button -->
       <div class="flex items-center space-x-4">
         <div id="theme-toggle-container">
           <!-- Theme toggle will be inserted here by island component -->
         </div>
         
         <!-- Mobile menu button -->
         <button
           id="mobile-menu-button"
           type="button"
           class="lg:hidden inline-flex items-center justify-center p-2 rounded-md text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-blue-500"
           aria-controls="mobile-menu"
           aria-expanded="false"
         >
           <span class="sr-only">Buka menu</span>
           <i class="fas fa-bars text-xl" id="menu-icon-open"></i>
           <i class="fas fa-times text-xl hidden" id="menu-icon-close"></i>
         </button>
       </div>
     </nav>
     
     <!-- Mobile Menu -->
     <div
       id="mobile-menu"
       class="hidden lg:hidden border-t border-gray-200 dark:border-gray-700"
     >
       <div class="px-6 py-4 space-y-1">
         {navLinks.map((link) => (
           <a
             href={link.href}
             class={`block px-4 py-3 rounded-md font-medium transition-colors duration-200 ${
               isActive(link.href)
                 ? 'bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-300'
                 : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
             }`}
           >
             {link.label}
           </a>
         ))}
       </div>
     </div>
   </header>
   
   <script>
     // Mobile menu toggle
     const mobileMenuButton = document.getElementById('mobile-menu-button');
     const mobileMenu = document.getElementById('mobile-menu');
     const menuIconOpen = document.getElementById('menu-icon-open');
     const menuIconClose = document.getElementById('menu-icon-close');
     
     mobileMenuButton?.addEventListener('click', () => {
       const isExpanded = mobileMenuButton.getAttribute('aria-expanded') === 'true';
       
       mobileMenuButton.setAttribute('aria-expanded', String(!isExpanded));
       mobileMenu?.classList.toggle('hidden');
       menuIconOpen?.classList.toggle('hidden');
       menuIconClose?.classList.toggle('hidden');
     });
     
     // Close mobile menu when clicking outside
     document.addEventListener('click', (event) => {
       const target = event.target as HTMLElement;
       if (!target.closest('header') && !mobileMenu?.classList.contains('hidden')) {
         mobileMenu?.classList.add('hidden');
         mobileMenuButton?.setAttribute('aria-expanded', 'false');
         menuIconOpen?.classList.remove('hidden');
         menuIconClose?.classList.add('hidden');
       }
     });
   </script>
   ```
2. Test responsive behavior on different screen sizes
3. Verify mobile menu works correctly
4. Test active link highlighting
5. Ensure accessibility attributes are correct

**Success Criteria:**
- Navigation displays correctly on all screen sizes
- Mobile menu opens and closes smoothly
- Active page is highlighted
- Keyboard navigation works
- Screen readers can navigate properly

---

### Task 3.2.2: Create ThemeToggle Island Component
**Objective:** Build client-side theme switcher with localStorage persistence.

**Actions:**
1. Create `src/components/islands/ThemeToggle.astro`:
   ```astro
   ---
   // This is a client-side component (island)
   ---
   
   <button
     id="theme-toggle"
     type="button"
     class="inline-flex items-center justify-center p-2 rounded-md text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-blue-500 transition-colors duration-200"
     aria-label="Toggle tema"
   >
     <i class="fas fa-sun text-xl" id="theme-icon-light"></i>
     <i class="fas fa-moon text-xl hidden" id="theme-icon-dark"></i>
   </button>
   
   <script>
     // Theme management
     const themeToggle = document.getElementById('theme-toggle');
     const themeIconLight = document.getElementById('theme-icon-light');
     const themeIconDark = document.getElementById('theme-icon-dark');
     const html = document.documentElement;
     
     // Get initial theme from localStorage or system preference
     function getInitialTheme(): 'light' | 'dark' {
       const stored = localStorage.getItem('theme');
       if (stored === 'dark' || stored === 'light') {
         return stored;
       }
       
       // Check system preference
       if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
         return 'dark';
       }
       
       return 'light';
     }
     
     // Apply theme
     function applyTheme(theme: 'light' | 'dark') {
       if (theme === 'dark') {
         html.classList.add('dark');
         themeIconLight?.classList.add('hidden');
         themeIconDark?.classList.remove('hidden');
       } else {
         html.classList.remove('dark');
         themeIconLight?.classList.remove('hidden');
         themeIconDark?.classList.add('hidden');
       }
       localStorage.setItem('theme', theme);
     }
     
     // Initialize theme
     const currentTheme = getInitialTheme();
     applyTheme(currentTheme);
     
     // Toggle theme
     themeToggle?.addEventListener('click', () => {
       const isDark = html.classList.contains('dark');
       applyTheme(isDark ? 'light' : 'dark');
     });
     
     // Listen for system theme changes
     window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
       if (!localStorage.getItem('theme')) {
         applyTheme(e.matches ? 'dark' : 'light');
       }
     });
   </script>
   ```
2. Update Navbar to mount ThemeToggle component
3. Test theme switching
4. Verify localStorage persistence
5. Test system preference detection

**Success Criteria:**
- Theme toggle button displays correctly
- Clicking toggles between light and dark mode
- Theme preference persists across page loads
- System preference is respected initially
- Smooth transition between themes

---

### Task 3.2.3: Create Breadcrumb Component
**Objective:** Build breadcrumb navigation for better UX.

**Actions:**
1. Create `src/components/layout/Breadcrumb.astro`:
   ```astro
   ---
   interface BreadcrumbItem {
     label: string;
     href?: string;
   }
   
   interface Props {
     items: BreadcrumbItem[];
   }
   
   const { items } = Astro.props;
   ---
   
   <nav aria-label="Breadcrumb" class="py-4">
     <ol class="flex items-center space-x-2 text-sm">
       <li>
         <a
           href="/"
           class="text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
         >
           <i class="fas fa-home"></i>
           <span class="sr-only">Beranda</span>
         </a>
       </li>
       
       {items.map((item, index) => (
         <li class="flex items-center space-x-2">
           <i class="fas fa-chevron-right text-gray-400 text-xs"></i>
           {item.href && index < items.length - 1 ? (
             <a
               href={item.href}
               class="text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
             >
               {item.label}
             </a>
           ) : (
             <span class="text-gray-900 dark:text-gray-100 font-medium">
               {item.label}
             </span>
           )}
         </li>
       ))}
     </ol>
   </nav>
   ```
2. Test breadcrumb with various page depths
3. Verify last item is not a link
4. Test responsive behavior

**Success Criteria:**
- Breadcrumb displays navigation path correctly
- Current page is not a clickable link
- Hover states work for links
- Responsive on mobile devices
- Accessible with screen readers

---

## Phase 3.3: Footer Component

### Task 3.3.1: Create Footer Component
**Objective:** Build comprehensive footer matching original design.

**Actions:**
1. Create `src/components/layout/Footer.astro`:
   ```astro
   ---
   import type { SocialLink } from '@types/common';
   
   const currentYear = new Date().getFullYear();
   
   const quickLinks = [
     { label: 'Beranda', href: '/' },
     { label: 'Profil', href: '/profil' },
     { label: 'Potensi', href: '/potensi' },
     { label: 'Pariwisata', href: '/pariwisata' },
     { label: 'Galeri', href: '/galeri' },
     { label: 'Berita', href: '/berita' },
   ];
   
   const infoLinks = [
     { label: 'Tentang KKN', href: '/tentang-kkn' },
     { label: 'Kontak', href: '/kontak' },
     { label: 'Peta Situs', href: '/peta-situs' },
     { label: 'Kebijakan Privasi', href: '/kebijakan-privasi' },
   ];
   
   const socialLinks: SocialLink[] = [
     {
       platform: 'Instagram',
       url: 'https://instagram.com/bedalo',
       icon: 'instagram',
       label: 'Instagram Dusun Bedalo',
     },
     {
       platform: 'YouTube',
       url: 'https://youtube.com/@bedalo',
       icon: 'youtube',
       label: 'YouTube Dusun Bedalo',
     },
     {
       platform: 'TikTok',
       url: 'https://tiktok.com/@bedalo',
       icon: 'tiktok',
       label: 'TikTok Dusun Bedalo',
     },
     {
       platform: 'Facebook',
       url: 'https://facebook.com/bedalo',
       icon: 'facebook',
       label: 'Facebook Dusun Bedalo',
     },
     {
       platform: 'Twitter',
       url: 'https://x.com/bedalo',
       icon: 'x-twitter',
       label: 'Twitter Dusun Bedalo',
     },
   ];
   ---
   
   <footer class="bg-gray-900 text-gray-300">
     <!-- Main Footer -->
     <div class="container mx-auto px-6 py-12">
       <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
         <!-- About Section -->
         <div>
           <h3 class="text-white font-bold text-lg mb-4">Tentang Kami</h3>
           <p class="text-sm leading-relaxed mb-4">
             Dusun Bedalo adalah dusun yang terletak di Desa Krambilsawit,
             Kecamatan Saptosari, Kabupaten Gunungkidul, Daerah Istimewa Yogyakarta.
           </p>
           <div class="flex items-start space-x-2 text-sm">
             <i class="fas fa-map-marker-alt text-blue-400 mt-1"></i>
             <span>
               Dusun Bedalo, Krambilsawit<br />
               Saptosari, Gunungkidul<br />
               DIY 55871
             </span>
           </div>
         </div>
         
         <!-- Quick Links -->
         <div>
           <h3 class="text-white font-bold text-lg mb-4">Tautan Cepat</h3>
           <ul class="space-y-2">
             {quickLinks.map((link) => (
               <li>
                 <a
                   href={link.href}
                   class="text-sm hover:text-blue-400 transition-colors duration-200"
                 >
                   <i class="fas fa-chevron-right text-xs mr-2"></i>
                   {link.label}
                 </a>
               </li>
             ))}
           </ul>
         </div>
         
         <!-- Information Links -->
         <div>
           <h3 class="text-white font-bold text-lg mb-4">Informasi</h3>
           <ul class="space-y-2">
             {infoLinks.map((link) => (
               <li>
                 <a
                   href={link.href}
                   class="text-sm hover:text-blue-400 transition-colors duration-200"
                 >
                   <i class="fas fa-chevron-right text-xs mr-2"></i>
                   {link.label}
                 </a>
               </li>
             ))}
           </ul>
         </div>
         
         <!-- Contact & Social -->
         <div>
           <h3 class="text-white font-bold text-lg mb-4">Hubungi Kami</h3>
           <div class="space-y-3 text-sm mb-6">
             <div class="flex items-center space-x-2">
               <i class="fas fa-phone text-blue-400"></i>
               <a href="tel:+6283107581144" class="hover:text-blue-400 transition-colors">
                 +62 831-0758-1144
               </a>
             </div>
             <div class="flex items-center space-x-2">
               <i class="fas fa-envelope text-blue-400"></i>
               <a href="mailto:inikknbedalo@gmail.com" class="hover:text-blue-400 transition-colors">
                 inikknbedalo@gmail.com
               </a>
             </div>
           </div>
           
           <h4 class="text-white font-semibold mb-3">Ikuti Kami</h4>
           <div class="flex space-x-3">
             {socialLinks.map((social) => (
               <a
                 href={social.url}
                 target="_blank"
                 rel="noopener noreferrer"
                 class="w-10 h-10 flex items-center justify-center rounded-full bg-gray-800 hover:bg-blue-600 transition-colors duration-200"
                 aria-label={social.label}
               >
                 <i class={`fab fa-${social.icon}`}></i>
               </a>
             ))}
           </div>
         </div>
       </div>
     </div>
     
     <!-- Bottom Bar -->
     <div class="border-t border-gray-800">
       <div class="container mx-auto px-6 py-6">
         <div class="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
           <p class="text-sm text-center md:text-left">
             &copy; {currentYear} Dusun Bedalo. Made with <i class="fas fa-heart text-red-500"></i> by
             <a
               href="/tentang-kkn"
               class="text-blue-400 hover:text-blue-300 transition-colors"
             >
               KKN 117 UIN Sunan Kalijaga
             </a>
           </p>
           <p class="text-xs text-gray-500">
             Powered by <span class="text-blue-400">Astro 5</span>
           </p>
         </div>
       </div>
     </div>
   </footer>
   ```
2. Test footer layout on various screen sizes
3. Verify all links work correctly
4. Test social media icon hover states
5. Ensure email and phone links work

**Success Criteria:**
- Footer displays all sections correctly
- Layout is responsive on all devices
- All links are functional
- Social media icons display properly
- Copyright year is dynamic
- Hover states work smoothly

---

## Phase 3.4: Layout Templates

### Task 3.4.1: Create MainLayout
**Objective:** Build primary layout template with navbar and footer.

**Actions:**
1. Create `src/layouts/MainLayout.astro`:
   ```astro
   ---
   import BaseLayout from './BaseLayout.astro';
   import Navbar from '@components/layout/Navbar.astro';
   import Footer from '@components/layout/Footer.astro';
   import ThemeToggle from '@components/islands/ThemeToggle.astro';
   
   interface Props {
     title: string;
     description: string;
     image?: string;
     canonicalURL?: string;
   }
   
   const props = Astro.props;
   ---
   
   <BaseLayout {...props}>
     <Navbar />
     
     <main id="main-content" class="min-h-screen">
       <slot />
     </main>
     
     <Footer />
     
     <!-- Mount theme toggle in navbar -->
     <script>
       const themeToggleContainer = document.getElementById('theme-toggle-container');
       if (themeToggleContainer) {
         // Theme toggle is already rendered, just ensure it's in the right place
       }
     </script>
   </BaseLayout>
   ```
2. Test layout with sample content
3. Verify navbar and footer appear correctly
4. Test theme toggle functionality
5. Ensure main content area has proper spacing

**Success Criteria:**
- Layout renders navbar, content, and footer
- Theme toggle works from navbar
- Main content has proper min-height
- Skip to content link works
- No layout shift on load

---

### Task 3.4.2: Create ContentLayout
**Objective:** Build layout template for content pages with breadcrumbs and sidebar.

**Actions:**
1. Create `src/layouts/ContentLayout.astro`:
   ```astro
   ---
   import MainLayout from './MainLayout.astro';
   import Breadcrumb from '@components/layout/Breadcrumb.astro';
   import type { BreadcrumbItem } from '@types/common';
   
   interface Props {
     title: string;
     description: string;
     image?: string;
     breadcrumbs?: BreadcrumbItem[];
     sidebar?: boolean;
   }
   
   const {
     title,
     description,
     image,
     breadcrumbs,
     sidebar = false,
   } = Astro.props;
   ---
   
   <MainLayout title={title} description={description} image={image}>
     <div class="container mx-auto px-6 py-8">
       {breadcrumbs && <Breadcrumb items={breadcrumbs} />}
       
       {sidebar ? (
         <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
           <!-- Main Content -->
           <article class="lg:col-span-2">
             <slot />
           </article>
           
           <!-- Sidebar -->
           <aside class="lg:col-span-1">
             <slot name="sidebar" />
           </aside>
         </div>
       ) : (
         <article>
           <slot />
         </article>
       )}
     </div>
   </MainLayout>
   ```
2. Create `src/types/common.ts` update:
   ```typescript
   export interface BreadcrumbItem {
     label: string;
     href?: string;
   }
   ```
3. Test layout with and without sidebar
4. Verify breadcrumbs display correctly
5. Test responsive grid layout

**Success Criteria:**
- Content layout renders properly
- Breadcrumbs show navigation path
- Sidebar appears when enabled
- Grid layout is responsive
- Named slots work correctly

---

### Task 3.4.3: Create ArticleLayout
**Objective:** Build specialized layout for blog posts and articles.

**Actions:**
1. Create `src/layouts/ArticleLayout.astro`:
   ```astro
   ---
   import ContentLayout from './ContentLayout.astro';
   import { formatDate } from '@utils/dateFormat';
   import Badge from '@components/ui/Badge.astro';
   
   interface Props {
     title: string;
     description: string;
     pubDate: Date;
     updatedDate?: Date;
     author?: string;
     image?: {
       src: string;
       alt: string;
     };
     category?: string;
     tags?: string[];
     readingTime?: number;
   }
   
   const {
     title,
     description,
     pubDate,
     updatedDate,
     author = 'Tim KKN Bedalo',
     image,
     category,
     tags = [],
     readingTime,
   } = Astro.props;
   
   const breadcrumbs = [
     { label: 'Berita', href: '/berita' },
     { label: title },
   ];
   ---
   
   <ContentLayout
     title={title}
     description={description}
     image={image?.src}
     breadcrumbs={breadcrumbs}
     sidebar={true}
   >
     <!-- Article Header -->
     <header class="mb-8">
       <h1 class="text-4xl font-bold text-gray-900 dark:text-white mb-4">
         {title}
       </h1>
       
       {category && (
         <Badge variant="primary" class="mb-4">
           {category}
         </Badge>
       )}
       
       <div class="flex flex-wrap items-center gap-4 text-sm text-gray-600 dark:text-gray-400 mb-6">
         <div class="flex items-center space-x-2">
           <i class="fas fa-user"></i>
           <span>{author}</span>
         </div>
         
         <div class="flex items-center space-x-2">
           <i class="fas fa-calendar"></i>
           <time datetime={pubDate.toISOString()}>
             {formatDate(pubDate)}
           </time>
         </div>
         
         {updatedDate && (
           <div class="flex items-center space-x-2">
             <i class="fas fa-clock"></i>
             <span>Diperbarui {formatDate(updatedDate)}</span>
           </div>
         )}
         
         {readingTime && (
           <div class="flex items-center space-x-2">
             <i class="fas fa-book-open"></i>
             <span>{readingTime} menit baca</span>
           </div>
         )}
       </div>
       
       {image && (
         <img
           src={image.src}
           alt={image.alt}
           class="w-full h-64 md:h-96 object-cover rounded-lg"
           loading="eager"
         />
       )}
     </header>
     
     <!-- Article Content -->
     <div class="prose prose-lg dark:prose-invert max-w-none mb-8">
       <slot />
     </div>
     
     <!-- Tags -->
     {tags.length > 0 && (
       <footer class="pt-6 border-t border-gray-200 dark:border-gray-700">
         <div class="flex flex-wrap gap-2">
           <span class="text-sm font-medium text-gray-700 dark:text-gray-300">Tags:</span>
           {tags.map((tag) => (
             <Badge variant="default">#{tag}</Badge>
           ))}
         </div>
       </footer>
     )}
     
     <!-- Sidebar Content -->
     <div slot="sidebar" class="space-y-6">
       <!-- Recent Posts Widget -->
       <div class="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
         <h3 class="text-lg font-bold mb-4">Artikel Terbaru</h3>
         <!-- Content will be added dynamically -->
         <slot name="recent-posts" />
       </div>
       
       <!-- Categories Widget -->
       <div class="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
         <h3 class="text-lg font-bold mb-4">Kategori</h3>
         <slot name="categories" />
       </div>
     </div>
   </ContentLayout>
   ```
2. Test with sample article
3. Verify metadata displays correctly
4. Test sidebar widgets
5. Ensure prose styling works for markdown content

**Success Criteria:**
- Article layout displays all metadata
- Featured image renders correctly
- Author, date, and reading time display
- Tags are shown at the bottom
- Sidebar appears with widgets
- Prose styling makes content readable

---

## Phase 3.5: Interactive Island Components

### Task 3.5.1: Create CountUp Animation Component
**Objective:** Build number animation component for statistics (replacing CountUp.js).

**Actions:**
1. Create `src/components/islands/CountUp.astro`:
   ```astro
   ---
   interface Props {
     end: number;
     duration?: number;
     suffix?: string;
     prefix?: string;
     class?: string;
   }
   
   const {
     end,
     duration = 2000,
     suffix = '',
     prefix = '',
     class: className = '',
   } = Astro.props;
   ---
   
   <span
     class={`countup ${className}`}
     data-end={end}
     data-duration={duration}
     data-suffix={suffix}
     data-prefix={prefix}
   >
     {prefix}0{suffix}
   </span>
   
   <script>
     class CountUpAnimation {
       private element: HTMLElement;
       private end: number;
       private duration: number;
       private suffix: string;
       private prefix: string;
       private hasAnimated: boolean = false;
       
       constructor(element: HTMLElement) {
         this.element = element;
         this.end = parseInt(element.dataset.end || '0', 10);
         this.duration = parseInt(element.dataset.duration || '2000', 10);
         this.suffix = element.dataset.suffix || '';
         this.prefix = element.dataset.prefix || '';
         
         this.observe();
       }
       
       observe() {
         const observer = new IntersectionObserver(
           (entries) => {
             entries.forEach((entry) => {
               if (entry.isIntersecting && !this.hasAnimated) {
                 this.animate();
                 this.hasAnimated = true;
               }
             });
           },
           { threshold: 0.5 }
         );
         
         observer.observe(this.element);
       }
       
       animate() {
         const startTime = Date.now();
         const start = 0;
         
         const updateCount = () => {
           const currentTime = Date.now();
           const elapsed = currentTime - startTime;
           const progress = Math.min(elapsed / this.duration, 1);
           
           // Easing function (easeOutExpo)
           const easeOut = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);
           
           const current = Math.floor(start + (this.end - start) * easeOut);
           this.element.textContent = `${this.prefix}${current.toLocaleString('id-ID')}${this.suffix}`;
           
           if (progress < 1) {
             requestAnimationFrame(updateCount);
           }
         };
         
         requestAnimationFrame(updateCount);
       }
     }
     
     // Initialize all countup elements
     document.addEventListener('DOMContentLoaded', () => {
       const elements = document.querySelectorAll<HTMLElement>('.countup');
       elements.forEach((el) => new CountUpAnimation(el));
     });
   </script>
   ```
2. Test animation with various numbers
3. Verify intersection observer works
4. Test with prefixes and suffixes

**Success Criteria:**
- Numbers animate smoothly
- Animation triggers on scroll into view
- Indonesian number formatting works
- Animation only happens once per element
- Smooth easing function

---

### Task 3.5.2: Create Modal Component
**Objective:** Build reusable modal component for forms and content.

**Actions:**
1. Create `src/components/islands/Modal.astro`:
   ```astro
   ---
   interface Props {
     id: string;
     title: string;
     size?: 'sm' | 'md' | 'lg' | 'xl';
   }
   
   const {
     id,
     title,
     size = 'md',
   } = Astro.props;
   
   const sizeClasses = {
     sm: 'max-w-md',
     md: 'max-w-lg',
     lg: 'max-w-2xl',
     xl: 'max-w-4xl',
   };
   ---
   
   <div
     id={id}
     class="modal fixed inset-0 z-[100] hidden items-center justify-center bg-black/50 backdrop-blur-sm"
     role="dialog"
     aria-modal="true"
     aria-labelledby={`${id}-title`}
   >
     <div class={`relative bg-white dark:bg-gray-800 rounded-lg shadow-xl ${sizeClasses[size]} w-full mx-4 max-h-[90vh] overflow-y-auto`}>
       <!-- Header -->
       <div class="flex items-center justify-between p-6 border-b border-gray-200 dark:border-gray-700">
         <h2
           id={`${id}-title`}
           class="text-2xl font-bold text-gray-900 dark:text-white"
         >
           {title}
         </h2>
         <button
           type="button"
           class="modal-close text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 transition-colors"
           aria-label="Tutup modal"
         >
           <i class="fas fa-times text-2xl"></i>
         </button>
       </div>
       
       <!-- Body -->
       <div class="p-6">
         <slot />
       </div>
     </div>
   </div>
   
   <script>
     // Modal functionality
     function initModal(modalId: string) {
       const modal = document.getElementById(modalId);
       if (!modal) return;
       
       const closeButtons = modal.querySelectorAll('.modal-close');
       
       // Close on button click
       closeButtons.forEach((btn) => {
         btn.addEventListener('click', () => closeModal(modalId));
       });
       
       // Close on backdrop click
       modal.addEventListener('click', (e) => {
         if (e.target === modal) {
           closeModal(modalId);
         }
       });
       
       // Close on Escape key
       document.addEventListener('keydown', (e) => {
         if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
           closeModal(modalId);
         }
       });
     }
     
     function openModal(modalId: string) {
       const modal = document.getElementById(modalId);
       if (modal) {
         modal.classList.remove('hidden');
         modal.classList.add('flex');
         document.body.style.overflow = 'hidden';
       }
     }
     
     function closeModal(modalId: string) {
       const modal = document.getElementById(modalId);
       if (modal) {
         modal.classList.add('hidden');
         modal.classList.remove('flex');
         document.body.style.overflow = '';
       }
     }
     
     // Expose functions globally
     (window as any).openModal = openModal;
     (window as any).closeModal = closeModal;
     
     // Initialize all modals
     document.addEventListener('DOMContentLoaded', () => {
       document.querySelectorAll('.modal').forEach((modal) => {
         if (modal.id) {
           initModal(modal.id);
         }
       });
     });
   </script>
   ```
2. Test modal opening and closing
3. Verify backdrop click closes modal
4. Test escape key functionality
5. Ensure body scroll is locked when open

**Success Criteria:**
- Modal opens and closes correctly
- Backdrop click closes modal
- Escape key closes modal
- Body scroll is prevented when open
- Multiple modals can coexist
- Accessible with ARIA attributes

---

## Phase 3.6: Testing & Documentation

### Task 3.6.1: Create Component Showcase Page
**Objective:** Build comprehensive component testing page.

**Actions:**
1. Create `src/pages/components-showcase.astro`:
   ```astro
   ---
   import MainLayout from '@layouts/MainLayout.astro';
   import Card from '@components/ui/Card.astro';
   import Button from '@components/ui/Button.astro';
   import Badge from '@components/ui/Badge.astro';
   import Section from '@components/ui/Section.astro';
   import CountUp from '@components/islands/CountUp.astro';
   import Modal from '@components/islands/Modal.astro';
   ---
   
   <MainLayout
     title="Component Showcase"
     description="Testing all UI components"
   >
     <div class="container mx-auto px-6 py-12">
       <h1 class="text-4xl font-bold mb-8">Component Showcase</h1>
       
       <!-- Buttons -->
       <Section>
         <h2 class="text-2xl font-bold mb-4">Buttons</h2>
         <div class="flex flex-wrap gap-4 mb-8">
           <Button variant="primary">Primary Button</Button>
           <Button variant="secondary">Secondary Button</Button>
           <Button variant="outline">Outline Button</Button>
           <Button variant="ghost">Ghost Button</Button>
           <Button variant="primary" size="sm">Small</Button>
           <Button variant="primary" size="lg">Large</Button>
           <Button variant="primary" icon="heart">With Icon</Button>
           <Button variant="primary" icon="arrow-right" iconPosition="right">
             Next
           </Button>
         </div>
       </Section>
       
       <!-- Badges -->
       <Section>
         <h2 class="text-2xl font-bold mb-4">Badges</h2>
         <div class="flex flex-wrap gap-2 mb-8">
           <Badge variant="default">Default</Badge>
           <Badge variant="primary">Primary</Badge>
           <Badge variant="success">Success</Badge>
           <Badge variant="warning">Warning</Badge>
           <Badge variant="danger">Danger</Badge>
           <Badge variant="info">Info</Badge>
         </div>
       </Section>
       
       <!-- Cards -->
       <Section>
         <h2 class="text-2xl font-bold mb-4">Cards</h2>
         <div class="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
           <Card variant="default">
             <h3 class="text-xl font-bold mb-2">Default Card</h3>
             <p>This is a default card with shadow.</p>
           </Card>
           <Card variant="hover">
             <h3 class="text-xl font-bold mb-2">Hover Card</h3>
             <p>This card has hover effect.</p>
           </Card>
           <Card variant="bordered">
             <h3 class="text-xl font-bold mb-2">Bordered Card</h3>
             <p>This card has border instead of shadow.</p>
           </Card>
         </div>
       </Section>
       
       <!-- CountUp -->
       <Section>
         <h2 class="text-2xl font-bold mb-4">CountUp Animation</h2>
         <div class="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
           <Card>
             <div class="text-center">
               <div class="text-4xl font-bold text-blue-600 mb-2">
                 <CountUp end={450} />
               </div>
               <p class="text-sm text-gray-600 dark:text-gray-400">Warga</p>
             </div>
           </Card>
           <Card>
             <div class="text-center">
               <div class="text-4xl font-bold text-green-600 mb-2">
                 <CountUp end={120} suffix="+" />
               </div>
               <p class="text-sm text-gray-600 dark:text-gray-400">Keluarga</p>
             </div>
           </Card>
           <Card>
             <div class="text-center">
               <div class="text-4xl font-bold text-purple-600 mb-2">
                 <CountUp end={15} suffix=" UMKM" />
               </div>
               <p class="text-sm text-gray-600 dark:text-gray-400">Usaha Lokal</p>
             </div>
           </Card>
           <Card>
             <div class="text-center">
               <div class="text-4xl font-bold text-orange-600 mb-2">
                 <CountUp end={2} suffix=" Pantai" />
               </div>
               <p class="text-sm text-gray-600 dark:text-gray-400">Destinasi</p>
             </div>
           </Card>
         </div>
       </Section>
       
       <!-- Modal -->
       <Section>
         <h2 class="text-2xl font-bold mb-4">Modal</h2>
         <Button variant="primary" onclick="openModal('test-modal')">
           Open Modal
         </Button>
       </Section>
     </div>
     
     <Modal id="test-modal" title="Test Modal" size="md">
       <p class="mb-4">This is a test modal content.</p>
       <p>You can put any content here including forms, images, or text.</p>
       <div class="mt-6 flex justify-end space-x-4">
         <Button variant="ghost" onclick="closeModal('test-modal')">
           Cancel
         </Button>
         <Button variant="primary" onclick="closeModal('test-modal')">
           Confirm
         </Button>
       </div>
     </Modal>
   </MainLayout>
   ```
2. Visit `/components-showcase` and test all components
3. Verify each component displays correctly
4. Test interactive components (modal, countup)
5. Test dark mode on all components

**Success Criteria:**
- All components display correctly
- Interactive components work
- Dark mode variants display properly
- No console errors
- Components are responsive

---

### Task 3.6.2: Document Component Library
**Objective:** Create documentation for component usage.

**Actions:**
1. Create `docs/COMPONENTS.md`:
   ```markdown
   # Component Library Documentation
   
   ## UI Components
   
   ### Card
   
   **Location:** `src/components/ui/Card.astro`
   
   **Props:**
   - `variant`: 'default' | 'hover' | 'bordered' (default: 'default')
   - `padding`: 'none' | 'sm' | 'md' | 'lg' (default: 'md')
   - `class`: Additional CSS classes
   
   **Usage:**
   ```astro
   <Card variant="hover" padding="lg">
     <h3>Card Title</h3>
     <p>Card content</p>
   </Card>
   ```
   
   ### Button
   
   **Location:** `src/components/ui/Button.astro`
   
   **Props:**
   - `variant`: 'primary' | 'secondary' | 'outline' | 'ghost'
   - `size`: 'sm' | 'md' | 'lg'
   - `href`: Optional URL (renders as `<a>`)
   - `type`: 'button' | 'submit' | 'reset'
   - `icon`: Font Awesome icon name
   - `iconPosition`: 'left' | 'right'
   
   **Usage:**
   ```astro
   <Button variant="primary" icon="heart">
     Like
   </Button>
   
   <Button variant="outline" href="/about">
     Learn More
   </Button>
   ```
   
   [Continue for all components...]
   
   ## Layout Components
   
   ### Navbar
   
   [Documentation...]
   
   ### Footer
   
   [Documentation...]
   
   ## Island Components
   
   ### ThemeToggle
   
   [Documentation...]
   
   ### CountUp
   
   [Documentation...]
   
   ### Modal
   
   [Documentation...]
   ```
2. Add usage examples for each component
3. Document props and behavior
4. Include screenshots if helpful

**Success Criteria:**
- All components are documented
- Examples are clear and accurate
- Props are fully described
- Usage patterns are demonstrated

---

### Task 3.6.3: Commit Components Work
**Objective:** Commit all component and layout work.

**Actions:**
1. Review all changes: `git status`
2. Ensure all components are included
3. Stage changes: `git add .`
4. Commit with comprehensive message:
   ```bash
   git commit -m "feat: implement comprehensive component library and layouts
   
   UI Components:
   - Create Card component with variants and dark mode
   - Create Button component with sizes, variants, icons
   - Create Badge component for categories and tags
   - Create OptimizedImage component with lazy loading
   - Create Section component for consistent spacing
   
   Layout Components:
   - Implement responsive Navbar with mobile menu
   - Implement comprehensive Footer with 4 columns
   - Create Breadcrumb component for navigation
   
   Layout Templates:
   - Create MainLayout with navbar and footer
   - Create ContentLayout with breadcrumbs and sidebar
   - Create ArticleLayout for blog posts with metadata
   
   Island Components:
   - Implement ThemeToggle with localStorage persistence
   - Create CountUp animation with IntersectionObserver
   - Build Modal component with accessibility features
   
   Testing:
   - Add component showcase page for testing
   - Test all components in light and dark mode
   - Verify responsive behavior
   - Test interactive components
   
   Documentation:
   - Add comprehensive component docs
   - Document all props and usage patterns
   - Include examples for each component
   
   All components match original design and are fully accessible."
   ```

**Success Criteria:**
- All components and layouts committed
- Commit message is descriptive
- No uncommitted changes remain
- Git history is clean

---

## Completion Checklist for Plan 3

Before moving to Plan 4, verify:

- [x] Card component created and tested
- [x] Button component created with all variants
- [x] Badge component created for tags/categories
- [x] OptimizedImage component with lazy loading
- [x] Section component for layout consistency
- [x] Navbar component with responsive mobile menu
- [x] ThemeToggle island component with persistence
- [x] Breadcrumb component for navigation
- [x] Footer component with all sections
- [x] MainLayout template created
- [x] ContentLayout template with sidebar
- [x] ArticleLayout for blog posts
- [x] CountUp animation component
- [x] Modal component with accessibility
- [x] Component showcase page works
- [x] All components tested in dark mode
- [x] Responsive behavior verified
- [x] Component documentation written
- [x] All work committed to Git

**Estimated Time:** 5-6 hours

**Next Steps:** Proceed to Plan 4 for page implementation and content rendering.
