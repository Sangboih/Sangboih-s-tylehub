# Sangboih-s-tylehub
Online marketing webpage
ff57b52c00dfa3f5094d8fc6ce239bb6850c12b2

// Cart functionality
let cartCount = 0;
const cartCountElement = document.querySelector('.cart-count');
const addToCartButtons = document.querySelectorAll('.add-to-cart');

// Product data
const products = {
    'Classic White Shirt': {
        price: 49.99,
        description: 'Premium cotton white shirt perfect for any occasion. Features a classic collar and regular fit.',
        image: 'https://images.unsplash.com/photo-1596755094514-f87e34085b2c'
    },
    'Luxury Pen Set': {
        price: 29.99,
        description: 'Elegant writing set featuring premium ballpoint pens with smooth ink flow and comfortable grip.',
        image: 'https://images.unsplash.com/photo-1585336261022-680e295ce3fe'
    },
    'Stylish Watch': {
        price: 79.99,
        description: 'Modern minimalist watch with leather strap and premium quartz movement.',
        image: 'https://images.unsplash.com/photo-1591047139829-d91aecb6caea'
    },
    'Premium Blue Shirt': {
        price: 59.99,
        description: 'Sophisticated blue shirt made from high-quality cotton blend, perfect for business casual wear.',
        image: 'https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf'
    },
    'Fountain Pen Collection': {
        price: 89.99,
        description: 'Luxury fountain pen collection featuring different nib sizes and premium ink cartridges.',
        image: 'https://images.unsplash.com/photo-1597484662317-9bd7bdda2907'
    },
    'Designer Pen Set': {
        price: 39.99,
        description: 'Modern designer pen set with precision tips and ergonomic design.',
        image: 'https://images.unsplash.com/photo-1616097970275-1e187b4ce59f'
    }
};

// Modal elements
const productModal = document.getElementById('productModal');
const orderModal = document.getElementById('orderModal');
const closeButtons = document.querySelectorAll('.close-modal');
const quantityInput = document.getElementById('quantity');
const quantityBtns = document.querySelectorAll('.quantity-btn');
const orderForm = document.getElementById('orderForm');

// Update cart count
function updateCartCount() {
    cartCountElement.textContent = cartCount;
    cartCountElement.style.animation = 'fadeIn 0.3s ease';
}

// Add to cart functionality
addToCartButtons.forEach(button => {
    button.addEventListener('click', () => {
        cartCount++;
        updateCartCount();
        
        button.textContent = 'Added!';
        button.style.backgroundColor = '#27ae60';
        
        setTimeout(() => {
            button.textContent = 'Add to Cart';
            button.style.backgroundColor = '#3498db';
        }, 1000);
    });
});

// Quick view functionality
document.querySelectorAll('.quick-view').forEach(button => {
    button.addEventListener('click', (e) => {
        const productCard = e.target.closest('.product-card');
        const productName = productCard.querySelector('h3').textContent;
        const productData = products[productName];
        
        document.getElementById('modalProductImage').src = productData.image;
        document.getElementById('modalProductName').textContent = productName;
        document.getElementById('modalProductPrice').textContent = `$${productData.price}`;
        document.getElementById('modalProductDescription').textContent = productData.description;
        
        productModal.style.display = 'block';
        document.body.style.overflow = 'hidden';
    });
});

// Close modals
closeButtons.forEach(button => {
    button.addEventListener('click', () => {
        productModal.style.display = 'none';
        orderModal.style.display = 'none';
        document.body.style.overflow = 'auto';
    });
});

// Quantity controls
quantityBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        const input = btn.parentElement.querySelector('input');
        const currentValue = parseInt(input.value);
        
        if (btn.classList.contains('minus')) {
            if (currentValue > 1) input.value = currentValue - 1;
        } else {
            if (currentValue < 10) input.value = currentValue + 1;
        }
        
        updateOrderSummary();
    });
});

