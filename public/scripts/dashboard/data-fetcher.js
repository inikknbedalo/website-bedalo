// Data Fetcher for Google Sheets
class DataFetcher {
  constructor(config) {
    this.config = config || window.DASHBOARD_CONFIG;
    this.retryCount = 0;
    this.data = [];
    this.isLoading = false;
    this.autoRefreshInterval = null;
  }

  // Start auto-refresh
  startAutoRefresh() {
    if (this.autoRefreshInterval) {
      clearInterval(this.autoRefreshInterval);
    }
    
    this.autoRefreshInterval = setInterval(() => {
      console.log('Auto-refreshing data...');
      this.fetchData(true); // Silent refresh
    }, this.config.REFRESH_INTERVAL);
  }

  // Stop auto-refresh
  stopAutoRefresh() {
    if (this.autoRefreshInterval) {
      clearInterval(this.autoRefreshInterval);
      this.autoRefreshInterval = null;
    }
  }

  // Fetch data from Google Sheets
  async fetchData(silent = false) {
    if (this.isLoading && !silent) {
      console.log('Already fetching data...');
      return this.data;
    }

    this.isLoading = true;
    
    if (!silent) {
      this.showLoading();
    }

    try {
      console.log('Fetching data from:', this.config.API_URL);
      console.log('Config:', {
        spreadsheetId: this.config.SPREADSHEET_ID,
        sheetName: this.config.SHEET_NAME
      });
      
      const response = await fetch(this.config.API_URL);
      
      console.log('Response received:', {
        ok: response.ok,
        status: response.status,
        statusText: response.statusText
      });
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const text = await response.text();
      console.log('Response text length:', text.length);
      
      // Parse Google Visualization API response
      const jsonString = text.match(/google\.visualization\.Query\.setResponse\((.*)\);/)?.[1];
      
      if (!jsonString) {
        console.error('Could not extract JSON from response');
        throw new Error('Invalid response format from Google Sheets');
      }

      const jsonData = JSON.parse(jsonString);
      console.log('JSON parsed, status:', jsonData.status);
      
      if (jsonData.status === 'error') {
        throw new Error(jsonData.errors[0]?.detailed_message || 'Unknown error from Google Sheets');
      }

      // Extract data
      this.data = this.parseGoogleSheetsData(jsonData);
      
      console.log('Data fetched successfully:', this.data.length, 'records');
      console.log('First record:', this.data[0]);
      
      // Reset retry count on success
      this.retryCount = 0;
      
      // Update UI
      if (window.updateDashboard) {
        window.updateDashboard(this.data);
      }
      
      // Update last refresh time
      if (window.updateLastRefreshTime) {
        window.updateLastRefreshTime();
      }
      
      if (!silent) {
        this.hideLoading();
      }
      
      return this.data;
      
    } catch (error) {
      console.error('Error fetching data:', error);
      console.error('Error details:', {
        message: error.message,
        stack: error.stack,
        url: this.config.API_URL
      });
      
      // Retry logic
      if (this.retryCount < this.config.MAX_RETRIES) {
        this.retryCount++;
        console.log(`Retrying... (${this.retryCount}/${this.config.MAX_RETRIES})`);
        
        await new Promise(resolve => setTimeout(resolve, this.config.RETRY_DELAY));
        return this.fetchData(silent);
      }
      
      // Max retries reached, show error
      console.error('Max retries reached. Using fallback data.');
      if (!silent) {
        this.showError(error.message);
      }
      
      // Use fallback data
      this.data = this.getFallbackData();
      console.warn('Using fallback data:', this.data.length, 'records');
      
      if (window.updateDashboard) {
        window.updateDashboard(this.data);
      }
      
      if (!silent) {
        this.hideLoading();
      }
      
      return this.data;
      
    } finally {
      this.isLoading = false;
    }
  }

  // Parse Google Sheets data
  parseGoogleSheetsData(jsonData) {
    const rows = jsonData.table.rows;
    const cols = jsonData.table.cols;
    
    // Extract column labels
    const headers = cols.map(col => col.label || col.id);
    
    // Map rows to objects with proper data extraction
    const data = rows.map((row, rowIndex) => {
      const obj = {};
      
      row.c.forEach((cell, index) => {
        const header = headers[index];
        
        if (!cell) {
          obj[header] = null;
          return;
        }
        
        // Special handling for different column types
        if (header === 'Timestamp' && cell.v) {
          // Parse Google Date format: "Date(2025,9,24,15,49,42)"
          if (typeof cell.v === 'string' && cell.v.startsWith('Date(')) {
            const match = cell.v.match(/Date\((\d+),(\d+),(\d+),(\d+),(\d+),(\d+)\)/);
            if (match) {
              const [_, year, month, day, hour, minute, second] = match;
              // Note: month is 0-indexed in JavaScript
              const date = new Date(year, month, day, hour, minute, second);
              obj[header] = date.toISOString();
            } else {
              // Fallback to formatted value if available
              obj[header] = cell.f || cell.v;
            }
          } else {
            obj[header] = cell.v;
          }
        } else {
          // For other fields, use the value directly
          obj[header] = cell.v;
        }
      });
      
      return obj;
    });
    
    console.log('Parsed data sample:', data[0]);
    return data;
  }

  // Get fallback data (from hardcoded data.js)
  getFallbackData() {
    if (typeof hardcodedData !== 'undefined') {
      console.log('Using fallback data');
      return hardcodedData;
    }
    return [];
  }

  // Show loading spinner
  showLoading() {
    const loadingEl = document.getElementById('loading-spinner');
    const contentEl = document.getElementById('main-content');
    
    if (loadingEl) {
      loadingEl.classList.remove('hidden');
    }
    
    if (contentEl) {
      contentEl.style.opacity = '0.5';
    }
  }

  // Hide loading spinner
  hideLoading() {
    const loadingEl = document.getElementById('loading-spinner');
    const contentEl = document.getElementById('main-content');
    
    if (loadingEl) {
      loadingEl.classList.add('hidden');
    }
    
    if (contentEl) {
      contentEl.style.opacity = '1';
    }
  }

  // Show error message
  showError(message) {
    const errorEl = document.getElementById('error-message');
    
    if (errorEl) {
      errorEl.textContent = `Error: ${message}. Menggunakan data cadangan.`;
      errorEl.classList.remove('hidden');
      
      // Auto-hide after 5 seconds
      setTimeout(() => {
        errorEl.classList.add('hidden');
      }, 5000);
    }
  }

  // Get data (cached)
  getData() {
    return this.data;
  }

  // Clear cache
  clearCache() {
    this.data = [];
  }
}

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
  if (window.DASHBOARD_CONFIG) {
    window.dataFetcher = new DataFetcher(window.DASHBOARD_CONFIG);
  }
});
