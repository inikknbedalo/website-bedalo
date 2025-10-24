import { getEntry } from 'astro:content';

/**
 * Dashboard Configuration
 * Configuration for the Aspirasi Dashboard (Community Feedback Dashboard)
 * Now loaded from content collections and environment variables
 */

// Load config from content collection
const dashboardConfigEntry = await getEntry('config', 'dashboard');

if (!dashboardConfigEntry || !('spreadsheetId' in dashboardConfigEntry.data)) {
  throw new Error('Dashboard configuration not found');
}

const config = dashboardConfigEntry.data;

// Get password hash from environment variable (never commit this!)
const passwordHash = import.meta.env.DASHBOARD_PASSWORD_HASH;

if (!passwordHash) {
  throw new Error('DASHBOARD_PASSWORD_HASH environment variable is required');
}

export const DASHBOARD_CONFIG = {
  SPREADSHEET_ID: config.spreadsheetId,
  SHEET_NAME: config.sheetName,
  REFRESH_INTERVAL: config.refreshInterval,
  MAX_RETRIES: config.maxRetries,
  RETRY_DELAY: config.retryDelay,
  PASSWORD_HASH: passwordHash,
  SESSION_KEY: config.sessionKey,
  SESSION_DURATION: config.sessionDuration,
  ITEMS_PER_PAGE: config.itemsPerPage,
} as const;

// Construct API URL (Google Sheets Visualization API)
export const API_URL = `https://docs.google.com/spreadsheets/d/${DASHBOARD_CONFIG.SPREADSHEET_ID}/gviz/tq?tqx=out:json&sheet=${encodeURIComponent(DASHBOARD_CONFIG.SHEET_NAME)}`;

// Add API_URL to config object
export const FULL_DASHBOARD_CONFIG = {
  ...DASHBOARD_CONFIG,
  API_URL,
} as const;

export type DashboardConfig = typeof FULL_DASHBOARD_CONFIG;

