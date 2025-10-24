// Constants for configuration
const CONFIG = {
  ANIMATION_DURATION_MS: 800,
  COUNTUP_DURATION_SEC: 2.5,
  INTERSECTION_THRESHOLD: 0.1,
  FORM_SUBMIT_TIMEOUT_MS: 10000,
};

document.addEventListener("DOMContentLoaded", () => {
  const mobileMenuButton = document.getElementById("mobile-menu-button");
  const mobileMenu = document.getElementById("mobile-menu");

  if (mobileMenuButton && mobileMenu) {
    mobileMenuButton.addEventListener("click", () => {
      const isExpanded = mobileMenu.classList.contains("hidden");
      mobileMenu.classList.toggle("hidden");
      mobileMenuButton.setAttribute("aria-expanded", isExpanded ? "true" : "false");
    });
  }

  // Initialize libraries with error boundaries
  try {
    if (typeof AOS !== "undefined") {
      AOS.init({
        duration: CONFIG.ANIMATION_DURATION_MS,
        once: true,
        offset: 100,
      });
    }
  } catch (error) {
    console.warn("AOS initialization failed:", error);
  }

  try {
    if (typeof GLightbox !== "undefined") {
      GLightbox({
        selector: ".glightbox",
        touchNavigation: true,
        loop: true,
        openEffect: "zoom",
        closeEffect: "fade",
      });
    }
  } catch (error) {
    console.warn("GLightbox initialization failed:", error);
  }

  function startCountUpAnimation(el) {
    const endVal = parseInt(el.dataset.value || "0", 10);
    if (isNaN(endVal)) return;

    try {
      if (typeof CountUp === "undefined") {
        el.textContent = endVal.toLocaleString("id-ID");
        return;
      }

      const countUp = new CountUp(el, endVal, {
        startVal: 0,
        duration: CONFIG.COUNTUP_DURATION_SEC,
        useGrouping: true,
        separator: ",",
      });
      
      if (!countUp.error) {
        countUp.start();
      } else {
        el.textContent = endVal.toLocaleString("id-ID");
      }
    } catch (error) {
      el.textContent = endVal.toLocaleString("id-ID");
    }
  }

  const observer = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        if (entry.isIntersecting) {
          const el = entry.target;
          startCountUpAnimation(el);
          observer.unobserve(el);
        }
      }
    },
    {
      threshold: CONFIG.INTERSECTION_THRESHOLD,
    }
  );

  function setupObservers() {
    const numberElements = document.querySelectorAll(".count-up-number");
    for (const el of numberElements) {
      el.textContent = "0";
      observer.observe(el);
    }
  }
  setupObservers();

  const form = document.getElementById("aspirasi-form");
  const statusModal = document.getElementById("status-modal");
  const modalContent = document.getElementById("modal-content");

  if (form && statusModal && modalContent) {
    function hideModal() {
      statusModal.classList.add("hidden");
      statusModal.classList.remove("flex");
    }

    // Validate form configuration on load
    if (!form.action || form.action.includes("YOUR_GOOGLE_FORM") || form.action === "") {
      form.parentElement.innerHTML = `
        <div class="rounded-lg bg-yellow-50 border border-yellow-200 p-6 text-center">
          <i class="fas fa-exclamation-triangle text-yellow-600 text-4xl mb-3"></i>
          <h3 class="text-lg font-semibold text-gray-800 mb-2">Form Tidak Tersedia</h3>
          <p class="text-gray-600">Form aspirasi sedang dalam pemeliharaan. Silakan coba lagi nanti atau hubungi kami melalui kontak langsung.</p>
        </div>
      `;
      return;
    }

    // Sanitize input function
    const sanitizeInput = (input) => {
      const temp = document.createElement("div");
      temp.textContent = input;
      return temp.innerHTML;
    };

    form.addEventListener("submit", function (e) {
      e.preventDefault();

      // Show loading modal
      modalContent.innerHTML = `
        <div class="flex justify-center items-center mb-4">
          <div class="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
        </div>
        <p class="text-lg text-gray-700">Mengirim pesan...</p>`;

      statusModal.classList.add("flex");
      statusModal.classList.remove("hidden");

      // Sanitize form data
      const formData = new FormData(form);
      const sanitizedData = new FormData();
      
      for (let [key, value] of formData.entries()) {
        if (typeof value === "string") {
          sanitizedData.append(key, sanitizeInput(value));
        } else {
          sanitizedData.append(key, value);
        }
      }

      // Add timeout controller
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), CONFIG.FORM_SUBMIT_TIMEOUT_MS);

      fetch(form.action, {
        method: "POST",
        body: sanitizedData,
        mode: "no-cors",
        signal: controller.signal,
      })
        .then(() => {
          clearTimeout(timeoutId);
          modalContent.innerHTML = `
            <div class="text-green-500 text-6xl mb-4"><i class="fas fa-check-circle"></i></div>
            <h3 class="text-2xl font-bold text-gray-800 mb-2">Terima Kasih!</h3>
            <p class="text-gray-600 mb-6">Aspirasi Anda telah diterima. Kami akan merespons segera.</p>
            <button id="close-modal-btn" class="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-6 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500">Tutup</button>`;
          document
            .getElementById("close-modal-btn")
            ?.addEventListener("click", hideModal);
          form.reset();
        })
        .catch((error) => {
          clearTimeout(timeoutId);
          let errorMessage = "Maaf, terjadi kesalahan. Silakan coba lagi nanti.";
          
          if (error.name === "AbortError") {
            errorMessage = "Waktu pengiriman habis. Silakan periksa koneksi internet Anda dan coba lagi.";
          }
          
          modalContent.innerHTML = `
            <div class="text-red-500 text-6xl mb-4"><i class="fas fa-times-circle"></i></div>
            <h3 class="text-2xl font-bold text-gray-800 mb-2">Gagal Mengirim</h3>
            <p class="text-gray-600 mb-6">${errorMessage}</p>
            <button id="close-modal-btn" class="bg-gray-700 hover:bg-gray-800 text-white font-bold py-2 px-6 rounded-full focus:outline-none focus:ring-2 focus:ring-gray-500">Tutup</button>`;
          document
            .getElementById("close-modal-btn")
            ?.addEventListener("click", hideModal);
        });
    });

    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape" && !statusModal.classList.contains("hidden")) {
        hideModal();
      }
    });

    statusModal.addEventListener("click", (e) => {
      if (e.target === statusModal) {
        hideModal();
      }
    });
  }
});