// Order now button
document.querySelector('.order-now-btn').addEventListener('click', () => {
    const productName = document.getElementById('modalProductName').textContent;
    const quantity = document.getElementById('quantity').value;
    const price = products[productName].price;
    
    document.getElementById('summaryProductName').textContent = productName;
    document.getElementById('summaryProductPrice').textContent = `$${price}`;
    document.getElementById('summaryQuantity').textContent = quantity;
    document.getElementById('summaryTotal').textContent = `$${(price * quantity).toFixed(2)}`;
    
    productModal.style.display = 'none';
    orderModal.style.display = 'block';
});

// Payment related functionality
const paymentOptions = document.querySelectorAll('.payment-option input[type="radio"]');
const cardDetails = document.querySelector('.card-details');
const upiDetails = document.querySelector('.upi-details');
const netbankingDetails = document.querySelector('.netbanking-details');
const codDetails = document.querySelector('.cod-details');

// Format card number with spaces
document.getElementById('cardNumber').addEventListener('input', function(e) {
    let value = e.target.value.replace(/\s+/g, '').replace(/[^0-9]/gi, '');
    let formattedValue = '';
    for(let i = 0; i < value.length; i++) {
        if(i > 0 && i % 4 === 0) {
            formattedValue += ' ';
        }
        formattedValue += value[i];
    }
    e.target.value = formattedValue;
});

// Format expiry date
document.getElementById('expiryDate').addEventListener('input', function(e) {
    let value = e.target.value.replace(/\s+/g, '').replace(/[^0-9]/gi, '');
    if(value.length > 2) {
        value = value.slice(0, 2) + '/' + value.slice(2);
    }
    e.target.value = value;
});

// Handle payment method selection
paymentOptions.forEach(option => {
    option.addEventListener('change', function() {
        // Remove selected class from all options
        document.querySelectorAll('.payment-option').forEach(opt => {
            opt.classList.remove('selected');
        });
        
        // Add selected class to chosen option
        this.closest('.payment-option').classList.add('selected');
        
        // Update total if COD is selected
        updateTotal();
    });
});

// Handle UPI app selection
document.querySelectorAll('.upi-app-btn').forEach(btn => {
    btn.addEventListener('click', function() {
        document.querySelectorAll('.upi-app-btn').forEach(b => {
            b.classList.remove('selected');
        });
        this.classList.add('selected');
        
        // Here you would typically integrate with the respective UPI app
        const app = this.dataset.app;
        console.log(`Initiating payment with ${app}`);
    });
});

// Update total amount based on payment method
function updateTotal() {
    const subtotal = parseFloat(document.getElementById('subtotal').textContent);
    const tax = subtotal * 0.05; // 5% tax
    let total = subtotal + tax;
    
    // Add COD charges if applicable
    if(document.getElementById('cod').checked) {
        total += 50; // ₹50 for COD
    }
    
    document.getElementById('tax').textContent = tax.toFixed(2);
    document.getElementById('total').textContent = total.toFixed(2);
}

// Process payment
async function processPayment(paymentMethod, formData) {
    const submitButton = document.querySelector('button[type="submit"]');
    submitButton.classList.add('processing-payment');
    submitButton.disabled = true;
    
    try {
        // Simulate payment processing
        await new Promise(resolve => setTimeout(resolve, 2000));
        
        // Here you would typically integrate with a payment gateway
        switch(paymentMethod) {
            case 'card':
                // Process card payment
                console.log('Processing card payment...');
                break;
            case 'upi':
                // Process UPI payment
                console.log('Processing UPI payment...');
                break;
            case 'netbanking':
                // Process net banking payment
                console.log('Processing net banking payment...');
                break;
            case 'cod':
                // Process COD
                console.log('Processing COD order...');
                break;
        }
        
        // Send order confirmation email
        await sendOrderConfirmation(formData);
        
        alert('Payment processed successfully! Order confirmation has been sent to your email.');
        return true;
    } catch (error) {
        console.error('Payment processing error:', error);
        alert('There was an error processing your payment. Please try again.');
        return false;
    } finally {
        submitButton.classList.remove('processing-payment');
        submitButton.disabled = false;
    }
}

