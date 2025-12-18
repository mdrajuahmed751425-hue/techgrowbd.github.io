let cart = [];

// LocalStorage থেকে products লোড
let products = JSON.parse(localStorage.getItem('products')) || [];

const categoryDiv = document.getElementById('category');

function renderProductsFront() {
    categoryDiv.innerHTML = '<h2>Our Products</h2>';
    products.forEach(product => {
        const div = document.createElement('div');
        div.className = 'product';
        div.innerHTML = `
            <img src="${product.img}" alt="${product.name}">
            <div class="product-details">
                <h3>${product.name}</h3>
                <p>Price: ${product.price} BDT</p>
                <button class="btn" onclick="addToCart('${product.name}', ${product.price})">Add to Cart</button>
            </div>
        `;
        categoryDiv.appendChild(div);
    });
}

function addToCart(productName, price) {
    cart.push({name: productName, price: price});
    updateCart();
    alert(productName + " added to cart! Total items: " + cart.length);
}

function updateCart() {
    const cartCount = document.getElementById('cart-count');
    const cartItemsDiv = document.getElementById('cart-items');

    cartCount.innerText = cart.length;
    cartItemsDiv.innerHTML = '';

    cart.forEach((item) => {
        const div = document.createElement('div');
        div.className = 'cart-item';
        div.innerText = `${item.name} - ${item.price} BDT`;
        cartItemsDiv.appendChild(div);
    });
}

function checkout() {
    if(cart.length === 0) {
        alert("Cart is empty!");
        return;
    }
    let total = cart.reduce((sum, item) => sum + item.price, 0);
    alert("Checkout successful! Total: " + total + " BDT");
    cart = [];
    updateCart();
}

// ওয়েবসাইট লোড হলে প্রোডাক্ট রেন্ডার
window.onload = renderProductsFront;