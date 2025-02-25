class ShoppingCart {
    constructor() {
        this.items = JSON.parse(localStorage.getItem('cart')) || [];
        this.total = 0;
        this.updateTotal();
    }

    addItem(item) {
        const existingItem = this.items.find(i => i.title === item.title);
        if (existingItem) {
            existingItem.quantity += 1;
        } else {
            this.items.push({ ...item, quantity: 1 });
        }
        this.updateTotal();
        this.saveToLocalStorage();
        this.dispatchCartUpdate();
    }

    removeItem(title) {
        this.items = this.items.filter(item => item.title !== title);
        this.updateTotal();
        this.saveToLocalStorage();
        this.dispatchCartUpdate();
    }

    updateQuantity(title, quantity) {
        const item = this.items.find(i => i.title === title);
        if (item) {
            item.quantity = quantity;
            if (quantity <= 0) {
                this.removeItem(title);
            }
        }
        this.updateTotal();
        this.saveToLocalStorage();
        this.dispatchCartUpdate();
    }

    updateTotal() {
        this.total = this.items.reduce((sum, item) => 
            sum + (parseFloat(item.price) * item.quantity), 0);
    }

    saveToLocalStorage() {
        localStorage.setItem('cart', JSON.stringify(this.items));
    }

    dispatchCartUpdate() {
        window.dispatchEvent(new CustomEvent('cart-updated', {
            detail: {
                items: this.items,
                total: this.total
            }
        }));
    }

    getItems() {
        return this.items;
    }

    getTotal() {
        return this.total.toFixed(2);
    }

    clear() {
        this.items = [];
        this.updateTotal();
        this.saveToLocalStorage();
        this.dispatchCartUpdate();
    }
}

// Create a global cart instance
window.cart = new ShoppingCart();