// Send order confirmation
async function sendOrderConfirmation(formData) {
    const emailParams = {
        to_email: 'sangboih32@gmail.com',
        from_name: formData.customerName,
        from_email: formData.email,
        subject: `New Order from ${formData.customerName}`,
        message: `
            New Order Details:
            
            Product: ${formData.product}
            Quantity: ${formData.quantity}
            Payment Method: ${formData.paymentMethod}
            Total Amount: ${formData.total}
            
            Customer Information:
            Name: ${formData.customerName}
            Email: ${formData.email}
            Phone: ${formData.phone}
            Delivery Address: ${formData.address}
            
            Order placed on: ${new Date().toLocaleString()}
        `
    };

    try {
        await emailjs.send('YOUR_SERVICE_ID', 'YOUR_TEMPLATE_ID', emailParams);
    } catch (error) {
        console.error('Error sending confirmation email:', error);
        throw error;
    }
}

// Handle order form submission
orderForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const formData = {
        customerName: document.getElementById('customerName').value,
        email: document.getElementById('email').value,
        phone: document.getElementById('phone').value,
        address: document.getElementById('address').value,
        paymentMethod: document.querySelector('input[name="paymentMethod"]:checked').value,
        product: document.getElementById('summaryProductName').textContent,
        quantity: document.getElementById('summaryQuantity').textContent,
        total: document.getElementById('summaryTotal').textContent
    };
    
    const success = await processPayment(formData.paymentMethod, formData);
    
    if(success) {
        orderForm.reset();
        orderModal.style.display = 'none';
        document.body.style.overflow = 'auto';
    }
});

// Close modals when clicking outside
window.addEventListener('click', (e) => {
    if (e.target === productModal || e.target === orderModal) {
        productModal.style.display = 'none';
        orderModal.style.display = 'none';
        document.body.style.overflow = 'auto';
    }
});

// Smooth scroll for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Intersection Observer for fade-in animations
const observerOptions = {
    threshold: 0.2
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Apply fade-in animation to products and categories
document.querySelectorAll('.product-card, .category-card').forEach(element => {
    element.style.opacity = '0';
    element.style.transform = 'translateY(20px)';
    element.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
    observer.observe(element);
});

// Initialize animations
document.addEventListener('DOMContentLoaded', () => {
    document.body.style.opacity = '1';
});

:root {
    --primary-color: #232f3e;
    --secondary-color: #febd69;
    --accent-color: #00a8e1;
    --price-color: #B12704;
    --link-color: #0066c0;
    --border-color: #ddd;
}

* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
}

body {
    font-family: Arial, sans-serif;
    line-height: 1.6;
    background: #f8f8f8;
}

/* Header and Navigation */
header {
    background-color: #fff;
    box-shadow: 0 2px 5px rgba(0,0,0,0.1);
    position: fixed;
    width: 100%;
    top: 0;
    z-index: 1000;
}

nav {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 1rem 5%;
    max-width: 1200px;
    margin: 0 auto;
}

.logo {
    font-size: 1.5rem;
    font-weight: bold;
    color: #2c3e50;
    text-transform: capitalize;
}

.nav-links {
    display: flex;
    list-style: none;
    gap: 2rem;
}

.nav-links a {
    text-decoration: none;
    color: #2c3e50;
    font-weight: 500;
    transition: color 0.3s ease;
}

.nav-links a:hover {
    color: #3498db;
}

.cart-icon {
    position: relative;
    cursor: pointer;
}

.cart-count {
    position: absolute;
    top: -8px;
    right: -8px;
    background-color: #e74c3c;
    color: white;
    border-radius: 50%;
    padding: 0.2rem 0.5rem;
    font-size: 0.8rem;
}

