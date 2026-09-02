const API_URL = "https://api.yusacoder.com";

// Helper function to format date
function formatDate(dateString) {
  if (!dateString) return "";
  const date = new Date(dateString);
  return date.toLocaleDateString("tr-TR", {
    year: "numeric",
    month: "long",
    day: "numeric"
  });
}

// Function to render categories navigation with client-side caching
async function renderCategoriesNav(activeCategory = null) {
  const container = document.getElementById("categoriesNav");
  if (!container) return;

  try {
    let categories;
    const cachedCategories = sessionStorage.getItem("categories_cache");
    if (cachedCategories) {
      categories = JSON.parse(cachedCategories);
    } else {
      const res = await fetch(`${API_URL}/api/categories`);
      if (!res.ok) throw new Error("Kategoriler alınamadı.");
      categories = await res.json();
      sessionStorage.setItem("categories_cache", JSON.stringify(categories));
    }

    let html = `<li><a href="index.html" class="nav-link ${!activeCategory ? 'active' : ''}">Tümü</a></li>`;
    categories.forEach(cat => {
      const isActive = activeCategory && activeCategory.toLowerCase() === cat.toLowerCase();
      html += `<li><a href="kategori.html?cat=${encodeURIComponent(cat)}" class="nav-link ${isActive ? 'active' : ''}">${cat}</a></li>`;
    });
    container.innerHTML = html;
  } catch (err) {
    console.error("Kategoriler yüklenirken hata:", err);
  }
}

// Function to render news list
function createNewsCard(item) {
  const formattedDate = formatDate(item.created_at);
  const imageUrl = item.image_url || 'https://via.placeholder.com/600x400?text=Haber+Fotografi';

  return `
    <a href="haber.html?slug=${encodeURIComponent(item.slug)}" class="card">
      <div class="card-image-wrapper">
        <img src="${imageUrl}" alt="${item.title}" class="card-image" loading="lazy" onerror="this.src='https://via.placeholder.com/600x400?text=Haber+Fotografi'">
      </div>
      <div class="card-body">
        <div class="card-meta">
          <span class="card-category">${item.category || 'Genel'}</span>
          <span class="card-date">${formattedDate}</span>
        </div>
        <h2 class="card-title">${item.title}</h2>
        <p class="card-description">${item.description || ''}</p>
        <span class="read-more-btn">Devamını Oku &rarr;</span>
      </div>
    </a>
  `;
}

// Search Handler
function setupSearchForm() {
  const form = document.getElementById("searchForm");
  const input = document.getElementById("searchInput");
  if (!form || !input) return;

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const query = input.value.trim();
    if (query) {
      window.location.href = `index.html?q=${encodeURIComponent(query)}`;
    } else {
      window.location.href = `index.html`;
    }
  });
}

// Page Specific Loaders
async function loadHomePage() {
  const container = document.getElementById("newsGrid");
  const titleElement = document.getElementById("pageTitle");
  if (!container) return;

  const urlParams = new URLSearchParams(window.location.search);
  const query = urlParams.get("q");

  let fetchUrl = `${API_URL}/api/news`;
  if (query) {
    fetchUrl = `${API_URL}/api/news/search?q=${encodeURIComponent(query)}`;
    if (titleElement) titleElement.textContent = `Arama Sonuçları: "${query}"`;
    const searchInput = document.getElementById("searchInput");
    if (searchInput) searchInput.value = query;
  } else {
    if (titleElement) titleElement.textContent = "Son Haberler";
  }

  try {
    container.innerHTML = '<div class="loading">Haberler yükleniyor...</div>';
    const res = await fetch(fetchUrl);
    if (!res.ok) throw new Error("Haberler çekilemedi.");
    const news = await res.json();

    if (!news || news.length === 0) {
      container.innerHTML = '<div class="no-results">Aradığınız kriterlere uygun haber bulunamadı.</div>';
      return;
    }

    container.innerHTML = news.map(item => createNewsCard(item)).join("");
  } catch (err) {
    console.error(err);
    container.innerHTML = `<div class="no-results">Haberler yüklenirken bir hata oluştu: ${err.message}</div>`;
  }
}

async function loadCategoryPage() {
  const container = document.getElementById("newsGrid");
  const titleElement = document.getElementById("pageTitle");
  if (!container) return;

  const urlParams = new URLSearchParams(window.location.search);
  const category = urlParams.get("cat");

  if (!category) {
    window.location.href = "index.html";
    return;
  }

  if (titleElement) titleElement.textContent = `Kategori: ${category}`;
  renderCategoriesNav(category);

  try {
    container.innerHTML = '<div class="loading">Kategori haberleri yükleniyor...</div>';
    const res = await fetch(`${API_URL}/api/news/category/${encodeURIComponent(category)}`);
    if (!res.ok) throw new Error("Kategori haberleri alınamadı.");
    const news = await res.json();

    if (!news || news.length === 0) {
      container.innerHTML = '<div class="no-results">Bu kategoride henüz haber bulunmuyor.</div>';
      return;
    }

    container.innerHTML = news.map(item => createNewsCard(item)).join("");
  } catch (err) {
    console.error(err);
    container.innerHTML = `<div class="no-results">Haberler yüklenirken bir hata oluştu: ${err.message}</div>`;
  }
}

async function loadNewsDetailPage() {
  const container = document.getElementById("detailContainer");
  if (!container) return;

  const urlParams = new URLSearchParams(window.location.search);
  const slug = urlParams.get("slug");

  if (!slug) {
    window.location.href = "index.html";
    return;
  }

  try {
    container.innerHTML = '<div class="loading">Haber detayları yükleniyor...</div>';
    const res = await fetch(`${API_URL}/api/news/${encodeURIComponent(slug)}`);
    if (!res.ok) throw new Error("Haber detayı bulunamadı.");
    const item = await res.json();

    const formattedDate = formatDate(item.created_at);
    const imageUrl = item.image_url || 'https://via.placeholder.com/800x450?text=Haber+Fotografi';

    document.title = `${item.title} - Mini Haber`;

    container.innerHTML = `
      <div class="detail-header">
        <h1 class="detail-title">${item.title}</h1>
        <div class="detail-meta">
          <span class="card-category">${item.category || 'Genel'}</span>
          <span><strong>Yazar:</strong> ${item.author || 'Yayıncı'}</span>
          <span><strong>Tarih:</strong> ${formattedDate}</span>
        </div>
      </div>
      <img src="${imageUrl}" alt="${item.title}" class="detail-image" onerror="this.src='https://via.placeholder.com/800x450?text=Haber+Fotografi'">
      <div class="detail-description">${item.description || ''}</div>
      <div class="detail-content">${item.content || ''}</div>
    `;
  } catch (err) {
    console.error(err);
    container.innerHTML = `<div class="no-results">Haber yüklenirken bir hata oluştu veya haber bulunamadı.</div>`;
  }
}

// Global Init
document.addEventListener("DOMContentLoaded", () => {
  setupSearchForm();

  const path = window.location.pathname;
  if (path.includes("kategori.html")) {
    loadCategoryPage();
  } else if (path.includes("haber.html")) {
    renderCategoriesNav();
    loadNewsDetailPage();
  } else {
    renderCategoriesNav();
    loadHomePage();
  }
});
