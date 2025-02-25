class Header extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
        this.render();
    }

    render() {
        this.shadowRoot.innerHTML = `
            <style>
                .header {
                    background: #232f3e;
                    padding: 10px 20px;
                    color: white;
                }
                .search-bar {
                    display: flex;
                    max-width: 600px;
                    margin: 0 auto;
                }
                .search-input {
                    flex: 1;
                    padding: 8px;
                    border-radius: 4px 0 0 4px;
                    border: none;
                }
                .search-button {
                    padding: 8px 15px;
                    background: #febd69;
                    border: none;
                    border-radius: 0 4px 4px 0;
                    cursor: pointer;
                }
                .user-menu {
                    display: flex;
                    align-items: center;
                    gap: 20px;
                }
            </style>
            <div class="header">
                <div class="search-bar">
                    <input type="text" class="search-input" placeholder="Search products...">
                    <button class="search-button">Search</button>
                </div>
                <div class="user-menu">
                    <div class="account">Your Account</div>
                    <div class="orders">Orders</div>
                    <div class="cart">Cart</div>
                </div>
            </div>
        `;
    }
}

customElements.define('custom-header', Header);
