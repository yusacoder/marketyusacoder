// State Management
let products = [];
let filteredProducts = [];
let favorites = JSON.parse(localStorage.getItem('favorites')) || [];
let currentPage = 1;
const itemsPerPage = 8;
let currentCategory = 'all';
let searchQuery = '';
let showOnlyFavorites = false;

// DOM Elements
const productList = document.getElementById('product-list');
const searchInput = document.getElementById('search-input');
const categoryFilters = document.getElementById('category-filters');
const pagination = document.getElementById('pagination');
const currentPageEl = document.getElementById('current-page');
const totalPagesEl = document.getElementById('total-pages');
const prevPageBtn = document.getElementById('prev-page');
const nextPageBtn = document.getElementById('next-page');
const showFavoritesBtn = document.getElementById('show-favorites');
const productDetail = document.getElementById('product-detail');

// Initialize Application
async function init() {
    try {
        const response = await fetch('data.json');
        products = await response.json();

        // Determine which page we are on
        if (window.location.pathname.includes('product.html')) {
            renderProductDetail();
        } else {
            updateFilteredProducts();
            setupEventListeners();
        }
    } catch (error) {
        console.error('Veri çekme hatası:', error);
        if (productList) productList.innerHTML = '<p class="error">Ürünler yüklenirken bir hata oluştu.</p>';
    }
}

// Event Listeners
function setupEventListeners() {
    if (searchInput) {
        searchInput.addEventListener('input', (e) => {
            searchQuery = e.target.value.toLowerCase();
            currentPage = 1;
            updateFilteredProducts();
        });
    }

    if (categoryFilters) {
        categoryFilters.addEventListener('click', (e) => {
            if (e.target.classList.contains('filter-btn')) {
                // Update active button UI
                document.querySelectorAll('.filter-btn').forEach(btn => btn.classList.remove('active'));
                e.target.classList.add('active');

                currentCategory = e.target.dataset.category;
                showOnlyFavorites = false; // Kategori seçilince favori filtresini kapat
                currentPage = 1;
                updateFilteredProducts();
            }
        });
    }

    if (prevPageBtn) {
        prevPageBtn.addEventListener('click', () => {
            if (currentPage > 1) {
                currentPage--;
                renderProducts();
            }
        });
    }

    if (nextPageBtn) {
        nextPageBtn.addEventListener('click', () => {
            const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);
            if (currentPage < totalPages) {
                currentPage++;
                renderProducts();
            }
        });
    }

    if (showFavoritesBtn) {
        showFavoritesBtn.addEventListener('click', () => {
            showOnlyFavorites = !showOnlyFavorites;
            showFavoritesBtn.classList.toggle('active', showOnlyFavorites);
            currentPage = 1;
            updateFilteredProducts();
        });
    }
}

// Filter Logic
function updateFilteredProducts() {
    filteredProducts = products.filter(product => {
        const matchesCategory = currentCategory === 'all' || product.category === currentCategory;
        const matchesSearch = product.name.toLowerCase().includes(searchQuery) ||
                              product.description.toLowerCase().includes(searchQuery) ||
                              product.id.toLowerCase().includes(searchQuery);
        const matchesFavorites = !showOnlyFavorites || favorites.includes(product.id);

        return matchesCategory && matchesSearch && matchesFavorites;
    });

    renderProducts();
}

// Render Products to Grid
function renderProducts() {
    if (!productList) return;

    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const paginatedItems = filteredProducts.slice(startIndex, endIndex);
    const totalPages = Math.ceil(filteredProducts.length / itemsPerPage) || 1;

    productList.innerHTML = '';

    if (paginatedItems.length === 0) {
        productList.innerHTML = '<p class="no-results">Ürün bulunamadı.</p>';
        pagination.style.display = 'none';
        return;
    }

    pagination.style.display = 'flex';

    paginatedItems.forEach(product => {
        const isFav = favorites.includes(product.id);
        const card = document.createElement('div');
        card.className = 'product-card';
        card.dataset.category = product.category;

        card.innerHTML = `
            <div class="card-badges">
                ${product.popular ? '<span class="badge badge-popular">🔥 Popüler</span>' : ''}
                ${product.new ? '<span class="badge badge-new">🆕 Yeni</span>' : ''}
                ${!product.stock ? '<span class="badge badge-stock-out">Tükendi</span>' : ''}
            </div>
            <button class="fav-btn ${isFav ? 'active' : ''}" onclick="toggleFavorite(event, '${product.id}')">
                <i class="${isFav ? 'fas' : 'far'} fa-heart"></i>
            </button>
            <img src="${product.images[0]}" alt="${product.name}" class="product-image">
            <div class="product-info">
                <span class="product-category">${product.category}</span>
                <a href="product.html?id=${product.id}" class="product-name">${product.name}</a>
                <span class="product-price">${product.price.toFixed(2)} TL</span>
                <div class="card-footer">
                    <a href="product.html?id=${product.id}" class="btn btn-outline">İncele</a>
                    <button onclick="buyNow('${product.id}')" class="btn btn-primary" ${!product.stock ? 'disabled' : ''}>
                        Satın Al
                    </button>
                </div>
            </div>
        `;
        productList.appendChild(card);
    });

    // Update pagination UI
    currentPageEl.textContent = currentPage;
    totalPagesEl.textContent = totalPages;
    prevPageBtn.disabled = currentPage === 1;
    nextPageBtn.disabled = currentPage === totalPages;

    window.scrollTo({ top: 0, behavior: 'smooth' });
}

