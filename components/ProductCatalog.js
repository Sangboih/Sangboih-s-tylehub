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
                    <input type="hidden" name="size" value="${selectedSize}">
                    <div class="form-group">
                        <label>Name:</label>
                        <input type="text" name="name" required>
                    </div>
                    <div class="form-group">
                        <label>Email:</label>
                        <input type="email" name="email" required>
                    </div>
                    <div class="form-group">
                        <label>Address:</label>
                        <textarea name="address" required></textarea>
                    </div>
                    <div class="payment-methods">
                        <h3>Payment Method</h3>
                        <div class="payment-options">
                            <label>
                                <input type="radio" name="payment" value="Credit/Debit Card" required>
                                Credit/Debit Card
                            </label>
                            <label>
                                <input type="radio" name="payment" value="PayPal">
                                PayPal
                            </label>
                            <label>
                                <input type="radio" name="payment" value="Cash on Delivery">
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
        orderForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            const submitButton = orderForm.querySelector('.submit-order');
            submitButton.disabled = true;
            submitButton.textContent = 'Processing...';
            
            try {
                await this.processOrder(product, orderForm);
                modal.remove();
            } catch (error) {
                submitButton.disabled = false;
                submitButton.textContent = 'Place Order';
            }
        });

        const closeBtn = modal.querySelector('.close-modal');
        closeBtn.addEventListener('click', () => modal.remove());
    }

    async processOrder(product, form) {
        try {
            const formData = new FormData(form);
            
            // Create template parameters
            const templateParams = {
                to_name: "Store Owner",
                from_name: formData.get('name'),
                from_email: formData.get('email'),
                message: `
                    Order Details:
                    Product: ${product.name}
                    Size: ${formData.get('size')}
                    Price: $${product.price}
                    
                    Customer Details:
                    Name: ${formData.get('name')}
                    Email: ${formData.get('email')}
                    Phone: 8798782828@ptaxis
                    Address: ${formData.get('address')}
                    
                    Payment Method: ${formData.get('payment')}
                    Order Date: ${new Date().toLocaleString()}
                `
            };

            console.log('Sending email with:', {
                serviceId: 'service_jf95wla',
                templateId: 'template_yexgnho',
                params: templateParams
            });

            const response = await window.emailjs.send(
                'service_jf95wla',
                'template_yexgnho',
                templateParams
            );

            console.log('Email sent successfully:', response);

            // Save order to local storage
            const orderData = {
                orderDate: new Date().toLocaleString(),
                product: {
                    ...product,
                    size: formData.get('size')
                },
                customer: {
                    name: formData.get('name'),
                    email: formData.get('email'),
                    phone: '8798782828@ptaxis',
                    address: formData.get('address')
                },
                paymentMethod: formData.get('payment')
            };

            this.orders.push(orderData);
            localStorage.setItem('orders', JSON.stringify(this.orders));

            // Show success confirmation
            this.showOrderConfirmation(orderData);
        } catch (error) {
            console.error("Error processing order:", error);
            alert("There was an error processing your order. Please try again.");
            throw error;
        }
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

                    <p class="confirmation-message">Thank you for your order! A confirmation email has been sent to sangboih32@gmail.com</p>
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
