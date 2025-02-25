class ProductCatalog {
    constructor() {
        this.products = {
            shirts: [
                { id: 1, name: 'Classic White Shirt', price: 49.99, image: 'https://images.unsplash.com/photo-1596755094514-f87e34085b2c', description: 'Premium cotton white shirt', sizes: ['S', 'M', 'L', 'XL'] },
                { id: 2, name: 'Blue Denim Shirt', price: 59.99, image: 'https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf', description: 'Casual denim shirt', sizes: ['M', 'L', 'XL'] },
                { id: 3, name: 'Striped Business Shirt', price: 69.99, image: 'https://images.unsplash.com/photo-1588359348347-9bc6cbbb689e', description: 'Professional striped shirt', sizes: ['S', 'M', 'L'] }
            ],
            pants: [
                { id: 4, name: 'Khaki Chinos', price: 79.99, image: 'https://images.unsplash.com/photo-1624378439575-d8705ad7ae80', description: 'Classic khaki pants', sizes: ['30', '32', '34', '36'] },
                { id: 5, name: 'Black Formal Pants', price: 89.99, image: 'https://images.unsplash.com/photo-1594633312681-425c7b97ccd1', description: 'Formal business pants', sizes: ['32', '34', '36'] }
            ],
            jeans: [
                { id: 6, name: 'Blue Slim Fit Jeans', price: 69.99, image: 'https://images.unsplash.com/photo-1542272604-787c3835535d', description: 'Classic slim fit jeans', sizes: ['30', '32', '34'] },
                { id: 7, name: 'Black Straight Jeans', price: 74.99, image: 'https://images.unsplash.com/photo-1541099649105-f69ad21f3246', description: 'Straight cut black jeans', sizes: ['32', '34', '36'] }
            ],
            sweaters: [
                { id: 8, name: 'Wool Knit Sweater', price: 89.99, image: 'https://images.unsplash.com/photo-1576566588028-4147f3842f27', description: 'Warm wool sweater', sizes: ['S', 'M', 'L'] },
                { id: 9, name: 'Casual Pullover', price: 79.99, image: 'https://images.unsplash.com/photo-1516720262454-f466a3eb9be1', description: 'Comfortable casual pullover', sizes: ['M', 'L', 'XL'] }
            ]
        };
        this.orders = JSON.parse(localStorage.getItem('orders')) || [];
    }

    displayProducts(category) {
        const productContainer = document.getElementById('product-display');
        const products = this.products[category];
        
        productContainer.innerHTML = '';
        products.forEach(product => {
            const productElement = document.createElement('div');
            productElement.className = 'product-card';
            productElement.innerHTML = `
                <img src="${product.image}" alt="${product.name}">
                <h3>${product.name}</h3>
                <p class="price">$${product.price}</p>
                <p class="description">${product.description}</p>
                <div class="size-selector">
                    <label>Size:</label>
                    <select class="size-select">
                        ${product.sizes.map(size => `<option value="${size}">${size}</option>`).join('')}
                    </select>
                </div>
                <button class="order-btn" data-product-id="${product.id}">Order Now</button>
            `;
            productContainer.appendChild(productElement);

            const orderBtn = productElement.querySelector('.order-btn');
            const sizeSelect = productElement.querySelector('.size-select');
            
            orderBtn.addEventListener('click', () => {
                const selectedSize = sizeSelect.value;
                this.showOrderModal(product, selectedSize);
            });
        });
    }

    showOrderModal(product, selectedSize) {
        const modal = document.createElement('div');
        modal.className = 'order-modal';
        modal.innerHTML = `
            <div class="modal-content">
                <h2>Order Details</h2>
                <div class="product-summary">
                    <img src="${product.image}" alt="${product.name}">
                    <div class="details">
                        <h3>${product.name}</h3>
                        <p>Price: $${product.price}</p>
                        <p>Selected Size: ${selectedSize}</p>
                    </div>
                </div>
                <form id="order-form">
                    <input type="hidden" name="selectedSize" value="${selectedSize}">
                    <div class="form-group">
                        <label>Name:</label>
                        <input type="text" name="customerName" required>
                    </div>
                    <div class="form-group">
                        <label>Email:</label>
                        <input type="email" name="customerEmail" required>
                    </div>
                    <div class="form-group">
                        <label>Phone:</label>
                        <input type="tel" name="customerPhone" required>
                    </div>
                    <div class="form-group">
                        <label>Address:</label>
                        <textarea name="customerAddress" required></textarea>
                    </div>
                    <div class="payment-methods">
                        <h3>Payment Method</h3>
                        <div class="payment-options">
                            <label>
                                <input type="radio" name="paymentMethod" value="card" required>
                                Credit/Debit Card
                            </label>
                            <label>
                                <input type="radio" name="paymentMethod" value="paypal">
                                PayPal
                            </label>
                            <label>
                                <input type="radio" name="paymentMethod" value="cod">
                                Cash on Delivery
                            </label>
                        </div>
                    </div>
                    <button type="submit" class="submit-order">Place Order</button>
                </form>
                <button class="close-modal">×</button>
            </div>
        `;
        document.body.appendChild(modal);

        const orderForm = modal.querySelector('#order-form');
        orderForm.addEventListener('submit', (e) => {
            e.preventDefault();
            this.processOrder(product, orderForm);
            modal.remove();
        });

        const closeBtn = modal.querySelector('.close-modal');
        closeBtn.addEventListener('click', () => modal.remove());
    }

    processOrder(product, form) {
        const formData = new FormData(form);
        const orderData = {
            orderDate: new Date().toLocaleString(),
            product: {
                ...product,
                size: formData.get('selectedSize')
            },
            customer: {
                name: formData.get('customerName'),
                email: formData.get('customerEmail'),
                phone: formData.get('customerPhone'),
                address: formData.get('customerAddress')
            },
            paymentMethod: formData.get('paymentMethod')
        };

        // Save order to local storage
        this.orders.push(orderData);
        localStorage.setItem('orders', JSON.stringify(this.orders));

        // Show order confirmation
        this.showOrderConfirmation(orderData);
    }

    showOrderConfirmation(orderData) {
        const confirmationModal = document.createElement('div');
        confirmationModal.className = 'order-confirmation-modal';
        confirmationModal.innerHTML = `
            <div class="modal-content">
                <h2>Order Confirmation</h2>
                <div class="confirmation-details">
                    <h3>Order Details:</h3>
                    <p><strong>Order Date:</strong> ${orderData.orderDate}</p>
                    <p><strong>Product:</strong> ${orderData.product.name}</p>
                    <p><strong>Size:</strong> ${orderData.product.size}</p>
                    <p><strong>Price:</strong> $${orderData.product.price}</p>
                    
                    <h3>Customer Information:</h3>
                    <p><strong>Name:</strong> ${orderData.customer.name}</p>
                    <p><strong>Email:</strong> ${orderData.customer.email}</p>
                    <p><strong>Phone:</strong> ${orderData.customer.phone}</p>
                    <p><strong>Address:</strong> ${orderData.customer.address}</p>
                    
                    <h3>Payment Method:</h3>
                    <p>${orderData.paymentMethod}</p>

                    <p class="confirmation-message">Thank you for your order! A confirmation email will be sent to ${orderData.customer.email}</p>
                </div>
                <button class="close-confirmation">Close</button>
            </div>
        `;
        document.body.appendChild(confirmationModal);

        const closeBtn = confirmationModal.querySelector('.close-confirmation');
        closeBtn.addEventListener('click', () => confirmationModal.remove());

        // Log the order details to console
        console.log('New Order Received:', orderData);
    }
}

// Initialize the catalog
window.productCatalog = new ProductCatalog();
