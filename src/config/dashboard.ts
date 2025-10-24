/**
 * Dashboard Configuration
 * Configuration for the Aspirasi Dashboard (Community Feedback Dashboard)
 */

export const DASHBOARD_CONFIG = {
  // Google Sheets Configuration
  SPREADSHEET_ID: '1QnXBFw9wDpe4tAy99ALbY04RUl1VY_DD491sC7LFXKM',
  SHEET_NAME: 'aspirasi',
  
  // Refresh Settings
  REFRESH_INTERVAL: 5 * 60 * 1000, // 5 minutes in milliseconds
  MAX_RETRIES: 3,
  RETRY_DELAY: 2000, // 2 seconds
  
  // Authentication
  PASSWORD_HASH: 'df639246eff9e232a0d366efbf55739b5c93550c1173b043a49ea84620db249d', // SHA-256 hash
  SESSION_KEY: 'dashboard_auth',
  SESSION_DURATION: 24 * 60 * 60 * 1000, // 24 hours
  
  // Pagination
  ITEMS_PER_PAGE: 10,
} as const;

// Construct API URL (Google Sheets Visualization API)
export const API_URL = `https://docs.google.com/spreadsheets/d/${DASHBOARD_CONFIG.SPREADSHEET_ID}/gviz/tq?tqx=out:json&sheet=${encodeURIComponent(DASHBOARD_CONFIG.SHEET_NAME)}`;

// Add API_URL to config object
export const FULL_DASHBOARD_CONFIG = {
  ...DASHBOARD_CONFIG,
  API_URL,
} as const;

export type DashboardConfig = typeof FULL_DASHBOARD_CONFIG;