/* Hero Section */
.hero-section {
    position: relative;
    height: 400px;
    overflow: hidden;
}

.hero-carousel {
    height: 100%;
}

.carousel-item {
    position: relative;
    height: 100%;
}

.carousel-item img {
    width: 100%;
    height: 100%;
    object-fit: cover;
}

.carousel-content {
    position: absolute;
    top: 50%;
    left: 50px;
    transform: translateY(-50%);
    color: white;
    text-shadow: 2px 2px 4px rgba(0,0,0,0.5);
}

/* Categories Section */
.categories-section {
    padding: 40px 20px;
}

.category-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
    gap: 20px;
    margin-top: 20px;
}

.category-card {
    position: relative;
    overflow: hidden;
    border-radius: 8px;
    transition: transform 0.3s;
}

.category-card:hover {
    transform: translateY(-5px);
}

.category-card img {
    width: 100%;
    height: 200px;
    object-fit: cover;
}

.category-card h3 {
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    padding: 15px;
    background: rgba(0,0,0,0.7);
    color: white;
    margin: 0;
    text-align: center;
}

/* Featured Products Section */
.featured-products-section {
    padding: 40px 20px;
    background: white;
}

.featured-products-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
    gap: 20px;
    margin-top: 20px;
}

.featured-product-card {
    position: relative;
    overflow: hidden;
    border-radius: 8px;
    transition: transform 0.3s;
}

.featured-product-card:hover {
    transform: translateY(-5px);
}

.featured-product-card img {
    width: 100%;
    height: 250px;
    object-fit: cover;
}

.featured-product-card h3 {
    padding: 1rem;
    color: #2c3e50;
}

.featured-product-card p {
    padding: 0 1rem;
    color: #2c3e50;
    font-weight: bold;
}

.add-to-cart {
    margin: 1rem;
    padding: 0.8rem 1.5rem;
    background-color: #3498db;
    color: white;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    transition: all 0.3s ease;
    width: calc(100% - 2rem);
    position: relative;
    overflow: hidden;
}

.add-to-cart:hover {
    background-color: #2980b9;
    transform: translateY(-2px);
}

.add-to-cart::after {
    content: '';
    position: absolute;
    top: 50%;
    left: 50%;
    width: 0;
    height: 0;
    background: rgba(255,255,255,0.2);
    border-radius: 50%;
    transform: translate(-50%, -50%);
    transition: width 0.6s ease, height 0.6s ease;
}

.add-to-cart:active::after {
    width: 200px;
    height: 200px;
    opacity: 0;
}

/* Modal Styles */
.modal {
    display: none;
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.7);
    z-index: 1000;
    overflow-y: auto;
}

.modal-content {
    background-color: white;
    margin: 5% auto;
    padding: 2rem;
    width: 90%;
    max-width: 1000px;
    border-radius: 10px;
    position: relative;
    animation: modalFadeIn 0.3s ease;
}

.close-modal {
    position: absolute;
    right: 1.5rem;
    top: 1rem;
    font-size: 2rem;
    cursor: pointer;
    color: #666;
    transition: color 0.3s ease;
}

.close-modal:hover {
    color: #000;
}

/* Product Details in Modal */
.product-details {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 2rem;
}

.product-image-large {
    width: 100%;
    border-radius: 10px;
    overflow: hidden;
}

.product-image-large img {
    width: 100%;
    height: auto;
    object-fit: cover;
}

.product-info {
    padding: 1rem 0;
}

.product-info h2 {
    margin-bottom: 1rem;
    color: #2c3e50;
}

.price {
    font-size: 1.5rem;
    color: #2c3e50;
    font-weight: bold;
    margin-bottom: 1rem;
}

.product-description {
    margin-bottom: 2rem;
    color: #666;
}

.product-options {
    margin-bottom: 2rem;
}

.size-selection, .quantity-selection {
    margin-bottom: 1rem;
}

