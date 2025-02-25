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
