/**
 * SITTA - Checkout Module
 */

document.addEventListener('DOMContentLoaded', () => {
    const user = checkAuth('user');
    if (user) {
        initializeCheckout(user);
    }
});

function initializeCheckout(user) {
    const cart = getCart();
    if (cart.length === 0) {
        window.location.href = 'cart.html';
        return;
    }

    renderOrderSummary();

    // Pre-fill address from user data
    const addressField = document.getElementById('delivery-address');
    if (addressField && user.address) {
        addressField.value = user.address;
    }

    // Handle delivery method change
    document.querySelectorAll('input[name="delivery"]').forEach(radio => {
        radio.addEventListener('change', () => {
            updateShippingCost();
            toggleDeliveryFields();
        });
    });

    // Initialize visibility based on selected option
    updateShippingCost();
    toggleDeliveryFields();
}

function toggleDeliveryFields() {
    const deliveryMethod = document.querySelector('input[name="delivery"]:checked').value;
    const addressFieldset = document.getElementById('fieldset-delivery-address');
    const addressInput = document.getElementById('delivery-address');

    if (addressFieldset) {
        if (deliveryMethod === 'pickup') {
            // hide address when pickup selected
            addressFieldset.style.display = 'none';
            if (addressInput) addressInput.required = false;
        } else {
            addressFieldset.style.display = 'block';
            if (addressInput) addressInput.required = true;
        }
    }
}

function renderOrderSummary() {
    const cart = getCart();
    const summaryItems = document.getElementById('summary-items');

    let html = '';
    let subtotal = 0;

    cart.forEach(item => {
        const product = getProductById(item.productId);
        if (product) {
            const itemTotal = product.price * item.quantity;
            subtotal += itemTotal;
            html += `
                <div class="summary-item">
                    <span>${product.name} x${item.quantity}</span>
                    <span>${formatPrice(itemTotal)}</span>
                </div>
            `;
        }
    });

    summaryItems.innerHTML = html;

    document.getElementById('summary-subtotal').textContent = formatPrice(subtotal);
}

function updateShippingCost() {
    const deliveryMethod = document.querySelector('input[name="delivery"]:checked').value;
    const shipping = deliveryMethod === 'delivery' ? 25000 : 0;
    const subtotal = getCartTotal();
    const total = subtotal + shipping;

    document.getElementById('summary-shipping').textContent = 
        shipping > 0 ? formatPrice(shipping) : 'Gratis';
    document.getElementById('summary-total').textContent = formatPrice(total);
}

function handleCheckout(event) {
    event.preventDefault();

    const user = getCurrentUser();
    const cart = getCart();

    if (cart.length === 0) {
        showNotification('Keranjang kosong', 'error');
        return;
    }

    clearErrors();

    const deliveryMethod = document.querySelector('input[name="delivery"]:checked').value;
    const deliveryAddressEl = document.getElementById('delivery-address');
    const deliveryAddress = deliveryMethod === 'delivery' && deliveryAddressEl ? deliveryAddressEl.value.trim() : '';
    const paymentMethod = document.querySelector('input[name="payment"]:checked') ? document.querySelector('input[name="payment"]:checked').value : '';
    const notes = document.getElementById('order-notes').value.trim();

    let isValid = true;

    // Validate address only when delivery selected
    if (deliveryMethod === 'delivery' && !deliveryAddress) {
        showError('delivery-address', 'Alamat pengiriman harus diisi');
        isValid = false;
    }

    if (!isValid) return;

    // Calculate totals
    const subtotal = getCartTotal();
    const shipping = deliveryMethod === 'delivery' ? 25000 : 0;
    const total = subtotal + shipping;

    // Create order
    const items = cart.map(item => {
        const product = getProductById(item.productId);
        return {
            productId: item.productId,
            productName: product.name,
            productCode: product.code,
            quantity: item.quantity,
            price: product.price,
            subtotal: product.price * item.quantity
        };
    });

    const order = {
        userId: user.id,
        userName: user.name,
        userEmail: user.email,
        items,
        deliveryMethod,
        deliveryAddress,
        paymentMethod,
        notes,
        subtotal,
        shipping,
        total,
        status: 'Menunggu Konfirmasi'
    };

    const createdOrder = createOrder(order);

    // Clear cart
    clearCart();

    // Show success modal
    const successModal = document.getElementById('success-modal');
    document.getElementById('order-id-display').innerHTML = 
        `<strong>No. Pesanan: #${createdOrder.id}</strong><br>Total: ${formatPrice(createdOrder.total)}`;

    successModal.classList.add('active');
}

function goToOrderHistory() {
    window.location.href = 'order-history.html';
}
