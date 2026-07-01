/* =====================================================
   GAMEMARKET — app.js
   Vanilla JS · No frameworks · Fast & lightweight
   ===================================================== */

'use strict';

// ── Category accent colors (matches CSS vars) ──────────────────────────────
const CAT_COLORS = {
  PUBG:     '#e84a00',
  Valorant: '#ff4655',
  Steam:    '#1b9edb',
  Roblox:   '#00b2ff',
  FC24:     '#00c470',
  LoL:      '#c69b3a',
};

const CAT_EMOJIS = {
  PUBG:     '🔫',
  Valorant: '🎯',
  Steam:    '♨️',
  Roblox:   '🟦',
  FC24:     '⚽',
  LoL:      '⚔️',
};

// ── Helpers ────────────────────────────────────────────────────────────────

function formatPrice(price) {
  return price.toFixed(2).replace('.', ',') + ' ₺';
}

function getCatColor(cat) {
  return CAT_COLORS[cat] || '#e94560';
}

function toast(msg, type = 'success', duration = 2500) {
  const container = document.getElementById('toastContainer');
  if (!container) return;
  const el = document.createElement('div');
  el.className = `toast ${type}`;
  el.innerHTML = msg;
  container.appendChild(el);
  setTimeout(() => {
    el.style.opacity = '0';
    el.style.transition = 'opacity 0.3s';
    setTimeout(() => el.remove(), 300);
  }, duration);
}

function copyToClipboard(text) {
  if (navigator.clipboard) {
    navigator.clipboard.writeText(text).catch(() => {});
  } else {
    const ta = document.createElement('textarea');
    ta.value = text;
    ta.style.position = 'fixed';
    ta.style.opacity = '0';
    document.body.appendChild(ta);
    ta.select();
    document.execCommand('copy');
    ta.remove();
  }
}

/**
 * Reusable debounce helper to limit execution frequency of a function.
 */
function debounce(fn, delay) {
  let timeoutId;
  return (...args) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => fn(...args), delay);
  };
}

// ── Favorites (localStorage) ───────────────────────────────────────────────

const Favorites = {
  KEY: 'gm_favorites',
  get() {
    try { return JSON.parse(localStorage.getItem(this.KEY)) || []; }
    catch { return []; }
  },
  has(id) { return this.get().includes(id); },
  toggle(id) {
    const favs = this.get();
    const idx = favs.indexOf(id);
    if (idx === -1) favs.push(id);
    else favs.splice(idx, 1);
    localStorage.setItem(this.KEY, JSON.stringify(favs));
    return idx === -1; // true = added
  },
  count() { return this.get().length; }
};

// ── Data fetcher ────────────────────────────────────────────────────────────

async function fetchData() {
  const res = await fetch('data.json');
  if (!res.ok) throw new Error('Veri yüklenemedi.');
  return res.json();
}

// ══════════════════════════════════════════════════════════════════════════════
//  MARKET PAGE (index.html)
// ══════════════════════════════════════════════════════════════════════════════

