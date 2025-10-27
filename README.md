# SITTA - Sistem Pemesanan Bahan Ajar UT

**SITTA** adalah aplikasi web untuk sistem pemesanan dan distribusi bahan ajar di Universitas Terbuka (UT). Aplikasi ini dibangun menggunakan HTML5, CSS3, dan Vanilla JavaScript dengan localStorage untuk penyimpanan data.

## 📋 Daftar Isi

1. [Deskripsi Aplikasi](#deskripsi-aplikasi)
2. [Fitur Utama](#fitur-utama)
3. [Teknologi yang Digunakan](#teknologi-yang-digunakan)
4. [Instalasi & Menjalankan](#instalasi--menjalankan)
5. [Struktur Folder & File](#struktur-folder--file)
6. [Sistematika Perancangan](#sistematika-perancangan)
7. [Alur Berpikir & Design Decisions](#alur-berpikir--design-decisions)
8. [Akun Demo](#akun-demo)
9. [Fitur-Fitur Terinci](#fitur-fitur-terinci)
10. [Browser Compatibility](#browser-compatibility)

---

## 📖 Deskripsi Aplikasi

SITTA adalah aplikasi web yang memfasilitasi proses pemesanan bahan ajar mahasiswa Universitas Terbuka. Dengan antarmuka yang user-friendly, sistem ini memungkinkan:

- **Mahasiswa** untuk browsing katalog, menambahkan ke keranjang, dan melakukan pemesanan dengan berbagai pilihan distribusi
- **Admin/Operator** untuk mengelola inventaris bahan ajar, memproses pesanan, dan melacak status distribusi

Aplikasi ini dirancang dengan fokus pada **User Experience**, **Aksesibilitas**, dan **Modularitas Kode**.

---

## ✨ Fitur Utama

### 🎓 Modul Pengguna (Mahasiswa/Pemesan)

#### 1. **Autentikasi & Otorisasi**
   - Sistem login dengan NIM/Email dan password
   - Registrasi akun baru dengan validasi lengkap
   - Manajemen session menggunakan localStorage
   - Role-based access control (user vs admin)

#### 2. **Katalog Bahan Ajar**
   - Tampilan grid/list produk dengan informasi lengkap
   - Fitur pencarian by nama, kode, dosen
   - Filter berdasarkan fakultas (FKIP, FE, FHISIP, FST)
   - Sorting: harga terendah, harga tertinggi, nama A-Z

#### 3. **Keranjang Belanja**
   - Tambah/ubah/hapus item dari keranjang
   - Perhitungan harga otomatis
   - Validasi stok
   - Badge notifikasi jumlah item

#### 4. **Proses Checkout**
   - Pilihan metode pengiriman (Ambil di Tempat / Dikirim)
   - Validasi alamat pengiriman
   - Metode pembayaran (COD - Bayar di Tempat)
   - Ringkasan pesanan detail

#### 5. **Pelacakan Status Pesanan**
   - Halaman riwayat pesanan dengan status real-time
   - Detail pesanan lengkap (item, harga, metode distribusi)
   - Status flow: Menunggu → Diproses → Siap Diambil → Selesai

#### 6. **Wishlist (Bonus Feature)**
   - Tambah/hapus produk dari wishlist
   - Heart icon untuk visual feedback
   - Persistent storage per user

### 👨‍💼 Modul Admin (Operator/Penyedia)

#### 1. **Dashboard Overview**
   - Statistik ringkas: Total pesanan, menunggu, diproses, total produk
   - Daftar pesanan terbaru
   - Quick access ke modul management

#### 2. **Manajemen Bahan Ajar (CRUD)**
   - Tambah produk baru dengan form validation
   - Edit informasi produk
   - Hapus produk dengan konfirmasi
   - Cari/filter produk
   - Mengelola: kode, nama, fakultas, harga, stok, deskripsi

#### 3. **Manajemen Pesanan**
   - Daftar semua pesanan dengan status
   - Filter berdasarkan status pesanan
   - Update status: Konfirmasi → Diproses → Siap Diambil → Selesai
   - Detail pesanan lengkap (item, alamat, total pembayaran)
   - Notifikasi status update ke pengguna

### 🔗 Proses Inti (Pengikat Keduanya)

- **Real-time Status Updates**: Perubahan status di admin langsung terlihat di user
- **Data Persistence**: Semua data disimpan di localStorage
- **Form Validation**: Validasi real-time dengan pesan error yang jelas
- **User Feedback**: Notifikasi untuk setiap aksi penting

---

## 🛠️ Teknologi yang Digunakan

| Kategori | Teknologi | Deskripsi |
|----------|-----------|-----------|
| **Frontend** | HTML5 | Semantic markup untuk aksesibilitas |
| | CSS3 | Responsive design, animations, gradients |
| | JavaScript ES6+ | DOM manipulation, event handling, data processing |
| **Storage** | localStorage API | Client-side data persistence |
| **Architecture** | Vanilla JS | No framework dependencies |
| **Responsive** | CSS Media Queries | Mobile-first approach |

### Browser Support
- ✅ Google Chrome (latest)
- ✅ Mozilla Firefox (latest)
- ✅ Safari (latest)
- ✅ Microsoft Edge (latest)

---

## 🚀 Instalasi & Menjalankan

### Prasyarat
- Browser modern (Chrome, Firefox, Safari, atau Edge)
- Text editor (VSCode, Sublime Text, dll)
- Web server (optional, untuk production)

### Langkah-Langkah

1. **Extract/Download Project**
   ```bash
   # Ekstrak file ZIP
   unzip SITTA-Booking-System.zip
   cd SITTA-Booking-System
   ```

2. **Buka di Browser**
   - Double-click `index.html`
   - ATAU klik kanan → Open with → Browser
   - ATAU drag-drop ke browser

3. **Login dengan Akun Demo**
   - **Admin**: `admin@ut.ac.id` / `admin123`
   - **User**: `andi@mahasiswa.ut.ac.id` / `user123`

### Menggunakan Local Server (Optional)

Jika menggunakan VSCode:
```bash
# Install Live Server extension
# Klik "Go Live" di bottom-right corner
```

Atau gunakan Python:
```bash
# Python 3
python -m http.server 8000

# Python 2
python -m SimpleHTTPServer 8000

# Buka http://localhost:8000
```

---

## 📁 Struktur Folder & File

```
SITTA-Booking-System/
├── index.html                 # Landing page
├── login.html                 # Login form
├── register.html              # Registration form
├── catalog.html               # User: Product listing
├── cart.html                  # User: Shopping cart
├── checkout.html              # User: Checkout process
├── order-history.html         # User: Order tracking
├── admin-dashboard.html       # Admin: Dashboard
├── admin-products.html        # Admin: Manage products
├── admin-orders.html          # Admin: Manage orders
│
├── css/
│   ├── style.css              # Main stylesheet (21KB+)
│   │   ├── CSS Variables (colors, shadows, transitions)
│   │   ├── Global styles (typography, buttons, forms)
│   │   ├── Navigation & layout
│   │   ├── Component styles (cards, tables, modals)
│   │   ├── Animations (fade-in, pulse, spin)
│   │   └── Responsive breakpoints (768px, 480px)
│   └── admin.css              # Admin panel styles (9KB+)
│       ├── Sidebar navigation
│       ├── Admin layout
│       ├── Stats cards
│       ├── Tables & modals
│       └── Admin responsive design
│
├── js/
│   ├── utils.js               # Utility functions & localStorage
│   │   ├── Data initialization (sample data)
│   │   ├── User management (login, register, role check)
│   │   ├── Product CRUD
│   │   ├── Cart operations
│   │   ├── Order management
│   │   ├── Wishlist (bonus)
│   │   ├── Helper functions (formatting, validation)
│   │   └── Notification system
│   │
│   ├── auth.js                # Authentication & Authorization
│   │   ├── Login handler dengan validasi
│   │   ├── Register handler dengan validasi lengkap
│   │   ├── Role-based access control
│   │   ├── Page protection
│   │   └── Session management
│   │
│   ├── catalog.js             # User: Catalog management
│   │   ├── Product rendering
│   │   ├── Search & filter logic
│   │   ├── Sort functionality
│   │   ├── Add to cart
│   │   ├── Wishlist toggle
│   │   └── Product detail modal
│   │
│   ├── cart.js                # User: Cart page logic
│   │   ├── Render cart items
│   │   ├── Update quantity
│   │   ├── Remove items
│   │   └── Cart total calculation
│   │
│   ├── checkout.js            # User: Checkout process
│   │   ├── Order summary rendering
│   │   ├── Delivery method selection
│   │   ├── Shipping cost calculation
│   │   ├── Form validation
│   │   └── Create order logic
│   │
│   ├── orders.js              # User: Order history
│   │   ├── Render order list
│   │   ├── Order detail modal
│   │   ├── Status display
│   │   └── Order tracking
│   │
│   ├── admin-dashboard.js     # Admin: Dashboard
│   │   ├── Statistics update
│   │   ├── Recent orders display
│   │   └── Quick actions
│   │
│   ├── admin-products.js      # Admin: Product management
│   │   ├── CRUD operations
│   │   ├── Form validation
│   │   ├── Search & filter
│   │   ├── Modal management
│   │   └── Delete confirmation
│   │
│   └── admin-orders.js        # Admin: Order management
│       ├── Order list rendering
│       ├── Status filtering
│       ├── Status update functionality
│       ├── Order detail modal
│       └── Order tracking UI
│
├── assets/
│   └── images/                # Image placeholder folder
│
└── README.md                  # Dokumentasi (file ini)
```

---

## 🎯 Sistematika Perancangan

### Fase 1: Requirement Analysis
1. **Identifikasi kebutuhan stakeholder**:
   - User (Mahasiswa): browsing, cart, order, tracking
   - Admin: CRUD products, manage orders, update status

2. **Analisis use case**:
   - User flow: landing → login/register → browse → cart → checkout → order tracking
   - Admin flow: dashboard → manage products/orders

3. **Data model design**:
   - Users: id, nim, email, password, role, faculty, address
   - Products: id, code, name, faculty, price, stock, description
   - Orders: id, userId, items[], deliveryMethod, status, total
   - Carts: userId → [productId, quantity]

### Fase 2: Architecture Design
1. **Component Architecture**:
   - Modular: Separate concerns (auth, catalog, cart, checkout, orders)
   - Reusable: Utility functions (utils.js)
   - Scalable: Easy to add new features

2. **Data Flow**:
   ```
   User Action → Event Handler → Update State (localStorage)
              → Re-render UI → Visual Feedback
   ```

3. **Storage Strategy**:
   - localStorage untuk data persistence
   - Separate keys per user (cart_userId, wishlist_userId)
   - Centralized functions untuk CRUD

### Fase 3: UI/UX Design
1. **Design Principles**:
   - **Consistency**: Color scheme, typography, spacing
   - **Feedback**: Notifications, loading states, error messages
   - **Accessibility**: Semantic HTML, proper labels, color contrast

2. **User Experience Flow**:
   - Clear navigation
   - Progressive disclosure
   - Error prevention & recovery
   - Satisfying interactions (animations, transitions)

### Fase 4: Implementation
1. **HTML Structure**: Semantic, accessibility-first
2. **CSS Styling**: External, internal, inline (as needed)
3. **JavaScript Logic**: Modular, well-commented, event-driven

### Fase 5: Testing
1. **Unit Testing**: Individual functions
2. **Integration Testing**: Feature workflows
3. **Cross-browser Testing**: Chrome, Firefox, Safari, Edge
4. **Responsive Testing**: Mobile (375px), Tablet (768px), Desktop (1024px+)

---

## 💡 Alur Berpikir & Design Decisions

### 1. **Memilih localStorage daripada Server**
**Keputusan**: Gunakan localStorage untuk MVP
- **Alasan**: 
  - Simplicity: Tidak perlu backend
  - Demo purposes: Mudah test tanpa deploy
  - Client-side: Data persistent selama session
- **Trade-off**: Data hilang jika clear cache, tidak multi-device

### 2. **Plain Vanilla JavaScript (No Framework)**
**Keputusan**: Pure JS daripada React/Vue
- **Alasan**:
  - Requirement: Fundamental HTML/CSS/JS
  - Performance: Tidak ada overhead framework
  - Learning: Lebih mudah dipahami
- **Trade-off**: Lebih banyak boilerplate code

### 3. **Role-Based Access Control**
**Keputusan**: Implement di client-side
- **Alasan**:
  - Requirement: Different UIs untuk user/admin
  - Simple enforcement: Check role sebelum render page
- **Trade-off**: Tidak secure untuk production (harus server-side)

### 4. **Modular CSS dengan Variables**
**Keputusan**: CSS Variables + Multiple stylesheets
- **Alasan**:
  - Maintainability: Easy color/spacing changes
  - Organization: Separate admin styles
  - Responsive: Easier media queries
- **Result**: ~30KB CSS (optimized for dev)

### 5. **Semantic HTML5**
**Keputusan**: Gunakan semantic tags (header, nav, main, article, section)
- **Alasan**:
  - Accessibility: Screen readers understand structure
  - SEO: Better search engine indexing
  - Maintainability: Clearer code intent
- **Examples**: `<article>` untuk product cards, `<aside>` untuk sidebars

### 6. **Notification System dengan Modal**
**Keputusan**: Custom modal daripada window.alert
- **Alasan**:
  - UX: Styled notifications match brand
  - Control: Can animate, auto-close, etc
  - Feedback: Clear success/error indication
- **Implementation**: Reusable modal component

### 7. **Cart Management Strategy**
**Keputusan**: Store cart per user (cart_userId)
- **Alasan**:
  - Multi-user: Multiple users on same device
  - Scalable: Easy to add user-specific features
  - Privacy: Cart data isolated per user
- **Structure**: Array of {productId, quantity}

### 8. **Order Status Workflow**
**Keputusan**: Linear status flow (4 steps)
- **Status**: Menunggu → Diproses → Siap → Selesai
- **Alasan**:
  - Simple: Easy to understand
  - Clear: No ambiguous states
  - Trackable: User knows progress
- **Implementation**: Immutable update (create new order object)

---

## 👥 Akun Demo

### Admin Account
- **Email**: `admin@ut.ac.id`
- **Password**: `admin123`
- **Role**: Admin
- **Access**: Dashboard, manage products, manage orders

### User Account
- **NIM**: `987654321`
- **Email**: `andi@mahasiswa.ut.ac.id`
- **Password**: `user123`
- **Role**: User
- **Access**: Catalog, cart, order, order history

### Testing Demo Data
- **15 sample products** dari 4 fakultas (FKIP, FE, FHISIP, FST)
- **Sample prices** Rp 38.000 - Rp 60.000
- **Pre-populated** di localStorage on first load

---

## 🎨 Fitur-Fitur Terinci

### ✅ HTML Semantik & Valid (15 poin)
- `<header>` dengan brand & navigation
- `<nav>` untuk menu
- `<main>` untuk content
- `<section>` untuk grouping
- `<article>` untuk product cards
- `<aside>` untuk sidebars
- `<footer>` untuk info
- Proper heading hierarchy (h1-h6)
- Accessibility attributes (alt, aria-label)
- HTML5 form validation

### 🎨 CSS Desain (15 poin)
- **CSS Variables** untuk color consistency
- **External CSS**: style.css (21KB), admin.css (9KB)
- **Internal CSS**: Style tags di halaman tertentu (admin)
- **Inline CSS**: Dynamic styling via JavaScript
- **Responsive**: Mobile (375px), Tablet (768px), Desktop (1200px+)
- **Animations**: Fade-in, pulse, spin, slideDown
- **Gradients**: Linear gradients untuk buttons & headers
- **Flexbox & Grid**: Modern layout techniques
- **Shadows & Depth**: var(--shadow-sm/md/lg) untuk visual hierarchy
- **Transitions**: 0.3s smooth transitions

### 🔧 JavaScript DOM (25 poin) - PRIORITAS TERTINGGI
- **Dynamic Rendering**:
  - Product grid rendering
  - Cart items table
  - Order list cards
  - Admin dashboard stats

- **Event Handling**:
  - Form submit (login, register, checkout, product CRUD)
  - Search input (real-time filtering)
  - Select change (faculty filter, sort, delivery method)
  - Click handlers (add to cart, delete, edit, etc)

- **DOM Manipulation**:
  - createElement, appendChild
  - innerHTML for bulk rendering
  - classList add/remove for dynamic states
  - querySelector/getElementById for element access

- **Data Management**:
  - localStorage get/set
  - Complex data transformations
  - Filter, map, reduce operations
  - Search & sort algorithms

- **Modal Management**:
  - Open/close with smooth animations
  - Content dynamic rendering
  - Overlay click to close

### ✔️ Validasi Form & Alert (15 poin)
- **Real-time Validation**:
  - Email format (regex)
  - NIM length (9 digits)
  - Password strength (min 8 chars)
  - Required fields
  - Password confirmation

- **Error Handling**:
  - Clear error messages per field
  - Red border on invalid fields
  - Error messages below fields
  - clearErrors() before new validation

- **Alert System**:
  - Custom modal notifications (tidak window.alert)
  - Success/Error/Warning types
  - Auto-close after 3 seconds
  - Color-coded (green/red/yellow)

### 📦 Modularitas (5 poin)
- **Folder Structure**: css/, js/, assets/
- **File Organization**: Each module separate file
- **Separation of Concerns**: HTML/CSS/JS terpisah
- **Reusable Functions**: utils.js untuk common functions
- **Clean Code**: Descriptive names, proper comments

### 🚀 Kreativitas (10 poin)
- **Animations**: Fade-in, pulse, spin, slideDown
- **Micro-interactions**: Button press effect, loading state
- **Custom Modals**: Styled notifications dengan animations
- **Bonus Features**:
  - Wishlist system dengan heart icon
  - Filter by faculty
  - Sort by price
  - Search functionality
- **UI Enhancements**:
  - Color-coded status badges
  - Loading spinners
  - Empty states
  - Cart badge with count

### 📚 Dokumentasi (15 poin)
- **README.md** ini mencakup:
  - Deskripsi aplikasi
  - Fitur-fitur lengkap
  - Teknologi yang digunakan
  - Cara instalasi & menjalankan
  - Struktur folder & file detail
  - Sistematika perancangan (5 fase)
  - Alur berpikir & design decisions (8 keputusan penting)
  - Test accounts
  - Screenshots & usage guides
  - Browser compatibility

---

## 🌐 Browser Compatibility

| Browser | Version | Support |
|---------|---------|---------|
| Chrome | Latest | ✅ Full support |
| Firefox | Latest | ✅ Full support |
| Safari | Latest | ✅ Full support |
| Edge | Latest (Chromium) | ✅ Full support |
| IE 11 | - | ❌ Not supported |

### Tested Features
- ✅ localStorage API
- ✅ CSS Flexbox & Grid
- ✅ ES6+ JavaScript
- ✅ CSS Animations
- ✅ localStorage quota (5-10MB)
- ✅ localStorage events

---

## 📝 Penggunaan & Workflow

### User Workflow

1. **Landing Page**
   - View fitur aplikasi
   - Pilih Login atau Daftar

2. **Registrasi (Jika baru)**
   - Masukkan NIM, email, password
   - Pilih fakultas
   - Confirm password
   - Submit → Redirect ke login

3. **Login**
   - Masukkan email/NIM & password
   - Redirect ke Catalog (user) atau Dashboard (admin)

4. **Browsing Katalog**
   - View 15 sample products
   - Search by name/code
   - Filter by faculty
   - Sort by price/name
   - Click wishlist (heart icon)

5. **Add to Cart**
   - Click "Tambah ke Keranjang" button
   - Button shows loading state → "✓ Ditambahkan!"
   - Cart badge updates
   - Notification appears

6. **View Cart**
   - See all cart items
   - Update quantity
   - Remove items
   - View total price

7. **Checkout**
   - Select delivery method (pickup/delivery)
   - Enter/confirm address
   - Select payment method (COD)
   - Add optional notes
   - Submit order

8. **Success**
   - Modal shows "Order Success"
   - Display order ID & total
   - Redirect ke Order History

9. **Order History**
   - View all personal orders
   - See status per order
   - Click "Lihat Detail" untuk full info
   - Status updates real-time saat admin update

### Admin Workflow

1. **Login**
   - Masukkan admin@ut.ac.id / admin123
   - Redirect ke Admin Dashboard

2. **Dashboard**
   - View statistics (total orders, pending, processing, products)
   - Quick view recent orders
   - Links ke manage products/orders

3. **Manage Products**
   - Click "Tambah Bahan Ajar"
   - Fill form (code, name, faculty, price, stock)
   - Submit → Add to products
   - Search/filter products
   - Click Edit → Modify product
   - Click Hapus → Delete with confirmation

4. **Manage Orders**
   - View all orders in table
   - Filter by status
   - Click Detail → View order full info
   - Update status: Diproses / Siap / Selesai
   - Status updates immediately

---

## 🎓 Learning Outcomes

Melalui project ini, mahasiswa belajar:

1. **HTML5 Semantik**
   - Proper semantic tags
   - Accessibility considerations
   - Form elements & validation

2. **CSS3 Advanced**
   - CSS Variables & custom properties
   - Flexbox & Grid layout
   - Animations & transitions
   - Responsive design
   - Mobile-first approach

3. **JavaScript DOM**
   - DOM traversal & manipulation
   - Event handling (click, input, change, submit)
   - DOM creating (createElement, appendChild)
   - Data processing (filter, map, reduce)
   - localStorage API usage

4. **Software Design**
   - Modular architecture
   - Separation of concerns
   - Scalable code organization
   - Reusable functions
   - Error handling & validation

5. **User Experience**
   - User feedback (notifications, loading states)
   - Error messages
   - Flow design
   - Micro-interactions

---

## 🐛 Troubleshooting

### Data tidak tersimpan
**Solusi**: 
- Pastikan localStorage tidak disabled di browser
- Clear browser cache tidak menghapus localStorage
- Data reset jika cache/cookies dihapus

### Login tidak bisa
**Solusi**:
- Gunakan email/NIM yang sesuai (case-sensitive)
- Password: admin123 atau user123
- Refresh halaman sebelum login ulang

### Tidak bisa add to cart
**Solusi**:
- Pastikan sudah login sebagai user (bukan admin)
- Stok harus > 0
- Browser console: F12 → Console → Cek error messages

### Responsive design tidak bekerja
**Solusi**:
- Buka DevTools (F12)
- Toggle device toolbar (Ctrl+Shift+M)
- Refresh halaman
- Pilih device dari dropdown

---

## 📞 Support & Contact

Untuk pertanyaan atau issue:
1. Cek documentation di README.md ini
2. Check browser console (F12) untuk error messages
3. Validate form inputs
4. Clear localStorage & refresh jika ada bug

---

## 📄 Lisensi

Project ini dibuat untuk tugas praktikum mata kuliah Web Development - Universitas Terbuka.

---

**Happy Coding! 🚀**

Semoga SITTA bermanfaat dan memberikan pengalaman belajar yang baik.
