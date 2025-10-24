# 📊 Dashboard Aspirasi Masyarakat - Implementation Plan

**Date**: October 24, 2024  
**Version**: 1.2  
**Status**: Planning Phase  
**Spreadsheet ID**: `1QnXBFw9wDpe4tAy99ALbY04RUl1VY_DD491sC7LFXKM`  
**Sheet Name**: `aspirasi`  
**Password Hash**: `df639246eff9e232a0d366efbf55739b5c93550c1173b043a49ea84620db249d`  
**Session Duration**: 24 hours (1 day)

---

## 🎯 PROJECT OVERVIEW

### Goal
Create a fully functional dashboard that displays real-time aspirasi (public feedback) data from Google Forms submissions, with simple password authentication.

### Key Features
1. ✅ Password-protected access (hardcoded password: `kknbedalo117`)
2. ✅ Real-time data fetch from Google Sheets (sheet: `aspirasi`)
3. ✅ Loading animations during data fetch
4. ✅ Interactive charts and statistics
5. ✅ Responsive design (mobile-friendly)
6. ✅ No login/signup buttons (simple auth only)
7. ✅ Refresh button in navbar (no logout button)
8. ✅ Auto-logout after 24 hours (1 day session)

---

## 🔐 AUTHENTICATION SYSTEM

### Requirements
- Simple password protection (no database needed)
- Password: `kknbedalo117` (encrypted/hashed)
- Session-based (survives page refresh)
- Auto-logout after 24 hours (1 day)
- No signup functionality
- No logout button (automatic expiry only)
- Refresh button in navbar for manual data reload

### Implementation Details

#### 1. Password Encryption
```javascript
// Use SHA-256 hash (client-side)
// Hash of 'kknbedalo117': 
// 5d41402abc4b2a76b9719d911017c592 (example MD5, use SHA-256 in production)

// Proper SHA-256 hash (use Web Crypto API)
async function hashPassword(password) {
  const encoder = new TextEncoder();
  const data = encoder.encode(password);
  const hash = await crypto.subtle.digest('SHA-256', data);
  const hashArray = Array.from(new Uint8Array(hash));
  const hashHex = hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
  return hashHex;
}

// Pre-computed hash to hardcode:
// SHA-256('kknbedalo117') = [compute this and hardcode it]
```

#### 2. Login Form HTML
```html
<!-- login.html or embedded in dashboard/index.html -->
<div id="login-screen" class="min-h-screen flex items-center justify-center bg-gray-100">
  <div class="max-w-md w-full bg-white rounded-lg shadow-xl p-8">
    <div class="text-center mb-6">
      <i class="fas fa-lock text-5xl text-blue-600 mb-3"></i>
      <h2 class="text-2xl font-bold text-gray-800">Dashboard Aspirasi</h2>
      <p class="text-gray-600 mt-2">Masukkan password untuk mengakses</p>
    </div>
    
    <form id="login-form" class="space-y-4">
      <div>
        <label for="password" class="block text-sm font-medium text-gray-700 mb-2">
          Password
        </label>
        <div class="relative">
          <input
            type="password"
            id="password"
            name="password"
            placeholder="Masukkan password"
            class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            required
            autocomplete="off"
          />
          <button
            type="button"
            id="toggle-password"
            class="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
            aria-label="Toggle password visibility"
          >
            <i class="fas fa-eye"></i>
          </button>
        </div>
      </div>
      
      <div id="login-error" class="hidden text-red-600 text-sm bg-red-50 p-3 rounded">
        <i class="fas fa-exclamation-circle mr-2"></i>
        <span>Password salah. Silakan coba lagi.</span>
      </div>
      
      <button
        type="submit"
        id="login-button"
        class="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition duration-200 flex items-center justify-center"
      >
        <span>Masuk Dashboard</span>
      </button>
    </form>
    
    <div class="mt-6 text-center text-sm text-gray-500">
      <i class="fas fa-info-circle mr-1"></i>
      Hubungi admin jika lupa password
    </div>
  </div>
</div>

<!-- Dashboard Content (hidden until authenticated) -->
<div id="dashboard-content" class="hidden">
  <!-- Existing dashboard HTML here -->
</div>
```

#### 3. Authentication JavaScript (auth.js)
```javascript
// dashboard/js/auth.js

const AUTH_CONFIG = {
  // Pre-computed SHA-256 hash of 'kknbedalo117'
  PASSWORD_HASH: 'df639246eff9e232a0d366efbf55739b5c93550c1173b043a49ea84620db249d',
  SESSION_KEY: 'dashboard_auth_token',
  SESSION_DURATION: 24 * 60 * 60 * 1000, // 24 hours (1 day) in milliseconds
  LAST_ACTIVITY_KEY: 'dashboard_last_activity',
};

class DashboardAuth {
  constructor() {
    this.init();
  }

  async init() {
    // Check if already authenticated
    if (this.isAuthenticated()) {
      this.showDashboard();
      this.startActivityMonitor();
    } else {
      this.showLogin();
    }
  }

  // Hash password using SHA-256
  async hashPassword(password) {
    const encoder = new TextEncoder();
    const data = encoder.encode(password);
    const hash = await crypto.subtle.digest('SHA-256', data);
    const hashArray = Array.from(new Uint8Array(hash));
    const hashHex = hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
    return hashHex;
  }

  // Verify password
  async verifyPassword(password) {
    const hash = await this.hashPassword(password);
    return hash === AUTH_CONFIG.PASSWORD_HASH;
  }

  // Handle login submission
  async handleLogin(event) {
    event.preventDefault();
    
    const passwordInput = document.getElementById('password');
    const loginButton = document.getElementById('login-button');
    const errorDiv = document.getElementById('login-error');
    
    // Show loading state
    loginButton.disabled = true;
    loginButton.innerHTML = '<i class="fas fa-spinner fa-spin mr-2"></i> Memverifikasi...';
    errorDiv.classList.add('hidden');
    
    try {
      const password = passwordInput.value;
      const isValid = await this.verifyPassword(password);
      
      if (isValid) {
        // Generate session token
        const token = this.generateToken();
        
        // Store session
        sessionStorage.setItem(AUTH_CONFIG.SESSION_KEY, token);
        this.updateLastActivity();
        
        // Show success and redirect
        loginButton.innerHTML = '<i class="fas fa-check-circle mr-2"></i> Berhasil!';
        loginButton.classList.remove('bg-blue-600', 'hover:bg-blue-700');
        loginButton.classList.add('bg-green-600');
        
        setTimeout(() => {
          this.showDashboard();
          this.startActivityMonitor();
        }, 500);
      } else {
        // Show error
        errorDiv.classList.remove('hidden');
        loginButton.disabled = false;
        loginButton.innerHTML = 'Masuk Dashboard';
        passwordInput.value = '';
        passwordInput.focus();
      }
    } catch (error) {
      console.error('Login error:', error);
      errorDiv.querySelector('span').textContent = 'Terjadi kesalahan. Silakan coba lagi.';
      errorDiv.classList.remove('hidden');
      loginButton.disabled = false;
      loginButton.innerHTML = 'Masuk Dashboard';
    }
  }

  // Generate random token
  generateToken() {
    return Array.from(crypto.getRandomValues(new Uint8Array(32)))
      .map(b => b.toString(16).padStart(2, '0'))
      .join('');
  }

  // Check if authenticated
  isAuthenticated() {
    const token = sessionStorage.getItem(AUTH_CONFIG.SESSION_KEY);
    const lastActivity = parseInt(sessionStorage.getItem(AUTH_CONFIG.LAST_ACTIVITY_KEY) || '0');
    const now = Date.now();
    
    // Check if token exists and session hasn't expired (24 hours)
    if (token && (now - lastActivity < AUTH_CONFIG.SESSION_DURATION)) {
      return true;
    }
    
    // Session expired, clear storage
    this.logout();
    return false;
  }

  // Update last activity timestamp (only on login)
  updateLastActivity() {
    sessionStorage.setItem(AUTH_CONFIG.LAST_ACTIVITY_KEY, Date.now().toString());
  }

  // Start activity monitor (check every 5 minutes - less frequent for 24h session)
  startActivityMonitor() {
    // No need to update activity on interactions - session is fixed at 24 hours
    
    // Check session validity every 5 minutes
    this.activityInterval = setInterval(() => {
      if (!this.isAuthenticated()) {
        this.logout();
        alert('Sesi Anda telah berakhir setelah 24 jam. Silakan login kembali.');
        location.reload();
      }
    }, 5 * 60 * 1000); // Check every 5 minutes
  }

  // Logout
  logout() {
    sessionStorage.removeItem(AUTH_CONFIG.SESSION_KEY);
    sessionStorage.removeItem(AUTH_CONFIG.LAST_ACTIVITY_KEY);
    if (this.activityInterval) {
      clearInterval(this.activityInterval);
    }
  }

  // Show login screen
  showLogin() {
    document.getElementById('login-screen').classList.remove('hidden');
    document.getElementById('dashboard-content').classList.add('hidden');
    
    // Attach event listeners
    const loginForm = document.getElementById('login-form');
    loginForm.addEventListener('submit', (e) => this.handleLogin(e));
    
    // Toggle password visibility
    const toggleBtn = document.getElementById('toggle-password');
    const passwordInput = document.getElementById('password');
    toggleBtn.addEventListener('click', () => {
      const type = passwordInput.type === 'password' ? 'text' : 'password';
      passwordInput.type = type;
      toggleBtn.querySelector('i').classList.toggle('fa-eye');
      toggleBtn.querySelector('i').classList.toggle('fa-eye-slash');
    });
  }

  // Show dashboard
  showDashboard() {
    document.getElementById('login-screen').classList.add('hidden');
    document.getElementById('dashboard-content').classList.remove('hidden');
    
    // Initialize dashboard (load data, etc.)
    if (window.initializeDashboard) {
      window.initializeDashboard();
    }
    
    // Add refresh button handler
    const refreshBtn = document.getElementById('refresh-btn');
    if (refreshBtn) {
      refreshBtn.addEventListener('click', async () => {
        // Add refreshing class for animation
        refreshBtn.classList.add('refreshing');
        refreshBtn.disabled = true;
        
        try {
          // Reload data from Google Sheets
          if (window.fetchAspirationsData) {
            await window.fetchAspirationsData();
          }
          
          // Update last refresh time
          this.updateLastRefreshTime();
          
          // Show success toast
          this.showToast('Data berhasil dimuat ulang!', 'success');
        } catch (error) {
          console.error('Refresh failed:', error);
          this.showToast('Gagal memuat data. Silakan coba lagi.', 'error');
        } finally {
          // Remove animation
          refreshBtn.classList.remove('refreshing');
          refreshBtn.disabled = false;
        }
      });
    }
    
    // Update last refresh time display
    this.updateLastRefreshTime();
  }
  
  // Update last refresh time display
  updateLastRefreshTime() {
    const timeDisplay = document.getElementById('last-refresh-time');
    if (timeDisplay) {
      const now = new Date();
      const timeString = now.toLocaleTimeString('id-ID', { 
        hour: '2-digit', 
        minute: '2-digit',
        second: '2-digit'
      });
      timeDisplay.textContent = timeString;
    }
  }
  
  // Simple toast notification
  showToast(message, type = 'info') {
    const toast = document.createElement('div');
    toast.className = `fixed top-4 right-4 px-6 py-3 rounded-lg shadow-lg text-white z-50 transition-opacity ${
      type === 'success' ? 'bg-green-500' : 
      type === 'error' ? 'bg-red-500' : 'bg-blue-500'
    }`;
    toast.innerHTML = `
      <div class="flex items-center gap-2">
        <i class="fas fa-${type === 'success' ? 'check-circle' : type === 'error' ? 'exclamation-circle' : 'info-circle'}"></i>
        <span>${message}</span>
      </div>
    `;
    document.body.appendChild(toast);
    
    setTimeout(() => {
      toast.style.opacity = '0';
      setTimeout(() => toast.remove(), 500);
    }, 3000);
  }
}

// Initialize auth when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
  new DashboardAuth();
});
```

