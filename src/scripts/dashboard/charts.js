// Charts Manager for Dashboard
class ChartsManager {
  constructor() {
    this.charts = {};
    this.chartInstances = {};
  }

  // Create responsive chart configuration
  createResponsiveChart(ctx, config) {
    // Add responsive defaults
    const responsiveConfig = {
      ...config,
      options: {
        ...config.options,
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          ...config.options?.plugins,
          legend: {
            ...config.options?.plugins?.legend,
            labels: {
              ...config.options?.plugins?.legend?.labels,
              font: {
                size: window.innerWidth < 640 ? 10 : 12,
              },
            },
          },
        },
        scales: config.options?.scales ? {
          ...config.options.scales,
          x: {
            ...config.options.scales.x,
            ticks: {
              ...config.options.scales.x?.ticks,
              font: {
                size: window.innerWidth < 640 ? 10 : 12,
              },
              maxRotation: window.innerWidth < 640 ? 45 : 0,
              minRotation: window.innerWidth < 640 ? 45 : 0,
            },
            grid: {
              ...config.options.scales.x?.grid,
              display: window.innerWidth >= 640,
            },
          },
          y: {
            ...config.options.scales.y,
            ticks: {
              ...config.options.scales.y?.ticks,
              font: {
                size: window.innerWidth < 640 ? 10 : 12,
              },
            },
          },
        } : undefined,
      },
    };

