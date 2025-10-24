// Dashboard Main Script - Integration
let processedData = [];
let filteredData = [];
let currentPage = 1;
const rowsPerPage = 5;

// Initialize dashboard (called by auth after login)
window.initializeDashboard = async function() {
  console.log('Initializing dashboard...');
  
  // Check if dataFetcher exists
  if (!window.dataFetcher) {
    console.error('dataFetcher not found! Waiting for it to load...');
    // Wait a bit and try again
    await new Promise(resolve => setTimeout(resolve, 100));
  }
  
  // Fetch initial data
  try {
    if (window.dataFetcher) {
      console.log('dataFetcher found, fetching data...');
      await window.dataFetcher.fetchData();
    } else {
      console.error('dataFetcher still not available!');
    }
    
    // Start auto-refresh
    if (window.dataFetcher) {
      window.dataFetcher.startAutoRefresh();
    }
  } catch (error) {
    console.error('Failed to initialize dashboard:', error);
  }
};

// Update dashboard with new data (called by data-fetcher)
window.updateDashboard = function(data) {
  console.log('Updating dashboard with data:', data.length, 'records');
  
  processedData = processData(data);
  filteredData = [...processedData];
  
  updateStats(processedData);
  
  // Update charts
  if (window.chartsManager) {
    window.chartsManager.initCharts(processedData);
  }
  
  populateFilterOptions(processedData);
  displayData(filteredData);
  setupPagination(() => filteredData);
  
  // Update last refresh time
  updateLastRefreshTime();
};

// Process raw data
function processData(data) {
  if (!Array.isArray(data)) return [];
  
  console.log('Processing data, first item:', data[0]);
  
  return data
    .map((item) => {
      // Handle Google Sheets column names
      const timestamp = item.Timestamp || item.timestamp || '';
      const name = item['Nama Lengkap'] || item.name || item.Nama || 'Anonim';
      const contact = item['No. Telepon / Email'] || item.contact || item.Kontak || '-';
      const subject = item.Subjek || item.subject || item.Subject || 'Lainnya';
      const message = item['Pesan Aspirasi'] || item.message || item.Pesan || '';
      
      // Parse date
      let date;
      if (timestamp) {
        date = new Date(timestamp);
        // Check if valid date
        if (isNaN(date.getTime())) {
          date = new Date();
        }
      } else {
        date = new Date();
      }
      
      return {
        timestamp,
        name,
        contact,
        subject,
        message,
        date,
      };
    })
    .sort((a, b) => b.date - a.date);
}