// Favorite System
function toggleFavorite(event, id) {
    event.preventDefault();
    event.stopPropagation();

    const index = favorites.indexOf(id);
    const isAdding = index === -1;

    if (!isAdding) {
        favorites.splice(index, 1);
        showToast('Favorilerden çıkarıldı');
    } else {
        favorites.push(id);
        showToast('Favorilere eklendi');
    }

    localStorage.setItem('favorites', JSON.stringify(favorites));

    // Update UI without reload
    const target = event.currentTarget;
    if (target.classList.contains('fav-btn')) {
        // Grid view toggle
        target.classList.toggle('active', isAdding);
        const icon = target.querySelector('i');
        if (icon) {
            icon.className = isAdding ? 'fas fa-heart' : 'far fa-heart';
        }

        if (showOnlyFavorites && !isAdding) {
            updateFilteredProducts();
        }
    } else if (target.closest('.detail-actions')) {
        // Detail page toggle
        target.classList.toggle('active', isAdding);
    } else {
        // Fallback for other cases
        if (showOnlyFavorites) {
            updateFilteredProducts();
        } else {
            renderProducts();
        }
    }
}

// WhatsApp Integration
function buyNow(id) {
    const product = products.find(p => p.id === id);
    if (!product) return;

    const phone = "905000000000"; // Buraya gerçek numara gelecek
    const baseUrl = window.location.origin + window.location.pathname.substring(0, window.location.pathname.lastIndexOf('/') + 1);
    const url = baseUrl + `product.html?id=${id}`;
    const text = `Merhaba, bir ürün hakkında detaylı bilgi almak istiyorum.\n\n` +
                 `Ürün Adı: ${product.name}\n` +
                 `Ürün ID: ${product.id}\n` +
                 `Fiyat: ${product.price.toFixed(2)} TL\n` +
                 `Ürün Linki: ${url}`;

    const whatsappUrl = `https://wa.me/${phone}?text=${encodeURIComponent(text)}`;
    window.open(whatsappUrl, '_blank');
}

// Product Detail Logic
function renderProductDetail() {
    if (!productDetail) return;

    const params = new URLSearchParams(window.location.search);
    const productId = params.get('id');
    const product = products.find(p => p.id === productId);

    if (!product) {
        productDetail.innerHTML = '<p class="error">Ürün bulunamadı.</p>';
        return;
    }

    document.title = `${product.name} | Game Market`;

    productDetail.innerHTML = `
        <div class="detail-container" data-category="${product.category}">
            <div class="gallery-container">
                <img src="${product.images[0]}" alt="${product.name}" id="main-product-image" class="main-image">
                <div class="thumbnail-grid">
                    ${product.images.map((img, index) => `
                        <img src="${img}" alt="${product.name}" class="thumb-image ${index === 0 ? 'active' : ''}" onclick="changeMainImage('${img}', this)">
                    `).join('')}
                </div>
            </div>
            <div class="detail-info">
                <span class="product-category">${product.category}</span>
                <h1>${product.name}</h1>
                <div class="detail-price">${product.price.toFixed(2)} TL</div>
                <p class="detail-desc">${product.description}</p>

                <div class="detail-meta">
                    <div class="meta-item">
                        <span class="meta-label">Ürün ID:</span>
                        <span class="meta-value">${product.id}</span>
                    </div>
                    <div class="meta-item">
                        <span class="meta-label">Stok Durumu:</span>
                        <span class="meta-value" style="color: ${product.stock ? 'var(--success-color)' : 'var(--error-color)'}">
                            ${product.stock ? 'Stokta Var' : 'Tükendi'}
                        </span>
                    </div>
                </div>

                <div class="detail-actions">
                    <button onclick="buyNow('${product.id}')" class="btn btn-primary whatsapp-btn" ${!product.stock ? 'disabled' : ''}>
                        <i class="fab fa-whatsapp"></i> WhatsApp ile Satın Al
                    </button>
                    <button onclick="copyID('${product.id}')" class="btn btn-outline copy-btn">
                        <i class="fas fa-copy"></i> ID Kopyala
                    </button>
                    <button class="btn btn-outline fav-detail-btn ${favorites.includes(product.id) ? 'active' : ''}" onclick="toggleFavorite(event, '${product.id}')">
                        <i class="fas fa-heart"></i>
                    </button>
                </div>
            </div>
        </div>
    `;
}

// Utility Functions
function changeMainImage(src, thumb) {
    document.getElementById('main-product-image').src = src;
    document.querySelectorAll('.thumb-image').forEach(t => t.classList.remove('active'));
    thumb.classList.add('active');
}

function copyID(id) {
    navigator.clipboard.writeText(id).then(() => {
        showToast('Ürün ID kopyalandı!');
    });
}

function showToast(message) {
    const toast = document.getElementById('toast');
    toast.textContent = message;
    toast.classList.add('show');
    setTimeout(() => {
        toast.classList.remove('show');
    }, 3000);
}

// Run App
init();