    return new Chart(ctx, responsiveConfig);
  }

  // Initialize all charts
  initCharts(data) {
    this.destroyAllCharts();
    
    // Create charts
    this.createSubjectDistributionChart(data);
    this.createTimelineChart(data);
    this.createWeeklyTrendChart(data);
  }

  // Create subject distribution chart (doughnut)
  createSubjectDistributionChart(data) {
    const ctx = document.getElementById('subject-chart');
    if (!ctx) return;

    // Count by subject
    const subjectCount = {};
    data.forEach(item => {
      const subject = item.subject || item.Subjek || 'Lainnya';
      subjectCount[subject] = (subjectCount[subject] || 0) + 1;
    });

    const labels = Object.keys(subjectCount);
    const values = Object.values(subjectCount);

    // Colors
    const colors = [
      'rgba(59, 130, 246, 0.8)',   // blue
      'rgba(16, 185, 129, 0.8)',   // green
      'rgba(245, 158, 11, 0.8)',   // amber
      'rgba(239, 68, 68, 0.8)',    // red
      'rgba(139, 92, 246, 0.8)',   // purple
      'rgba(236, 72, 153, 0.8)',   // pink
    ];

    const config = {
      type: 'doughnut',
      data: {
        labels: labels,
        datasets: [{
          data: values,
          backgroundColor: colors,
          borderWidth: 2,
          borderColor: '#fff',
        }],
      },
      options: {
        plugins: {
          legend: {
            position: 'bottom',
          },
          title: {
            display: true,
            text: 'Distribusi Subjek Aspirasi',
            font: {
              size: 16,
              weight: 'bold',
            },
          },
        },
      },
    };

    this.chartInstances.subject = this.createResponsiveChart(ctx, config);
  }

  // Create timeline chart (line)
  createTimelineChart(data) {
    const ctx = document.getElementById('timeline-chart');
    if (!ctx) return;

    // Sort by date
    const sortedData = [...data].sort((a, b) => {
      const dateA = new Date(a.timestamp || a.Timestamp);
      const dateB = new Date(b.timestamp || b.Timestamp);
      return dateA - dateB;
    });

    // Group by date
    const dateCount = {};
    sortedData.forEach(item => {
      const date = new Date(item.timestamp || item.Timestamp);
      const dateStr = date.toLocaleDateString('id-ID');
      dateCount[dateStr] = (dateCount[dateStr] || 0) + 1;
    });

    const labels = Object.keys(dateCount);
    const values = Object.values(dateCount);

    // Calculate cumulative
    const cumulative = [];
    let sum = 0;
    values.forEach(val => {
      sum += val;
      cumulative.push(sum);
    });

    const config = {
      type: 'line',
      data: {
        labels: labels,
        datasets: [{
          label: 'Total Aspirasi',
          data: cumulative,
          borderColor: 'rgba(59, 130, 246, 1)',
          backgroundColor: 'rgba(59, 130, 246, 0.1)',
          fill: true,
          tension: 0.4,
          pointRadius: 4,
          pointHoverRadius: 6,
        }],
      },
      options: {
        plugins: {
          legend: {
            display: false,
          },
          title: {
            display: true,
            text: 'Timeline Aspirasi',
            font: {
              size: 16,
              weight: 'bold',
            },
          },
        },
        scales: {
          x: {
            display: true,
          },
          y: {
            display: true,
            beginAtZero: true,
          },
        },
      },
    };

    this.chartInstances.timeline = this.createResponsiveChart(ctx, config);
  }

  // Create weekly trend chart (bar)
  createWeeklyTrendChart(data) {
    const ctx = document.getElementById('weekly-chart');
    if (!ctx) return;

    // Group by day of week
    const dayNames = ['Minggu', 'Senin', 'Selasa', 'Rabu', 'Kamis', 'Jumat', 'Sabtu'];
    const dayCount = [0, 0, 0, 0, 0, 0, 0];

    data.forEach(item => {
      const date = new Date(item.timestamp || item.Timestamp);
      const day = date.getDay();
      dayCount[day]++;
    });

    const config = {
      type: 'bar',
      data: {
        labels: dayNames,
        datasets: [{
          label: 'Jumlah Aspirasi',
          data: dayCount,
          backgroundColor: 'rgba(16, 185, 129, 0.8)',
          borderColor: 'rgba(16, 185, 129, 1)',
          borderWidth: 2,
        }],
      },
      options: {
        plugins: {
          legend: {
            display: false,
          },
          title: {
            display: true,
            text: 'Tren Berdasarkan Hari',
            font: {
              size: 16,
              weight: 'bold',
            },
          },
        },
        scales: {
          x: {
            display: true,
          },
          y: {
            display: true,
            beginAtZero: true,
            ticks: {
              stepSize: 1,
            },
          },
        },
      },
    };

    this.chartInstances.weekly = this.createResponsiveChart(ctx, config);
  }

  // Destroy all chart instances
  destroyAllCharts() {
    Object.values(this.chartInstances).forEach(chart => {
      if (chart) {
        chart.destroy();
      }
    });
    this.chartInstances = {};
  }

  // Update chart responsiveness on resize
  updateChartResponsiveness() {
    Object.values(this.chartInstances).forEach(chart => {
      if (chart) {
        chart.resize();
        
        // Update font sizes
        if (chart.options?.plugins?.legend?.labels?.font) {
          chart.options.plugins.legend.labels.font.size = window.innerWidth < 640 ? 10 : 12;
        }
        
        if (chart.options?.scales?.x?.ticks?.font) {
          chart.options.scales.x.ticks.font.size = window.innerWidth < 640 ? 10 : 12;
          chart.options.scales.x.ticks.maxRotation = window.innerWidth < 640 ? 45 : 0;
          chart.options.scales.x.ticks.minRotation = window.innerWidth < 640 ? 45 : 0;
        }
        
        if (chart.options?.scales?.x?.grid) {
          chart.options.scales.x.grid.display = window.innerWidth >= 640;
        }
        
        chart.update();
      }
    });
  }
}

// Handle window resize with debounce
let resizeTimeout;
window.addEventListener('resize', () => {
  clearTimeout(resizeTimeout);
  resizeTimeout = setTimeout(() => {
    if (window.chartsManager) {
      window.chartsManager.updateChartResponsiveness();
    }
  }, 250);
});

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
  window.chartsManager = new ChartsManager();
});
