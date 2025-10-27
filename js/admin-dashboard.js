/**
 * SITTA - Admin Dashboard Module
 */

document.addEventListener('DOMContentLoaded', () => {
    const admin = checkAuth('admin');
    if (admin) {
        initializeDashboard(admin);
    }
});

function initializeDashboard(admin) {
    document.getElementById('admin-name').textContent = admin.name + ' (Admin)';
    updateStatistics();
    renderRecentOrders();
}

function updateStatistics() {
    const orders = getOrders();
    const products = getProducts();

    const totalOrders = orders.length;
    const pendingOrders = orders.filter(o => o.status === 'Menunggu Konfirmasi').length;
    const processingOrders = orders.filter(o => o.status === 'Sedang Diproses').length;

    document.getElementById('total-orders').textContent = totalOrders;
    document.getElementById('pending-orders').textContent = pendingOrders;
    document.getElementById('processing-orders').textContent = processingOrders;
    document.getElementById('total-products').textContent = products.length;
}

function renderRecentOrders() {
    const orders = getOrders().sort((a, b) => 
        new Date(b.createdAt) - new Date(a.createdAt)
    ).slice(0, 5);

    const tbody = document.getElementById('recent-orders-list');

    tbody.innerHTML = orders.map(order => `
        <tr>
            <td>#${order.id}</td>
            <td>${order.userName}</td>
            <td>${formatDate(order.createdAt)}</td>
            <td>${formatPrice(order.total)}</td>
            <td><span class="status-badge status-${order.status.toLowerCase().replace(' ', '-')}">${order.status}</span></td>
            <td>
                <button onclick="viewOrder(${order.id})" class="btn btn-primary" style="padding: 0.5rem 1rem; font-size: 0.875rem;">
                    Lihat
                </button>
            </td>
        </tr>
    `).join('');
}

function viewOrder(orderId) {
    window.location.href = 'admin-orders.html?orderId=' + orderId;
}
