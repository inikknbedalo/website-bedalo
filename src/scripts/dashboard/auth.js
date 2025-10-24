// Ultra-simple authentication - no classes, no complexity
(function() {
  'use strict';
  
  const PASSWORD_HASH = 'df639246eff9e232a0d366efbf55739b5c93550c1173b043a49ea84620db249d';
  const SESSION_KEY = 'dashboard_auth';
  
  // Hash password
  async function hashPassword(password) {
    const encoder = new TextEncoder();
    const data = encoder.encode(password);
    const hash = await crypto.subtle.digest('SHA-256', data);
    const hashArray = Array.from(new Uint8Array(hash));
    return hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
  }
  
  // Check if logged in
  function isLoggedIn() {
    return sessionStorage.getItem(SESSION_KEY) === 'true';
  }
  
  // Show/hide elements
  function showDashboard() {
    console.log('Showing dashboard...');
    const loginScreen = document.getElementById('login-screen');
    const dashboardContent = document.getElementById('dashboard-content');
    
    if (loginScreen) loginScreen.style.display = 'none';
    if (dashboardContent) dashboardContent.style.display = 'block';
    
    // Initialize dashboard
    if (typeof window.initializeDashboard === 'function') {
      window.initializeDashboard();
    }
    
    console.log('Dashboard shown');
  }
  
  function showLogin() {
    console.log('Showing login...');
    const loginScreen = document.getElementById('login-screen');
    const dashboardContent = document.getElementById('dashboard-content');
    
    if (loginScreen) loginScreen.style.display = 'flex';
    if (dashboardContent) dashboardContent.style.display = 'none';
    
    console.log('Login shown');
  }
  
  // Handle login
  async function handleLogin(e) {
    if (e) e.preventDefault();
    
    console.log('Login attempt...');
    
    const passwordInput = document.getElementById('password');
    const loginButton = document.getElementById('login-button');
    const errorDiv = document.getElementById('login-error');
    
    if (!passwordInput) {
      console.error('Password input not found');
      return;
    }
    
    const password = passwordInput.value.trim();
    
    // Show loading
    if (loginButton) {
      loginButton.disabled = true;
      loginButton.textContent = 'Memverifikasi...';
    }
    if (errorDiv) errorDiv.classList.add('hidden');
    
    try {
      // Verify password
      const hash = await hashPassword(password);
      console.log('Hash generated, checking...');
      
      if (hash === PASSWORD_HASH) {
        console.log('✓ Password correct!');
        
        // Save session
        sessionStorage.setItem(SESSION_KEY, 'true');
        
        // Clear input
        passwordInput.value = '';
        
        // Show success
        if (loginButton) {
          loginButton.textContent = 'Berhasil!';
          loginButton.style.backgroundColor = '#10b981';
        }
        
        // Show dashboard after short delay
        setTimeout(() => {
          showDashboard();
        }, 500);
        
      } else {
        console.log('✗ Password incorrect');
        
        if (errorDiv) {
          errorDiv.textContent = 'Password salah';
          errorDiv.classList.remove('hidden');
        }
        if (loginButton) {
          loginButton.disabled = false;
          loginButton.textContent = 'Login';
        }
      }
    } catch (error) {
      console.error('Login error:', error);
      if (errorDiv) {
        errorDiv.textContent = 'Error: ' + error.message;
        errorDiv.classList.remove('hidden');
      }
      if (loginButton) {
        loginButton.disabled = false;
        loginButton.textContent = 'Login';
      }
    }
  }
  
  // Initialize on page load
  function init() {
    console.log('Auth init...');
    
    // Check if already logged in
    if (isLoggedIn()) {
      console.log('Already logged in');
      showDashboard();
    } else {
      console.log('Not logged in');
      showLogin();
    }
    
    // Setup login form
    const loginForm = document.getElementById('login-form');
    const loginButton = document.getElementById('login-button');
    const toggleBtn = document.getElementById('toggle-password');
    const passwordInput = document.getElementById('password');
    
    if (loginForm) {
      loginForm.addEventListener('submit', handleLogin);
      console.log('Form listener added');
    }
    
    if (loginButton) {
      loginButton.addEventListener('click', handleLogin);
      console.log('Button listener added');
    }
    
    // Toggle password visibility
    if (toggleBtn && passwordInput) {
      toggleBtn.addEventListener('click', () => {
        passwordInput.type = passwordInput.type === 'password' ? 'text' : 'password';
        const icon = toggleBtn.querySelector('i');
        if (icon) {
          icon.classList.toggle('fa-eye');
          icon.classList.toggle('fa-eye-slash');
        }
      });
    }
    
    // Setup refresh button
    const refreshBtn = document.getElementById('refresh-btn');
    if (refreshBtn) {
      refreshBtn.addEventListener('click', async () => {
        refreshBtn.disabled = true;
        try {
          if (window.dataFetcher && window.dataFetcher.fetchData) {
            await window.dataFetcher.fetchData();
          }
        } catch (error) {
          console.error('Refresh error:', error);
        }
        refreshBtn.disabled = false;
      });
    }
  }
  
  // Wait for DOM
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
  
})();