.size-selection select {
    width: 200px;
    padding: 0.5rem;
    border: 1px solid #ddd;
    border-radius: 5px;
    margin-top: 0.5rem;
}

.quantity-controls {
    display: flex;
    align-items: center;
    margin-top: 0.5rem;
}

.quantity-btn {
    width: 30px;
    height: 30px;
    border: 1px solid #ddd;
    background: white;
    cursor: pointer;
    font-size: 1.2rem;
}

.quantity-btn:hover {
    background: #f5f5f5;
}

#quantity {
    width: 50px;
    height: 30px;
    text-align: center;
    border: 1px solid #ddd;
    border-left: none;
    border-right: none;
}

/* Order Form Styles */
.order-form {
    max-width: 600px;
    margin: 0 auto;
}

.form-group {
    margin-bottom: 1.5rem;
}

.form-group label {
    display: block;
    margin-bottom: 0.5rem;
    color: #2c3e50;
}

.form-group input,
.form-group select,
.form-group textarea {
    width: 100%;
    padding: 0.8rem;
    border: 1px solid #ddd;
    border-radius: 5px;
    font-size: 1rem;
}

.form-group textarea {
    height: 100px;
    resize: vertical;
}

.order-summary {
    margin: 2rem 0;
    padding: 1rem;
    background: #f8f9fa;
    border-radius: 5px;
}

.summary-item {
    display: flex;
    justify-content: space-between;
    margin-bottom: 0.5rem;
    padding: 0.5rem 0;
}

.summary-item.total {
    border-top: 1px solid #ddd;
    margin-top: 1rem;
    padding-top: 1rem;
    font-weight: bold;
}

.order-now-btn,
.place-order-btn {
    width: 100%;
    padding: 1rem;
    background-color: #3498db;
    color: white;
    border: none;
    border-radius: 5px;
    font-size: 1.1rem;
    cursor: pointer;
    transition: background-color 0.3s ease;
}

.order-now-btn:hover,
.place-order-btn:hover {
    background-color: #2980b9;
}

/* Payment Section Styles */
.payment-section {
    margin: 2rem 0;
    padding: 1rem;
    background: #f8f9fa;
    border-radius: 10px;
}

.payment-section h3 {
    margin-bottom: 1.5rem;
    color: #2c3e50;
}

.payment-options {
    display: flex;
    flex-direction: column;
    gap: 1rem;
}

.payment-option {
    background: white;
    padding: 1rem;
    border-radius: 8px;
    border: 1px solid #ddd;
    transition: all 0.3s ease;
}

.payment-option:hover {
    border-color: #3498db;
}

.payment-option input[type="radio"] {
    margin-right: 10px;
}

.payment-option label {
    font-weight: 500;
    color: #2c3e50;
    cursor: pointer;
}

.payment-details {
    display: none;
    margin-top: 1rem;
    padding-top: 1rem;
    border-top: 1px solid #eee;
}

.payment-option input[type="radio"]:checked ~ .payment-details {
    display: block;
    animation: fadeIn 0.3s ease;
}

.card-extra-details {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 1rem;
}

#cardNumber {
    font-family: monospace;
    letter-spacing: 0.1em;
}

.upi-apps {
    display: flex;
    gap: 1rem;
    margin-top: 1rem;
}

.upi-app-btn {
    background: none;
    border: 1px solid #ddd;
    border-radius: 8px;
    padding: 0.5rem;
    cursor: pointer;
    transition: all 0.3s ease;
    width: 80px;
    height: 40px;
    display: flex;
    align-items: center;
    justify-content: center;
}

.upi-app-btn:hover {
    border-color: #3498db;
    transform: translateY(-2px);
}

.upi-app-btn img {
    max-width: 100%;
    max-height: 100%;
    object-fit: contain;
}

.cod-note {
    color: #e74c3c;
    font-size: 0.9rem;
    margin: 0;
}

/* Payment Form Validation Styles */
input:invalid {
    border-color: #e74c3c;
}

