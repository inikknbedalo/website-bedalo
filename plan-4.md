# Migration Plan 4: Page Implementation & Content Rendering

**Target:** Migrate all static pages to Astro routes, implement dynamic content rendering, create collection listing and detail pages, and ensure all original functionality is preserved.

---

## Phase 4.1: Static Pages Migration

### Task 4.1.1: Migrate Homepage (index.html)
**Objective:** Convert homepage to Astro with dynamic content from collections.

**Actions:**
1. Create `src/pages/index.astro`:
   ```astro
   ---
   import MainLayout from '@layouts/MainLayout.astro';
   import Section from '@components/ui/Section.astro';
   import Card from '@components/ui/Card.astro';
   import Button from '@components/ui/Button.astro';
   import CountUp from '@components/islands/CountUp.astro';
   import OptimizedImage from '@components/ui/OptimizedImage.astro';
   import { getCollection } from 'astro:content';
   import { getFeaturedEntries } from '@utils/collections';
   
   // Fetch featured content
   const featuredBerita = await getFeaturedEntries('berita');
   const featuredPotensi = await getFeaturedEntries('potensi');
   const featuredPariwisata = await getFeaturedEntries('pariwisata');
   
   const recentBerita = featuredBerita.slice(0, 3);
   const topPotensi = featuredPotensi.slice(0, 3);
   const topDestinations = featuredPariwisata.slice(0, 2);
   ---
   
   <MainLayout
     title="Pesona Tersembunyi Gunung Kidul"
     description="Temukan pesona tersembunyi Dusun Bedalo di Gunung Kidul. Jelajahi Pantai Ngedan yang eksotis, cicipi kuliner lokal, dan kenali budaya kami."
   >
     <!-- Hero Section -->
     <section
       class="relative h-[60vh] md:h-[80vh] flex items-center justify-center text-white"
       style="background: linear-gradient(rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.4)), url('/assets/images/ngedan.webp') center/cover;"
     >
       <div class="container mx-auto px-6 text-center" data-aos="fade-up">
         <h1 class="text-4xl md:text-5xl lg:text-6xl font-bold mb-4">
           Selamat Datang di Dusun Bedalo
         </h1>
         <p class="text-xl md:text-2xl mb-8 max-w-3xl mx-auto">
           Menjelajahi Keindahan, Kearifan Lokal, dan Potensi Tersembunyi
         </p>
         <Button variant="primary" size="lg" href="#profil">
           Jelajahi Sekarang
           <i class="fas fa-arrow-down ml-2"></i>
         </Button>
       </div>
     </section>
     
     <!-- Profile/Welcome Section -->
     <Section id="profil" padding="xl">
       <div class="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center" data-aos="fade-up">
         <div class="flex justify-center">
           <div class="relative">
             <img
               src="/assets/images/cat.jpg"
               alt="Kepala Dusun Bedalo - Sumindar"
               class="w-64 h-64 md:w-80 md:h-80 rounded-full object-cover border-4 border-blue-600 shadow-xl"
             />
             <div class="absolute -bottom-4 left-1/2 transform -translate-x-1/2 bg-white dark:bg-gray-800 px-6 py-2 rounded-full shadow-lg">
               <p class="font-bold text-gray-900 dark:text-white">Sumindar</p>
               <p class="text-sm text-gray-600 dark:text-gray-400">Kepala Dusun</p>
             </div>
           </div>
         </div>
         
         <div>
           <h2 class="text-3xl md:text-4xl font-bold mb-6 text-gray-900 dark:text-white">
             Sambutan Hangat dari Kami
           </h2>
           <p class="text-lg text-gray-700 dark:text-gray-300 mb-4 leading-relaxed">
             Assalamu'alaikum warahmatullahi wabarakatuh. Selamat datang di website resmi
             Dusun Bedalo. Kami sangat senang Anda mengunjungi portal digital kami yang
             dirancang untuk memberikan informasi lengkap tentang potensi, keindahan, dan
             kehidupan masyarakat Dusun Bedalo.
           </p>
           <p class="text-lg text-gray-700 dark:text-gray-300 mb-6 leading-relaxed">
             Dusun Bedalo memiliki keunikan tersendiri dengan kekayaan alam, budaya, dan
             sumber daya manusia yang terus berkembang. Melalui website ini, kami berharap
             dapat memperkenalkan lebih jauh tentang dusun kami kepada masyarakat luas.
           </p>
           <Button variant="outline" href="/profil">
             Baca Selengkapnya
             <i class="fas fa-arrow-right ml-2"></i>
           </Button>
         </div>
       </div>
     </Section>
     
     <!-- Potential Overview Section -->
     <Section background="gray" padding="xl">
       <div class="text-center mb-12" data-aos="fade-up">
         <h2 class="text-3xl md:text-4xl font-bold mb-4 text-gray-900 dark:text-white">
           Potensi Unggulan Dusun
         </h2>
         <p class="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
           Dusun Bedalo memiliki berbagai potensi yang terus dikembangkan untuk
           kesejahteraan masyarakat
         </p>
       </div>
       
       <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
         <Card variant="hover" data-aos="fade-up" data-aos-delay="100">
           <div class="text-center">
             <div class="w-16 h-16 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center mx-auto mb-4">
               <i class="fas fa-store text-3xl text-blue-600 dark:text-blue-400"></i>
             </div>
             <h3 class="text-xl font-bold mb-3 text-gray-900 dark:text-white">
               UMKM & Produk Lokal
             </h3>
             <p class="text-gray-600 dark:text-gray-400 mb-4">
               Berbagai produk unggulan dari UMKM lokal seperti gula aren, keripik
               singkong, dan produk pertanian lainnya.
             </p>
             <Button variant="outline" href="/potensi#umkm" size="sm">
               Lihat Selengkapnya
             </Button>
           </div>
         </Card>
         
         <Card variant="hover" data-aos="fade-up" data-aos-delay="200">
           <div class="text-center">
             <div class="w-16 h-16 bg-green-100 dark:bg-green-900 rounded-full flex items-center justify-center mx-auto mb-4">
               <i class="fas fa-seedling text-3xl text-green-600 dark:text-green-400"></i>
             </div>
             <h3 class="text-xl font-bold mb-3 text-gray-900 dark:text-white">
               Pertanian & Perkebunan
             </h3>
             <p class="text-gray-600 dark:text-gray-400 mb-4">
               Lahan pertanian produktif dengan berbagai komoditas seperti singkong,
               jagung, kacang tanah, dan aren.
             </p>
             <Button variant="outline" href="/potensi#pertanian" size="sm">
               Lihat Selengkapnya
             </Button>
           </div>
         </Card>
         
         <Card variant="hover" data-aos="fade-up" data-aos-delay="300">
           <div class="text-center">
             <div class="w-16 h-16 bg-purple-100 dark:bg-purple-900 rounded-full flex items-center justify-center mx-auto mb-4">
               <i class="fas fa-map-signs text-3xl text-purple-600 dark:text-purple-400"></i>
             </div>
             <h3 class="text-xl font-bold mb-3 text-gray-900 dark:text-white">
               Pariwisata Alam
             </h3>
             <p class="text-gray-600 dark:text-gray-400 mb-4">
               Destinasi wisata pantai yang indah seperti Pantai Ngedan dan Pantai
               Ngluwen dengan keindahan alam yang menakjubkan.
             </p>
             <Button variant="outline" href="/pariwisata" size="sm">
               Lihat Selengkapnya
             </Button>
           </div>
         </Card>
       </div>
     </Section>
     
     <!-- Tourism Highlights Section -->
     <Section padding="xl">
       <div class="text-center mb-12" data-aos="fade-up">
         <h2 class="text-3xl md:text-4xl font-bold mb-4 text-gray-900 dark:text-white">
           Pariwisata & Kekayaan Budaya
         </h2>
         <p class="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto mb-8">
           Nikmati keindahan pantai-pantai eksotis dan kekayaan budaya lokal yang
           masih terjaga hingga kini
         </p>
         <Button variant="primary" href="/pariwisata">
           Jelajahi Destinasi Wisata
           <i class="fas fa-compass ml-2"></i>
         </Button>
       </div>
       
       <div class="grid grid-cols-2 md:grid-cols-4 gap-4 mt-12" data-aos="fade-up" data-aos-delay="200">
         {[1, 2, 3, 4].map((i) => (
           <div class="relative overflow-hidden rounded-lg aspect-square group cursor-pointer">
             <img
               src={`/assets/images/gallery/img-${i}.webp`}
               alt={`Dusun Bedalo ${i}`}
               class="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
               loading="lazy"
             />
             <div class="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
           </div>
         ))}
       </div>
     </Section>
     
     <!-- Statistics Section -->
     <Section background="gray" padding="xl">
       <div class="text-center mb-12" data-aos="fade-up">
         <h2 class="text-3xl md:text-4xl font-bold mb-4 text-gray-900 dark:text-white">
           Dusun Bedalo dalam Angka
         </h2>
       </div>
       
       <div class="grid grid-cols-2 md:grid-cols-4 gap-6" data-aos="fade-up" data-aos-delay="200">
         <Card>
           <div class="text-center">
             <div class="text-4xl md:text-5xl font-bold text-blue-600 dark:text-blue-400 mb-2">
               <CountUp end={450} />
             </div>
             <p class="text-sm text-gray-600 dark:text-gray-400 font-medium">
               <i class="fas fa-users mr-2"></i>Jumlah Warga
             </p>
           </div>
         </Card>
         
         <Card>
           <div class="text-center">
             <div class="text-4xl md:text-5xl font-bold text-green-600 dark:text-green-400 mb-2">
               <CountUp end={120} />
             </div>
             <p class="text-sm text-gray-600 dark:text-gray-400 font-medium">
               <i class="fas fa-home mr-2"></i>Kepala Keluarga
             </p>
           </div>
         </Card>
         
         <Card>
           <div class="text-center">
             <div class="text-4xl md:text-5xl font-bold text-purple-600 dark:text-purple-400 mb-2">
               <CountUp end={15} suffix="+" />
             </div>
             <p class="text-sm text-gray-600 dark:text-gray-400 font-medium">
               <i class="fas fa-store mr-2"></i>UMKM Aktif
             </p>
           </div>
         </Card>
         
         <Card>
           <div class="text-center">
             <div class="text-4xl md:text-5xl font-bold text-orange-600 dark:text-orange-400 mb-2">
               <CountUp end={2} />
             </div>
             <p class="text-sm text-gray-600 dark:text-gray-400 font-medium">
               <i class="fas fa-umbrella-beach mr-2"></i>Destinasi Pantai
             </p>
           </div>
         </Card>
       </div>
     </Section>
     
     <!-- Recent News Section -->
     {recentBerita.length > 0 && (
       <Section padding="xl">
         <div class="flex justify-between items-center mb-8" data-aos="fade-up">
           <h2 class="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white">
             Berita Terbaru
           </h2>
           <Button variant="outline" href="/berita">
             Lihat Semua
             <i class="fas fa-arrow-right ml-2"></i>
           </Button>
         </div>
         
         <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
           {recentBerita.map((article, index) => (
             <Card variant="hover" data-aos="fade-up" data-aos-delay={index * 100}>
               <a href={`/berita/${article.id}`} class="block">
                 <img
                   src={article.data.image.src}
                   alt={article.data.image.alt}
                   class="w-full h-48 object-cover rounded-t-lg mb-4 -mx-6 -mt-6"
                   loading="lazy"
                 />
                 <div class="mb-3">
                   <Badge variant="primary">{article.data.category}</Badge>
                 </div>
                 <h3 class="text-xl font-bold mb-2 text-gray-900 dark:text-white hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                   {article.data.title}
                 </h3>
                 <p class="text-gray-600 dark:text-gray-400 text-sm mb-4 line-clamp-2">
                   {article.data.description}
                 </p>
                 <div class="flex items-center text-xs text-gray-500 dark:text-gray-500">
                   <i class="fas fa-calendar mr-2"></i>
                   <time datetime={article.data.pubDate.toISOString()}>
                     {formatDate(article.data.pubDate)}
                   </time>
                 </div>
               </a>
             </Card>
           ))}
         </div>
       </Section>
     )}
     
     <!-- Gallery Preview Section -->
     <Section background="gray" padding="xl">
       <div class="text-center mb-12" data-aos="fade-up">
         <h2 class="text-3xl md:text-4xl font-bold mb-4 text-gray-900 dark:text-white">
           Galeri Momen Dusun Bedalo
         </h2>
         <p class="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
           Jelajahi koleksi foto dan video kegiatan serta keindahan Dusun Bedalo
         </p>
       </div>
       
       <div class="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8" data-aos="fade-up" data-aos-delay="200">
         {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
           <div class="relative overflow-hidden rounded-lg aspect-square">
             <img
               src={`/assets/images/gallery/img-${i}.webp`}
               alt={`Galeri Dusun Bedalo ${i}`}
               class="w-full h-full object-cover hover:scale-110 transition-transform duration-300"
               loading="lazy"
             />
           </div>
         ))}
       </div>
       
       <div class="text-center">
         <Button variant="primary" href="/galeri">
           Lihat Galeri Lengkap
           <i class="fas fa-images ml-2"></i>
         </Button>
       </div>
     </Section>
     
     <!-- CTA Section -->
     <Section padding="xl">
       <div class="bg-gradient-to-r from-blue-600 to-cyan-700 rounded-2xl p-8 md:p-12 text-white text-center" data-aos="fade-up">
         <h2 class="text-3xl md:text-4xl font-bold mb-4">
           Tertarik Berkunjung ke Dusun Bedalo?
         </h2>
         <p class="text-xl mb-8 max-w-2xl mx-auto">
           Hubungi kami untuk informasi lebih lanjut tentang akomodasi, wisata, dan
           kegiatan di Dusun Bedalo
         </p>
         <div class="flex flex-col sm:flex-row gap-4 justify-center">
           <Button variant="secondary" size="lg" href="/kontak">
             <i class="fas fa-phone mr-2"></i>
             Hubungi Kami
           </Button>
           <Button variant="outline" size="lg" href="/pariwisata" class="border-white text-white hover:bg-white hover:text-blue-600">
             <i class="fas fa-map mr-2"></i>
             Lihat Destinasi
           </Button>
         </div>
       </div>
     </Section>
   </MainLayout>
   
   <script>
     import AOS from 'aos';
     import 'aos/dist/aos.css';
     
     // Initialize AOS
     AOS.init({
       duration: 800,
       once: true,
       offset: 100,
       easing: 'ease-out',
     });
   </script>
   ```
