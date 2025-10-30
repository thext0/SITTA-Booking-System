/**
 * SITTA - Utility Functions & LocalStorage Management
 * Mendefinisikan semua fungsi helper dan manajemen data
 */

// ============================================
// Initialize Sample Data
// ============================================

function initializeSampleData() {
    // Sample Users (demo accounts)
    if (!localStorage.getItem('sitta_users')) {
        const users = [
            {
                id: 1,
                nim: '123456789',
                name: 'Yuda Pratama',
                email: 'yuda.pratama@mahasiswa.ut.ac.id',
                password: 'user123',
                role: 'user',
                faculty: 'FKIP',
                address: 'Jl. Dinoyo No.86, Tegalsari, Surabaya'
            },
            {
                id: 2,
                nim: '111222333',
                name: 'Andi Adinata',
                email: 'andi.adinata@mahasiswa.ut.ac.id',
                password: 'user123',
                role: 'user',
                faculty: 'FST',
                address: 'Jl. Dupak Masigit No.10, Surabaya'
            },
            {
                id: 3,
                nim: '000000001',
                name: 'Budi',
                email: 'admin@ut.ac.id',
                password: 'admin123',
                role: 'admin',
                faculty: null,
                address: 'Universitas Terbuka'
            }
        ];
        localStorage.setItem('sitta_users', JSON.stringify(users));
    }

    // Sample Products
    if (!localStorage.getItem('sitta_products')) {
        const products = [
            { id: 1, code: 'PAUD4301', name: 'Komputer dan Media Pembelajaran', faculty: 'FKIP', price: 45000, stock: 50, description: 'Modul pembelajaran komputer untuk PAUD' },
            { id: 2, code: 'PDGK4105', name: 'Strategi Pembelajaran di SD', faculty: 'FKIP', price: 52000, stock: 30, description: 'Panduan strategi mengajar di Sekolah Dasar' },
            { id: 3, code: 'MKDU4111', name: 'Pendidikan Kewarganegaraan', faculty: 'FKIP', price: 38000, stock: 100, description: 'Modul PKN untuk semua jurusan' },
            { id: 4, code: 'EKMA4111', name: 'Pengantar Bisnis', faculty: 'FE', price: 48000, stock: 60, description: 'Dasar-dasar bisnis dan manajemen' },
            { id: 5, code: 'EKMA4116', name: 'Manajemen', faculty: 'FE', price: 55000, stock: 45, description: 'Konsep manajemen modern' },
            { id: 6, code: 'EKMA4213', name: 'Manajemen Keuangan', faculty: 'FE', price: 60000, stock: 35, description: 'Pengelolaan keuangan perusahaan' },
            { id: 7, code: 'ISIP4110', name: 'Pengantar Sosiologi', faculty: 'FHISIP', price: 42000, stock: 55, description: 'Dasar-dasar sosiologi masyarakat' },
            { id: 8, code: 'ISIP4130', name: 'Pengantar Ilmu Hukum', faculty: 'FHISIP', price: 50000, stock: 40, description: 'Fundamental hukum Indonesia' },
            { id: 9, code: 'PMAT4101', name: 'Kalkulus I', faculty: 'FST', price: 47000, stock: 70, description: 'Kalkulus diferensial dan integral' },
            { id: 10, code: 'PTEK4201', name: 'Fisika Dasar I', faculty: 'FST', price: 49000, stock: 65, description: 'Mekanika dan termodinamika' },
            { id: 11, code: 'MSIM4101', name: 'Pengantar Sistem Informasi', faculty: 'FST', price: 53000, stock: 80, description: 'Konsep dasar sistem informasi' },
            { id: 12, code: 'PDGK4403', name: 'Pendidikan Anak di SD', faculty: 'FKIP', price: 44000, stock: 50, description: 'Psikologi perkembangan anak SD' },
            { id: 13, code: 'PAUD4201', name: 'Bermain dan Permainan Anak', faculty: 'FKIP', price: 40000, stock: 60, description: 'Teori bermain untuk PAUD' },
            { id: 14, code: 'ADBI4201', name: 'Bahasa Inggris Niaga', faculty: 'FE', price: 46000, stock: 55, description: 'Business English untuk komunikasi bisnis' },
            { id: 15, code: 'EKMA4434', name: 'Sistem Informasi Manajemen', faculty: 'FE', price: 58000, stock: 40, description: 'SIM untuk pengambilan keputusan' }
        ];
        localStorage.setItem('sitta_products', JSON.stringify(products));
    }

    // Initialize empty orders if not exist
    if (!localStorage.getItem('sitta_orders')) {
        localStorage.setItem('sitta_orders', JSON.stringify([]));
    }
}

