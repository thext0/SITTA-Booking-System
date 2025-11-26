/**
 * SITTA - Catalog Module - FINAL VERSION v3.0
 * Improvements:
 * - SUPER FAST reset: 100ms (was 250ms, now 95% faster than original 1800ms)
 * - Quantity selector in catalog with +/- buttons
 * - User can select qty before adding to cart
 * - Better UX for multiple items
 */

let currentFilters = {
    faculty: '',
    sort: 'default',
    search: ''
};

// ============================================
// Initialize Catalog
// ============================================

document.addEventListener('DOMContentLoaded', () => {
    const user = checkAuth('user');
    if (user) {
        initializeCatalog();
    }
});

function initializeCatalog() {
    renderProducts(getProducts());
    setupEventListeners();
    updateCartBadge();
}

// ============================================
// Render Products WITH QUANTITY SELECTOR
// ============================================

function renderProducts(products) {
    const grid = document.getElementById('product-grid');
    if (!grid) return;
    
    if (products.length === 0) {
        grid.innerHTML = '<div class="empty-state"><p>Tidak ada produk yang sesuai</p></div>';
        return;
    }
    
    grid.innerHTML = products.map(product => `
        <article class="product-card fade-in">
            <div class="product-image" style="background: linear-gradient(135deg, #3b82f6, #2563eb); display: flex; align-items: center; justify-content: center; height: 200px; color: white; font-size: 3rem;">
                📚
            </div>
            <div class="product-info">
                <span class="product-code">${product.code}</span>
                <h4>${product.name}</h4>
                <p><strong>Fakultas:</strong> ${product.faculty}</p>
                <p>${product.description}</p>
                <div class="product-footer">
                    <span class="price">${formatPrice(product.price)}</span>
                    
                    <!-- Quantity Selector -->
                    <div class="qty-selector">
                        <button onclick="decreaseQty(${product.id})" class="qty-btn">−</button>
                        <input type="number" id="qty-${product.id}" value="1" min="1" max="${product.stock}" class="qty-input" readonly>
                        <button onclick="increaseQty(${product.id})" class="qty-btn">+</button>
                    </div>
                    
                    <button onclick="addProductToCart(${product.id})" class="btn btn-primary add-cart-btn">
                        🛒 Tambah
                    </button>
                    <button onclick="toggleWishlist(${product.id})" class="wishlist-btn" title="Tambah ke Wishlist">
                        ${isInWishlist(product.id) ? '❤️' : '🤍'}
                    </button>
                </div>
            </div>
        </article>
    `).join('');
}

// ============================================
// Quantity Selector Functions
// ============================================

function increaseQty(productId) {
    const input = document.getElementById(`qty-${productId}`);
    const currentQty = parseInt(input.value);
    const maxQty = parseInt(input.max);
    
    if (currentQty < maxQty) {
        input.value = currentQty + 1;
    }
}

function decreaseQty(productId) {
    const input = document.getElementById(`qty-${productId}`);
    const currentQty = parseInt(input.value);
    
    if (currentQty > 1) {
        input.value = currentQty - 1;
    }
}

// ============================================
// Cart Operations - SUPER FAST (100ms)
// ============================================

function addProductToCart(productId) {
    const product = getProductById(productId);
    if (!product) {
        showNotification('Produk tidak ditemukan', 'error');
        return;
    }
    
    const button = event.target;
    const qtyInput = document.getElementById(`qty-${productId}`);
    const quantity = parseInt(qtyInput.value) || 1;
    
    // INSTANT ADD dengan quantity
    for (let i = 0; i < quantity; i++) {
        addToCart(productId);
    }
    updateCartBadge();
    
    // Super quick visual feedback
    button.innerHTML = '✓';
    button.style.background = '#10b981';
    button.disabled = true;
    
    showNotification(`${product.name} (${quantity}x) ditambahkan`, 'success');
    
    // Reset qty to 1
    qtyInput.value = 1;
    
    // SUPER FAST reset: 100ms only!
    setTimeout(() => {
        button.innerHTML = '🛒 Tambah';
        button.style.background = '';
        button.disabled = false;
    }, 100);
}

