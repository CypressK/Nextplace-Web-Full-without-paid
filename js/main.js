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


//Render Products on page

let productList = document.getElementById('product-list')

function renderProducts(){
    productList.innerHTML = products.map(product => `            
        <div class="product">
            <img src="${product.image}" alt="${product.title}" class="product-img">
            <div class="product-infor">
                <h2 class="product-title">${product.title}</h2>
                <p class="product-price">${product.price.toFixed(2)}</p>
                <a class="add-to-cart" data-id="${product.id}">Check Out</a>
            </div>
        </div>
    `).join("");

    addCartEventListeners();
}
//add to cart

let cart = JSON.parse(localStorage.getItem('cart')) || [];

function addCartEventListeners() {
    const addToCartButtons = document.querySelectorAll('.add-to-cart');
    addToCartButtons.forEach(button => {
        button.addEventListener('click', addToCart);
    });
}

function addToCart(event) {
    const productID = parseInt(event.target.dataset.id);
    const product = products.find(p => p.id === productID);

    if (product) {
        const existingItem = cart.find(item => item.id === productID);

        if (existingItem) {
            existingItem.quantity++;
        } else {
            cart.push({
                id: product.id,
                title: product.title,
                price: product.price,
                image: product.image,
                quantity: 1
            });
        }

        localStorage.setItem('cart', JSON.stringify(cart));  // Save to local storage
        alert('Item added');
        renderCartItems();
    }
}


let cartItemsElement;
let cartTotalElement;

document.addEventListener('DOMContentLoaded', function() {
    cartItemsElement = document.getElementById('cartItems');
    cartTotalElement = document.getElementById('cartTotal');
    productList = document.getElementById('product-list');

    if (cartItemsElement && cartTotalElement) {
        if(window.location.pathname.includes('cart.html')) {
            renderCartItems();
        }
    } else {
        console.error("Required cart elements are missing.");
    }

    if(productList) {
        if(window.location.pathname.includes('index.html') || window.location.pathname === '/') {
            renderProducts();
        }
    } else {
        console.error("Product list element is missing.");
    }
});


function renderCartItems(){
    if(cart.length === 0){
        cartItemsElement.innerHTML = '<p>Your cart is empty.</p>';
    } else {
        cartItemsElement.innerHTML = cart.map(
            (item) =>`
            <div class="cartItem">
                <img src="${item.image}" alt="${item.title}" class=cartImg>
                <div class="cart-item-info">
                    <h2 class="cart-item-title">${item.title}</h2>
                    <input type="number" class="cart-item-quantity" min="1" value="${item.quantity}" data-id="${item.id}">
                </div>
                <h2 class="cart-item-price">${(item.price * item.quantity).toFixed(2)}</h2>
                <button class="remove-from-cart" onclick="removeItemFromCart(${item.id})">Remove</button>
            </div>`
        ).join("");
    }
}
// // Separate the concerns for clarity
// document.addEventListener('DOMContentLoaded', () => {
//     // Check if on the cart page, and render cart items if true
//     if(window.location.pathname.includes('cart.html')){
//         renderCartItems();
//     }

//     // Assuming renderProducts is defined elsewhere and this is the main page
//     // Check if on the main page, and render products if true
//     if(window.location.pathname.includes('index.html') || window.location.pathname === '/'){
//         renderProducts(); // Ensure this function exists and is defined in your script
//     }
// });

// Function to handle removal of cart item (to be implemented)
function removeItemFromCart(itemId){
    // Logic to remove item from cart
    // Update the cart in localStorage
    // Re-render the cart
}


