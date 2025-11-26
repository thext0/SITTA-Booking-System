/**
 * SITTA - Admin Orders Management Module
 */

let selectedOrderId = null;

document.addEventListener('DOMContentLoaded', () => {
    const admin = checkAuth('admin');
    if (admin) {
        initializeOrdersManagement();
    }
});

function initializeOrdersManagement() {
    renderOrdersList(getOrders());
}

function renderOrdersList(orders) {
    const tbody = document.getElementById('orders-list');

    if (orders.length === 0) {
        tbody.innerHTML = '<tr><td colspan="6" style="text-align: center; padding: 2rem;">Tidak ada pesanan</td></tr>';
        return;
    }

    tbody.innerHTML = orders.map(order => `
        <tr class="${order.status === 'Selesai' ? 'order-completed' : ''}">
            <td>#${order.id}</td>
            <td>${order.userName}</td>
            <td>${formatDate(order.createdAt)}</td>
            <td>${formatPrice(order.total)}</td>
            <td><span class="status-badge status-${order.status.toLowerCase().replace(' ', '-')}">${order.status}</span></td>
            <td>
                <div class="action-buttons">
                    <button onclick="viewOrderDetail(${order.id})" class="btn btn-primary">Detail</button>
                    ${order.status === 'Selesai' ? `
                        <span class="final-status">Selesai</span>
                    ` : `
                        <select onchange="updateStatus(${order.id}, this.value)" style="padding: 0.5rem; border-radius: 6px; border: 1px solid #e5e7eb;">
                            <option value="">Ubah Status</option>
                            <option value="Menunggu Konfirmasi">Menunggu</option>
                            <option value="Sedang Diproses">Diproses</option>
                            <option value="Siap Diambil">Siap</option>
                            <option value="Selesai">Selesai</option>
                            <option value="Dibatalkan">Dibatalkan</option>
                        </select>
                    `}
                </div>
            </td>
        </tr>
    `).join('');
}

function filterOrdersByStatus(status) {
    const orders = status ? getOrdersByStatus(status) : getOrders();
    renderOrdersList(orders);
}

function viewOrderDetail(orderId) {
    const order = getOrderById(orderId);
    if (!order) return;

    selectedOrderId = orderId;

    const modal = document.getElementById('order-detail-modal');
    const content = document.getElementById('order-detail-content');

    content.innerHTML = `
        <h3>Detail Pesanan #${order.id}</h3>

        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 1rem; margin-bottom: 1rem;">
            <div class="detail-item">
                <strong>Nama Pemesan:</strong>
                <span>${order.userName}</span>
            </div>
            <div class="detail-item">
                <strong>Email:</strong>
                <span>${order.userEmail}</span>
            </div>
            <div class="detail-item">
                <strong>Tanggal Pesan:</strong>
                <span>${formatDate(order.createdAt)}</span>
            </div>
            <div class="detail-item">
                <strong>Status:</strong>
                <span style="background: #2563eb; color: white; padding: 0.25rem 0.75rem; border-radius: 4px;">${order.status}</span>
            </div>
        </div>

        <div class="detail-item" style="margin-bottom: 1rem;">
            <strong>Alamat Pengiriman:</strong>
            <span>${order.deliveryAddress}</span>
        </div>

        <div class="detail-item" style="margin-bottom: 1rem;">
            <strong>Metode Pengiriman:</strong>
            <span>${order.deliveryMethod === 'pickup' ? 'Ambil di Tempat' : 'Dikirim'}</span>
        </div>

        <div style="border: 1px solid #e5e7eb; border-radius: 6px; padding: 1rem; margin-bottom: 1rem;">
            <strong style="display: block; margin-bottom: 0.5rem;">Item:</strong>
            <table class="detail-table">
                <thead>
                    <tr>
                        <th>Produk</th>
                        <th>Harga</th>
                        <th>Qty</th>
                        <th>Subtotal</th>
                    </tr>
                </thead>
                <tbody>
                    ${order.items.map(item => `
                        <tr>
                            <td>${item.productName}</td>
                            <td>${formatPrice(item.price)}</td>
                            <td>${item.quantity}</td>
                            <td>${formatPrice(item.subtotal)}</td>
                        </tr>
                    `).join('')}
                </tbody>
            </table>
        </div>

        <div class="detail-item" style="background: #f0f9ff; border-left: 4px solid #2563eb; margin-bottom: 1rem;">
            <strong>Ringkasan Biaya:</strong>
            <div style="margin-top: 0.5rem;">
                <div>Subtotal: ${formatPrice(order.subtotal)}</div>
                <div>Ongkir: ${formatPrice(order.shipping)}</div>
                <div style="font-weight: 600; margin-top: 0.5rem;">Total: ${formatPrice(order.total)}</div>
            </div>
        </div>

        ${renderModalActionButtons(order)}

        <button onclick="closeOrderDetailModal()" class="btn btn-secondary" style="width: 100%;">
            Tutup
        </button>
    `;

    modal.classList.add('active');
}

function updateStatus(orderId, newStatus) {
    if (!newStatus) return;

    const order = getOrderById(orderId);
    if (order && order.status === 'Selesai') {
        showNotification('Status pesanan sudah "Selesai" dan tidak dapat diubah.', 'error');
        return;
    }

    updateOrderStatus(orderId, newStatus);
    showNotification(`Status pesanan berhasil diubah menjadi: ${newStatus}`, 'success');
    initializeOrdersManagement();
}

function updateStatusFromModal(newStatus) {
    if (selectedOrderId) {
        const order = getOrderById(selectedOrderId);
        if (order && order.status === 'Selesai') {
            showNotification('Status pesanan sudah "Selesai".', 'error');
            return;
        }

        updateOrderStatus(selectedOrderId, newStatus);
        showNotification(`Status pesanan berhasil diubah menjadi: ${newStatus}`, 'success');
        closeOrderDetailModal();
        initializeOrdersManagement();
    }
}

function closeOrderDetailModal() {
    const modal = document.getElementById('order-detail-modal');
    if (modal) {
        modal.classList.remove('active');
    }
    selectedOrderId = null;
}

function renderModalActionButtons(order) {
    const { status } = order;
    let buttons = '';

    if (status === 'Menunggu Konfirmasi') {
        buttons = `
            <button onclick="updateStatusFromModal('Sedang Diproses')" class="btn btn-primary">Proses</button>
            <button onclick="updateStatusFromModal('Dibatalkan')" class="btn btn-danger">Batalkan</button>
        `;
    } else if (status === 'Sedang Diproses') {
        buttons = `
            <button onclick="updateStatusFromModal('Siap Diambil')" class="btn btn-primary">Siap Diambil</button>
            <button onclick="updateStatusFromModal('Dibatalkan')" class="btn btn-danger">Batalkan</button>
        `;
    } else if (status === 'Siap Diambil') {
        buttons = `
            <button onclick="updateStatusFromModal('Selesai')" class="btn btn-primary">Selesai</button>
            <button onclick="updateStatusFromModal('Dibatalkan')" class="btn btn-danger">Batalkan</button>
        `;
    } else if (status === 'Selesai' || status === 'Dibatalkan') {
        return `<div class="final-status-message">Status pesanan ini tidak dapat diubah.</div>`;
    }

    return `<div class="modal-actions">${buttons}</div>`;
}

// Close on overlay click
document.addEventListener('DOMContentLoaded', () => {
    const modal = document.getElementById('order-detail-modal');
    if (modal) {
        const overlay = modal.querySelector('.modal-overlay');
        if (overlay) {
            overlay.addEventListener('click', closeOrderDetailModal);
        }
    }
});
