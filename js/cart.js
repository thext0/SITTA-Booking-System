/**
 * SITTA - Shopping Cart Module
 */

document.addEventListener('DOMContentLoaded', () => {
    const user = checkAuth('user');
    if (user) {
        initializeCart();
    }
});

function initializeCart() {
    const cart = getCart();

    if (cart.length === 0) {
        document.getElementById('cart-empty').style.display = 'block';
        document.getElementById('cart-content').style.display = 'none';
    } else {
        document.getElementById('cart-empty').style.display = 'none';
        document.getElementById('cart-content').style.display = 'block';
        renderCartItems();
    }
}

function renderCartItems() {
    const cart = getCart();
    const tbody = document.getElementById('cart-items');

    let html = '';
    let total = 0;

    cart.forEach(item => {
        const product = getProductById(item.productId);
        if (product) {
            const subtotal = product.price * item.quantity;
            total += subtotal;

            html += `
                <tr>
                    <td>${product.name} (${product.code})</td>
                    <td>${formatPrice(product.price)}</td>
                    <td>
                        <input type="number" value="${item.quantity}" min="1" 
                               onchange="updateQuantity(${item.productId}, this.value)">
                    </td>
                    <td>${formatPrice(subtotal)}</td>
                    <td>
                        <button onclick="removeItem(${item.productId})" class="btn btn-danger" 
                                style="padding: 0.5rem 1rem; font-size: 0.875rem;">
                            Hapus
                        </button>
                    </td>
                </tr>
            `;
        }
    });

    tbody.innerHTML = html;
    document.getElementById('total-price').textContent = formatPrice(total);
}

function updateQuantity(productId, quantity) {
    const qty = parseInt(quantity);
    if (qty <= 0) {
        removeItem(productId);
    } else {
        updateCartItem(productId, qty);
        renderCartItems();
        updateCartBadge();
    }
}

function removeItem(productId) {
    removeFromCart(productId);
    initializeCart();
    updateCartBadge();
    showNotification('Item dihapus dari keranjang', 'success');
}

function goToCheckout() {
    const cart = getCart();
    if (cart.length === 0) {
        showNotification('Keranjang masih kosong', 'error');
        return;
    }
    window.location.href = 'checkout.html';
}