input:valid {
    border-color: #2ecc71;
}

.payment-option.selected {
    border-color: #3498db;
    box-shadow: 0 2px 10px rgba(52, 152, 219, 0.1);
}

/* Responsive Design */
@media (max-width: 768px) {
    .hero-section {
        height: 300px;
    }

    .carousel-content {
        left: 20px;
    }

    .carousel-content h1 {
        font-size: 1.5em;
    }

    .deals-grid,
    .recommendations-grid,
    .category-grid {
        grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
    }
}

/* Common Elements */
h2 {
    color: var(--primary-color);
    margin-bottom: 20px;
}

button {
    cursor: pointer;
    border: none;
    outline: none;
}

.prime-badge {
    color: var(--accent-color);
    font-weight: bold;
}

.rating {
    color: #ffa41c;
}

/* Footer */
footer {
    background: var(--primary-color);
    color: white;
    padding: 40px 20px 20px;
}

.footer-content {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
    gap: 40px;
    max-width: 1200px;
    margin: 0 auto;
}

.footer-section h3 {
    margin-bottom: 20px;
}

.footer-section ul {
    list-style: none;
}

.footer-section ul li {
    margin-bottom: 10px;
}

.footer-section a {
    color: white;
    text-decoration: none;
}

.social-links {
    display: flex;
    gap: 15px;
    font-size: 1.5em;
}

.footer-bottom {
    text-align: center;
    margin-top: 40px;
    padding-top: 20px;
    border-top: 1px solid rgba(255,255,255,0.1);
}

/* Animation Keyframes */
@keyframes modalFadeIn {
    from {
        opacity: 0;
        transform: translateY(20px);
    }
    to {
        opacity: 1;
        transform: translateY(0);
    }
}

@keyframes fadeIn {
    from {
        opacity: 0;
        transform: translateY(20px);
    }
    to {
        opacity: 1;
        transform: translateY(0);
    }
}

@keyframes fadeInUp {
    from {
        opacity: 0;
        transform: translateY(20px);
    }
    to {
        opacity: 1;
        transform: translateY(0);
    }
}

@keyframes scaleIn {
    from {
        transform: scale(0.9);
        opacity: 0;
    }
    to {
        transform: scale(1);
        opacity: 1;
    }
}

/* Apply animations to elements */
.category-card, .product-card {
    animation: fadeInUp 0.6s ease forwards;
    opacity: 0;
}

.category-card:nth-child(2), .product-card:nth-child(2) {
    animation-delay: 0.2s;
}

.category-card:nth-child(3), .product-card:nth-child(3) {
    animation-delay: 0.4s;
}

/* Category Navigation */
.category-navigation {
    background: white;
    padding: 20px;
    box-shadow: 0 2px 4px rgba(0,0,0,0.1);
    position: sticky;
    top: 0;
    z-index: 100;
}

.category-buttons {
    display: flex;
    justify-content: center;
    gap: 20px;
    max-width: 1200px;
    margin: 0 auto;
}

.category-btn {
    padding: 10px 20px;
    border: 2px solid var(--primary-color);
    border-radius: 25px;
    background: white;
    color: var(--primary-color);
    font-weight: bold;
    cursor: pointer;
    transition: all 0.3s ease;
}

.category-btn:hover,
.category-btn.active {
    background: var(--primary-color);
    color: white;
}

/* Product Display */
.product-section {
    padding: 40px 20px;
    max-width: 1200px;
    margin: 0 auto;
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
    gap: 30px;
}

.product-card {
    background: white;
    border-radius: 8px;
    overflow: hidden;
    box-shadow: 0 2px 8px rgba(0,0,0,0.1);
    transition: transform 0.3s ease;
}

.product-card:hover {
    transform: translateY(-5px);
}

.product-card img {
    width: 100%;
    height: 300px;
    object-fit: cover;
}