// Update statistics
function updateStats(data) {
  const totalAspirasiEl = document.getElementById("total-aspirasi");
  const aspirasiThisWeekEl = document.getElementById("aspirasi-this-week");
  const mostCommonSubjectEl = document.getElementById("most-common-subject");
  const latestAspirasiDateEl = document.getElementById("latest-aspirasi-date");
  
  if (!totalAspirasiEl || !aspirasiThisWeekEl || !mostCommonSubjectEl || !latestAspirasiDateEl) {
    return;
  }

  // Count-up animation for total
  animateValue(totalAspirasiEl, 0, data.length, 1000);

  // This week count
  const now = new Date();
  const startOfWeek = new Date(now);
  startOfWeek.setDate(now.getDate() - now.getDay() + (now.getDay() === 0 ? -6 : 1));
  startOfWeek.setHours(0, 0, 0, 0);
  const endOfWeek = new Date(startOfWeek);
  endOfWeek.setDate(startOfWeek.getDate() + 6);
  endOfWeek.setHours(23, 59, 59, 999);

  const thisWeekCount = data.filter(
    (item) => item.date >= startOfWeek && item.date <= endOfWeek
  ).length;
  
  animateValue(aspirasiThisWeekEl, 0, thisWeekCount, 1000);

  // Most common subject
  if (data.length > 0) {
    const subjectCounts = data.reduce((acc, item) => {
      acc[item.subject] = (acc[item.subject] || 0) + 1;
      return acc;
    }, {});
    const mostCommon = Object.entries(subjectCounts).sort((a, b) => b[1] - a[1])[0];
    mostCommonSubjectEl.textContent = mostCommon ? mostCommon[0] : "-";
    
    // Latest date
    const latestAspirasi = data[0];
    latestAspirasiDateEl.textContent = latestAspirasi.date.toLocaleDateString("id-ID", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  } else {
    mostCommonSubjectEl.textContent = "-";
    latestAspirasiDateEl.textContent = "-";
  }
}

// Animate number count-up
function animateValue(el, start, end, duration) {
  if (!el) return;
  
  const range = end - start;
  const increment = range / (duration / 16);
  let current = start;
  
  const timer = setInterval(() => {
    current += increment;
    if ((increment > 0 && current >= end) || (increment < 0 && current <= end)) {
      current = end;
      clearInterval(timer);
    }
    el.textContent = Math.round(current);
  }, 16);
}

// Update last refresh time
function updateLastRefreshTime() {
  const lastRefreshEl = document.getElementById('last-refresh-time');
  if (!lastRefreshEl) return;
  
  const now = new Date();
  lastRefreshEl.textContent = now.toLocaleTimeString('id-ID', {
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit'
  });
}

// Make function global
window.updateLastRefreshTime = updateLastRefreshTime;

// Display table data with pagination
function displayData(data) {
  const tableBody = document.getElementById("data-table-body");
  const pageInfoEl = document.getElementById("page-info");
  const prevPageButton = document.getElementById("prev-page");
  const nextPageButton = document.getElementById("next-page");
  
  if (!tableBody) return;

  tableBody.innerHTML = "";
  
  if (!Array.isArray(data) || data.length === 0) {
    tableBody.innerHTML =
      '<tr><td colspan="5" class="text-center p-4 text-gray-500">Tidak ada data...</td></tr>';
    if (pageInfoEl) pageInfoEl.textContent = "Halaman 0 dari 0";
    if (prevPageButton) prevPageButton.disabled = true;
    if (nextPageButton) nextPageButton.disabled = true;
    return;
  }

  const totalPages = Math.ceil(data.length / rowsPerPage);
  currentPage = Math.max(1, Math.min(currentPage, totalPages));
  const start = (currentPage - 1) * rowsPerPage;
  const end = start + rowsPerPage;
  const paginatedData = data.slice(start, end);

  paginatedData.forEach((item, index) => {
    let formattedDate = "N/A";
    try {
      formattedDate = item.date.toLocaleString("id-ID", {
        dateStyle: "medium",
        timeStyle: "short",
        timeZone: "Asia/Jakarta"
      });
    } catch (e) {
      console.warn("Date format error:", item.timestamp, e);
    }

    const row = tableBody.insertRow();
    row.innerHTML = `
      <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">${formattedDate}</td>
      <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">${item.name}</td>
      <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">${item.contact}</td>
      <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">${item.subject}</td>
      <td class="px-6 py-4 text-sm text-gray-500">
        <button onclick="showDetailModal(${start + index})" class="px-3 py-1 bg-blue-600 text-white rounded hover:bg-blue-700 text-xs">
          <i class="fas fa-eye mr-1"></i> Detail
        </button>
      </td>
    `;
  });

  if (pageInfoEl) {
    pageInfoEl.textContent = `Halaman ${currentPage} dari ${totalPages}`;
  }
  
  if (prevPageButton) {
    prevPageButton.disabled = currentPage === 1;
  }
  
  if (nextPageButton) {
    nextPageButton.disabled = currentPage === totalPages;
  }
}

// Show detail modal with full message
function showDetailModal(index) {
  const item = filteredData[index];
  if (!item) return;
  
  const formattedDate = item.date.toLocaleString("id-ID", {
    dateStyle: "full",
    timeStyle: "medium",
    timeZone: "Asia/Jakarta"
  });
  
  const modal = document.createElement('div');
  modal.className = 'fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50';
  modal.onclick = (e) => { if (e.target === modal) modal.remove(); };
  modal.innerHTML = `
    <div class="bg-white rounded-lg shadow-xl max-w-2xl w-full mx-4 max-h-[90vh] overflow-y-auto">
      <div class="p-6">
        <div class="flex justify-between items-start mb-4">
          <h3 class="text-xl font-bold text-gray-900">Detail Aspirasi</h3>
          <button onclick="this.closest('.fixed').remove()" class="text-gray-400 hover:text-gray-600">
            <i class="fas fa-times text-2xl"></i>
          </button>
        </div>
        
        <div class="space-y-4">
          <div>
            <label class="text-sm font-semibold text-gray-600">Waktu</label>
            <p class="text-gray-900">${formattedDate}</p>
          </div>
          
          <div>
            <label class="text-sm font-semibold text-gray-600">Nama</label>
            <p class="text-gray-900">${item.name}</p>
          </div>
          
          <div>
            <label class="text-sm font-semibold text-gray-600">Kontak</label>
            <p class="text-gray-900">${item.contact}</p>
          </div>
          
          <div>
            <label class="text-sm font-semibold text-gray-600">Subjek</label>
            <p class="text-gray-900">${item.subject}</p>
          </div>
          
          <div>
            <label class="text-sm font-semibold text-gray-600">Pesan</label>
            <p class="text-gray-900 whitespace-pre-wrap">${item.message}</p>
          </div>
        </div>
        
        <div class="mt-6 flex justify-end">
          <button onclick="this.closest('.fixed').remove()" class="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">
            Tutup
          </button>
        </div>
      </div>
    </div>
  `;
  
  document.body.appendChild(modal);
}

// Make function global
window.showDetailModal = showDetailModal;

// Setup pagination
function setupPagination(dataGetter) {
  const prevPageButton = document.getElementById("prev-page");
  const nextPageButton = document.getElementById("next-page");
  
  if (!prevPageButton || !nextPageButton) return;
  
  prevPageButton.onclick = () => {
    const currentData = dataGetter();
    if (currentPage > 1) {
      currentPage--;
      displayData(currentData);
    }
  };
  
  nextPageButton.onclick = () => {
    const currentData = dataGetter();
    const totalPages = Math.ceil(currentData.length / rowsPerPage);
    if (currentPage < totalPages) {
      currentPage++;
      displayData(currentData);
    }
  };
}

// Filter and search functionality
function filterAndSearchData() {
  const searchInput = document.getElementById("search-input");
  const filterSelect = document.getElementById("filter-select");
  
  if (!searchInput || !filterSelect) return;
  
  const searchTerm = searchInput.value.toLowerCase().trim();
  const selectedSubject = filterSelect.value;
  
  console.log('Filtering - Search:', searchTerm, 'Subject:', selectedSubject);
  
  // Start with all processed data
  filteredData = processedData.filter((item) => {
    // Search filter (checks name, subject, message)
    let matchesSearch = true;
    if (searchTerm !== "") {
      const nameMatch = (item.name || "").toLowerCase().includes(searchTerm);
      const subjectMatch = (item.subject || "").toLowerCase().includes(searchTerm);
      const messageMatch = (item.message || "").toLowerCase().includes(searchTerm);
      matchesSearch = nameMatch || subjectMatch || messageMatch;
    }
    
    // Subject filter
    let matchesSubject = true;
    if (selectedSubject !== "") {
      matchesSubject = item.subject === selectedSubject;
    }
    
    return matchesSearch && matchesSubject;
  });
  
  console.log('Filtered results:', filteredData.length, 'items');
  
  // Reset to first page and display
  currentPage = 1;
  displayData(filteredData);
  setupPagination(() => filteredData);
}

// Populate filter dropdown with unique subjects
function populateFilterOptions(data) {
  const filterSelect = document.getElementById("filter-select");
  if (!filterSelect) return;
  
  // Keep only the first option (Semua Subjek)
  filterSelect.innerHTML = '<option value="">Semua Subjek</option>';
  
  // Get unique subjects from data
  const uniqueSubjects = [...new Set(data.map(item => item.subject))].filter(s => s && s !== "");
  
  // Sort subjects alphabetically
  uniqueSubjects.sort();
  
  console.log('Populating filter with subjects:', uniqueSubjects);
  
  // Add options
  uniqueSubjects.forEach((subject) => {
    const option = document.createElement("option");
    option.value = subject;
    option.textContent = subject;
    filterSelect.appendChild(option);
  });
}

// Setup event listeners for filter and search
document.addEventListener("DOMContentLoaded", () => {
  console.log('Setting up filter event listeners...');
  
  const searchInput = document.getElementById("search-input");
  const filterSelect = document.getElementById("filter-select");
  const resetFiltersButton = document.getElementById("reset-filters");
  
  if (searchInput) {
    searchInput.addEventListener("input", () => {
      console.log('Search input changed');
      filterAndSearchData();
    });
    console.log('✓ Search input listener attached');
  }
  
  if (filterSelect) {
    filterSelect.addEventListener("change", () => {
      console.log('Filter select changed to:', filterSelect.value);
      filterAndSearchData();
    });
    console.log('✓ Filter select listener attached');
  }
  
  if (resetFiltersButton) {
    resetFiltersButton.addEventListener("click", () => {
      console.log('Reset filters clicked');
      if (searchInput) searchInput.value = "";
      if (filterSelect) filterSelect.value = "";
      filterAndSearchData();
    });
    console.log('✓ Reset button listener attached');
  }
  
  // Note: Hardcoded data removed - dashboard now only uses data from Google Sheets
  // If fetch fails, dashboard will show error message instead of fallback data
});
