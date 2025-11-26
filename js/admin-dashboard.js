/**
 * SITTA - Admin Dashboard Module
 */

document.addEventListener('DOMContentLoaded', () => {
    const admin = checkAuth('admin');
    if (admin) {
        initializeDashboard();
    }
});

function initializeDashboard() {
    const admin = getCurrentUser();
    if (!admin) return;

    document.getElementById('admin-name').textContent = admin.name;

    const orders = getOrders();
    const products = getProducts();

    // Populate stats
    document.getElementById('total-orders').textContent = orders.length;
    document.getElementById('pending-orders').textContent = orders.filter(o => o.status === 'Menunggu Konfirmasi').length;
    document.getElementById('processing-orders').textContent = orders.filter(o => o.status === 'Sedang Diproses').length;
    document.getElementById('total-products').textContent = products.length;

    // Render recent orders
    renderRecentOrders(orders.slice(0, 5));
}

function renderRecentOrders(orders) {
    const tbody = document.getElementById('recent-orders-list');
    if (orders.length === 0) {
        tbody.innerHTML = '<tr><td colspan="6">Tidak ada pesanan terbaru</td></tr>';
        return;
    }

    tbody.innerHTML = orders.map(order => `
        <tr>
            <td>#${order.id}</td>
            <td>${order.userName}</td>
            <td>${formatDate(order.createdAt)}</td>
            <td>${formatPrice(order.total)}</td>
            <td><span class="status-badge status-${order.status.toLowerCase().replace(' ', '-')}">${order.status}</span></td>
            <td><a href="admin-orders.html?orderId=${order.id}" class="btn btn-sm btn-primary">Detail</a></td>
        </tr>
    `).join('');
}

function viewOrder(orderId) {
    window.location.href = 'admin-orders.html?orderId=' + orderId;
}
