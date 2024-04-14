console.log(document.querySelector('#menu-icon'))

const products = [
    {
        id: 1,
        title: "Casual Black Tee",
        price: 22.9,
        image: "imgs/1.jpg"
    },
    {
        id: 2,
        title: "Classic White Tee",
        price: 22.9,
        image: "imgs/9.jpg"
    },
    {
        id: 3,
        title: "Olive Green Jacket",
        price: 42.9,
        image: "imgs/8.jpg"
    },
    {
        id: 4,
        title: "Urban Black Longline Tee",
        price: 26.9,
        image: "imgs/2.jpg"
    },
    {
        id: 5,
        title: "Mustard Yellow Fitted Top",
        price: 32.5,
        image: "imgs/12.jpg"
    },
    {
        id: 6,
        title: "Neutral Peach Tee",
        price: 28.9,
        image: "imgs/11.jpg"
    },
    {
        id: 7,
        title: "Basic White Tee",
        price: 22.9,
        image: "imgs/7.jpg"
    },
    {
        id: 8,
        title: "Graphic White Tee",
        price: 27.9,
        image: "imgs/15.jpg"
    }
];


// Constants for DOM elements
let productList, cartItemsElement, cartTotalElement;

// Retrieve or initialize the shopping cart
let cart = JSON.parse(localStorage.getItem('cart')) || [];

// Event listeners initialization after DOM content is loaded
document.addEventListener('DOMContentLoaded', initialize);

function initialize() {
    productList = document.getElementById('product-list');
    cartItemsElement = document.getElementById('cartItems');
    cartTotalElement = document.getElementById('cartTotal');
    updateCartIcon()
    setupPageSpecificContent();
}



function setupPageSpecificContent() {
    if (productList) {
        renderProducts();
        renderCartItems();
        calculateCartTotal();
  
    }else{
        console.error("Product list element is missing.");
    }

    if (cartItemsElement && cartTotalElement) {
        if (isOnPage('cart.html')) {
            renderCartItems();
            calculateCartTotal();
        }
    } else {
        console.error("Cart elements are missing.");
    }
}

function isOnPage(pageName) {
    return window.location.pathname.includes(pageName);
}

// Render all products and add event listeners to Add to Cart buttons
function renderProducts() {
    productList.innerHTML = products.map(product => `
        <div class="product">
            <img src="${product.image}" alt="${product.title}" class="product-img">
            <div class="product-infor">
                <h2 class="product-title">${product.title}</h2>
                <p class="product-price">£${product.price.toFixed(2)}</p>
                <a class="add-to-cart" data-id="${product.id}">Check Out</a>
            </div>
        </div>
    `).join("");

    addCartEventListeners();
}

function addCartEventListeners() {
    document.querySelectorAll('.add-to-cart').forEach(button => {
        button.addEventListener('click', addToCart);
    });
}


function addToCart(event) {
    const productID = parseInt(event.target.getAttribute('data-id'));
    const product = products.find(p => p.id === productID);
    if (!product) return;

    const existingItem = cart.find(item => item.id === productID);
    if (existingItem) {
        existingItem.quantity++;
    } else {
        cart.push({ ...product, quantity: 1 });
    }

    localStorage.setItem('cart', JSON.stringify(cart));
    if (cartItemsElement) renderCartItems();
    updateCartIcon()
    calculateCartTotal()
}

function renderCartItems() {
    if (cart.length === 0) {
        cartItemsElement.innerHTML = '<p class="empty">Your cart is empty.</p>';
    } else {
        cartItemsElement.innerHTML = cart.map(item => `
            <div class="cartItem">
                <img src="${item.image}" alt="${item.title}" class="cartImg">
                <div class="cart-item-info">
                    <h2 class="cart-item-title">${item.title}</h2>
                    <div class=price-container>
                        <input type="number" class="cart-item-quantity" onchange="updateQuantity(this,${item.id})" min="1" value="${item.quantity}" data-id="${item.id}">
                        <h2 class="cart-item-price">$${(item.price * item.quantity).toFixed(2)}</h2>
                        </div>
                    <button class="remove-from-cart" onclick="removeItemFromCart(${item.id})">Remove</button>
                </div>
            </div>`
        ).join("");
        calculateCartTotal()
    }
}


function updateQuantity(input, itemId) {
    const item = cart.find(item => item.id === itemId);
    item.quantity = parseInt(input.value);
    localStorage.setItem('cart', JSON.stringify(cart));
    renderCartItems();
    calculateCartTotal();
    updateCartIcon();
}

function calculateCartTotal(){
    if(cartTotalElement){
        const total=cart.reduce((sum,item)=>sum + item.price * item.quantity,0);
        cartTotalElement.textContent=`Total: £${total.toFixed(2)}`
    }
}

function removeItemFromCart(itemId) {
    cart = cart.filter(item => item.id !== itemId);
    localStorage.setItem('cart', JSON.stringify(cart));
    renderCartItems();
    calculateCartTotal();
    updateCartIcon();
    
}


function updateCartIcon(){
    const cartIcon = document.getElementById('cart-icon');
    const totalQuantity = cart.reduce((sum,item)=> sum + item.quantity,0)
    cartIcon.setAttribute('data-quantity',totalQuantity.toString());
}
window.addEventListener('storage',function(){
    cart = JSON.parse(localStorage.getItem('cart')) || [];
    updateCartIcon();
});

document.querySelectorAll('#checkout-btn').forEach(button=>(
    button.addEventListener('click',clearCart)
))

function clearCart(){
    if (cart.length === 0) {  // Check if the cart array is empty
        alert('Your cart is empty');
    } else {
        alert('Order Placed');
        cart = [];  // Reset the cart
        localStorage.setItem('cart', JSON.stringify(cart));  // Update localStorage
        renderCartItems();  // Assuming this function updates the cart items display
        updateCartIcon();  // Assuming this function updates a cart icon or counter
        calculateCartTotal();  // Assuming this function recalculates the cart's total price or count
    }
}

//header

window.addEventListener("scroll", (event) => {
    document.querySelector(".header").classList.toggle("shadow", window.scrollY > 0);
});

//menu
window.addEventListener("scroll", (event) => {
    document.querySelector(".navbar").classList.toggle("bgcolor", window.scrollY > 0);
});
let navbar = document.querySelector('.navbar');
document.querySelector('#menu-icon').addEventListener('click',(event=>{
    navbar.classList.toggle("open-menu");
    event.stopPropagation();
}))

document.addEventListener('click',(event => {
    let navbar = document.querySelector('.navbar');
    if(!navbar.contains(event.target)&&navbar.classList.contains('open-menu')){
        navbar.classList.remove('open-menu')}}))

document.addEventListener('scroll',(event => {
    let navbar = document.querySelector('.navbar');
    if(navbar.classList.contains('open-menu')){
        navbar.classList.remove('open-menu')}}))
//cartbar

document.addEventListener('DOMContentLoaded', function() {
    let basket = document.getElementById('cart-icon');
    let cartbar = document.querySelector('.cartbar');
    if (isOnPage('index.html')){
        basket.addEventListener('click', (event) => {
            cartbar.classList.toggle('active');
        });
    }
})

document.addEventListener('click', (event) => {
    let cartbar = document.querySelector('.cartbar');
    if (cartbar.classList.contains('active') 
    && !cartbar.contains(event.target) 
    && !event.target.closest('#cart-icon') 
    &&!event.target.matches('.remove-from-cart') 
    && !event.target.matches('.add-to-cart')
    || event.target.matches('#close-cart-icon')) {
        cartbar.classList.remove('active');
    }
    }
);