---

## 📡 GOOGLE SHEETS INTEGRATION

### Setup Steps

#### 1. Google Form Configuration
- **Current Form URL**: `https://docs.google.com/forms/d/e/1FAIpQLSfWaCgBA-cNraUbTmOGjlmrZQ-99edYMdUSkbA-kQBtZm6QOw/viewform`
- **Form Fields**:
  - `entry.2116275708` - Nama Lengkap
  - `entry.175133211` - No. Telepon / Email
  - `entry.1266128475` - Subjek
  - `entry.1942425125` - Pesan Aspirasi

#### 2. Google Sheets Setup
1. Open the Google Form
2. Go to **Responses** tab
3. Click **Link to Sheets** (green icon)
4. Create a new spreadsheet or select existing one
5. Note the Spreadsheet ID from URL:
   ```
   https://docs.google.com/spreadsheets/d/SPREADSHEET_ID/edit
   ```

#### 3. Make Sheet Public (Read-Only)
1. Open the Google Sheet
2. Click **Share** button
3. Click **Change to anyone with the link**
4. Set permission to **Viewer**
5. Copy the link

#### 4. Get Spreadsheet ID
Extract from URL: `https://docs.google.com/spreadsheets/d/1ABC123XYZ.../edit`
- Spreadsheet ID: `1ABC123XYZ...`

#### 5. API Access (No API Key Method)
Use Google Sheets CSV export URL:
```
https://docs.google.com/spreadsheets/d/SPREADSHEET_ID/gviz/tq?tqx=out:json&sheet=SHEET_NAME
```

This returns data without requiring API key (works for public sheets).

### Data Fetching Implementation

#### 1. Configuration (config.js addition)
```javascript
// Add to js/config.js
const DASHBOARD_CONFIG = {
  SPREADSHEET_ID: '1QnXBFw9wDpe4tAy99ALbY04RUl1VY_DD491sC7LFXKM',
  SHEET_NAME: 'aspirasi', // Custom sheet name
  API_URL: '', // Will be constructed dynamically
  REFRESH_INTERVAL: 60000, // 1 minute in milliseconds
  MAX_RETRIES: 3,
  RETRY_DELAY: 2000, // 2 seconds
};

// Construct API URL
DASHBOARD_CONFIG.API_URL = `https://docs.google.com/spreadsheets/d/${DASHBOARD_CONFIG.SPREADSHEET_ID}/gviz/tq?tqx=out:json&sheet=${encodeURIComponent(DASHBOARD_CONFIG.SHEET_NAME)}`;
```

#### 2. Data Fetcher (dashboard/js/data-fetcher.js)
```javascript
// dashboard/js/data-fetcher.js

class GoogleSheetsDataFetcher {
  constructor(config) {
    this.config = config;
    this.cache = null;
    this.lastFetch = null;
    this.isLoading = false;
  }

  // Parse Google Sheets JSON response
  parseGoogleSheetsResponse(responseText) {
    // Google returns JSONP, need to extract JSON
    const jsonString = responseText.match(/google\.visualization\.Query\.setResponse\(([\s\S\w]+)\)/);
    if (!jsonString || !jsonString[1]) {
      throw new Error('Invalid response format from Google Sheets');
    }
    
    const data = JSON.parse(jsonString[1]);
    
    if (data.status === 'error') {
      throw new Error(data.errors[0].detailed_message || 'Error fetching data');
    }
    
    return this.transformData(data.table);
  }

  // Transform Google Sheets data to usable format
  transformData(table) {
    const rows = table.rows;
    const cols = table.cols;
    
    // Map column labels
    const headers = cols.map(col => col.label || col.id);
    
    // Transform rows to objects
    const data = rows.map(row => {
      const obj = {};
      row.c.forEach((cell, index) => {
        const header = headers[index];
        obj[header] = cell ? (cell.v || cell.f || '') : '';
      });
      return obj;
    });
    
    return {
      headers,
      data,
      lastUpdated: new Date().toISOString(),
    };
  }

