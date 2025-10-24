document.addEventListener("DOMContentLoaded", function () {
  // --- DATA BERITA ---
  const dummyArticles = [];
  const today = new Date("2025-10-23T19:00:00");
  for (let i = 1; i <= 20; i++) {
    const date = new Date(today);
    date.setDate(today.getDate() - (i + Math.floor(i / 3))); // Variasi tanggal agar tidak urut
    dummyArticles.push({
      title: `Judul Berita Contoh ke-${i}`,
      date: date.toLocaleDateString("id-ID", {
        year: "numeric",
        month: "long",
        day: "numeric",
      }),
      description: `Ini adalah ringkasan singkat dari artikel berita ke-${i}. Deskripsi ini memberikan gambaran umum tentang isi berita agar pembaca tertarik untuk membaca lebih lanjut...`,
      link: `artikel-contoh.html`, // Semua link mengarah ke artikel contoh
    });
  }

  const listElement = document.getElementById("article-list");
  const paginationElement = document.getElementById("pagination-controls");

  let currentPage = 1;
  const rows = 5;

  // --- FUNGSI UNTUK MENAMPILKAN DAFTAR ARTIKEL ---
  function displayList(items, wrapper, rowsPerPage, page) {
    wrapper.innerHTML = "";
    page--; // Mengubah page menjadi index (dimulai dari 0)

    let start = rowsPerPage * page;
    let end = start + rowsPerPage;
    let paginatedItems = items.slice(start, end);

    for (let i = 0; i < paginatedItems.length; i++) {
      let item = paginatedItems[i];
      let itemElement = document.createElement("div");
      itemElement.classList.add(
        "group",
        "flex",
        "flex-col",
        "md:flex-row",
        "items-center",
        "gap-6",
        "py-6"
      );

      itemElement.innerHTML = `
                <div class="md:w-1/3 w-full">
                    <a href="${item.link}" class="block overflow-hidden rounded-lg shadow-md">
                        <img src="../assets/images/ngedan.webp" alt="${item.title}" width="600" height="400" class="w-full h-48 object-cover transform group-hover:scale-105 transition-transform duration-300">
                    </a>
                </div>
                <div class="md:w-2/3 w-full">
                    <p class="text-sm text-gray-500 mb-1">${item.date}</p>
                    <h3 class="text-xl font-bold text-gray-800 mb-2">
                        <a href="${item.link}" class="group-hover:text-blue-600 transition-colors">${item.title}</a>
                    </h3>
                    <p class="text-gray-600 text-sm line-clamp-3">${item.description}</p>
                    <a href="${item.link}" class="inline-block mt-3 text-blue-600 font-semibold hover:underline text-sm">
                        Baca Selengkapnya &rarr;
                    </a>
                </div>
            `;
      wrapper.appendChild(itemElement);
    }
  }

  // --- FUNGSI UNTUK MEMBUAT TOMBOL PAGINASI ---
  function setupPagination(items, wrapper, rowsPerPage) {
    wrapper.innerHTML = "";

    let pageCount = Math.ceil(items.length / rowsPerPage);

    // Tombol "Sebelumnya"
    let prevButton = document.createElement("button");
    prevButton.innerHTML = `<i class="fas fa-chevron-left"></i>`;
    prevButton.classList.add(
      "pagination-btn",
      "px-3",
      "py-1",
      "border",
      "rounded-md",
      "hover:bg-gray-200",
      "disabled:opacity-50",
      "disabled:cursor-not-allowed"
    );
    wrapper.appendChild(prevButton);

    prevButton.addEventListener("click", () => {
      if (currentPage > 1) {
        currentPage--;
        displayList(items, listElement, rows, currentPage);
        updatePaginationButtons();
      }
    });

    // Tombol Angka Halaman
    for (let i = 1; i < pageCount + 1; i++) {
      let btn = createPageButton(i);
      wrapper.appendChild(btn);
    }

    // Tombol "Berikutnya"
    let nextButton = document.createElement("button");
    nextButton.innerHTML = `<i class="fas fa-chevron-right"></i>`;
    nextButton.classList.add(
      "pagination-btn",
      "px-3",
      "py-1",
      "border",
      "rounded-md",
      "hover:bg-gray-200",
      "disabled:opacity-50",
      "disabled:cursor-not-allowed"
    );
    wrapper.appendChild(nextButton);

    nextButton.addEventListener("click", () => {
      if (currentPage < pageCount) {
        currentPage++;
        displayList(items, listElement, rows, currentPage);
        updatePaginationButtons();
      }
    });

    updatePaginationButtons();
  }

  function createPageButton(page) {
    let button = document.createElement("button");
    button.innerText = page;
    button.classList.add(
      "pagination-btn",
      "h-10",
      "px-4",
      "py-1",
      "border",
      "rounded-md",
      "hover:bg-gray-200"
    );

    button.addEventListener("click", function () {
      currentPage = page;
      displayList(dummyArticles, listElement, rows, currentPage);
      updatePaginationButtons();
    });

    return button;
  }

  function updatePaginationButtons() {
    let pageCount = Math.ceil(dummyArticles.length / rows);
    let buttons = paginationElement.querySelectorAll("button");

    buttons.forEach((button) => {
      button.classList.remove("active");
      if (parseInt(button.innerText) === currentPage) {
        button.classList.add("active");
      }
    });

    buttons[0].disabled = currentPage === 1; // Disable "Prev"
    buttons[buttons.length - 1].disabled = currentPage === pageCount; // Disable "Next"
  }

  // --- INISIALISASI ---
  displayList(dummyArticles, listElement, rows, currentPage);
  setupPagination(dummyArticles, paginationElement, rows);
});
