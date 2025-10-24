const checklistData = {
  umkm: [
    { id: "umkm-1", text: "Foto eksterior usaha" },
    { id: "umkm-2", text: "Foto interior/suasana" },
    { id: "umkm-3", text: "Foto produk utama (close-up)" },

    { id: "umkm-4", text: "Foto proses pembuatan (jika ada)" } /* */,
    { id: "umkm-5", text: "Foto pemilik dengan produk" },
    { id: "umkm-6", text: "Foto fasilitas pendukung" },
    { id: "umkm-7", text: "Foto patokan lokasi" },
    { id: "umkm-8", text: "Foto daftar menu" } /* */,
    { id: "umkm-9", text: "Foto 360° dari depan objek" },
  ],
  wisata: [
    { id: "wisata-1", text: "Wide shot lokasi" },
    { id: "wisata-2", text: "Detail unik/menarik" } /* */,
    { id: "wisata-3", text: "Best angle untuk Instagram" } /* */,
    { id: "wisata-4", text: "Golden hour shot (jika memungkinkan)" },
    { id: "wisata-5", text: "Aktivitas yang bisa dilakukan" },
    { id: "wisata-6", text: "Fasilitas pendukung" },

    { id: "wisata-7", text: "Foto Kuliner Khas" } /* */,
    { id: "wisata-8", text: "Foto Flora & Fauna" },
    { id: "wisata-9", text: "Foto Gerbang Masuk & Loket" },
    { id: "wisata-10", text: "Foto Area Parkir" },

    { id: "wisata-11", text: "Foto Peta atau Papan Informasi" } /* */,
    { id: "wisata-12", text: "Foto 360° dari depan objek" },
  ],
};

function updateCheckboxVisual(checkbox) {
  const label = document.querySelector(`label[for="${checkbox.id}"]`); /* */
  if (!label) return;

  const box = label.querySelector("span"); /* */
  const svg = label.querySelector("svg"); /* */
  if (!box || !svg) return; /* */

  if (checkbox.checked) {
    label.style.textDecoration = "line-through"; /* */
    label.style.color = "#6B7280"; /* */
    box.style.backgroundColor = "#34D399"; /* */
    box.style.borderColor = "#34D399"; /* */
    svg.style.display = "block"; /* */
  } else {
    label.style.textDecoration = ""; /* */
    label.style.color = ""; /* */
    box.style.backgroundColor = ""; /* */
    box.style.borderColor = ""; /* */
    svg.style.display = "none"; /* */
  }
}

function createChecklistItemHTML(item) {
  return `
        <div class="checklist-item flex items-center">
            <input type="checkbox" id="${item.id}" class="hidden">
            <label for="${item.id}" class="flex items-center cursor-pointer text-gray-700 w-full"> <span class="w-5 h-5 mr-3 inline-flex items-center justify-center border-2 border-gray-300 rounded-sm transition-colors flex-shrink-0">
                    <svg class="w-3 h-3 text-white hidden" viewBox="0 0 20 20" fill="currentColor"><path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"></path></svg>
                 </span> ${item.text}
            </label>
        </div>
    `; /* */
}

function updateProgress(type) {
  const items = checklistData[type]; /* */
  const progressBar = document.getElementById(`progress-${type}`); /* */
  if (!items || !progressBar) return; /* */
  const checkedCount = items.filter((item) => {
    const checkbox = document.getElementById(item.id); /* */
    if (checkbox) {
      localStorage.setItem(item.id, String(checkbox.checked));
      return checkbox.checked;
    } /* */
    return false;
  }).length; /* */
  const progress = (checkedCount / items.length) * 100; /* */
  progressBar.style.width = `${progress}%`; /* */
}

function initializeChecklists() {
  Object.keys(checklistData).forEach((key) => {
    const type = key;
    const container = document.getElementById(`checklist-${type}`);
    if (container) {
      container.innerHTML = checklistData[type]
        .map(createChecklistItemHTML)
        .join(""); /* */

      checklistData[type].forEach((item) => {
        const checkbox = document.getElementById(item.id); /* */

        if (checkbox) {
          /* */
          const savedState = localStorage.getItem(item.id);
          checkbox.checked = savedState === "true";

          updateCheckboxVisual(checkbox); /* */

          checkbox.addEventListener("change", () => {
            updateCheckboxVisual(checkbox); /* */
            updateProgress(type); /* */
          });
        }
      });
      updateProgress(type); /* */
    }
  });
} /* */

let currentResetType = null;

function initializeResetButtons() {
  document.querySelectorAll(".reset-btn").forEach((button) => {
    button.addEventListener("click", (e) => {
      const target = e.currentTarget;
      if (!target) return;

      const type = target.dataset.type;
      if (type) {
        currentResetType = type;
        document.getElementById("reset-type").textContent = type.toUpperCase();
        document.getElementById("reset-modal").classList.remove("hidden");
      }
    });
  });

  document.getElementById("cancel-reset").addEventListener("click", () => {
    document.getElementById("reset-modal").classList.add("hidden");
    currentResetType = null;
  });

  document.getElementById("confirm-reset").addEventListener("click", () => {
    if (currentResetType) {
      checklistData[currentResetType].forEach((item) => {
        const checkbox = document.getElementById(item.id);
        if (checkbox) {
          checkbox.checked = false;
          updateCheckboxVisual(checkbox);
        }
        localStorage.removeItem(item.id);
      });
      updateProgress(currentResetType);
    }
    document.getElementById("reset-modal").classList.add("hidden");
    currentResetType = null;
  });
}

function initializeTabs() {
  const tabButtons = document.querySelectorAll(".tab-btn"); /* */
  const tabContents = document.querySelectorAll(".tab-content"); /* */

  tabButtons.forEach((button) => {
    button.addEventListener("click", (e) => {
      const target = e.currentTarget; /* */
      if (!target) return;
      const tabId = target.dataset.tab;

      if (!tabId) return; /* */

      tabButtons.forEach((btn) => btn.classList.remove("active"));
      tabContents.forEach((content) => content.classList.remove("active"));

      target.classList.add("active"); /* */
      const newTabContent = document.getElementById(tabId);
      if (newTabContent) newTabContent.classList.add("active");
    });
  }); /* */
}

function initializeMobileMenu() {
  const menuButton = document.getElementById("mobile-menu-button"); /* */
  const menu = document.getElementById("mobile-menu"); /* */
  const menuIcon = document.getElementById("mobile-menu-icon"); /* */
  const navLinks = document.querySelectorAll(".nav-link-mobile"); /* */
  if (menuButton && menu && menuIcon) {
    /* */
    menuButton.addEventListener("click", () => {
      const isHidden = menu.classList.toggle("hidden");
      menuIcon.classList.toggle("fa-bars", isHidden);
      menuIcon.classList.toggle("fa-times", !isHidden);
    }); /* */
  }

  navLinks.forEach((link) => {
    link.addEventListener("click", () => {
      if (menu && menuIcon) {
        menu.classList.add("hidden"); /* */
        menuIcon.classList.add("fa-bars"); /* */
        menuIcon.classList.remove("fa-times"); /* */
      }
    });
  }); /* */
}

document.addEventListener("DOMContentLoaded", () => {
  initializeChecklists();
  initializeResetButtons();
  initializeTabs();
  initializeMobileMenu();
}); /* */
