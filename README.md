# Sangboih-s-tylehub
Online marketing webpage

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>StyleHub - Your Fashion & Stationery Marketplace</title>
    <link rel="stylesheet" href="styles.css">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css">
    <!-- Add our component scripts -->
    <script src="components/Header.js" defer></script>
    <script src="components/ProductCard.js" defer></script>
    <script src="components/ShoppingCart.js" defer></script>
    <script src="components/ProductCatalog.js" defer></script>
</head>
<body>
    <custom-header></custom-header>

    <main>
        <section id="category-nav" class="category-navigation">
            <div class="category-buttons">
                <button class="category-btn active" data-category="shirts">Shirts</button>
                <button class="category-btn" data-category="pants">Pants</button>
                <button class="category-btn" data-category="jeans">Jeans</button>
                <button class="category-btn" data-category="sweaters">Sweaters</button>
            </div>
        </section>

        <section id="product-display" class="product-section">
            <!-- Products will be dynamically loaded here -->
        </section>

        <section id="featured-categories" class="categories-section">
            <h2>Shop by Category</h2>
            <div class="category-grid">
                <div class="category-card" data-category="shirts">
                    <img src="https://images.unsplash.com/photo-1620799140408-edc6dcb6d633" alt="Shirts">
                    <h3>Shirts</h3>
                </div>
                <div class="category-card" data-category="pants">
                    <img src="https://images.unsplash.com/photo-1624378439575-d8705ad7ae80" alt="Pants">
                    <h3>Pants</h3>
                </div>
                <div class="category-card" data-category="jeans">
                    <img src="https://images.unsplash.com/photo-1542272604-787c3835535d" alt="Jeans">
                    <h3>Jeans</h3>
                </div>
                <div class="category-card" data-category="sweaters">
                    <img src="https://images.unsplash.com/photo-1576566588028-4147f3842f27" alt="Sweaters">
                    <h3>Sweaters</h3>
                </div>
            </div>
        </section>
    </main>

    <footer>
        <div class="footer-content">
            <div class="footer-section">
                <h3>About Us</h3>
                <p>Your premier destination for fashion and stationery</p>
            </div>
            <div class="footer-section">
                <h3>Customer Service</h3>
                <ul>
                    <li><a href="#">Contact Us</a></li>
                    <li><a href="#">Shipping Info</a></li>
                    <li><a href="#">Returns</a></li>
                    <li><a href="#">FAQ</a></li>
                </ul>
            </div>
            <div class="footer-section">
                <h3>Connect With Us</h3>
                <div class="social-links">
                    <a href="#"><i class="fab fa-facebook"></i></a>
                    <a href="#"><i class="fab fa-twitter"></i></a>
                    <a href="#"><i class="fab fa-instagram"></i></a>
                </div>
            </div>
        </div>
        <div class="footer-bottom">
            <p>&copy; 2025 StyleHub. All rights reserved.</p>
        </div>
    </footer>

    <script>
        document.addEventListener('DOMContentLoaded', () => {
            // Initialize with shirts category
            window.productCatalog.displayProducts('shirts');

            // Add click handlers for category buttons
            const categoryButtons = document.querySelectorAll('.category-btn');
            categoryButtons.forEach(button => {
                button.addEventListener('click', (e) => {
                    // Update active button
                    categoryButtons.forEach(btn => btn.classList.remove('active'));
                    button.classList.add('active');
                    
                    // Display products for selected category
                    const category = button.dataset.category;
                    window.productCatalog.displayProducts(category);
                });
            });

            // Add click handlers for category cards
            const categoryCards = document.querySelectorAll('.category-card');
            categoryCards.forEach(card => {
                card.addEventListener('click', (e) => {
                    const category = card.dataset.category;
                    // Update active button
                    const button = document.querySelector(`.category-btn[data-category="${category}"]`);
                    categoryButtons.forEach(btn => btn.classList.remove('active'));
                    button.classList.add('active');
                    // Display products
                    window.productCatalog.displayProducts(category);
                    // Scroll to products
                    document.getElementById('product-display').scrollIntoView({ behavior: 'smooth' });
                });
            });
        });
    </script>
</body>
</html>
