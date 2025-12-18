// ডিফল্ট অ্যাডমিন ইউজারনেম
const ADMIN_USERNAME = "admin";

// LocalStorage-এ পাসওয়ার্ড চেক / সেট
if(!localStorage.getItem('adminPassword')){
    localStorage.setItem('adminPassword', '1234'); // ডিফল্ট পাসওয়ার্ড
}

// LocalStorage থেকে products লোড
let products = JSON.parse(localStorage.getItem('products')) || [
    {name: "Lungi", price: 700, img: "images/lungi.jpg"},
    {name: "Pant", price: 1500, img: "images/pant.jpg"},
    {name: "Shirt", price: 1200, img: "images/shirt.jpg"}
];

// DOM Elements
const loginDiv = document.getElementById('loginDiv');
const adminDiv = document.getElementById('adminDiv');
const productList = document.getElementById('productList');
const productForm = document.getElementById('productForm');
const changePasswordForm = document.getElementById('changePasswordForm');

// লগইন ফাংশন
function login() {
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    const savedPassword = localStorage.getItem('adminPassword');

    if(username === ADMIN_USERNAME && password === savedPassword) {
        alert("Login successful!");
        loginDiv.style.display = "none";
        adminDiv.style.display = "block";
        renderProducts();
    } else {
        alert("Invalid username or password");
    }
}

// লগআউট ফাংশন
function logout() {
    adminDiv.style.display = "none";
    loginDiv.style.display = "block";
}

// প্রোডাক্ট রেন্ডার
function renderProducts() {
    productList.innerHTML = '';
    products.forEach((product, index) => {
        const div = document.createElement('div');
        div.className = 'product';
        div.innerHTML = `
            <img src="${product.img}" alt="${product.name}">
            <div class="product-details">
                <h3>${product.name}</h3>
                <p>Price: ${product.price} BDT</p>
                <button class="btn" onclick="deleteProduct(${index})">Delete</button>
            </div>
        `;
        productList.appendChild(div);
    });

    // LocalStorage-এ সেভ
    localStorage.setItem('products', JSON.stringify(products));
}

// প্রোডাক্ট ডিলিট
function deleteProduct(index) {
    if(confirm(`Delete ${products[index].name}?`)) {
        products.splice(index, 1);
        renderProducts();
    }
}

// নতুন প্রোডাক্ট যোগ
productForm.addEventListener('submit', function(e) {
    e.preventDefault();
    const name = document.getElementById('productName').value;
    const price = parseInt(document.getElementById('productPrice').value);
    const img = document.getElementById('productImage').value;

    products.push({name, price, img});
    renderProducts();
    productForm.reset();
});

// Change Password
changePasswordForm.addEventListener('submit', function(e){
    e.preventDefault();
    const current = document.getElementById('currentPassword').value;
    const newPass = document.getElementById('newPassword').value;
    const savedPassword = localStorage.getItem('adminPassword');

    if(current === savedPassword){
        localStorage.setItem('adminPassword', newPass);
        alert("Password updated successfully!");
        changePasswordForm.reset();
    } else {
        alert("Current password is incorrect!");
    }
});