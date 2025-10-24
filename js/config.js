// Site Configuration
const SITE_CONFIG = {
  baseUrl: "https://bedalo.pages.dev",
  siteName: "Dusun Bedalo",
  routes: {
    home: "/",
    profile: "/profil.html",
    potential: "/potensi.html",
    tourism: "/pariwisata.html",
    gallery: "/galeri.html",
    news: "/berita/",
    contact: "/kontak.html",
    about: "/tentang-kkn.html",
    sitemap: "/peta-situs.html",
    privacy: "/kebijakan-privasi.html",
    dashboard: "/dashboard/",
    survey: "/survei/",
  },
  social: {
    instagram: "https://instagram.com/dusunbedalo",
    facebook: "https://facebook.com/dusunbedalo",
    youtube: "https://youtube.com/@dusunbedalo",
    tiktok: "https://tiktok.com/@dusunbedalo",
    twitter: "https://twitter.com/dusunbedalo",
  },
  contact: {
    email: "info@bedalo.pages.dev",
    phone: "+62 812-3456-7890",
    whatsapp: "+62 812-3456-7890",
    address: "Dusun Bedalo, Krambilsawit, Saptosari, Gunung Kidul, D.I. Yogyakarta",
  },
  meta: {
    description: "Website resmi Dusun Bedalo, Gunung Kidul - Jelajahi potensi, pariwisata, dan budaya desa kami",
    keywords: "dusun bedalo, gunung kidul, wisata yogyakarta, pantai ngedan, gula aren, umkm desa",
    author: "Tim KKN Universitas Gadjah Mada",
    ogImage: "/assets/images/og-image.jpg",
    themeColor: "#2563eb",
  },
};

// Dashboard Configuration
const DASHBOARD_CONFIG = {
  SPREADSHEET_ID: '1QnXBFw9wDpe4tAy99ALbY04RUl1VY_DD491sC7LFXKM',
  SHEET_NAME: 'aspirasi',
  API_URL: '',
  REFRESH_INTERVAL: 60000, // 1 minute
  MAX_RETRIES: 3,
  RETRY_DELAY: 2000,
};

// Construct API URL
DASHBOARD_CONFIG.API_URL = `https://docs.google.com/spreadsheets/d/${DASHBOARD_CONFIG.SPREADSHEET_ID}/gviz/tq?tqx=out:json&sheet=${encodeURIComponent(DASHBOARD_CONFIG.SHEET_NAME)}`;

// Make config globally available (for non-module environments)
if (typeof window !== "undefined") {
  window.SITE_CONFIG = SITE_CONFIG;
  window.DASHBOARD_CONFIG = DASHBOARD_CONFIG;
}

// Export for ES modules
if (typeof module !== "undefined" && module.exports) {
  module.exports = { SITE_CONFIG, DASHBOARD_CONFIG };
}
