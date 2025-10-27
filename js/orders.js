/**
 * SITTA - Order History Module
 */

document.addEventListener('DOMContentLoaded', () => {
    const user = checkAuth('user');
    if (user) {
        initializeOrderHistory(user);
    }
});

function initializeOrderHistory(user) {
    const orders = getUserOrders(user.id);

    if (orders.length === 0) {
        document.getElementById('orders-empty').style.display = 'block';
        document.getElementById('orders-content').style.display = 'none';
    } else {
        document.getElementById('orders-empty').style.display = 'none';
        document.getElementById('orders-content').style.display = 'block';
        renderOrdersList(orders);
    }
}

function renderOrdersList(orders) {
    const listContainer = document.getElementById('orders-list');

    listContainer.innerHTML = orders.map(order => `
        <div class="order-card fade-in">
            <div class="order-header">
                <span class="order-id">Pesanan #${order.id}</span>
                <span class="order-status ${order.status.toLowerCase().replace(' ', '-')}">${order.status}</span>
            </div>

            <div class="order-info">
                <div class="order-info-item">
                    <strong>Tanggal Pesan:</strong>
                    ${formatDate(order.createdAt)}
                </div>
                <div class="order-info-item">
                    <strong>Metode Pengiriman:</strong>
                    ${order.deliveryMethod === 'pickup' ? 'Ambil di Tempat' : 'Dikirim ke Alamat'}
                </div>
                <div class="order-info-item">
                    <strong>Total Pesanan:</strong>
                    ${formatPrice(order.total)}
                </div>
            </div>

            <div class="order-items">
                <strong style="display: block; margin-bottom: 0.5rem;">Item:</strong>
                ${order.items.map(item => `
                    <div class="order-item">
                        <span>${item.productName} (${item.productCode}) x${item.quantity}</span>
                        <span>${formatPrice(item.subtotal)}</span>
                    </div>
                `).join('')}
            </div>

            <div class="order-footer">
                <div class="order-total">Total: ${formatPrice(order.total)}</div>
                <button onclick="showOrderDetail(${order.id})" class="btn btn-primary" style="padding: 0.5rem 1rem;">
                    Lihat Detail
                </button>
            </div>
        </div>
    `).join('');
}

function showOrderDetail(orderId) {
    const order = getOrderById(orderId);
    if (!order) return;

    const modal = document.getElementById('order-detail-modal');
    const content = document.getElementById('order-detail-content');

    content.innerHTML = `
        <h3>Detail Pesanan #${order.id}</h3>

        <div class="detail-item" style="margin-bottom: 1rem;">
            <strong>Status Pesanan:</strong>
            <span style="color: #2563eb; font-weight: 600; font-size: 1.1rem;">${order.status}</span>
        </div>

        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 1rem; margin-bottom: 1rem;">
            <div class="detail-item">
                <strong>Tanggal Pesan:</strong>
                <span>${formatDate(order.createdAt)}</span>
            </div>
            <div class="detail-item">
                <strong>Diupdate:</strong>
                <span>${formatDate(order.updatedAt)}</span>
            </div>
            <div class="detail-item">
                <strong>Metode Pengiriman:</strong>
                <span>${order.deliveryMethod === 'pickup' ? 'Ambil di Tempat' : 'Dikirim ke Alamat'}</span>
            </div>
            <div class="detail-item">
                <strong>Metode Pembayaran:</strong>
                <span>${order.paymentMethod === 'cod' ? 'Bayar di Tempat (COD)' : 'Transfer Manual'}</span>
            </div>
        </div>

        <div class="detail-item" style="margin-bottom: 1rem;">
            <strong>Alamat Pengiriman:</strong>
            <span>${order.deliveryAddress}</span>
        </div>

        <div style="border: 1px solid #e5e7eb; border-radius: 6px; padding: 1rem; margin-bottom: 1rem;">
            <strong style="display: block; margin-bottom: 0.5rem;">Item Pesanan:</strong>
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

        ${order.notes ? `
            <div class="detail-item">
                <strong>Catatan:</strong>
                <span>${order.notes}</span>
            </div>
        ` : ''}

        <div style="margin-top: 1.5rem; padding-top: 1rem; border-top: 1px solid #e5e7eb;">
            <button onclick="closeOrderDetailModal()" class="btn btn-primary" style="width: 100%;">
                Tutup
            </button>
        </div>
    `;

    modal.classList.add('active');
}

function closeOrderDetailModal() {
    const modal = document.getElementById('order-detail-modal');
    if (modal) {
        modal.classList.remove('active');
    }
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