  // Fetch data with retries
  async fetchData(attempt = 1) {
    this.isLoading = true;
    this.showLoadingState();
    
    try {
      const response = await fetch(this.config.API_URL, {
        method: 'GET',
        headers: {
          'Accept': 'text/javascript',
        },
      });
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const text = await response.text();
      const parsedData = this.parseGoogleSheetsResponse(text);
      
      // Cache the data
      this.cache = parsedData;
      this.lastFetch = Date.now();
      
      this.hideLoadingState();
      this.isLoading = false;
      
      return parsedData;
      
    } catch (error) {
      console.error(`Fetch attempt ${attempt} failed:`, error);
      
      // Retry logic
      if (attempt < this.config.MAX_RETRIES) {
        console.log(`Retrying in ${this.config.RETRY_DELAY / 1000} seconds...`);
        await new Promise(resolve => setTimeout(resolve, this.config.RETRY_DELAY));
        return this.fetchData(attempt + 1);
      }
      
      // All retries failed
      this.hideLoadingState();
      this.showErrorState(error.message);
      this.isLoading = false;
      
      // Return cached data if available
      if (this.cache) {
        console.warn('Using cached data due to fetch failure');
        return this.cache;
      }
      
      throw error;
    }
  }

  // Get data (from cache if recent)
  async getData(forceRefresh = false) {
    const now = Date.now();
    const cacheAge = this.lastFetch ? now - this.lastFetch : Infinity;
    
    // Use cache if fresh enough and not forcing refresh
    if (!forceRefresh && this.cache && cacheAge < this.config.REFRESH_INTERVAL) {
      return this.cache;
    }
    
    // Fetch new data
    return await this.fetchData();
  }

  // Show loading animation
  showLoadingState() {
    const loadingHTML = `
      <div id="loading-overlay" class="fixed inset-0 bg-gray-900 bg-opacity-50 flex items-center justify-center z-50">
        <div class="bg-white rounded-lg p-8 max-w-sm mx-4 text-center">
          <div class="mb-4">
            <div class="inline-block">
              <svg class="animate-spin h-12 w-12 text-blue-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
            </div>
          </div>
          <h3 class="text-lg font-semibold text-gray-800 mb-2">Memuat Data...</h3>
          <p class="text-gray-600 text-sm">Mengambil data aspirasi dari server</p>
          <div class="mt-4 flex justify-center">
            <div class="w-48 bg-gray-200 rounded-full h-1.5">
              <div class="bg-blue-600 h-1.5 rounded-full animate-pulse" style="width: 70%"></div>
            </div>
          </div>
        </div>
      </div>
    `;
    
    // Remove existing overlay if present
    this.hideLoadingState();
    
    // Add new overlay
    document.body.insertAdjacentHTML('beforeend', loadingHTML);
  }

  // Hide loading animation
  hideLoadingState() {
    const overlay = document.getElementById('loading-overlay');
    if (overlay) {
      overlay.remove();
    }
  }

  // Show error state
  showErrorState(message) {
    const errorHTML = `
      <div id="error-toast" class="fixed top-4 right-4 bg-red-100 border-l-4 border-red-500 text-red-700 p-4 rounded shadow-lg max-w-md z-50 animate-slide-in">
        <div class="flex items-start">
          <i class="fas fa-exclamation-triangle text-red-500 text-xl mr-3 mt-1"></i>
          <div class="flex-1">
            <h4 class="font-bold mb-1">Gagal Memuat Data</h4>
            <p class="text-sm">${message}</p>
            <button onclick="location.reload()" class="mt-2 text-sm font-semibold hover:underline">
              <i class="fas fa-redo mr-1"></i> Muat Ulang
            </button>
          </div>
          <button onclick="this.parentElement.parentElement.remove()" class="ml-4 text-red-500 hover:text-red-700">
            <i class="fas fa-times"></i>
          </button>
        </div>
      </div>
    `;
    
    document.body.insertAdjacentHTML('beforeend', errorHTML);
    
    // Auto-remove after 10 seconds
    setTimeout(() => {
      const toast = document.getElementById('error-toast');
      if (toast) toast.remove();
    }, 10000);
  }

  // Start auto-refresh
  startAutoRefresh(callback) {
    this.refreshInterval = setInterval(async () => {
      try {
        const data = await this.getData(true);
        if (callback) callback(data);
      } catch (error) {
        console.error('Auto-refresh failed:', error);
      }
    }, this.config.REFRESH_INTERVAL);
  }

  // Stop auto-refresh
  stopAutoRefresh() {
    if (this.refreshInterval) {
      clearInterval(this.refreshInterval);
    }
  }
}

// Export for use in other scripts
window.GoogleSheetsDataFetcher = GoogleSheetsDataFetcher;
```

---

## 🎨 LOADING ANIMATIONS

### 1. Skeleton Loaders (for initial page load)
```html
<!-- Add to dashboard HTML for cards -->
<div class="skeleton-loader animate-pulse">
  <div class="bg-gray-300 h-20 rounded-lg"></div>
</div>

<style>
@keyframes pulse {
  0%, 100% { opacity: 1; }
  50% { opacity: 0.5; }
}

.animate-pulse {
  animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
}

@keyframes slide-in {
  from {
    transform: translateX(100%);
    opacity: 0;
  }
  to {
    transform: translateX(0);
    opacity: 1;
  }
}

.animate-slide-in {
  animation: slide-in 0.3s ease-out;
}
</style>
```

### 2. Refresh Button Animation
```html
<button id="refresh-btn" class="btn-refresh" onclick="refreshDashboard()">
  <i class="fas fa-sync-alt"></i> Muat Ulang
</button>

<style>
.btn-refresh.loading i {
  animation: spin 1s linear infinite;
}

@keyframes spin {
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
}
</style>

<script>
async function refreshDashboard() {
  const btn = document.getElementById('refresh-btn');
  btn.classList.add('loading');
  btn.disabled = true;
  
  try {
    await dataFetcher.getData(true);
    await updateDashboard();
  } finally {
    btn.classList.remove('loading');
    btn.disabled = false;
  }
}
</script>
```

---

## 📋 DASHBOARD UPDATE LOGIC

### Main Dashboard Script (dashboard/js/dashboard.js)
```javascript
// dashboard/js/dashboard.js

let dataFetcher;
let currentData = null;

// Initialize dashboard
async function initializeDashboard() {
  // Create data fetcher instance
  dataFetcher = new GoogleSheetsDataFetcher(DASHBOARD_CONFIG);
  
  try {
    // Initial data fetch
    currentData = await dataFetcher.getData();
    
    // Render dashboard
    renderDashboard(currentData);
    
    // Start auto-refresh
    dataFetcher.startAutoRefresh((newData) => {
      currentData = newData;
      renderDashboard(newData);
      showUpdateNotification();
    });
    
    // Add refresh button handler
    document.getElementById('refresh-btn')?.addEventListener('click', async () => {
      await refreshDashboard();
    });
    
  } catch (error) {
    console.error('Failed to initialize dashboard:', error);
    showFallbackData();
  }
}

// Render dashboard with data
function renderDashboard(sheetsData) {
  const aspirations = transformAspirationsData(sheetsData.data);
  
  // Update statistics
  updateStatistics(aspirations);
  
  // Update charts
  updateCharts(aspirations);
  
  // Update table
  updateTable(aspirations);
  
  // Update last refresh time
  updateLastRefreshTime(sheetsData.lastUpdated);
}

// Transform Google Sheets data to aspirations format
function transformAspirationsData(rawData) {
  // Assuming columns: Timestamp, Name, Contact, Subject, Message
  return rawData.map((row, index) => ({
    id: index + 1,
    timestamp: row['Timestamp'] || row['Stempel Waktu'] || '',
    name: row['Nama Lengkap'] || '',
    contact: row['No. Telepon / Email'] || '',
    subject: row['Subjek'] || '',
    message: row['Pesan Aspirasi'] || '',
  }));
}

// Update statistics cards
function updateStatistics(aspirations) {
  // Total aspirasi
  document.getElementById('total-aspirasi').textContent = aspirations.length;
  
  // This week
  const oneWeekAgo = new Date();
  oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);
  const thisWeek = aspirations.filter(a => new Date(a.timestamp) > oneWeekAgo).length;
  document.getElementById('minggu-ini').textContent = thisWeek;
  
  // Today
  const today = new Date().toDateString();
  const todayCount = aspirations.filter(a => new Date(a.timestamp).toDateString() === today).length;
  document.getElementById('hari-ini').textContent = todayCount;
  
  // Most common subject
  const subjectCounts = {};
  aspirations.forEach(a => {
    subjectCounts[a.subject] = (subjectCounts[a.subject] || 0) + 1;
  });
  const mostCommon = Object.entries(subjectCounts).sort((a, b) => b[1] - a[1])[0];
  document.getElementById('topik-terpopuler').textContent = mostCommon ? mostCommon[0] : '-';
}