.product-card h3 {
    padding: 15px;
    margin: 0;
    color: var(--primary-color);
}

.product-card .price {
    padding: 0 15px;
    color: var(--price-color);
    font-weight: bold;
    font-size: 1.2em;
}

.product-card .description {
    padding: 0 15px;
    color: #666;
    font-size: 0.9em;
}

.size-selector {
    padding: 15px;
}

.size-select {
    width: 100%;
    padding: 8px;
    border: 1px solid #ddd;
    border-radius: 4px;
    margin-top: 5px;
}

.order-btn {
    width: 100%;
    padding: 15px;
    background: var(--secondary-color);
    color: var(--primary-color);
    border: none;
    font-weight: bold;
    cursor: pointer;
    transition: background 0.3s ease;
}

.order-btn:hover {
    background: #f0ad4e;
}

/* Order Modal */
.order-modal {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0,0,0,0.5);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 1000;
}

.modal-content {
    background: white;
    padding: 30px;
    border-radius: 8px;
    max-width: 600px;
    width: 90%;
    max-height: 90vh;
    overflow-y: auto;
    position: relative;
}

.close-modal {
    position: absolute;
    top: 10px;
    right: 10px;
    font-size: 24px;
    background: none;
    border: none;
    cursor: pointer;
    color: #666;
}

.product-summary {
    display: flex;
    gap: 20px;
    margin-bottom: 20px;
    padding-bottom: 20px;
    border-bottom: 1px solid #ddd;
}

.product-summary img {
    width: 100px;
    height: 100px;
    object-fit: cover;
    border-radius: 4px;
}

.form-group {
    margin-bottom: 15px;
}

.form-group label {
    display: block;
    margin-bottom: 5px;
    color: var(--primary-color);
}

.form-group input,
.form-group textarea {
    width: 100%;
    padding: 8px;
    border: 1px solid #ddd;
    border-radius: 4px;
}

.payment-methods {
    margin: 20px 0;
}

.payment-options {
    display: flex;
    flex-direction: column;
    gap: 10px;
    margin-top: 10px;
}

.payment-options label {
    display: flex;
    align-items: center;
    gap: 10px;
}

.submit-order {
    width: 100%;
    padding: 15px;
    background: var(--secondary-color);
    color: var(--primary-color);
    border: none;
    border-radius: 4px;
    font-weight: bold;
    cursor: pointer;
    transition: background 0.3s ease;
}

.submit-order:hover {
    background: #f0ad4e;
}

/* Responsive Design */
@media (max-width: 768px) {
    .category-buttons {
        flex-wrap: wrap;
    }

    .category-btn {
        flex: 1 1 calc(50% - 10px);
    }

    .product-section {
        grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
    }

    .product-summary {
        flex-direction: column;
        text-align: center;
    }

    .product-summary img {
        width: 150px;
        height: 150px;
        margin: 0 auto;
    }
}

/* Order Confirmation Modal Styles */
.order-confirmation-modal {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 1000;
}

.order-confirmation-modal .modal-content {
    background-color: white;
    padding: 2rem;
    border-radius: 8px;
    max-width: 600px;
    width: 90%;
    max-height: 90vh;
    overflow-y: auto;
    position: relative;
}

.confirmation-details {
    margin: 1rem 0;
}

.confirmation-details h3 {
    color: #333;
    margin: 1.5rem 0 0.5rem 0;
}

.confirmation-details p {
    margin: 0.5rem 0;
    line-height: 1.4;
}

.confirmation-message {
    margin-top: 1.5rem;
    padding: 1rem;
    background-color: #e8f5e9;
    border-radius: 4px;
    color: #2e7d32;
    text-align: center;
    font-weight: bold;
}

.close-confirmation {
    display: block;
    margin: 1rem auto 0;
    padding: 0.5rem 2rem;
    background-color: #4CAF50;
    color: white;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    font-size: 1rem;
}

.close-confirmation:hover {
    background-color: #45a049;
}



  