2. Add AOS library:
   ```bash
   npm install aos
   npm install -D @types/aos
   ```
3. Import formatDate in the component
4. Test homepage on various screen sizes
5. Verify all sections display correctly
6. Test all links and buttons

**Success Criteria:**
- Homepage matches original design and functionality
- All sections render correctly
- Dynamic content from collections displays
- Statistics animate on scroll
- AOS animations work smoothly
- Responsive on all devices
- All links are functional

---

### Task 4.1.2: Migrate Profile Page (profil.html)
**Objective:** Convert profile page to Astro with structured data.

**Actions:**
1. Create `src/pages/profil.astro`:
   ```astro
   ---
   import MainLayout from '@layouts/MainLayout.astro';
   import Section from '@components/ui/Section.astro';
   import Card from '@components/ui/Card.astro';
   import CountUp from '@components/islands/CountUp.astro';
   import Breadcrumb from '@components/layout/Breadcrumb.astro';
   
   const breadcrumbs = [{ label: 'Profil' }];
   
   const government = {
     kepalaDusun: {
       name: 'Sumindar',
       position: 'Kepala Dusun',
       photo: '/assets/images/cat.jpg',
     },
     ketua RW: {
       name: 'Walyono',
       position: 'Ketua RW 10',
       photo: '/assets/images/profil.jpg',
     },
     rtLeaders: [
       { name: 'Sukarman', position: 'Ketua RT 01', photo: '/assets/images/profil.jpg' },
       { name: 'Tugiman', position: 'Ketua RT 02', photo: '/assets/images/profil.jpg' },
       { name: 'Sugiyanto', position: 'Ketua RT 03', photo: '/assets/images/profil.jpg' },
     ],
   };
   
   const demographics = {
     totalKK: 120,
     totalWarga: 450,
     lakiLaki: 230,
     perempuan: 220,
   };
   
   const visi = "Mewujudkan Dusun Bedalo yang maju, sejahtera, dan berbudaya dengan memanfaatkan potensi alam dan sumber daya manusia secara optimal.";
   
   const misi = [
     "Meningkatkan kualitas infrastruktur dan fasilitas umum dusun",
     "Memberdayakan UMKM dan mengembangkan potensi ekonomi lokal",
     "Meningkatkan kualitas pendidikan dan kesehatan masyarakat",
     "Melestarikan budaya dan kearifan lokal",
     "Mengembangkan sektor pariwisata berbasis masyarakat",
   ];
   ---
   
   <MainLayout
     title="Tentang Dusun Bedalo"
     description="Mengenal lebih dekat sejarah, visi, misi, dan pemerintahan Dusun Bedalo, Krambilsawit, Saptosari, Gunungkidul."
   >
     <div class="container mx-auto px-6 py-8">
       <Breadcrumb items={breadcrumbs} />
     </div>
     
     <!-- Page Header -->
     <section class="bg-gradient-to-r from-blue-600 to-cyan-700 text-white py-16" data-aos="fade-down">
       <div class="container mx-auto px-6 text-center">
         <h1 class="text-4xl md:text-5xl font-bold mb-4">
           Tentang Dusun Bedalo
         </h1>
         <p class="text-xl max-w-2xl mx-auto">
           Mengenal Lebih Dekat Sejarah, Visi, dan Warga Kami
         </p>
       </div>
     </section>
     
     <!-- History Section -->
     <Section padding="xl">
       <div class="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center" data-aos="fade-up">
         <div>
           <h2 class="text-3xl font-bold mb-6 text-gray-900 dark:text-white">
             Sejarah Singkat
           </h2>
           <div class="prose prose-lg dark:prose-invert max-w-none">
             <p class="leading-relaxed">
               Nama <strong>Bedalo</strong> berasal dari bahasa Jawa yang memiliki arti
               "tempat yang terbuka" atau "dataran". Dusun Bedalo terletak di Desa
               Krambilsawit, Kecamatan Saptosari, Kabupaten Gunungkidul, Daerah Istimewa
               Yogyakarta.
             </p>
             <p class="leading-relaxed">
               Secara administratif, Dusun Bedalo terdiri dari 3 RT (Rukun Tetangga)
               dan 1 RW (Rukun Warga). Dusun ini memiliki potensi alam yang luar biasa,
               terutama di sektor pariwisata dengan keberadaan Pantai Ngedan dan Pantai
               Ngluwen yang menjadi destinasi favorit wisatawan.
             </p>
             <p class="leading-relaxed">
               Masyarakat Dusun Bedalo mayoritas bermata pencaharian sebagai petani
               dan peternak. Selain itu, berkembang juga sektor UMKM dengan produk-produk
               unggulan seperti gula aren, keripik singkong, dan gaplek.
             </p>
           </div>
         </div>
         
         <div class="relative" data-aos="fade-left" data-aos-delay="200">
           <img
             src="/assets/images/ngedan.webp"
             alt="Pemandangan Dusun Bedalo"
             class="rounded-lg shadow-xl"
           />
         </div>
       </div>
     </Section>
     
     <!-- Vision & Mission Section -->
     <Section background="gray" padding="xl">
       <div class="text-center mb-12" data-aos="fade-up">
         <h2 class="text-3xl md:text-4xl font-bold mb-4 text-gray-900 dark:text-white">
           Visi & Misi
         </h2>
       </div>
       
       <div class="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
         <Card padding="lg" data-aos="fade-right">
           <div class="text-center mb-6">
             <div class="w-16 h-16 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center mx-auto mb-4">
               <i class="fas fa-eye text-3xl text-blue-600 dark:text-blue-400"></i>
             </div>
             <h3 class="text-2xl font-bold text-gray-900 dark:text-white">Visi</h3>
           </div>
           <p class="text-center text-lg text-gray-700 dark:text-gray-300 leading-relaxed">
             {visi}
           </p>
         </Card>
         
         <Card padding="lg" data-aos="fade-left" data-aos-delay="200">
           <div class="text-center mb-6">
             <div class="w-16 h-16 bg-purple-100 dark:bg-purple-900 rounded-full flex items-center justify-center mx-auto mb-4">
               <i class="fas fa-bullseye text-3xl text-purple-600 dark:text-purple-400"></i>
             </div>
             <h3 class="text-2xl font-bold text-gray-900 dark:text-white">Misi</h3>
           </div>
           <ol class="space-y-3 text-gray-700 dark:text-gray-300">
             {misi.map((item, index) => (
               <li class="flex">
                 <span class="flex-shrink-0 w-8 h-8 bg-purple-100 dark:bg-purple-900 text-purple-600 dark:text-purple-400 rounded-full flex items-center justify-center font-bold mr-3">
                   {index + 1}
                 </span>
                 <span class="pt-1">{item}</span>
               </li>
             ))}
           </ol>
         </Card>
       </div>
     </Section>
     
     <!-- Government Structure Section -->
     <Section padding="xl">
       <div class="text-center mb-12" data-aos="fade-up">
         <h2 class="text-3xl md:text-4xl font-bold mb-4 text-gray-900 dark:text-white">
           Struktur Pemerintahan
         </h2>
         <p class="text-lg text-gray-600 dark:text-gray-400">
           Pemerintahan Dusun Bedalo dan jajarannya
         </p>
       </div>
       
       <!-- Kepala Dusun -->
       <div class="max-w-sm mx-auto mb-12" data-aos="zoom-in">
         <Card variant="hover">
           <div class="text-center">
             <img
               src={government.kepalaDusun.photo}
               alt={government.kepalaDusun.name}
               class="w-32 h-32 rounded-full mx-auto mb-4 object-cover border-4 border-blue-600"
             />
             <h3 class="text-xl font-bold text-gray-900 dark:text-white">
               {government.kepalaDusun.name}
             </h3>
             <p class="text-blue-600 dark:text-blue-400 font-medium">
               {government.kepalaDusun.position}
             </p>
           </div>
         </Card>
       </div>
       
       <!-- Ketua RW -->
       <div class="max-w-sm mx-auto mb-12" data-aos="zoom-in" data-aos-delay="100">
         <Card variant="hover">
           <div class="text-center">
             <img
               src={government.ketuaRW.photo}
               alt={government.ketuaRW.name}
               class="w-32 h-32 rounded-full mx-auto mb-4 object-cover border-4 border-green-600"
             />
             <h3 class="text-xl font-bold text-gray-900 dark:text-white">
               {government.ketuaRW.name}
             </h3>
             <p class="text-green-600 dark:text-green-400 font-medium">
               {government.ketuaRW.position}
             </p>
           </div>
         </Card>
       </div>
       
       <!-- RT Leaders -->
       <div class="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
         {government.rtLeaders.map((leader, index) => (
           <Card variant="hover" data-aos="zoom-in" data-aos-delay={index * 100 + 200}>
             <div class="text-center">
               <img
                 src={leader.photo}
                 alt={leader.name}
                 class="w-24 h-24 rounded-full mx-auto mb-4 object-cover border-4 border-purple-600"
               />
               <h3 class="text-lg font-bold text-gray-900 dark:text-white">
                 {leader.name}
               </h3>
               <p class="text-purple-600 dark:text-purple-400 font-medium text-sm">
                 {leader.position}
               </p>
             </div>
           </Card>
         ))}
       </div>
     </Section>
     
     <!-- Demographics Section -->
     <Section background="gray" padding="xl">
       <div class="text-center mb-12" data-aos="fade-up">
         <h2 class="text-3xl md:text-4xl font-bold mb-4 text-gray-900 dark:text-white">
           Demografi
         </h2>
         <p class="text-lg text-gray-600 dark:text-gray-400">
           Data kependudukan Dusun Bedalo
         </p>
       </div>
       
       <div class="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto">
         <Card data-aos="fade-up" data-aos-delay="100">
           <div class="text-center">
             <div class="text-4xl md:text-5xl font-bold text-blue-600 dark:text-blue-400 mb-2">
               <CountUp end={demographics.totalKK} />
             </div>
             <p class="text-sm text-gray-600 dark:text-gray-400 font-medium">
               <i class="fas fa-users mr-2"></i>Jumlah KK
             </p>
           </div>
         </Card>
         
         <Card data-aos="fade-up" data-aos-delay="200">
           <div class="text-center">
             <div class="text-4xl md:text-5xl font-bold text-green-600 dark:text-green-400 mb-2">
               <CountUp end={demographics.totalWarga} />
             </div>
             <p class="text-sm text-gray-600 dark:text-gray-400 font-medium">
               <i class="fas fa-user-friends mr-2"></i>Jumlah Warga
             </p>
           </div>
         </Card>
         
         <Card data-aos="fade-up" data-aos-delay="300">
           <div class="text-center">
             <div class="text-4xl md:text-5xl font-bold text-cyan-600 dark:text-cyan-400 mb-2">
               <CountUp end={demographics.lakiLaki} />
             </div>
             <p class="text-sm text-gray-600 dark:text-gray-400 font-medium">
               <i class="fas fa-male mr-2"></i>Laki-laki
             </p>
           </div>
         </Card>
         
         <Card data-aos="fade-up" data-aos-delay="400">
           <div class="text-center">
             <div class="text-4xl md:text-5xl font-bold text-pink-600 dark:text-pink-400 mb-2">
               <CountUp end={demographics.perempuan} />
             </div>
             <p class="text-sm text-gray-600 dark:text-gray-400 font-medium">
               <i class="fas fa-female mr-2"></i>Perempuan
             </p>
           </div>
         </Card>
       </div>
       
       <div class="max-w-2xl mx-auto mt-12" data-aos="fade-up" data-aos-delay="500">
         <Card padding="lg">
           <div class="text-center">
             <div class="w-16 h-16 bg-orange-100 dark:bg-orange-900 rounded-full flex items-center justify-center mx-auto mb-4">
               <i class="fas fa-tractor text-3xl text-orange-600 dark:text-orange-400"></i>
             </div>
             <h3 class="text-xl font-bold mb-2 text-gray-900 dark:text-white">
               Mata Pencaharian Utama
             </h3>
             <p class="text-gray-600 dark:text-gray-400">
               Pertanian, Perkebunan, UMKM, dan Pariwisata
             </p>
           </div>
         </Card>
       </div>
     </Section>
     
     <!-- Map Section -->
     <Section padding="xl">
       <div class="text-center mb-12" data-aos="fade-up">
         <h2 class="text-3xl md:text-4xl font-bold mb-4 text-gray-900 dark:text-white">
           Peta Wilayah
         </h2>
         <p class="text-lg text-gray-600 dark:text-gray-400">
           Lokasi Dusun Bedalo di Kabupaten Gunungkidul
         </p>
       </div>
       
       <div class="max-w-4xl mx-auto" data-aos="fade-up" data-aos-delay="200">
         <div class="aspect-video rounded-lg overflow-hidden shadow-xl">
           <iframe
             src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3948.123456789!2d110.557!3d-8.185!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zOMKwMTEnMDYuMiJTIDExMMKwMzMnMjUuNiJF!5e0!3m2!1sen!2sid!4v1234567890"
             width="100%"
             height="100%"
             style="border:0;"
             allowfullscreen=""
             loading="lazy"
             referrerpolicy="no-referrer-when-downgrade"
             title="Peta Dusun Bedalo"
           ></iframe>
         </div>
       </div>
     </Section>
   </MainLayout>
   
   <script>
     import AOS from 'aos';
     AOS.init({
       duration: 800,
       once: true,
       offset: 100,
     });
   </script>
   ```