const Market = {
  allProducts: [],
  whatsapp: '',
  filtered: [],
  currentPage: 1,
  perPage: 12,
  activeCategory: 'all',
  sortBy: 'default',
  searchQuery: '',
  showFavs: false,

  async init() {
    try {
      const data = await fetchData();
      this.allProducts = data.products || [];
      this.whatsapp = data.whatsapp || '';
      this.buildCategoryFilters();
      this.bindEvents();
      this.applyFilters();
      this.updateFavCount();
    } catch (e) {
      document.getElementById('productsGrid').innerHTML =
        `<div class="empty-state"><div class="empty-icon">⚠️</div><h3>Veri yüklenemedi</h3><p>${e.message}</p></div>`;
    }
  },

  buildCategoryFilters() {
    const categories = [...new Set(this.allProducts.map(p => p.category))];
    const container = document.getElementById('categoryFilters');

    categories.forEach(cat => {
      const btn = document.createElement('button');
      btn.className = 'cat-btn';
      btn.dataset.cat = cat;
      btn.innerHTML = `${CAT_EMOJIS[cat] || '🎮'} ${cat}`;
      btn.style.setProperty('--cat-color', getCatColor(cat));
      container.appendChild(btn);
    });
  },

  bindEvents() {
    // Category buttons
    document.getElementById('categoryFilters').addEventListener('click', e => {
      const btn = e.target.closest('.cat-btn');
      if (!btn) return;
      document.querySelectorAll('.cat-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      this.activeCategory = btn.dataset.cat;
      this.currentPage = 1;
      this.applyFilters();
    });

    // Debounced filter to avoid expensive operations on every keystroke
    const debouncedApplyFilters = debounce(() => this.applyFilters(), 300);

    // Search (desktop)
    const searchInput = document.getElementById('searchInput');
    if (searchInput) {
      searchInput.addEventListener('input', () => {
        this.searchQuery = searchInput.value.trim().toLowerCase();
        const mob = document.getElementById('searchInputMobile');
        if (mob) mob.value = searchInput.value;
        this.currentPage = 1;
        debouncedApplyFilters();
      });
    }

    // Search (mobile)
    const mobileSearch = document.getElementById('searchInputMobile');
    if (mobileSearch) {
      mobileSearch.addEventListener('input', () => {
        this.searchQuery = mobileSearch.value.trim().toLowerCase();
        const desk = document.getElementById('searchInput');
        if (desk) desk.value = mobileSearch.value;
        this.currentPage = 1;
        debouncedApplyFilters();
      });
    }

    // Sort
    document.getElementById('sortSelect').addEventListener('change', e => {
      this.sortBy = e.target.value;
      this.currentPage = 1;
      this.applyFilters();
    });

    // Favorites nav button
    document.getElementById('navFavBtn').addEventListener('click', () => {
      this.showFavs = !this.showFavs;
      document.getElementById('viewFavs').classList.toggle('active', this.showFavs);
      document.getElementById('viewAll').classList.toggle('active', !this.showFavs);
      this.currentPage = 1;
      this.applyFilters();
    });

    // View toggle buttons
    document.getElementById('viewAll').addEventListener('click', () => {
      this.showFavs = false;
      document.getElementById('viewAll').classList.add('active');
      document.getElementById('viewFavs').classList.remove('active');
      this.currentPage = 1;
      this.applyFilters();
    });

    document.getElementById('viewFavs').addEventListener('click', () => {
      this.showFavs = true;
      document.getElementById('viewFavs').classList.add('active');
      document.getElementById('viewAll').classList.remove('active');
      this.currentPage = 1;
      this.applyFilters();
    });
  },

  applyFilters() {
    let products = [...this.allProducts];

    // Favs view
    if (this.showFavs) {
      const favIds = Favorites.get();
      products = products.filter(p => favIds.includes(p.id));
    }

    // Category
    if (this.activeCategory !== 'all') {
      products = products.filter(p => p.category === this.activeCategory);
    }

    // Search
    if (this.searchQuery) {
      products = products.filter(p =>
        p.name.toLowerCase().includes(this.searchQuery) ||
        p.id.toLowerCase().includes(this.searchQuery) ||
        p.category.toLowerCase().includes(this.searchQuery) ||
        p.description.toLowerCase().includes(this.searchQuery)
      );
    }

    // Sort
    switch (this.sortBy) {
      case 'price-asc':  products.sort((a, b) => a.price - b.price); break;
      case 'price-desc': products.sort((a, b) => b.price - a.price); break;
      case 'name-asc':   products.sort((a, b) => a.name.localeCompare(b.name, 'tr')); break;
      case 'popular':    products.sort((a, b) => Number(b.popular) - Number(a.popular)); break;
      case 'new':        products.sort((a, b) => Number(b.new) - Number(a.new)); break;
    }

    this.filtered = products;
    this.renderGrid();
    this.renderPagination();
    this.updateResultsCount();
  },

  renderGrid() {
    const grid = document.getElementById('productsGrid');
    const start = (this.currentPage - 1) * this.perPage;
    const page = this.filtered.slice(start, start + this.perPage);

    if (page.length === 0) {
      grid.innerHTML = `
        <div class="empty-state">
          <div class="empty-icon">${this.showFavs ? '💔' : '🔍'}</div>
          <h3>${this.showFavs ? 'Hiç favorin yok' : 'Sonuç bulunamadı'}</h3>
          <p>${this.showFavs ? 'Ürünleri favorilere eklemek için ❤️ butonuna bas.' : 'Farklı bir arama veya kategori dene.'}</p>
        </div>`;
      return;
    }

    grid.innerHTML = page.map(p => this.cardHTML(p)).join('');

    // Bind card events
    grid.querySelectorAll('.btn-fav-card').forEach(btn => {
      btn.addEventListener('click', e => {
        e.stopPropagation();
        e.preventDefault();
        const id = btn.dataset.id;
        const added = Favorites.toggle(id);
        btn.classList.toggle('active', Favorites.has(id));
        toast(added ? '❤️ Favorilere eklendi' : '💔 Favorilerden çıkarıldı', added ? 'success' : 'warning');
        this.updateFavCount();
        if (this.showFavs) this.applyFilters();
      });
    });

    grid.querySelectorAll('.btn-copy-id').forEach(btn => {
      btn.addEventListener('click', e => {
        e.stopPropagation();
        e.preventDefault();
        const id = btn.dataset.id;
        copyToClipboard(id);
        btn.classList.add('copied');
        btn.innerHTML = '✓';
        setTimeout(() => { btn.classList.remove('copied'); btn.innerHTML = '📋'; }, 1800);
        toast(`📋 ID kopyalandı: ${id}`, 'info');
      });
    });
  },

  cardHTML(p) {
    const color = getCatColor(p.category);
    const isFav = Favorites.has(p.id);
    const imgSrc = (p.images && p.images[0]) || 'https://placehold.co/400x240/13131f/555577?text=Ürün';

    return `
    <div class="product-card" style="--cat-color:${color}" onclick="location.href='product.html?id=${encodeURIComponent(p.id)}'">
      ${!p.stock ? `<div class="card-stock-out"><span>Tükendi</span></div>` : ''}

      <div class="card-img-wrap">
        <img src="${imgSrc}" alt="${p.name}" loading="lazy" onerror="this.src='https://placehold.co/400x240/13131f/555577?text=Görsel+Yok'" />
        <div class="card-badges">
          ${p.popular ? `<span class="badge badge-popular">🔥 Popüler</span>` : ''}
          ${p.new     ? `<span class="badge badge-new">🆕 Yeni</span>` : ''}
          ${!p.stock  ? `<span class="badge badge-out">❌ Tükendi</span>` : ''}
        </div>
        <div class="card-cat-badge" style="color:${color}">${CAT_EMOJIS[p.category] || ''} ${p.category}</div>
        <button class="btn-fav-card ${isFav ? 'active' : ''}" data-id="${p.id}" title="Favorilere ekle">
          ${isFav ? '❤️' : '🤍'}
        </button>
      </div>

      <div class="card-body">
        <div class="card-id"># ${p.id}</div>
        <div class="card-name">${p.name}</div>
        <div class="card-footer">
          <div class="card-price">${formatPrice(p.price)}</div>
          <div class="card-actions">
            <button class="btn-copy-id" data-id="${p.id}" title="ID kopyala">📋</button>
            <a href="product.html?id=${encodeURIComponent(p.id)}" class="btn-detail" onclick="event.stopPropagation()">Detay →</a>
          </div>
        </div>
      </div>
    </div>`;
  },

  renderPagination() {
    const total = Math.ceil(this.filtered.length / this.perPage);
    const pg = document.getElementById('pagination');
    if (total <= 1) { pg.innerHTML = ''; return; }

    let html = `<button class="page-btn" id="pgPrev" ${this.currentPage === 1 ? 'disabled' : ''}>‹ Önceki</button>`;

    for (let i = 1; i <= total; i++) {
      if (total > 7) {
        if (i === 1 || i === total || (i >= this.currentPage - 1 && i <= this.currentPage + 1)) {
          html += `<button class="page-btn ${i === this.currentPage ? 'active' : ''}" data-page="${i}">${i}</button>`;
        } else if (i === this.currentPage - 2 || i === this.currentPage + 2) {
          html += `<span style="color:var(--text-muted);align-self:center">…</span>`;
        }
      } else {
        html += `<button class="page-btn ${i === this.currentPage ? 'active' : ''}" data-page="${i}">${i}</button>`;
      }
    }

    html += `<button class="page-btn" id="pgNext" ${this.currentPage === total ? 'disabled' : ''}>Sonraki ›</button>`;
    pg.innerHTML = html;

    pg.querySelectorAll('[data-page]').forEach(btn => {
      btn.addEventListener('click', () => {
        this.currentPage = Number(btn.dataset.page);
        this.renderGrid();
        this.renderPagination();
        window.scrollTo({ top: 0, behavior: 'smooth' });
      });
    });

    const prev = pg.querySelector('#pgPrev');
    const next = pg.querySelector('#pgNext');
    if (prev) prev.addEventListener('click', () => { if (this.currentPage > 1) { this.currentPage--; this.renderGrid(); this.renderPagination(); window.scrollTo({ top: 0, behavior: 'smooth' }); } });
    if (next) next.addEventListener('click', () => { if (this.currentPage < total) { this.currentPage++; this.renderGrid(); this.renderPagination(); window.scrollTo({ top: 0, behavior: 'smooth' }); } });
  },

  updateResultsCount() {
    const el = document.getElementById('resultsCount');
    if (el) el.textContent = `${this.filtered.length} ürün`;
  },

  updateFavCount() {
    const el = document.getElementById('navFavCount');
    if (el) el.textContent = Favorites.count();
  }
};

// ══════════════════════════════════════════════════════════════════════════════
//  PRODUCT DETAIL PAGE (product.html)
// ══════════════════════════════════════════════════════════════════════════════

const ProductPage = {
  product: null,
  whatsapp: '',
  currentImg: 0,

  async init() {
    const params = new URLSearchParams(window.location.search);
    const id = params.get('id');
    if (!id) { this.renderError('Ürün ID bulunamadı.'); return; }

    try {
      const data = await fetchData();
      const product = (data.products || []).find(p => p.id === id);
      this.whatsapp = data.whatsapp || '';
      if (!product) { this.renderError(`"${id}" ID'li ürün bulunamadı.`); return; }
      this.product = product;
      document.title = `${product.name} — GameMarket`;
      this.render();
    } catch (e) {
      this.renderError(e.message);
    }
  },

  render() {
    const p = this.product;
    const color = getCatColor(p.category);
    const isFav = Favorites.has(p.id);
    const images = (p.images && p.images.length) ? p.images : ['https://placehold.co/800x500/13131f/555577?text=Görsel+Yok'];
    const pageURL = encodeURIComponent(window.location.href);

    const waMsg = encodeURIComponent(
      `Merhaba! Şu ürün hakkında bilgi almak istiyorum:\n\n` +
      `🎮 Ürün: ${p.name}\n` +
      `🔖 ID: ${p.id}\n` +
      `💰 Fiyat: ${formatPrice(p.price)}\n` +
      `🔗 Link: ${window.location.href}\n\n` +
      `Detay almak istiyorum.`
    );

    const waLink = `https://wa.me/${this.whatsapp.replace(/\D/g, '')}?text=${waMsg}`;

    const html = `
    <nav class="breadcrumb">
      <a href="index.html">🏠 Market</a>
      <span>›</span>
      <a href="index.html?cat=${encodeURIComponent(p.category)}">${CAT_EMOJIS[p.category] || ''} ${p.category}</a>
      <span>›</span>
      <span>${p.name}</span>
    </nav>

    <div class="detail-layout">

      <!-- GALLERY -->
      <div class="gallery" id="gallery">
        <div class="gallery-main">
          ${images.map((src, i) => `
            <img
              src="${src}"
              alt="${p.name} görsel ${i + 1}"
              class="${i === 0 ? 'active' : 'hidden'}"
              id="gImg${i}"
              onerror="this.src='https://placehold.co/800x500/13131f/555577?text=Görsel+Yok'"
            />
          `).join('')}
          ${images.length > 1 ? `
            <button class="gallery-nav prev" id="galPrev">‹</button>
            <button class="gallery-nav next" id="galNext">›</button>
          ` : ''}
        </div>

        ${images.length > 1 ? `
          <div class="gallery-thumbnails" id="thumbs">
            ${images.map((src, i) => `
              <div class="gallery-thumb ${i === 0 ? 'active' : ''}" data-idx="${i}">
                <img src="${src}" alt="Küçük resim ${i + 1}" onerror="this.src='https://placehold.co/72x52/13131f/555577?text=?'" />
              </div>
            `).join('')}
          </div>
          <div class="gallery-counter" id="galCounter">1 / ${images.length}</div>
        ` : ''}
      </div>

      <!-- INFO PANEL -->
      <div class="detail-info">
        <div class="detail-cat-badge" style="background:${color}22;color:${color};border-color:${color}55">
          ${CAT_EMOJIS[p.category] || '🎮'} ${p.category}
        </div>

        <h1 class="detail-name">${p.name}</h1>

        <div class="detail-badges-row">
          ${p.popular ? `<span class="badge badge-popular">🔥 Popüler Ürün</span>` : ''}
          ${p.new     ? `<span class="badge badge-new">🆕 Yeni Ürün</span>` : ''}
        </div>

        <div class="detail-id-row">
          <span class="id-label">Ürün ID</span>
          <span class="id-value">${p.id}</span>
          <button class="btn-copy-id-detail" id="copyIdBtn">📋 Kopyala</button>
        </div>

        <div class="detail-stock">
          <div class="stock-dot ${p.stock ? 'in' : 'out'}"></div>
          ${p.stock
            ? `<span style="color:#00c470;font-weight:700">Stokta Mevcut</span>`
            : `<span style="color:#e94560;font-weight:700">Tükendi</span>`}
        </div>

        <div class="detail-description">${p.description}</div>

        <div class="detail-price-block">
          <div>
            <div class="detail-price">${formatPrice(p.price)}</div>
            <div class="detail-price-label">WhatsApp ile sipariş</div>
          </div>
          <div style="font-size:36px">${CAT_EMOJIS[p.category] || '🎮'}</div>
        </div>

        <div class="detail-cta-group">
          ${p.stock
            ? `<a href="${waLink}" target="_blank" rel="noopener" class="btn-buy">
                📱 WhatsApp ile Satın Al
               </a>`
            : `<button class="btn-buy" disabled>❌ Stokta Yok</button>`
          }
          <button class="btn-fav-detail ${isFav ? 'active' : ''}" id="favDetailBtn">
            ${isFav ? '❤️ Favorilerden Çıkar' : '🤍 Favorilere Ekle'}
          </button>
        </div>
      </div>
    </div>`;

    document.getElementById('detailPage').innerHTML = html;
    this.bindEvents(images);
    this.updateFavCount();
  },

  bindEvents(images) {
    // Copy ID
    const copyBtn = document.getElementById('copyIdBtn');
    if (copyBtn) {
      copyBtn.addEventListener('click', () => {
        copyToClipboard(this.product.id);
        copyBtn.classList.add('copied');
        copyBtn.innerHTML = '✓ Kopyalandı';
        setTimeout(() => { copyBtn.classList.remove('copied'); copyBtn.innerHTML = '📋 Kopyala'; }, 1800);
        toast(`📋 ID kopyalandı: ${this.product.id}`, 'info');
      });
    }

    // Favorites
    const favBtn = document.getElementById('favDetailBtn');
    if (favBtn) {
      favBtn.addEventListener('click', () => {
        const added = Favorites.toggle(this.product.id);
        favBtn.classList.toggle('active', added);
        favBtn.innerHTML = added ? '❤️ Favorilerden Çıkar' : '🤍 Favorilere Ekle';
        toast(added ? '❤️ Favorilere eklendi' : '💔 Favorilerden çıkarıldı', added ? 'success' : 'warning');
      });
    }

    // Gallery navigation
    if (images.length > 1) {
      const prev = document.getElementById('galPrev');
      const next = document.getElementById('galNext');

      if (prev) prev.addEventListener('click', () => this.galNav(-1, images.length));
      if (next) next.addEventListener('click', () => this.galNav(1, images.length));

      document.getElementById('thumbs')?.querySelectorAll('.gallery-thumb').forEach(th => {
        th.addEventListener('click', () => this.galGoTo(Number(th.dataset.idx), images.length));
      });

      // Keyboard nav
      document.addEventListener('keydown', e => {
        if (e.key === 'ArrowLeft') this.galNav(-1, images.length);
        if (e.key === 'ArrowRight') this.galNav(1, images.length);
      });
    }
  },

  galNav(dir, total) {
    this.galGoTo((this.currentImg + dir + total) % total, total);
  },

  galGoTo(idx, total) {
    const old = document.getElementById(`gImg${this.currentImg}`);
    const next = document.getElementById(`gImg${idx}`);
    const thumbs = document.querySelectorAll('.gallery-thumb');
    const counter = document.getElementById('galCounter');

    if (old) { old.classList.remove('active'); old.classList.add('hidden'); }
    if (next) { next.classList.remove('hidden'); next.classList.add('active'); }
    thumbs.forEach(t => t.classList.toggle('active', Number(t.dataset.idx) === idx));
    if (counter) counter.textContent = `${idx + 1} / ${total}`;
    this.currentImg = idx;
  },

  renderError(msg) {
    document.getElementById('detailPage').innerHTML = `
      <div style="text-align:center;padding:80px 20px;color:var(--text-muted)">
        <div style="font-size:56px;margin-bottom:16px">⚠️</div>
        <h2 style="font-family:'Rajdhani',sans-serif;color:var(--text-secondary);margin-bottom:8px">Ürün Bulunamadı</h2>
        <p style="margin-bottom:24px">${msg}</p>
        <a href="index.html" style="color:var(--accent-red);font-weight:600">← Markete dön</a>
      </div>`;
  },

  updateFavCount() {
    // no nav count on product page, but could add
  }
};

// ══════════════════════════════════════════════════════════════════════════════
//  ROUTER — which page are we on?
// ══════════════════════════════════════════════════════════════════════════════

window.GameMarket = {
  initProductPage() {
    ProductPage.init();
  }
};

document.addEventListener('DOMContentLoaded', () => {
  const isProductPage = document.getElementById('detailPage') !== null;

  if (isProductPage) {
    // product.html handles its own init via inline script
    // (already called via window.GameMarket.initProductPage)
  } else {
    // index.html
    Market.init();
  }
});