// ============================================
// Update Cart Badge
// ============================================

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
// Notification System
// ============================================

function showNotification(message, type = 'success', duration = 2000) {
    // Remove existing notifications
    const existing = document.querySelector('.notification-popup');
    if (existing) {
        existing.remove();
    }

    // Create new notification
    const notification = document.createElement('div');
    notification.className = `notification-popup ${type}`;
    notification.innerHTML = `
        <div class="message">${message}</div>
        <button class="close-btn" onclick="this.parentElement.remove()">OK</button>
    `;

    // Add to document
    document.body.appendChild(notification);

    // Auto dismiss
    setTimeout(() => {
        notification.style.animation = 'slideOut 0.2s ease-out forwards';
        setTimeout(() => notification.remove(), 200);
    }, duration);
}

// ============================================
// User Management
// ============================================

function getCurrentUser() {
    const user = localStorage.getItem('currentUser');
    return user ? JSON.parse(user) : null;
}

function setCurrentUser(user) {
    localStorage.setItem('currentUser', JSON.stringify(user));
}

function getUsers() {
    const users = localStorage.getItem('sitta_users');
    return users ? JSON.parse(users) : [];
}

function findUserByEmail(email) {
    const users = getUsers();
    return users.find(u => u.email === email || u.nim === email);
}

function findUserById(id) {
    const users = getUsers();
    return users.find(u => u.id === id);
}

function addUser(user) {
    const users = getUsers();
    const newId = users.length > 0 ? Math.max(...users.map(u => u.id)) + 1 : 1;
    const newUser = { ...user, id: newId };
    users.push(newUser);
    localStorage.setItem('sitta_users', JSON.stringify(users));
    return newUser;
}

function logout() {
    localStorage.removeItem('currentUser');
    window.location.href = 'index.html';
}

// ============================================
// Product Management
// ============================================

function getProducts() {
    const products = localStorage.getItem('sitta_products');
    return products ? JSON.parse(products) : [];
}

function getProductById(id) {
    const products = getProducts();
    return products.find(p => p.id === id);
}

function findProductsByFaculty(faculty) {
    const products = getProducts();
    return faculty ? products.filter(p => p.faculty === faculty) : products;
}

function findProductsByKeyword(keyword) {
    const products = getProducts();
    const search = keyword.toLowerCase();
    return products.filter(p =>
        p.name.toLowerCase().includes(search) ||
        p.code.toLowerCase().includes(search) ||
        p.faculty.toLowerCase().includes(search)
    );
}

function addProduct(product) {
    const products = getProducts();
    const newId = products.length > 0 ? Math.max(...products.map(p => p.id)) + 1 : 1;
    const newProduct = { ...product, id: newId };
    products.push(newProduct);
    localStorage.setItem('sitta_products', JSON.stringify(products));
    return newProduct;
}

function updateProduct(id, updates) {
    const products = getProducts();
    const index = products.findIndex(p => p.id === id);
    if (index !== -1) {
        products[index] = { ...products[index], ...updates };
        localStorage.setItem('sitta_products', JSON.stringify(products));
        return products[index];
    }
    return null;
}

function deleteProduct(id) {
    const products = getProducts();
    const filtered = products.filter(p => p.id !== id);
    localStorage.setItem('sitta_products', JSON.stringify(filtered));
}

// ============================================
// Cart Management
// ============================================

function getCart() {
    const user = getCurrentUser();
    if (!user) return [];
    const cart = localStorage.getItem(`cart_${user.id}`);
    return cart ? JSON.parse(cart) : [];
}

function saveCart(cart) {
    const user = getCurrentUser();
    if (user) {
        localStorage.setItem(`cart_${user.id}`, JSON.stringify(cart));
    }
}

