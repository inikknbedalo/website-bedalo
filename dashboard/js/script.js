document.addEventListener("DOMContentLoaded", () => {
  const loadingOverlay = document.getElementById("loading-overlay");
  const mainContent = document.getElementById("main-content");
  const totalAspirasiEl = document.getElementById("total-aspirasi");
  const aspirasiThisWeekEl = document.getElementById("aspirasi-this-week");
  const mostCommonSubjectEl = document.getElementById("most-common-subject");
  const latestAspirasiDateEl = document.getElementById("latest-aspirasi-date");
  const aspirasiChartCanvas = document.getElementById("aspirasiChart");
  const subjekChartCanvas = document.getElementById("subjekChart");
  const searchInput = document.getElementById("search-input");
  const filterSelect = document.getElementById("filter-select");
  const resetFiltersButton = document.getElementById("reset-filters");
  const tableBody = document.getElementById("data-table-body");
  const pageInfoEl = document.getElementById("page-info");
  const prevPageButton = document.getElementById("prev-page");
  const nextPageButton = document.getElementById("next-page");

  if (
    !mainContent ||
    !aspirasiChartCanvas ||
    !subjekChartCanvas ||
    !tableBody
  ) {
    console.error("Essential dashboard elements not found!");
    return;
  }

  const hardcodedData = [
    {
      timestamp: "2025-10-20 09:15:30",
      name: "Budi Santoso",
      contact: "081...",
      subject: "Perbaikan Jalan",
      message: "Jalan dusun perlu diperbaiki...",
    },
    {
      timestamp: "2025-10-21 14:30:15",
      name: "Citra Dewi",
      contact: "citra@mail.com",
      subject: "Fasilitas Umum",
      message: "Usul penambahan tempat sampah...",
    },
    {
      timestamp: "2025-10-22 08:00:00",
      name: "Eka Wijaya",
      contact: "085...",
      subject: "Keamanan",
      message: "Perlunya ronda malam...",
    },
    {
      timestamp: "2025-10-23 09:00:00",
      name: "Gita Permata",
      contact: "gita@mail.net",
      subject: "Perbaikan Jalan",
      message: "Mohon segera ditindaklanjuti.",
    },
    {
      timestamp: "2025-10-24 10:00:00",
      name: "Indah Sari",
      contact: "089...",
      subject: "Kebersihan",
      message: "Jadwal gotong royong...",
    },
    {
      timestamp: "2025-10-24 13:45:00",
      name: "Joko Susilo",
      contact: "joko@mail.org",
      subject: "Fasilitas Umum",
      message: "Lampu penerangan jalan mati.",
    },
    {
      timestamp: "2025-10-25 08:30:00",
      name: "Kartika Putri",
      contact: "082...",
      subject: "Perbaikan Jalan",
      message: "Jalan berlubang di dekat RT 01.",
    },
    {
      timestamp: "2025-10-25 11:00:00",
      name: "Leo Chandra",
      contact: "087...",
      subject: "Kegiatan Pemuda",
      message: "Usul kegiatan karang taruna.",
    },
    {
      timestamp: "2025-10-26 10:00:00",
      name: "Maya Anggraini",
      contact: "maya@mail.co",
      subject: "Lainnya",
      message: "Ucapan terima kasih untuk KKN.",
    },
    {
      timestamp: "2025-10-19 10:00:00",
      name: "Zahra Nuraini",
      contact: "zahra@mail.com",
      subject: "Fasilitas Umum",
      message: "Perbaikan taman bermain anak.",
    },
    {
      timestamp: "2025-10-18 15:20:00",
      name: "Yudi Pratama",
      contact: "081...",
      subject: "Keamanan",
      message: "Saran pemasangan CCTV.",
    },
    {
      timestamp: "2025-10-17 09:05:00",
      name: "Xavier Simanjuntak",
      contact: "xavier@mail.net",
      subject: "Perbaikan Jalan",
      message: "Aspal mengelupas di tikungan.",
    },
    {
      timestamp: "2025-10-16 11:55:00",
      name: "Wulan Anggraini",
      contact: "085...",
      subject: "Kebersihan",
      message: "Pengelolaan sampah perlu ditingkatkan.",
    },
    {
      timestamp: "2025-10-26 14:00:00",
      name: "Nadia Utami",
      contact: "nadia@mail.id",
      subject: "Lainnya",
      message: "Pertanyaan tentang website.",
    },
  ];

  let aspirasiChartInstance = null;
  let subjekChartInstance = null;
  let processedData = [];
  let filteredData = [];
  let currentPage = 1;
  const rowsPerPage = 5;

  function processData(data) {
    if (!Array.isArray(data)) return [];
    return data
      .map((item) => ({
        ...item,
        date: new Date(item.timestamp),
        name: item.name || "Anonim",
        contact: item.contact || "-",
        subject: item.subject || "Lainnya",
        message: item.message || "",
      }))
      .sort((a, b) => b.date - a.date);
  }

  function updateStats(data) {
    if (
      !totalAspirasiEl ||
      !aspirasiThisWeekEl ||
      !mostCommonSubjectEl ||
      !latestAspirasiDateEl
    )
      return;

    totalAspirasiEl.textContent = data.length;

    const now = new Date();
    const startOfWeek = new Date(now);
    startOfWeek.setDate(
      now.getDate() - now.getDay() + (now.getDay() === 0 ? -6 : 1)
    );
    startOfWeek.setHours(0, 0, 0, 0);
    const endOfWeek = new Date(startOfWeek);
    endOfWeek.setDate(startOfWeek.getDate() + 6);
    endOfWeek.setHours(23, 59, 59, 999);

    const thisWeekCount = data.filter(
      (item) => item.date >= startOfWeek && item.date <= endOfWeek
    ).length;
    aspirasiThisWeekEl.textContent = thisWeekCount;

    if (data.length > 0) {
      const subjectCounts = data.reduce((acc, item) => {
        acc[item.subject] = (acc[item.subject] || 0) + 1;
        return acc;
      }, {});
      const mostCommon = Object.entries(subjectCounts).sort(
        (a, b) => b[1] - a[1]
      )[0];
      mostCommonSubjectEl.textContent = mostCommon ? mostCommon[0] : "-";
      const latestAspirasi = data[0];
      latestAspirasiDateEl.textContent = latestAspirasi.date.toLocaleDateString(
        "id-ID",
        {
          day: "2-digit",
          month: "short",
          year: "numeric",
        }
      );
    } else {
      mostCommonSubjectEl.textContent = "-";
      latestAspirasiDateEl.textContent = "-";
    }
  }

  function updateCharts(data) {
    if (aspirasiChartInstance) aspirasiChartInstance.destroy();
    if (subjekChartInstance) subjekChartInstance.destroy();

    const ctxAspirasi = aspirasiChartCanvas?.getContext("2d");
    const ctxSubjek = subjekChartCanvas?.getContext("2d");

    if (ctxAspirasi && data.length > 0 && typeof Chart !== "undefined") {
      const aspirasiPerDay = data.reduce((acc, item) => {
        const day = item.date.toISOString().split("T")[0];
        acc[day] = (acc[day] || 0) + 1;
        return acc;
      }, {});
      const sortedDays = Object.keys(aspirasiPerDay).sort(
        (a, b) => new Date(a) - new Date(b)
      );
      const chartLabels = sortedDays;
      const chartData = sortedDays.map((day) => aspirasiPerDay[day]);

      aspirasiChartInstance = new Chart(ctxAspirasi, {
        type: "line",
        data: {
          labels: chartLabels,
          datasets: [
            {
              label: "Jumlah Aspirasi",
              data: chartData,
              borderColor: "rgb(59, 130, 246)",
              backgroundColor: "rgba(59, 130, 246, 0.1)",
              tension: 0.1,
              fill: true,
            },
          ],
        },
        options: {
          scales: {
            x: {
              type: "time",
              time: {
                unit: "day",
                tooltipFormat: "PP",
                displayFormats: { day: "dd MMM" },
              },
            },
            y: {
              beginAtZero: true,
              suggestedMax: Math.max(...chartData, 0) + 1,
              ticks: { stepSize: 1 },
            },
          },
          responsive: true,
          maintainAspectRatio: false,
        },
      });
    } else if (ctxAspirasi) {
      ctxAspirasi.clearRect(
        0,
        0,
        aspirasiChartCanvas.width,
        aspirasiChartCanvas.height
      );
      ctxAspirasi.font = "16px Poppins";
      ctxAspirasi.fillStyle = "#6b7280";
      ctxAspirasi.textAlign = "center";
      ctxAspirasi.fillText(
        "Tidak ada data aspirasi.",
        aspirasiChartCanvas.width / 2,
        50
      );
    }

    if (ctxSubjek && data.length > 0 && typeof Chart !== "undefined") {
      const subjectCounts = data.reduce((acc, item) => {
        acc[item.subject] = (acc[item.subject] || 0) + 1;
        return acc;
      }, {});
      const subjectLabels = Object.keys(subjectCounts);
      const subjectData = Object.values(subjectCounts);
      const backgroundColors = subjectLabels.map(
        (_, i) =>
          `hsl(${(i * (360 / Math.max(subjectLabels.length, 1))) % 360}, 65%, 60%)`
      );

      subjekChartInstance = new Chart(ctxSubjek, {
        type: "doughnut",
        data: {
          labels: subjectLabels,
          datasets: [
            {
              label: "Subjek Aspirasi",
              data: subjectData,
              backgroundColor: backgroundColors,
              hoverOffset: 4,
            },
          ],
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
            legend: {
              position: "bottom",
              labels: { padding: 15 },
            },
          },
        },
      });
    } else if (ctxSubjek) {
      ctxSubjek.clearRect(
        0,
        0,
        subjekChartCanvas.width,
        subjekChartCanvas.height
      );
      ctxSubjek.font = "16px Poppins";
      ctxSubjek.fillStyle = "#6b7280";
      ctxSubjek.textAlign = "center";
      ctxSubjek.fillText(
        "Tidak ada data subjek.",
        subjekChartCanvas.width / 2,
        subjekChartCanvas.height / 2
      );
    }
  }

  function displayData(data) {
    if (!tableBody || !pageInfoEl || !prevPageButton || !nextPageButton) return;

    tableBody.innerHTML = "";
    if (!Array.isArray(data) || data.length === 0) {
      tableBody.innerHTML =
        '<tr><td colspan="5" class="text-center p-4 text-gray-500">Tidak ada data cocok...</td></tr>';
      pageInfoEl.textContent = "Halaman 0 dari 0";
      prevPageButton.disabled = true;
      nextPageButton.disabled = true;
      return;
    }

    const totalPages = Math.ceil(data.length / rowsPerPage);
    currentPage = Math.max(1, Math.min(currentPage, totalPages));
    const start = (currentPage - 1) * rowsPerPage;
    const end = start + rowsPerPage;
    const paginatedData = data.slice(start, end);

    paginatedData.forEach((item) => {
      let formattedDate = "N/A";
      try {
        formattedDate = item.date.toLocaleString("id-ID", {
          dateStyle: "medium",
          timeStyle: "short",
        });
      } catch (e) {
        console.warn("Date format error:", item.timestamp, e);
      }
      const shortMessage =
        item.message.length > 50
          ? item.message.substring(0, 50) + "..."
          : item.message;

      const row = tableBody.insertRow();
      row.innerHTML = `
                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">${formattedDate}</td>
                <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">${item.name}</td>
                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">${item.contact}</td>
                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">${item.subject}</td>
                <td class="px-6 py-4 text-sm text-gray-500" title="${item.message}">${shortMessage}</td>
            `;
    });

    pageInfoEl.textContent = `Halaman ${currentPage} dari ${totalPages}`;
    prevPageButton.disabled = currentPage === 1;
    nextPageButton.disabled = currentPage === totalPages;
  }

  function setupPagination(dataGetter) {
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

  function filterAndSearchData() {
    const searchTerm = searchInput ? searchInput.value.toLowerCase() : "";
    const selectedSubject = filterSelect ? filterSelect.value : "";

    filteredData = processedData.filter((item) => {
      const nameMatch = item.name?.toLowerCase().includes(searchTerm) ?? false;
      const subjectMatch =
        item.subject?.toLowerCase().includes(searchTerm) ?? false;
      const messageMatch =
        item.message?.toLowerCase().includes(searchTerm) ?? false;
      const matchesSearch =
        searchTerm === "" || nameMatch || subjectMatch || messageMatch;
      const matchesSubjectFilter =
        selectedSubject === "" || item.subject === selectedSubject;
      return matchesSearch && matchesSubjectFilter;
    });

    currentPage = 1;
    displayData(filteredData);
    setupPagination(() => filteredData);
  }

  function populateFilterOptions(data) {
    if (!filterSelect) return;
    filterSelect.length = 1;

    const uniqueSubjects = [
      ...new Set(data.map((item) => item.subject || "Lainnya")),
    ];
    const otherSubjects = uniqueSubjects
      .filter((subject) => subject !== "Lainnya")
      .sort();
    const hasLainnya = uniqueSubjects.includes("Lainnya");

    otherSubjects.forEach((subject) => {
      if (subject && subject !== "N/A") {
        const option = document.createElement("option");
        option.value = subject;
        option.textContent = subject;
        filterSelect.appendChild(option);
      }
    });

    if (hasLainnya) {
      const option = document.createElement("option");
      option.value = "Lainnya";
      option.textContent = "Lainnya";
      filterSelect.appendChild(option);
    }
  }

  function initializeDashboard() {
    try {
      processedData = processData(hardcodedData);
      filteredData = [...processedData];

      updateStats(processedData);
      updateCharts(processedData);
      populateFilterOptions(processedData);
      displayData(filteredData);
      setupPagination(() => filteredData);

      if (searchInput)
        searchInput.addEventListener("input", filterAndSearchData);
      if (filterSelect)
        filterSelect.addEventListener("change", filterAndSearchData);
      if (resetFiltersButton) {
        resetFiltersButton.addEventListener("click", () => {
          if (searchInput) searchInput.value = "";
          if (filterSelect) filterSelect.value = "";
          filterAndSearchData();
        });
      }
    } catch (error) {
      console.error("Error initializing dashboard:", error);
      return;
    }

    if (mainContent) {
      mainContent.style.opacity = "1";
    }
  }

  initializeDashboard();
});
