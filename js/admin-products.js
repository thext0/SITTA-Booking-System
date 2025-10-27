/**
 * SITTA - Admin Products Management Module
 */

let editingProductId = null;
let deleteProductId = null;

document.addEventListener('DOMContentLoaded', () => {
    const admin = checkAuth('admin');
    if (admin) {
        initializeProductsManagement();
    }
});

function initializeProductsManagement() {
    renderProductsList();

    const searchInput = document.getElementById('product-search');
    if (searchInput) {
        searchInput.addEventListener('input', (e) => {
            const filtered = findProductsByKeyword(e.target.value);
            renderProductsList(filtered);
        });
    }
}

function renderProductsList(products = null) {
    products = products || getProducts();
    const tbody = document.getElementById('products-list');

    tbody.innerHTML = products.map(product => `
        <tr>
            <td>${product.code}</td>
            <td>${product.name}</td>
            <td>${product.faculty}</td>
            <td>${formatPrice(product.price)}</td>
            <td>${product.stock}</td>
            <td>
                <div class="action-buttons">
                    <button onclick="editProduct(${product.id})" class="btn btn-primary">Edit</button>
                    <button onclick="openDeleteConfirm(${product.id})" class="btn btn-danger">Hapus</button>
                </div>
            </td>
        </tr>
    `).join('');
}

function openAddProductModal() {
    editingProductId = null;
    clearErrors();

    document.getElementById('modal-title').textContent = 'Tambah Bahan Ajar';
    document.getElementById('product-id').value = '';
    document.getElementById('product-code').value = '';
    document.getElementById('product-name').value = '';
    document.getElementById('product-faculty').value = '';
    document.getElementById('product-price').value = '';
    document.getElementById('product-stock').value = '';
    document.getElementById('product-description').value = '';

    openModal('product-form-modal');
}

function editProduct(productId) {
    const product = getProductById(productId);
    if (!product) return;

    editingProductId = productId;
    clearErrors();

    document.getElementById('modal-title').textContent = 'Edit Bahan Ajar';
    document.getElementById('product-id').value = product.id;
    document.getElementById('product-code').value = product.code;
    document.getElementById('product-name').value = product.name;
    document.getElementById('product-faculty').value = product.faculty;
    document.getElementById('product-price').value = product.price;
    document.getElementById('product-stock').value = product.stock;
    document.getElementById('product-description').value = product.description || '';

    openModal('product-form-modal');
}

function handleProductSubmit(event) {
    event.preventDefault();

    clearErrors();

    const code = document.getElementById('product-code').value.trim();
    const name = document.getElementById('product-name').value.trim();
    const faculty = document.getElementById('product-faculty').value;
    const price = parseFloat(document.getElementById('product-price').value);
    const stock = parseInt(document.getElementById('product-stock').value);
    const description = document.getElementById('product-description').value.trim();

    let isValid = true;

    if (!code) {
        showError('product-code', 'Kode harus diisi');
        isValid = false;
    }

    if (!name) {
        showError('product-name', 'Nama harus diisi');
        isValid = false;
    }

    if (!faculty) {
        showError('product-faculty', 'Fakultas harus dipilih');
        isValid = false;
    }

    if (isNaN(price) || price <= 0) {
        showError('product-price', 'Harga harus angka positif');
        isValid = false;
    }

    if (isNaN(stock) || stock < 0) {
        showError('product-stock', 'Stok harus angka positif');
        isValid = false;
    }

    if (!isValid) return;

    const productData = { code, name, faculty, price, stock, description };

    if (editingProductId) {
        updateProduct(editingProductId, productData);
        showNotification('Bahan ajar berhasil diperbarui', 'success');
    } else {
        addProduct(productData);
        showNotification('Bahan ajar berhasil ditambahkan', 'success');
    }

    closeProductModal();
    initializeProductsManagement();
}

function closeProductModal() {
    closeModal('product-form-modal');
    editingProductId = null;
}

function openDeleteConfirm(productId) {
    deleteProductId = productId;
    openModal('confirm-delete-modal');
}

function closeConfirmModal() {
    closeModal('confirm-delete-modal');
    deleteProductId = null;
}

function confirmDelete() {
    if (deleteProductId) {
        deleteProduct(deleteProductId);
        showNotification('Bahan ajar berhasil dihapus', 'success');
        closeConfirmModal();
        initializeProductsManagement();
    }
}

// Close on overlay click
document.addEventListener('DOMContentLoaded', () => {
    const modal = document.getElementById('product-form-modal');
    if (modal) {
        const overlay = modal.querySelector('.modal-overlay');
        if (overlay) {
            overlay.addEventListener('click', closeProductModal);
        }
    }
});