2. Test profile page on various devices
3. Verify all sections render correctly
4. Test map embedding
5. Ensure statistics animate properly

**Success Criteria:**
- Profile page displays all information correctly
- Government structure is clearly presented
- Statistics animate on scroll
- Map loads and displays correctly
- Page is responsive on all devices
- All images load properly

---

Continuing with remaining tasks... Due to character limits, I'll create a summary of the remaining phases for Plan 4:

**Remaining Phases for Plan 4:**

## Phase 4.2: Collection Listing Pages
- Task 4.2.1: Create Berita Index Page
- Task 4.2.2: Create Potensi Index Page
- Task 4.2.3: Create Pariwisata Index Page
- Task 4.2.4: Create Akomodasi Index Page
- Task 4.2.5: Create Warung Index Page

## Phase 4.3: Dynamic Collection Detail Pages
- Task 4.3.1: Create Berita Detail Page Template
- Task 4.3.2: Create Potensi Detail Page Template
- Task 4.3.3: Create Pariwisata Detail Page Template
- Task 4.3.4: Create Akomodasi Detail Page Template
- Task 4.3.5: Create Warung Detail Page Template

## Phase 4.4: Utility Pages
- Task 4.4.1: Migrate Kontak Page with Form
- Task 4.4.2: Migrate Tentang KKN Page
- Task 4.4.3: Create Peta Situs Page
- Task 4.4.4: Create Kebijakan Privasi Page
- Task 4.4.5: Create Custom 404 Page

## Phase 4.5: Special Feature Pages
- Task 4.5.1: Implement Galeri Page with Lightgallery
- Task 4.5.2: Migrate Dashboard Page with Chart.js
- Task 4.5.3: Migrate Survei Page with Multi-step Form

## Phase 4.6: Testing & Commit
- Task 4.6.1: Test All Pages
- Task 4.6.2: SEO Validation
- Task 4.6.3: Performance Testing
- Task 4.6.4: Commit Pages Work

**Estimated Time:** 7-8 hours
**Next:** Plan 5 for final optimizations and deployment