// Update charts (using Chart.js)
function updateCharts(aspirations) {
  // Subject distribution pie chart
  updateSubjectChart(aspirations);
  
  // Timeline line chart
  updateTimelineChart(aspirations);
}

// Show update notification
function showUpdateNotification() {
  const notification = document.createElement('div');
  notification.className = 'fixed bottom-4 right-4 bg-green-500 text-white px-6 py-3 rounded-lg shadow-lg animate-slide-in';
  notification.innerHTML = '<i class="fas fa-check-circle mr-2"></i> Data diperbarui';
  document.body.appendChild(notification);
  
  setTimeout(() => notification.remove(), 3000);
}

// Update last refresh time
function updateLastRefreshTime(timestamp) {
  const timeEl = document.getElementById('last-refresh-time');
  if (timeEl) {
    const date = new Date(timestamp);
    timeEl.textContent = date.toLocaleString('id-ID');
  }
}

// Fallback to hardcoded data if fetch fails
function showFallbackData() {
  console.warn('Using fallback data');
  // Use existing hardcodedData from data.js
  renderDashboard({
    data: window.hardcodedData || [],
    lastUpdated: new Date().toISOString(),
  });
}

// Make initializeDashboard global for auth.js to call
window.initializeDashboard = initializeDashboard;
```

---

## 📱 RESPONSIVE CHARTS CONFIGURATION

### Chart.js Responsive Settings

#### 1. Global Responsive Configuration
```javascript
// Add to dashboard/js/script.js or new dashboard/js/charts.js

// Global Chart.js defaults for responsive behavior
Chart.defaults.responsive = true;
Chart.defaults.maintainAspectRatio = false;

// Responsive configuration object
const RESPONSIVE_CHART_CONFIG = {
  responsive: true,
  maintainAspectRatio: false, // Allow custom height
  aspectRatio: 2, // Width/height ratio (only if maintainAspectRatio = true)
  
  // Animation for smooth resizing
  animation: {
    duration: 750,
    easing: 'easeInOutQuart',
    onProgress: null,
    onComplete: null,
  },
  
  // Layout padding for mobile
  layout: {
    padding: {
      left: 10,
      right: 10,
      top: 10,
      bottom: 10
    }
  },
  
  // Responsive plugins configuration
  plugins: {
    legend: {
      display: true,
      position: 'top',
      labels: {
        boxWidth: 15,
        padding: 10,
        font: {
          size: window.innerWidth < 768 ? 10 : 12 // Smaller on mobile
        }
      }
    },
    title: {
      display: true,
      font: {
        size: window.innerWidth < 768 ? 14 : 16
      },
      padding: {
        top: 10,
        bottom: 10
      }
    },
    tooltip: {
      enabled: true,
      mode: 'index',
      intersect: false,
      bodyFont: {
        size: window.innerWidth < 768 ? 11 : 13
      },
      titleFont: {
        size: window.innerWidth < 768 ? 12 : 14
      }
    }
  },
  
  // Responsive scales
  scales: {
    x: {
      ticks: {
        font: {
          size: window.innerWidth < 768 ? 9 : 11
        },
        maxRotation: window.innerWidth < 768 ? 45 : 0,
        minRotation: window.innerWidth < 768 ? 45 : 0
      },
      grid: {
        display: window.innerWidth >= 768 // Hide on mobile for clarity
      }
    },
    y: {
      ticks: {
        font: {
          size: window.innerWidth < 768 ? 9 : 11
        },
        precision: 0
      },
      grid: {
        display: true
      }
    }
  }
};
```

#### 2. HTML Container Structure for Responsive Charts
```html
<!-- Update dashboard/index.html chart containers -->

<!-- Chart Container Template -->
<div class="chart-wrapper w-full mb-6">
  <!-- Desktop: Two columns, Mobile: Single column -->
  <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
    
    <!-- Subject Distribution Chart -->
    <div class="bg-white rounded-lg shadow-lg p-6">
      <h3 class="text-lg font-semibold text-gray-800 mb-4">
        Distribusi per Subjek
      </h3>
      <!-- Chart container with responsive height -->
      <div class="chart-container relative" style="height: 300px;">
        <canvas id="subject-chart"></canvas>
      </div>
    </div>
    
    <!-- Timeline Chart -->
    <div class="bg-white rounded-lg shadow-lg p-6">
      <h3 class="text-lg font-semibold text-gray-800 mb-4">
        Timeline Aspirasi
      </h3>
      <!-- Chart container with responsive height -->
      <div class="chart-container relative" style="height: 300px;">
        <canvas id="timeline-chart"></canvas>
      </div>
    </div>
    
  </div>
  
  <!-- Full-width chart for mobile -->
  <div class="bg-white rounded-lg shadow-lg p-6 mt-6">
    <h3 class="text-lg font-semibold text-gray-800 mb-4">
      Tren Mingguan
    </h3>
    <!-- Responsive height based on screen size -->
    <div 
      class="chart-container relative" 
      style="height: 250px;"
      data-mobile-height="200px"
      data-desktop-height="350px"
    >
      <canvas id="weekly-trend-chart"></canvas>
    </div>
  </div>
</div>

<style>
/* Responsive chart containers */
.chart-container {
  position: relative;
  width: 100%;
}

/* Mobile-specific adjustments */
@media (max-width: 768px) {
  .chart-container {
    height: 250px !important;
  }
  
  .chart-wrapper .grid {
    grid-template-columns: 1fr;
  }
}

/* Tablet adjustments */
@media (min-width: 769px) and (max-width: 1024px) {
  .chart-container {
    height: 300px !important;
  }
}

/* Desktop */
@media (min-width: 1025px) {
  .chart-container {
    height: 350px !important;
  }
}
</style>
```

#### 3. Responsive Chart Creation Function
```javascript
// Add to dashboard/js/charts.js (NEW FILE)

// Utility: Create responsive chart with automatic resize
function createResponsiveChart(canvasId, type, data, customOptions = {}) {
  const canvas = document.getElementById(canvasId);
  if (!canvas) {
    console.error(`Canvas with id "${canvasId}" not found`);
    return null;
  }
  
  const ctx = canvas.getContext('2d');
  
  // Merge responsive config with custom options
  const options = {
    ...RESPONSIVE_CHART_CONFIG,
    ...customOptions,
    plugins: {
      ...RESPONSIVE_CHART_CONFIG.plugins,
      ...(customOptions.plugins || {})
    }
  };
  
  // Create chart
  const chart = new Chart(ctx, {
    type: type,
    data: data,
    options: options
  });
  
  // Handle window resize
  let resizeTimeout;
  window.addEventListener('resize', () => {
    clearTimeout(resizeTimeout);
    resizeTimeout = setTimeout(() => {
      updateChartResponsiveness(chart);
      chart.resize();
    }, 250); // Debounce 250ms
  });
  
  return chart;
}

// Update chart responsiveness based on screen size
function updateChartResponsiveness(chart) {
  const isMobile = window.innerWidth < 768;
  
  // Update font sizes
  if (chart.options.plugins.legend) {
    chart.options.plugins.legend.labels.font.size = isMobile ? 10 : 12;
  }
  
  if (chart.options.plugins.title) {
    chart.options.plugins.title.font.size = isMobile ? 14 : 16;
  }
  
  // Update tick rotation for mobile
  if (chart.options.scales?.x?.ticks) {
    chart.options.scales.x.ticks.maxRotation = isMobile ? 45 : 0;
    chart.options.scales.x.ticks.minRotation = isMobile ? 45 : 0;
    chart.options.scales.x.ticks.font.size = isMobile ? 9 : 11;
  }
  
  if (chart.options.scales?.y?.ticks) {
    chart.options.scales.y.ticks.font.size = isMobile ? 9 : 11;
  }
  
  // Hide grid on mobile for x-axis
  if (chart.options.scales?.x?.grid) {
    chart.options.scales.x.grid.display = !isMobile;
  }
  
  chart.update();
}