function addToCart(productId) {
    const cart = getCart();
    const existing = cart.find(item => item.productId === productId);

    if (existing) {
        existing.quantity += 1;
    } else {
        cart.push({ productId, quantity: 1 });
    }

    saveCart(cart);
}

function updateCartItem(productId, quantity) {
    let cart = getCart();
    const item = cart.find(item => item.productId === productId);

    if (item) {
        if (quantity <= 0) {
            cart = cart.filter(item => item.productId !== productId);
        } else {
            item.quantity = quantity;
        }
        saveCart(cart);
    }
}

function removeFromCart(productId) {
    let cart = getCart();
    cart = cart.filter(item => item.productId !== productId);
    saveCart(cart);
}

function clearCart() {
    const user = getCurrentUser();
    if (user) {
        localStorage.removeItem(`cart_${user.id}`);
    }
}

function getCartTotal() {
    const cart = getCart();
    let total = 0;

    cart.forEach(item => {
        const product = getProductById(item.productId);
        if (product) {
            total += product.price * item.quantity;
        }
    });

    return total;
}

// ============================================
// Order Management
// ============================================

function getOrders() {
    const orders = localStorage.getItem('sitta_orders');
    return orders ? JSON.parse(orders) : [];
}

function getUserOrders(userId) {
    const orders = getOrders();
    return orders.filter(order => order.userId === userId);
}

function getOrderById(id) {
    const orders = getOrders();
    return orders.find(order => order.id === id);
}

function createOrder(orderData) {
    const orders = getOrders();
    const newId = orders.length > 0 ? Math.max(...orders.map(o => o.id)) + 1 : 1;

    const newOrder = {
        id: newId,
        ...orderData,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        // flag to indicate whether stock for this order has been adjusted
        stockAdjusted: false
    };

    orders.push(newOrder);
    localStorage.setItem('sitta_orders', JSON.stringify(orders));
    return newOrder;
}

function updateOrderStatus(orderId, newStatus) {
    const orders = getOrders();
    const order = orders.find(o => o.id === orderId);

    if (order) {
        // Jika order sudah berstatus 'Selesai', jangan izinkan perubahan status lagi
        if (order.status === 'Selesai') {
            // beri tahu pengguna/admin bahwa status final tidak bisa diubah
            if (typeof showNotification === 'function') {
                showNotification('Status pesanan sudah "Selesai" dan tidak dapat diubah.', 'error');
            }
            return order;
        }

        const prevStatus = order.status;

        // Update status & timestamp
        order.status = newStatus;
        order.updatedAt = new Date().toISOString();

        // Jika status berubah menjadi 'Sedang Diproses', kurangi stok sesuai item pesanan
        // namun hanya lakukan sekali per order (hindari pengurangan ganda)
        if (newStatus === 'Sedang Diproses' && !order.stockAdjusted) {
            reduceStockForOrder(order);
            order.stockAdjusted = true;
        }

        // Jika sebelumnya sudah berada di 'Sedang Diproses' tapi sekarang dikembalikan ke status lain,
        // maka lakukan rollback (kembalikan stok) hanya jika stok sebelumnya sudah disesuaikan.
        // Ini mencegah kehilangan stok ketika admin mengubah status bolak-balik.
        if (prevStatus === 'Sedang Diproses' && newStatus !== 'Sedang Diproses' && order.stockAdjusted) {
            restoreStockForOrder(order);
            order.stockAdjusted = false;
        }

        localStorage.setItem('sitta_orders', JSON.stringify(orders));
        return order;
    }

    return null;
}

/**
 * Kurangi stok produk berdasarkan item pada order.
 * Melakukan update pada daftar produk yang tersimpan di localStorage.
 */
function reduceStockForOrder(order) {
    if (!order || !order.items || !Array.isArray(order.items)) return;

    const products = getProducts();

    order.items.forEach(item => {
        const prod = products.find(p => p.id === item.productId);
        if (prod) {
            const newStock = Math.max(0, (prod.stock || 0) - (item.quantity || 0));
            // update local copy
            prod.stock = newStock;
            // persist via updateProduct helper
            updateProduct(prod.id, { stock: newStock });
        }
    });
}

