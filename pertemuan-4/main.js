// File: main.js
// Portfolio Tracker: Form Handling, Search, Filter, Toggle Status, dan Hapus Data.

const projects = [
  {
    id: 1,
    title: "Sistem Inventaris Keuangan",
    category: "Web App",
    budget: 2500000,
    completed: true
  },
  {
    id: 2,
    title: "Sistem Kasir Digital POS",
    category: "Desktop App",
    budget: 5000000,
    completed: true
  },
  {
    id: 3,
    title: "Landing Page Profil Perusahaan",
    category: "Web App",
    budget: 1500000,
    completed: false
  },
  {
    id: 4,
    title: "Aplikasi Presensi GPS Mobile",
    category: "Mobile App",
    budget: 4500000,
    completed: false
  }
];

let selectedCategory = "Semua";

const formatRupiah = (amount) => {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    maximumFractionDigits: 0
  }).format(amount);
};

// Hindari input judul proyek diperlakukan sebagai HTML saat dirender.
const escapeHTML = (value) => {
  return String(value).replace(/[&<>"']/g, (character) => {
    const escapedCharacters = {
      "&": "&amp;",
      "<": "&lt;",
      ">": "&gt;",
      '"': "&quot;",
      "'": "&#039;"
    };
    return escapedCharacters[character];
  });
};

// Statistik selalu mewakili semua proyek, bukan hanya hasil filter pencarian.
const updateStats = () => {
  const totalProjects = projects.length;
  const totalBudget = projects.reduce((total, project) => total + project.budget, 0);
  const completedCount = projects.filter((project) => project.completed).length;

  document.getElementById("stat-total-projects").textContent = totalProjects;
  document.getElementById("stat-total-budget").textContent = formatRupiah(totalBudget);
  document.getElementById("stat-completed-projects").textContent = completedCount;
};

const getFilteredProjects = () => {
  const searchKeyword = document.getElementById("project-search").value
    .trim()
    .toLowerCase();

  return projects.filter((project) => {
    const matchesCategory =
      selectedCategory === "Semua" || project.category === selectedCategory;

    const matchesSearch = project.title.toLowerCase().includes(searchKeyword);

    return matchesCategory && matchesSearch;
  });
};

const renderProjects = () => {
  const container = document.getElementById("project-list");
  const filteredProjects = getFilteredProjects();

  if (filteredProjects.length === 0) {
    container.innerHTML = `
      <div class="empty-state">
        <p>Tidak ada proyek yang cocok dengan pencarian atau kategori ini.</p>
      </div>
    `;
    return;
  }

  container.innerHTML = filteredProjects.map((project) => {
    const badgeClass = project.completed ? "badge-success" : "badge-pending";
    const statusText = project.completed ? "Selesai" : "Dalam Pengerjaan";
    const toggleAccessibleLabel = project.completed
      ? "Ubah status ke Dalam Pengerjaan"
      : "Ubah status ke Selesai";

    return `
      <article class="project-card">
        <div class="project-info">
          <span class="project-category">${escapeHTML(project.category)}</span>
          <h3>${escapeHTML(project.title)}</h3>
          <p class="project-budget">${formatRupiah(project.budget)}</p>
        </div>

        <div class="project-status">
          <span class="badge ${badgeClass}">${statusText}</span>
          <div class="project-actions">
            <button
              type="button"
              class="button button-secondary"
              data-action="toggle"
              data-id="${project.id}"
              aria-label="${toggleAccessibleLabel}: ${escapeHTML(project.title)}"
            >Ubah Status</button>
            <button
              type="button"
              class="button button-danger"
              data-action="delete"
              data-id="${project.id}"
              aria-label="Hapus ${escapeHTML(project.title)}"
            >Hapus</button>
          </div>
        </div>
      </article>
    `;
  }).join("");
};

const refreshDashboard = () => {
  updateStats();
  renderProjects();
};

const showFormMessage = (message, type = "") => {
  const messageElement = document.getElementById("form-message");
  messageElement.textContent = message;
  messageElement.className = `form-message${type ? ` ${type}` : ""}`;
};

document.addEventListener("DOMContentLoaded", () => {
  const projectForm = document.getElementById("project-form");
  const titleInput = document.getElementById("project-title");
  const categoryInput = document.getElementById("project-category");
  const budgetInput = document.getElementById("project-budget");
  const completedInput = document.getElementById("project-completed");
  const searchInput = document.getElementById("project-search");
  const filterButtons = document.querySelectorAll(".btn-filter");
  const projectList = document.getElementById("project-list");

  refreshDashboard();

  // Fitur 1: validasi dan penambahan proyek dari formulir.
  projectForm.addEventListener("submit", (event) => {
    event.preventDefault();

    const title = titleInput.value.trim();
    const category = categoryInput.value;
    const budget = Number(budgetInput.value);

    if (!title) {
      showFormMessage("Judul proyek tidak boleh kosong.", "error");
      titleInput.focus();
      return;
    }

    if (!Number.isFinite(budget) || budget <= 0) {
      showFormMessage("Anggaran harus berupa angka yang lebih besar dari 0.", "error");
      budgetInput.focus();
      return;
    }

    const newProject = {
      id: Date.now(),
      title,
      category,
      budget,
      completed: completedInput.checked
    };

    projects.push(newProject);
    projectForm.reset();
    selectedCategory = "Semua";
    searchInput.value = "";

    filterButtons.forEach((button) => {
      const isActive = button.dataset.category === "Semua";
      button.classList.toggle("active", isActive);
      button.setAttribute("aria-pressed", String(isActive));
    });

    refreshDashboard();
    showFormMessage("Proyek berhasil ditambahkan.", "success");
    titleInput.focus();
  });

  // Fitur 2: pencarian langsung berdasarkan judul, digabung dengan filter kategori.
  searchInput.addEventListener("input", () => {
    renderProjects();
  });

  filterButtons.forEach((button) => {
    button.addEventListener("click", () => {
      selectedCategory = button.dataset.category;

      filterButtons.forEach((filterButton) => {
        const isActive = filterButton === button;
        filterButton.classList.toggle("active", isActive);
        filterButton.setAttribute("aria-pressed", String(isActive));
      });

      renderProjects();
    });
  });

  // Fitur 3: ubah status dan hapus proyek dengan event delegation.
  projectList.addEventListener("click", (event) => {
    const actionButton = event.target.closest("button[data-action]");
    if (!actionButton) return;

    const projectId = Number(actionButton.dataset.id);
    const projectIndex = projects.findIndex((project) => project.id === projectId);
    if (projectIndex === -1) return;

    if (actionButton.dataset.action === "toggle") {
      projects[projectIndex].completed = !projects[projectIndex].completed;
      refreshDashboard();
      return;
    }

    if (actionButton.dataset.action === "delete") {
      const projectTitle = projects[projectIndex].title;
      const shouldDelete = window.confirm(`Hapus proyek "${projectTitle}"?`);
      if (!shouldDelete) return;

      projects.splice(projectIndex, 1);
      refreshDashboard();
    }
  });
});