// Example: Create subject distribution pie chart
function createSubjectChart(aspirations) {
  const subjectCounts = {};
  aspirations.forEach(a => {
    subjectCounts[a.subject] = (subjectCounts[a.subject] || 0) + 1;
  });
  
  const data = {
    labels: Object.keys(subjectCounts),
    datasets: [{
      label: 'Jumlah Aspirasi',
      data: Object.values(subjectCounts),
      backgroundColor: [
        '#3B82F6', // blue
        '#10B981', // green
        '#F59E0B', // amber
        '#EF4444', // red
        '#8B5CF6', // purple
        '#EC4899', // pink
      ],
      borderWidth: 2,
      borderColor: '#ffffff'
    }]
  };
  
  const customOptions = {
    plugins: {
      title: {
        display: true,
        text: 'Distribusi Aspirasi per Subjek'
      },
      legend: {
        position: window.innerWidth < 768 ? 'bottom' : 'right'
      }
    }
  };
  
  return createResponsiveChart('subject-chart', 'doughnut', data, customOptions);
}

// Example: Create timeline line chart
function createTimelineChart(aspirations) {
  // Group by date
  const dateCounts = {};
  aspirations.forEach(a => {
    const date = new Date(a.timestamp).toLocaleDateString('id-ID');
    dateCounts[date] = (dateCounts[date] || 0) + 1;
  });
  
  const sortedDates = Object.keys(dateCounts).sort((a, b) => {
    return new Date(a.split('/').reverse().join('-')) - new Date(b.split('/').reverse().join('-'));
  });
  
  const data = {
    labels: sortedDates,
    datasets: [{
      label: 'Jumlah Aspirasi',
      data: sortedDates.map(date => dateCounts[date]),
      borderColor: '#3B82F6',
      backgroundColor: 'rgba(59, 130, 246, 0.1)',
      tension: 0.4,
      fill: true,
      pointRadius: 4,
      pointHoverRadius: 6
    }]
  };
  
  const customOptions = {
    plugins: {
      title: {
        display: true,
        text: 'Timeline Aspirasi Masyarakat'
      }
    },
    scales: {
      y: {
        beginAtZero: true,
        ticks: {
          stepSize: 1,
          precision: 0
        }
      }
    }
  };
  
  return createResponsiveChart('timeline-chart', 'line', data, customOptions);
}

// Export functions
window.createResponsiveChart = createResponsiveChart;
window.createSubjectChart = createSubjectChart;
window.createTimelineChart = createTimelineChart;
```

#### 4. Mobile-Specific Optimizations
```css
/* Add to dashboard/css/dashboard.css */

/* Chart responsiveness */
@media (max-width: 640px) {
  /* Reduce padding on mobile */
  .chart-wrapper .p-6 {
    padding: 1rem !important;
  }
  
  /* Stack statistics cards */
  .grid.grid-cols-4 {
    grid-template-columns: repeat(2, 1fr) !important;
  }
  
  /* Chart titles smaller */
  .chart-container + h3,
  .chart-wrapper h3 {
    font-size: 1rem !important;
  }
  
  /* Reduce chart canvas padding */
  canvas {
    max-height: 250px;
  }
}

@media (min-width: 641px) and (max-width: 1024px) {
  /* Tablet: 2 columns */
  .grid.grid-cols-4 {
    grid-template-columns: repeat(2, 1fr) !important;
  }
  
  canvas {
    max-height: 300px;
  }
}

/* Ensure charts don't overflow */
.chart-container canvas {
  max-width: 100%;
  height: auto !important;
}

/* Loading skeleton for charts */
.chart-skeleton {
  background: linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%);
  background-size: 200% 100%;
  animation: loading 1.5s infinite;
  border-radius: 8px;
  height: 300px;
}

@keyframes loading {
  0% { background-position: 200% 0; }
  100% { background-position: -200% 0; }
}
```

#### 5. Touch Events for Mobile
```javascript
// Add to dashboard/js/charts.js

// Enable touch events for better mobile interaction
Chart.defaults.interaction = {
  mode: 'nearest',
  intersect: false,
  axis: 'x'
};

// Custom touch handler for charts
function enableTouchInteraction(chart) {
  const canvas = chart.canvas;
  let touchStartX = 0;
  let touchEndX = 0;
  
  canvas.addEventListener('touchstart', (e) => {
    touchStartX = e.changedTouches[0].screenX;
  }, { passive: true });
  
  canvas.addEventListener('touchend', (e) => {
    touchEndX = e.changedTouches[0].screenX;
    handleSwipe(chart, touchStartX, touchEndX);
  }, { passive: true });
}

function handleSwipe(chart, startX, endX) {
  const swipeThreshold = 50;
  const diff = startX - endX;
  
  if (Math.abs(diff) > swipeThreshold) {
    // Swipe detected - could add pagination for data
    console.log(diff > 0 ? 'Swiped left' : 'Swiped right');
  }
}
```

---

## 🗂️ FILE STRUCTURE

```
dashboard/
├── index.html              # Main dashboard HTML (with login embedded)
├── js/
│   ├── auth.js            # Authentication logic (NEW)
│   ├── data-fetcher.js    # Google Sheets data fetcher (NEW)
│   ├── dashboard.js       # Dashboard rendering logic (MODIFIED)
│   ├── charts.js          # Responsive chart creation (NEW)
│   ├── data.js            # Fallback hardcoded data (KEEP for offline)
│   └── script.js          # Chart rendering (EXISTING - will be merged with charts.js)
├── css/
│   └── dashboard.css      # Additional dashboard styles (NEW)
└── README.md              # Dashboard documentation (NEW)
```

---

## 🔧 MANUAL INTERVENTION REQUIRED

### ⚠️ Critical Steps You MUST Do Manually

Before implementation, these steps **CANNOT** be automated and require your direct action:

---

#### 1. ✋ **Link Google Form to Spreadsheet**

**Why**: The form needs to save responses to a Google Sheet for the dashboard to read.

**Steps**:
1. Open your Google Form: 
   ```
   https://docs.google.com/forms/d/e/1FAIpQLSfWaCgBA-cNraUbTmOGjlmrZQ-99edYMdUSkbA-kQBtZm6QOw/edit
   ```
2. Click **"Responses"** tab at the top
3. Click the green **Google Sheets icon** (📊)
4. Select **"Create a new spreadsheet"** or use existing
5. Name it: `Aspirasi Masyarakat Responses`
6. Click **"Create"**
7. **Important**: Copy the Spreadsheet ID from the URL (already configured: `1QnXBFw9wDpe4tAy99ALbY04RUl1VY_DD491sC7LFXKM`)

**Verify**: 
- Open the spreadsheet
- Submit a test form response
- Check if it appears in the spreadsheet (should be instant)

---

#### 2. ✋ **Make Spreadsheet Public (Read-Only)**

**Why**: Dashboard needs to read data without authentication.

**Steps**:
1. Open the spreadsheet: 
   ```
   https://docs.google.com/spreadsheets/d/1QnXBFw9wDpe4tAy99ALbY04RUl1VY_DD491sC7LFXKM/edit
   ```
2. Click **"Share"** button (top-right)
3. Click **"Change to anyone with the link"**
4. Set permission to **"Viewer"** (NOT Editor!)
5. Click **"Done"**
6. **IMPORTANT**: Rename the sheet tab to **"aspirasi"** (bottom-left tab name)
   - Right-click on sheet tab
   - Select "Rename"
   - Type: `aspirasi`
   - Press Enter

**Verify**: 
- Open incognito window
- Paste this URL:
  ```
  https://docs.google.com/spreadsheets/d/1QnXBFw9wDpe4tAy99ALbY04RUl1VY_DD491sC7LFXKM/gviz/tq?tqx=out:json&sheet=aspirasi
  ```
- You should see JSON data (starts with `google.visualization.Query.setResponse`)
- If you see "access denied", repeat steps above

---

#### 3. ✋ **Verify Form Field Names Match**

**Why**: Dashboard expects specific column names from Google Sheets.

**Expected Columns** (from Google Form):
```
Column A: Timestamp (auto-generated)
Column B: Nama Lengkap (entry.2116275708)
Column C: No. Telepon / Email (entry.175133211)
Column D: Subjek (entry.1266128475)
Column E: Pesan Aspirasi (entry.1942425125)
```

**Steps**:
1. Open the linked spreadsheet
2. Check the **header row** (row 1)
3. Verify column names match above
4. If different, you MUST update `transformAspirationsData()` in `dashboard.js`:
   ```javascript
   // Update these to match your actual column names
   timestamp: row['Timestamp'] || row['Stempel Waktu'] || '',
   name: row['Nama Lengkap'] || '',
   contact: row['No. Telepon / Email'] || '',
   subject: row['Subjek'] || '',
   message: row['Pesan Aspirasi'] || '',
   ```

**Verify**: 
- Submit test form
- Check spreadsheet columns
- Note any differences

---

#### 4. ✋ **Update config.js with Actual Values**

**Why**: Configuration must point to your real spreadsheet.

**File**: `js/config.js`

**Add this section** (after existing SITE_CONFIG):
```javascript
// Dashboard Configuration
const DASHBOARD_CONFIG = {
  SPREADSHEET_ID: '1QnXBFw9wDpe4tAy99ALbY04RUl1VY_DD491sC7LFXKM',
  SHEET_NAME: 'aspirasi', // ✅ CONFIGURED - must match sheet tab name
  API_URL: '',
  REFRESH_INTERVAL: 60000, // 1 minute
  MAX_RETRIES: 3,
  RETRY_DELAY: 2000,
};