function updateCartBadge() {
    const badge = document.getElementById('cart-count');
    if (badge) {
        const cart = getCart();
        const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
        badge.textContent = totalItems;
        
        if (totalItems > 0) {
            badge.classList.add('pulse');
            setTimeout(() => badge.classList.remove('pulse'), 400);
        }
    }
}

// ============================================
// Filter & Search Functions
// ============================================

function applyFilters() {
    let products = getProducts();
    
    // Apply faculty filter
    if (currentFilters.faculty) {
        products = products.filter(p => p.faculty === currentFilters.faculty);
    }
    
    // Apply search
    if (currentFilters.search) {
        products = findProductsByKeyword(currentFilters.search);
    }
    
    // Apply sort
    if (currentFilters.sort === 'price-low') {
        products.sort((a, b) => a.price - b.price);
    } else if (currentFilters.sort === 'price-high') {
        products.sort((a, b) => b.price - a.price);
    } else if (currentFilters.sort === 'name') {
        products.sort((a, b) => a.name.localeCompare(b.name, 'id'));
    }
    
    renderProducts(products);
}

function setupEventListeners() {
    // Search input
    const searchInput = document.getElementById('search-input');
    if (searchInput) {
        searchInput.addEventListener('input', (e) => {
            currentFilters.search = e.target.value;
            applyFilters();
        });
    }
    
    // Faculty filter
    const facultyFilter = document.getElementById('faculty-filter');
    if (facultyFilter) {
        facultyFilter.addEventListener('change', (e) => {
            currentFilters.faculty = e.target.value;
            applyFilters();
        });
    }
    
    // Sort filter
    const sortFilter = document.getElementById('sort-filter');
    if (sortFilter) {
        sortFilter.addEventListener('change', (e) => {
            currentFilters.sort = e.target.value;
            applyFilters();
        });
    }
}

// ============================================
// Wishlist Functions (Bonus)
// ============================================

function toggleWishlist(productId) {
    if (isInWishlist(productId)) {
        removeFromWishlist(productId);
        showNotification('Dihapus dari wishlist', 'success');
    } else {
        addToWishlist(productId);
        showNotification('Ditambahkan ke wishlist', 'success');
    }
    
    // Refresh to show heart update
    const products = getProducts();
    renderProducts(products);
}

// ============================================
// Product Detail Modal (Optional)
// ============================================

function showProductDetail(productId) {
    const product = getProductById(productId);
    if (!product) return;
    
    const modal = document.getElementById('product-modal');
    const detail = document.getElementById('product-detail');
    
    if (!modal || !detail) return;
    
    detail.innerHTML = `
        <h3>${product.name}</h3>
        <p><strong>Kode:</strong> ${product.code}</p>
        <p><strong>Fakultas:</strong> ${product.faculty}</p>
        <p><strong>Deskripsi:</strong> ${product.description}</p>
        <p><strong>Harga:</strong> ${formatPrice(product.price)}</p>
        <p><strong>Stok:</strong> ${product.stock > 0 ? product.stock + ' unit' : 'Habis'}</p>
        
        <div style="margin-top: 2rem; display: flex; gap: 1rem;">
            <button onclick="addProductToCart(${product.id})" class="btn btn-primary" style="flex: 1;">
                Tambah ke Keranjang
            </button>
            <button onclick="closeProductModal()" class="btn btn-secondary" style="flex: 1;">
                Tutup
            </button>
        </div>
    `;
    
    modal.classList.add('active');
}

function closeProductModal() {
    const modal = document.getElementById('product-modal');
    if (modal) {
        modal.classList.remove('active');
    }
}

// Close modal on overlay click
document.addEventListener('DOMContentLoaded', () => {
    const modal = document.getElementById('product-modal');
    if (modal) {
        const overlay = modal.querySelector('.modal-overlay');
        if (overlay) {
            overlay.addEventListener('click', closeProductModal);
        }
    }
});
