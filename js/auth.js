/**
 * SITTA - Authentication Module
 * Login, Register, dan Role-Based Access Control
 */

// ============================================
// Authentication Check
// ============================================

function checkAuth(requiredRole = null) {
    const currentUser = getCurrentUser();

    if (!currentUser) {
        // Not logged in - redirect to login
        window.location.href = 'index.html';
        return false;
    }

    if (requiredRole && currentUser.role !== requiredRole) {
        // Wrong role - redirect to appropriate page
        alert('Anda tidak memiliki akses ke halaman ini!');
        if (currentUser.role === 'admin') {
            window.location.href = 'admin-dashboard.html';
        } else {
            window.location.href = 'catalog.html';
        }
        return false;
    }

    return currentUser;
}

// ============================================
// Login Handler
// ============================================

function handleLogin(event) {
    event.preventDefault();

    // Get form values
    const email = document.getElementById('email').value.trim();
    const password = document.getElementById('password').value;

    // Clear previous errors
    clearErrors();

    // Validation
    let isValid = true;

    if (!email) {
        showError('email', 'Email atau NIM harus diisi');
        isValid = false;
    }

    if (!password) {
        showError('password', 'Password harus diisi');
        isValid = false;
    }

    if (!isValid) return;

    // Find user
    const user = findUserByEmailOrNim(email);

    if (!user) {
        showNotification('Email atau NIM tidak terdaftar', 'error');
        return;
    }

    if (user.password !== password) {
        showNotification('Password salah', 'error');
        return;
    }

    // Login successful
    setCurrentUser(user);
    showNotification('Login berhasil!', 'success');

    // Redirect based on role
    setTimeout(() => {
        if (user.role === 'admin') {
            window.location.href = 'admin-dashboard.html';
        } else {
            window.location.href = 'catalog.html';
        }
    }, 500);
}

// ============================================
// Register Handler
// ============================================

function handleRegister(event) {
    event.preventDefault();

    // Get form values
    const name = document.getElementById('reg-name').value.trim();
    const nim = document.getElementById('reg-nim').value.trim();
    const email = document.getElementById('reg-email').value.trim();
    const faculty = document.getElementById('reg-faculty').value;
    const address = document.getElementById('reg-address').value.trim();
    const password = document.getElementById('reg-password').value;
    const confirmPassword = document.getElementById('reg-confirm-password').value;

    // Clear previous errors
    clearErrors();

    // Validation
    let isValid = true;

    if (!name) {
        showError('reg-name', 'Nama lengkap harus diisi');
        isValid = false;
    }

    if (!/^\d{9}$/.test(nim)) {
        showError('reg-nim', 'NIM harus 9 digit angka');
        isValid = false;
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        showError('reg-email', 'Format email tidak valid');
        isValid = false;
    }

    if (!faculty) {
        showError('reg-faculty', 'Fakultas harus dipilih');
        isValid = false;
    }

    if (!address) {
        showError('reg-address', 'Alamat harus diisi');
        isValid = false;
    }

    if (password.length < 8) {
        showError('reg-password', 'Password minimal 8 karakter');
        isValid = false;
    }

    if (password !== confirmPassword) {
        showError('reg-confirm-password', 'Konfirmasi password tidak sesuai');
        isValid = false;
    }

    // Check if email or nim already exists
    if (findUserByEmailOrNim(email)) {
        showError('reg-email', 'Email sudah terdaftar');
        isValid = false;
    } else if (findUserByEmailOrNim(nim)) {
        showError('reg-nim', 'NIM sudah terdaftar');
        isValid = false;
    }

    if (!isValid) return;

    // Register new user
    const newUser = {
        nim,
        name,
        email,
        password,
        faculty,
        address,
        role: 'user' // Default role adalah user
    };

    addUser(newUser);

    showNotification('Registrasi berhasil! Silakan login.', 'success');

    setTimeout(() => {
        window.location.href = 'login.html';
    }, 1500);
}

// ============================================
// Page Load Auth Check
// ============================================

document.addEventListener('DOMContentLoaded', () => {
    // Check if on protected page
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    const currentUser = getCurrentUser();

    // Define protected pages
    const userPages = ['catalog.html', 'cart.html', 'checkout.html', 'order-history.html'];
    const adminPages = ['admin-dashboard.html', 'admin-products.html', 'admin-orders.html'];

    // Check authorization
    if (userPages.includes(currentPage)) {
        if (!currentUser) {
            window.location.href = 'index.html';
        } else if (currentUser.role !== 'user') {
            window.location.href = 'admin-dashboard.html';
        }
    }

    if (adminPages.includes(currentPage)) {
        if (!currentUser) {
            window.location.href = 'index.html';
        } else if (currentUser.role !== 'admin') {
            window.location.href = 'catalog.html';
        }
    }

    // Initialize auth form handlers if present
    const loginForm = document.getElementById('login-form');
    if (loginForm) {
        loginForm.addEventListener('submit', handleLogin);
    }

    const registerForm = document.getElementById('register-form');
    if (registerForm) {
        registerForm.addEventListener('submit', handleRegister);
    }

    if (adminPages.includes(currentPage)) {
        setupSidebarToggle();
    }
});

function setupSidebarToggle() {
    const sidebar = document.querySelector('.admin-sidebar');
    const toggleBtn = document.querySelector('.sidebar-toggle');
    const overlay = document.querySelector('.sidebar-overlay');

    if (sidebar && toggleBtn && overlay) {
        toggleBtn.addEventListener('click', () => {
            sidebar.classList.toggle('open');
            overlay.classList.toggle('open');
        });

        overlay.addEventListener('click', () => {
            sidebar.classList.remove('open');
            overlay.classList.remove('open');
        });
    }
}