// Construct API URL
DASHBOARD_CONFIG.API_URL = `https://docs.google.com/spreadsheets/d/${DASHBOARD_CONFIG.SPREADSHEET_ID}/gviz/tq?tqx=out:json&sheet=${encodeURIComponent(DASHBOARD_CONFIG.SHEET_NAME)}`;
```

**✅ CONFIGURED**: Sheet name is set to `aspirasi`
- Make sure your spreadsheet tab is named exactly **"aspirasi"** (see Step 2)
- Case-sensitive!

---

#### 5. ✋ **Update auth.js with Password Hash**

**Why**: Password must be encrypted for security.

**File**: `dashboard/js/auth.js`

**Find this line**:
```javascript
PASSWORD_HASH: 'df639246eff9e232a0d366efbf55739b5c93550c1173b043a49ea84620db249d',
```

**If you want to change the password**:
1. Open browser console (F12)
2. Run this code:
   ```javascript
   const password = 'YOUR_NEW_PASSWORD';
   crypto.subtle.digest('SHA-256', new TextEncoder().encode(password))
     .then(hash => console.log(
       Array.from(new Uint8Array(hash))
         .map(b => b.toString(16).padStart(2, '0'))
         .join('')
     ));
   ```
3. Copy the output
4. Replace the `PASSWORD_HASH` value

**Current password**: `kknbedalo117`  
**Current hash**: `df639246eff9e232a0d366efbf55739b5c93550c1173b043a49ea84620db249d`

---

#### 6. ✋ **Remove Navbar Login/Signup Button & Add Refresh Button**

**Why**: Dashboard uses simple password auth, no logout button needed (auto-expires after 24h).

**File**: `dashboard/index.html`

**Find and DELETE this section** (around line 51-58):
```html
<div id="netlify-identity-button">
  <button
    disabled
    title="Fitur login dinonaktifkan dalam versi statis ini"
    class="cursor-not-allowed rounded-md bg-blue-600 px-4 py-2 text-white opacity-50 transition duration-300 hover:bg-blue-700"
  >
    Login/Signup (Dinonaktifkan)
  </button>
</div>
```

**Replace with**:
```html
<div class="flex items-center space-x-3">
  <!-- Last Refresh Time -->
  <span class="text-sm text-gray-600 hidden sm:flex items-center" id="last-refresh-display">
    <i class="fas fa-clock mr-1"></i>
    <span id="last-refresh-time">-</span>
  </span>
  
  <!-- Refresh Button -->
  <button
    id="refresh-btn"
    class="flex items-center gap-2 rounded-md bg-blue-600 px-4 py-2 text-white transition duration-300 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
    title="Muat ulang data"
  >
    <i class="fas fa-sync-alt" id="refresh-icon"></i>
    <span class="hidden sm:inline">Refresh</span>
  </button>
  
  <!-- Session Expiry Info (tooltip) -->
  <div class="relative group">
    <i class="fas fa-info-circle text-gray-500 cursor-help"></i>
    <div class="hidden group-hover:block absolute right-0 top-full mt-2 w-64 p-3 bg-gray-800 text-white text-xs rounded-lg shadow-lg z-50">
      Sesi aktif selama 24 jam sejak login. Tidak perlu logout manual.
    </div>
  </div>
</div>

<style>
  /* Refresh button animation */
  #refresh-btn:active #refresh-icon,
  #refresh-btn.refreshing #refresh-icon {
    animation: spin 1s linear infinite;
  }
  
  @keyframes spin {
    from { transform: rotate(0deg); }
    to { transform: rotate(360deg); }
  }
</style>
```

**Key Changes:**
- ✅ Only refresh button (no logout button)
- ✅ Session info tooltip (24-hour notice)
- ✅ Responsive (icon-only on mobile)
- ✅ Spin animation on refresh
- ✅ Last refresh time display

---

#### 7. ✋ **Add Refresh Button Functionality**

**Why**: Users need manual data reload capability.

**File**: `dashboard/js/auth.js`

**Add this to the DashboardAuth class** (inside showDashboard method):
```javascript
showDashboard() {
  document.getElementById('login-screen').classList.add('hidden');
  document.getElementById('dashboard-content').classList.remove('hidden');
  
  // Initialize dashboard
  if (window.initializeDashboard) {
    window.initializeDashboard();
  }
  
  // Add refresh button handler
  const refreshBtn = document.getElementById('refresh-btn');
  if (refreshBtn) {
    refreshBtn.addEventListener('click', async () => {
      // Add refreshing class for animation
      refreshBtn.classList.add('refreshing');
      refreshBtn.disabled = true;
      
      try {
        // Reload data from Google Sheets
        if (window.fetchAspirationsData) {
          await window.fetchAspirationsData();
        }
        
        // Update last refresh time
        updateLastRefreshTime();
        
        // Show success toast (optional)
        showToast('Data berhasil dimuat ulang!', 'success');
      } catch (error) {
        console.error('Refresh failed:', error);
        showToast('Gagal memuat data. Silakan coba lagi.', 'error');
      } finally {
        // Remove animation
        refreshBtn.classList.remove('refreshing');
        refreshBtn.disabled = false;
      }
    });
  }
  
  // Update last refresh time display
  updateLastRefreshTime();
}

// Helper function to update last refresh time
function updateLastRefreshTime() {
  const timeDisplay = document.getElementById('last-refresh-time');
  if (timeDisplay) {
    const now = new Date();
    const timeString = now.toLocaleTimeString('id-ID', { 
      hour: '2-digit', 
      minute: '2-digit' 
    });
    timeDisplay.textContent = timeString;
  }
}