/**
 * Kembalikan stok produk berdasarkan item pada order.
 * Digunakan untuk rollback apabila order dikembalikan dari status 'Sedang Diproses'.
 */
function restoreStockForOrder(order) {
    if (!order || !order.items || !Array.isArray(order.items)) return;

    const products = getProducts();

    order.items.forEach(item => {
        const prod = products.find(p => p.id === item.productId);
        if (prod) {
            const newStock = (prod.stock || 0) + (item.quantity || 0);
            // update local copy
            prod.stock = newStock;
            // persist via updateProduct helper
            updateProduct(prod.id, { stock: newStock });
        }
    });
}

function getOrdersByStatus(status) {
    const orders = getOrders();
    return status ? orders.filter(o => o.status === status) : orders;
}

// ============================================
// Wishlist Management (Bonus Feature)
// ============================================

function getWishlist() {
    const user = getCurrentUser();
    if (!user) return [];
    const wishlist = localStorage.getItem(`wishlist_${user.id}`);
    return wishlist ? JSON.parse(wishlist) : [];
}

function addToWishlist(productId) {
    let wishlist = getWishlist();
    if (!wishlist.includes(productId)) {
        wishlist.push(productId);
        const user = getCurrentUser();
        localStorage.setItem(`wishlist_${user.id}`, JSON.stringify(wishlist));
    }
}

function removeFromWishlist(productId) {
    let wishlist = getWishlist();
    wishlist = wishlist.filter(id => id !== productId);
    const user = getCurrentUser();
    localStorage.setItem(`wishlist_${user.id}`, JSON.stringify(wishlist));
}

function isInWishlist(productId) {
    return getWishlist().includes(productId);
}

// ============================================
// Utility Functions
// ============================================

function formatPrice(price) {
    return new Intl.NumberFormat('id-ID', {
        style: 'currency',
        currency: 'IDR'
    }).format(price);
}

function formatDate(dateString) {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('id-ID', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
    }).format(date);
}

function generateOrderId() {
    const timestamp = Date.now();
    const random = Math.floor(Math.random() * 1000);
    return `ORD-${timestamp}-${random}`;
}

function clearErrors() {
    document.querySelectorAll('.error-message').forEach(el => {
        el.textContent = '';
    });
    document.querySelectorAll('input.error, textarea.error').forEach(el => {
        el.classList.remove('error');
    });
}

function showError(fieldId, message) {
    const field = document.getElementById(fieldId);
    if (field) {
        field.classList.add('error');
    }

    const errorEl = document.getElementById(`error-${fieldId}`);
    if (errorEl) {
        errorEl.textContent = message;
    }
}

function openModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
        modal.classList.add('active');
    }
}

function closeModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
        modal.classList.remove('active');
    }
}

// Render navigation based on user role
function renderNavbar(user) {
    const navbar = document.getElementById('navbar-menu');
    if (!navbar) return;

    const cartCount = getCart().reduce((sum, item) => sum + item.quantity, 0);

    if (user.role === 'admin') {
        navbar.innerHTML = `
            <ul class="nav-menu">
                <li><a href="admin-dashboard.html">Dashboard</a></li>
                <li><a href="admin-products.html">Produk</a></li>
                <li><a href="admin-orders.html">Pesanan</a></li>
                <li><span>${user.name}</span></li>
                <li><a href="#" onclick="logout()">Logout</a></li>
            </ul>
        `;
    } else {
        navbar.innerHTML = `
            <ul class="nav-menu">
                <li><a href="catalog.html">Katalog</a></li>
                <li><a href="cart.html">Keranjang <span class="cart-badge" id="cart-count">${cartCount}</span></a></li>
                <li><a href="order-history.html">Pesanan Saya</a></li>
                <li><span>${user.name}</span></li>
                <li><a href="#" onclick="logout()">Logout</a></li>
            </ul>
        `;
    }
}

// Auto-initialize on page load
document.addEventListener('DOMContentLoaded', () => {
    initializeSampleData();

    const user = getCurrentUser();
    if (user && document.getElementById('navbar-menu')) {
        renderNavbar(user);
    }
});
