document.addEventListener("DOMContentLoaded", () => {
  const mobileMenuButton = document.getElementById("mobile-menu-button");
  const mobileMenu = document.getElementById("mobile-menu");

  if (mobileMenuButton && mobileMenu) {
    mobileMenuButton.addEventListener("click", () => {
      mobileMenu.classList.toggle("hidden");
    });
  }

  AOS.init({
    duration: 800,
    once: true,
  });

  GLightbox({
    selector: ".glightbox",
    touchNavigation: true,
    loop: true,
    openEffect: "zoom",
    closeEffect: "fade",
  });

  function startCountUpAnimation(el) {
    const endVal = parseInt(el.dataset.value || "0", 10);
    if (isNaN(endVal)) return;

    const countUp = new CountUp(el, endVal, {
      startVal: 0,
      duration: 2.5,
      useGrouping: true,
      separator: ",",
    });
    if (!countUp.error) {
      countUp.start();
    } else {
      console.error(countUp.error);
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
      threshold: 0.1,
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

    form.addEventListener("submit", function (e) {
      e.preventDefault();

      if (form.action.includes("YOUR_GOOGLE_FORM") || form.action === "") {
        alert("Form action URL has not been configured.");
        return;
      }

      modalContent.innerHTML = `
                <div class="flex justify-center items-center mb-4">
                    <div class="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
                </div>
                <p class="text-lg text-gray-700">Mengirim pesan...</p>`;

      statusModal.classList.add("flex");
      statusModal.classList.remove("hidden");

      const formData = new FormData(form);
      fetch(form.action, {
        method: "POST",
        body: formData,
        mode: "no-cors",
      })
        .then(() => {
          modalContent.innerHTML = `
                    <div class="text-green-500 text-6xl mb-4"><i class="fas fa-check-circle"></i></div>
                    <h3 class="text-2xl font-bold text-gray-800 mb-2">Terima Kasih!</h3>
                    <p class="text-gray-600 mb-6">Aspirasi Anda telah berhasil terkirim.</p>
                    <button id="close-modal-btn" class="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-6 rounded-full">Tutup</button>`;
          document
            .getElementById("close-modal-btn")
            ?.addEventListener("click", hideModal);
          form.reset();
        })
        .catch((error) => {
          modalContent.innerHTML = `
                    <div class="text-red-500 text-6xl mb-4"><i class="fas fa-times-circle"></i></div>
                    <h3 class="text-2xl font-bold text-gray-800 mb-2">Gagal Mengirim</h3>
                    <p class="text-gray-600 mb-6">Maaf, terjadi kesalahan. Silakan coba lagi nanti.</p>
                    <button id="close-modal-btn" class="bg-gray-700 hover:bg-gray-800 text-white font-bold py-2 px-6 rounded-full">Tutup</button>`;
          document
            .getElementById("close-modal-btn")
            ?.addEventListener("click", hideModal);
          console.error("Error:", error);
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