// Simple toast notification
function showToast(message, type = 'info') {
  const toast = document.createElement('div');
  toast.className = `fixed top-4 right-4 px-6 py-3 rounded-lg shadow-lg text-white z-50 ${
    type === 'success' ? 'bg-green-500' : 
    type === 'error' ? 'bg-red-500' : 'bg-blue-500'
  }`;
  toast.textContent = message;
  document.body.appendChild(toast);
  
  setTimeout(() => {
    toast.style.opacity = '0';
    toast.style.transition = 'opacity 0.5s';
    setTimeout(() => toast.remove(), 500);
  }, 3000);
}
```

**No Logout Button:**
- Session expires automatically after 24 hours
- User doesn't need manual logout
- Simpler UX - just close the browser

---

#### 8. ✋ **Test Data Fetch Manually**

**Why**: Verify everything works before going live.

**Steps**:
1. Open browser console (F12)
2. Paste this code:
   ```javascript
   fetch('https://docs.google.com/spreadsheets/d/1QnXBFw9wDpe4tAy99ALbY04RUl1VY_DD491sC7LFXKM/gviz/tq?tqx=out:json&sheet=aspirasi')
     .then(res => res.text())
     .then(text => {
       console.log('✅ Data fetched successfully!');
       console.log('First 200 chars:', text.substring(0, 200));
       
       // Parse
       const jsonString = text.match(/google\.visualization\.Query\.setResponse\(([\s\S\w]+)\)/);
       if (jsonString) {
         const data = JSON.parse(jsonString[1]);
         console.log('✅ Parsed successfully!');
         console.log('Rows:', data.table.rows.length);
         console.log('Columns:', data.table.cols.map(c => c.label));
       }
     })
     .catch(err => {
       console.error('❌ Fetch failed:', err);
       console.log('Check: Is spreadsheet public? Is ID correct?');
     });
   ```
3. Check console output
4. You should see "✅ Data fetched successfully!"
5. If error, check spreadsheet sharing settings

---

#### 9. ✋ **Create Necessary Files**

**Why**: New files need to be created manually.

**Files to create**:

**A. `dashboard/js/auth.js`**
- Copy code from section "Authentication JavaScript (auth.js)" in this document
- Paste into new file
- Save as `dashboard/js/auth.js`

**B. `dashboard/js/data-fetcher.js`**
- Copy code from section "Data Fetcher (dashboard/js/data-fetcher.js)"
- Paste into new file
- Save as `dashboard/js/data-fetcher.js`

**C. `dashboard/js/charts.js`**
- Copy code from section "Responsive Chart Creation Function"
- Paste into new file
- Save as `dashboard/js/charts.js`

**D. `dashboard/css/dashboard.css`**
- Copy code from section "Mobile-Specific Optimizations"
- Paste into new file
- Save as `dashboard/css/dashboard.css`

---

#### 10. ✋ **Update HTML Script Loading Order**

**Why**: Scripts must load in correct order to avoid errors.

**File**: `dashboard/index.html`

**Find the script section at the bottom** (before `</body>`).

**Replace with**:
```html
<!-- Chart.js -->
<script src="https://cdn.jsdelivr.net/npm/chart.js@4.4.7/dist/chart.umd.min.js"></script>
<script src="https://cdn.jsdelivr.net/npm/chartjs-adapter-date-fns@3/dist/chartjs-adapter-date-fns.bundle.min.js"></script>

<!-- Site Configuration (MUST BE FIRST) -->
<script src="../js/config.js"></script>

<!-- Dashboard Scripts -->
<script src="js/data.js"></script> <!-- Fallback data -->
<script src="js/auth.js"></script> <!-- Authentication -->
<script src="js/data-fetcher.js"></script> <!-- API fetcher -->
<script src="js/charts.js"></script> <!-- Chart creation -->
<script src="js/dashboard.js"></script> <!-- Main logic -->
<script src="js/script.js"></script> <!-- Existing chart code - can be merged -->
```

**⚠️ Order is critical!**:
1. config.js → Defines DASHBOARD_CONFIG
2. data.js → Fallback data
3. auth.js → Checks authentication first
4. data-fetcher.js → API functionality
5. charts.js → Chart utilities
6. dashboard.js → Initializes everything
7. script.js → Existing code

---

#### 11. ✋ **Add Login Screen HTML**

**Why**: Need UI for password entry.

**File**: `dashboard/index.html`

**Find** `<body>` tag and **add this AFTER the opening tag**:

```html
<body class="min-h-screen bg-gray-100">
  
  <!-- Login Screen (ADD THIS) -->
  <div id="login-screen" class="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-blue-100">
    <div class="max-w-md w-full bg-white rounded-lg shadow-xl p-8 m-4">
      <div class="text-center mb-6">
        <i class="fas fa-lock text-5xl text-blue-600 mb-3"></i>
        <h2 class="text-2xl font-bold text-gray-800">Dashboard Aspirasi</h2>
        <p class="text-gray-600 mt-2">Masukkan password untuk mengakses</p>
      </div>
      
      <form id="login-form" class="space-y-4">
        <div>
          <label for="password" class="block text-sm font-medium text-gray-700 mb-2">
            Password
          </label>
          <div class="relative">
            <input
              type="password"
              id="password"
              name="password"
              placeholder="Masukkan password"
              class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              required
              autocomplete="off"
            />
            <button
              type="button"
              id="toggle-password"
              class="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
              aria-label="Toggle password visibility"
            >
              <i class="fas fa-eye"></i>
            </button>
          </div>
        </div>
        
        <div id="login-error" class="hidden text-red-600 text-sm bg-red-50 p-3 rounded">
          <i class="fas fa-exclamation-circle mr-2"></i>
          <span>Password salah. Silakan coba lagi.</span>
        </div>
        
        <button
          type="submit"
          id="login-button"
          class="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition duration-200 flex items-center justify-center"
        >
          <span>Masuk Dashboard</span>
        </button>
      </form>
      
      <div class="mt-6 text-center text-sm text-gray-500">
        <i class="fas fa-info-circle mr-1"></i>
        Hubungi admin jika lupa password
      </div>
    </div>
  </div>
  
  <!-- Dashboard Content (wrap existing content) -->
  <div id="dashboard-content" class="hidden">
    <!-- EXISTING DASHBOARD HTML HERE -->
    <!-- Move all existing <header>, <main>, <footer> inside this div -->
  </div>

  <!-- Scripts at bottom -->
  ...
