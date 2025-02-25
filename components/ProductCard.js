class ProductCard extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
    }

    static get observedAttributes() {
        return ['image', 'title', 'price', 'rating', 'prime'];
    }

    connectedCallback() {
        this.render();
    }

    render() {
        const image = this.getAttribute('image');
        const title = this.getAttribute('title');
        const price = this.getAttribute('price');
        const rating = this.getAttribute('rating');
        const prime = this.getAttribute('prime') === 'true';

        this.shadowRoot.innerHTML = `
            <style>
                .product-card {
                    border: 1px solid #ddd;
                    padding: 15px;
                    margin: 10px;
                    border-radius: 4px;
                    transition: transform 0.2s;
                }
                .product-card:hover {
                    transform: translateY(-5px);
                    box-shadow: 0 5px 15px rgba(0,0,0,0.1);
                }
                .product-image {
                    width: 100%;
                    height: 200px;
                    object-fit: cover;
                }
                .product-title {
                    font-size: 1em;
                    margin: 10px 0;
                    color: #0066c0;
                }
                .product-price {
                    font-size: 1.2em;
                    color: #B12704;
                }
                .prime-badge {
                    color: #00a8e1;
                    font-size: 0.9em;
                }
                .rating {
                    color: #ffa41c;
                }
                .add-to-cart {
                    background: #ffd814;
                    border: none;
                    padding: 8px 15px;
                    border-radius: 20px;
                    cursor: pointer;
                    width: 100%;
                    margin-top: 10px;
                }
                .add-to-cart:hover {
                    background: #f7ca00;
                }
            </style>
            <div class="product-card">
                <img src="${image}" alt="${title}" class="product-image">
                <h3 class="product-title">${title}</h3>
                <div class="rating">★★★★☆ ${rating}</div>
                <div class="product-price">$${price}</div>
                ${prime ? '<div class="prime-badge">✓ Prime</div>' : ''}
                <button class="add-to-cart">Add to Cart</button>
            </div>
        `;

        this.shadowRoot.querySelector('.add-to-cart').addEventListener('click', () => {
            this.dispatchEvent(new CustomEvent('add-to-cart', {
                detail: {
                    title,
                    price,
                    image
                },
                bubbles: true,
                composed: true
            }));
        });
    }
}

customElements.define('product-card', ProductCard);