</body>
```

**Action**: Wrap all existing dashboard content inside `<div id="dashboard-content" class="hidden">`.

---

#### 12. ✋ **Test on Localhost First**

**Why**: Catch errors before deployment.

**Steps**:
1. Install a local server:
   ```bash
   npm install -g http-server
   # or
   python -m http.server 8000
   ```

2. Run server:
   ```bash
   # In project root
   http-server -p 8080
   # or
   python -m http.server 8080
   ```

3. Open browser:
   ```
   http://localhost:8080/dashboard/
   ```

4. Test checklist:
   - [ ] Login screen appears
   - [ ] Can toggle password visibility
   - [ ] Wrong password shows error
   - [ ] Correct password (`kknbedalo117`) logs in
   - [ ] Loading spinner appears
   - [ ] Data loads from Google Sheets (sheet: aspirasi)
   - [ ] Charts render
   - [ ] Statistics update
   - [ ] Refresh button works and shows animation
   - [ ] Last refresh time updates
   - [ ] Session persists on page refresh
   - [ ] Session expires after 24 hours (test by changing timestamp)
   - [ ] Responsive on mobile (use DevTools)
   - [ ] Info tooltip shows 24h session message

---

### ✅ Manual Intervention Checklist

Before proceeding to implementation, verify:

- [ ] Google Form linked to spreadsheet
- [ ] Spreadsheet ID: `1QnXBFw9wDpe4tAy99ALbY04RUl1VY_DD491sC7LFXKM`
- [ ] Sheet name: `aspirasi` (renamed bottom-left tab)
- [ ] Spreadsheet is public (Viewer access)
- [ ] API URL tested in browser (returns JSON with sheet=aspirasi)
- [ ] Column names verified and match code
- [ ] `config.js` updated with DASHBOARD_CONFIG (SHEET_NAME: 'aspirasi')
- [ ] `auth.js` has correct PASSWORD_HASH
- [ ] `auth.js` SESSION_DURATION set to 24 hours
- [ ] Navbar login button removed
- [ ] Refresh button added (with spin animation)
- [ ] No logout button (auto-expire only)
- [ ] Session info tooltip added
- [ ] All 4 new files created (auth.js, data-fetcher.js, charts.js, dashboard.css)
- [ ] HTML script order updated
- [ ] Login screen HTML added
- [ ] Existing content wrapped in `dashboard-content` div
- [ ] Tested on localhost
- [ ] Mobile responsive verified (DevTools)
- [ ] Form submission tested (appears in dashboard)
- [ ] Refresh button tested (spins and reloads data)

**⚠️ DO NOT SKIP ANY STEPS!** Each one is critical for the dashboard to work.

---

## ✅ IMPLEMENTATION CHECKLIST

### Phase 1: Pre-Implementation (Do First)

**⚠️ IMPORTANT**: Complete ALL items in **"🔧 MANUAL INTERVENTION REQUIRED"** section above first!

Quick reference (see detailed steps above):
- [ ] **Link Google Form to Spreadsheet** (Step 1)
- [ ] **Make spreadsheet public** (Step 2)
- [ ] **Verify form field names** (Step 3)
- [ ] **Test data fetch manually** (Step 8)

### Phase 2: File Creation

**See Manual Intervention Steps 4, 9, 10, 11** for detailed instructions.

- [ ] **Create dashboard/js/auth.js** (Step 9A)
- [ ] **Create dashboard/js/data-fetcher.js** (Step 9B)
- [ ] **Create dashboard/js/charts.js** (Step 9C)
- [ ] **Create dashboard/css/dashboard.css** (Step 9D)
- [ ] **Update js/config.js** with DASHBOARD_CONFIG (Step 4)
- [ ] **Update dashboard/index.html** - add login screen (Step 11)

### Phase 3: Code Integration

**See Manual Intervention Steps 6, 7, 10** for detailed instructions.

- [ ] **Remove navbar login button** (Step 6)
- [ ] **Add logout functionality** (Step 7)
- [ ] **Update script loading order** (Step 10)
- [ ] **Wrap existing content in dashboard-content div** (Step 11)
- [ ] **Update dashboard.js** - integrate API calls
- [ ] **Update charts.js** - use responsive chart functions

### Phase 4: Testing
- [ ] **Test authentication**
  - [ ] Correct password allows access
  - [ ] Wrong password shows error
  - [ ] Session persists on page refresh
  - [ ] Session expires after 30 minutes
  - [ ] Toggle password visibility works

- [ ] **Test data fetching**
  - [ ] Data loads from Google Sheets
  - [ ] Loading animation displays
  - [ ] Error handling works (test with invalid URL)
  - [ ] Fallback to hardcoded data works
  - [ ] Auto-refresh updates dashboard

- [ ] **Test dashboard functionality**
  - [ ] All statistics update correctly
  - [ ] Charts render with real data
  - [ ] Table shows all entries
  - [ ] Refresh button works
  - [ ] Last updated time displays

- [ ] **Test responsiveness**
  - [ ] Login screen responsive on mobile
  - [ ] Dashboard responsive on mobile
  - [ ] Charts resize properly
  - [ ] Table scrollable on mobile

### Phase 5: Final Checks
- [ ] **Security review**
  - [ ] Password hash is correct
  - [ ] No password exposed in code
  - [ ] HTTPS only (Cloudflare Pages)
  - [ ] Session storage (not localStorage for sensitive)

- [ ] **Performance check**
  - [ ] Loading animations smooth
  - [ ] Data fetches within 3 seconds
  - [ ] No console errors
  - [ ] Charts render quickly

- [ ] **User experience**
  - [ ] Error messages clear and helpful
  - [ ] Success feedback visible
  - [ ] Navigation intuitive
  - [ ] Back to homepage link works

---

## 🔍 TROUBLESHOOTING GUIDE

### Problem: "Failed to fetch data"
**Solutions**:
1. Check if spreadsheet is publicly viewable
2. Verify SPREADSHEET_ID is correct
3. Check SHEET_NAME matches actual sheet name
4. Test URL directly in browser:
   ```
   https://docs.google.com/spreadsheets/d/SPREADSHEET_ID/gviz/tq?tqx=out:json
   ```
5. Check browser console for CORS errors

### Problem: "Password always fails"
**Solutions**:
1. Verify password hash is correct
2. Check for typos in password
3. Test hash generation:
   ```javascript
   // In browser console
   hashPassword('kknbedalo117').then(console.log)
   ```
4. Ensure AUTH_CONFIG.PASSWORD_HASH matches

### Problem: "Session expires immediately"
**Solutions**:
1. Check browser allows sessionStorage
2. Verify SESSION_DURATION is in milliseconds
3. Check for sessionStorage.clear() calls
4. Test in incognito mode (no extensions)

### Problem: "Charts don't update"
**Solutions**:
1. Check data structure matches expected format
2. Verify Chart.js is loaded
3. Check `transformAspirationsData()` returns correct format
4. Look for JavaScript errors in console

### Problem: "Loading animation stuck"
**Solutions**:
1. Check for JavaScript errors
2. Verify `hideLoadingState()` is called
3. Add timeout to force hide after 30 seconds
4. Check if Promise is rejected properly

---

## 📊 DATA STRUCTURE

### Google Sheets Format
```
| Timestamp          | Nama Lengkap | No. Telepon / Email | Subjek           | Pesan Aspirasi        |
|--------------------|--------------|---------------------|------------------|-----------------------|
| 10/24/2024 9:15:30 | Budi Santoso | 081234567890        | Perbaikan Jalan  | Jalan perlu diperbaiki|
| 10/24/2024 10:30:00| Ani Wijaya   | ani@email.com       | Fasilitas Umum   | Tambah tempat sampah  |
```

### Transformed Format (JavaScript)
```javascript
{
  id: 1,
  timestamp: "2024-10-24T09:15:30",
  name: "Budi Santoso",
  contact: "081234567890",
  subject: "Perbaikan Jalan",
  message: "Jalan perlu diperbaiki"
}
```

---

## 🚀 DEPLOYMENT

### Steps
1. **Commit all changes** to git
2. **Push to GitHub** on speckit branch
3. **Cloudflare Pages** will auto-deploy
4. **Test production** URL
5. **Share password** with authorized users only

### Environment Variables (Optional Future Enhancement)
If moving to backend:
```
SPREADSHEET_ID=your_spreadsheet_id
PASSWORD_HASH=your_password_hash
API_KEY=your_google_api_key (if needed)
```

---

## 📝 DOCUMENTATION TO CREATE

### 1. Dashboard README.md
```markdown
# Dashboard Aspirasi Masyarakat

## Access
- URL: https://bedalo.pages.dev/dashboard/
- Password: [Ask administrator]

## Features
- Real-time data from Google Forms
- Auto-refresh every 1 minute
- Statistics and charts
- Responsive design

## Support
Contact: [Your contact info]
```

### 2. Admin Guide
- How to access dashboard
- How to interpret data
- How to export data (from Google Sheets)
- How to change password (requires code update)

---

## 🔐 SECURITY NOTES

### Important
1. **Never commit actual password** to git
2. **Use HTTPS only** (Cloudflare provides SSL)
3. **Share password securely** (encrypted messaging, in-person)
4. **Change password periodically** (regenerate hash)
5. **Monitor access** (check Google Sheets activity)

### Password Change Process
1. Generate new hash (see checklist)
2. Update AUTH_CONFIG.PASSWORD_HASH
3. Commit and deploy
4. Notify authorized users

---

## 📈 FUTURE ENHANCEMENTS

### Phase 2 (After Basic Implementation)
- [ ] Export to CSV/Excel
- [ ] Search and filter aspirations
- [ ] Respond to aspirations (status updates)
- [ ] Email notifications for new submissions
- [ ] Multi-user support with different roles

### Phase 3 (Advanced)
- [ ] Move to backend API (Node.js/PHP)
- [ ] Database integration (MySQL/PostgreSQL)
- [ ] Admin panel for user management
- [ ] Analytics dashboard
- [ ] Mobile app

---

## ✅ FINAL VALIDATION

Before going live, ensure:
- ✅ Authentication works correctly
- ✅ Data fetches from Google Sheets
- ✅ Loading animations smooth
- ✅ No console errors
- ✅ Responsive on all devices
- ✅ Fallback data works offline
- ✅ Session timeout works
- ✅ Password cannot be found in code
- ✅ All links work correctly
- ✅ Charts render properly

---

## 🎯 SUCCESS CRITERIA

The dashboard implementation is successful when:
1. ✅ Users can login with password `kknbedalo117`
2. ✅ Dashboard displays real aspirasi data from Google Forms
3. ✅ Data updates automatically every minute
4. ✅ Loading animations show during data fetch
5. ✅ Works on mobile and desktop
6. ✅ No login/signup buttons visible
7. ✅ Session persists for 30 minutes
8. ✅ Graceful error handling when offline

---

<div align="center">

**🎉 Dashboard Ready for Implementation!**

Follow the checklist step-by-step for successful deployment.

*Document Version: 1.0*  
*Last Updated: October 24, 2024*

</div>
