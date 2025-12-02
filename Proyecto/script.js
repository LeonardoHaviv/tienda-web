// Estado de la aplicación
let cart = [];
let currentUser = null;
let currentCategory = 'all';
let searchTerm = '';
let products = [];

// Elementos DOM
const productsGrid = document.getElementById('products-grid');
const cartIcon = document.getElementById('cart-icon');
const cartSidebar = document.getElementById('cart-sidebar');
const closeCart = document.getElementById('close-cart');
const cartItems = document.getElementById('cart-items');
const cartCount = document.getElementById('cart-count');
const cartSubtotal = document.getElementById('cart-subtotal');
const checkoutBtn = document.getElementById('checkout-btn');
const categoryButtons = document.querySelectorAll('.category-btn');
const searchInput = document.querySelector('.search-input');
const userAvatar = document.getElementById('user-avatar');
const userName = document.getElementById('user-name');
const loginModal = document.getElementById('login-modal');
const loginForm = document.getElementById('login-form');
const registerLink = document.getElementById('register-link');
const overlay = document.getElementById('overlay');

// Cargar productos desde JSON
async function loadProducts() {
    try {
        const response = await fetch('products.json');
        const data = await response.json();
        products = data.products;
        renderProducts();
    } catch (error) {
        console.error('Error cargando productos:', error);
        // Datos de respaldo en caso de error
        products = [
            {
                id: 1,
                name: "Laptop Gaming",
                price: 1299.99,
                category: "tecnologia",
                image: "https://via.placeholder.com/300x200/3498db/ffffff?text=Laptop+Gaming"
            },
            {
                id: 2,
                name: "Smartphone Pro",
                price: 899.99,
                category: "celulares",
                image: "https://via.placeholder.com/300x200/e74c3c/ffffff?text=Smartphone+Pro"
            }
        ];
        renderProducts();
    }
}

// Inicializar la aplicación
function init() {
    loadProducts();
    setupEventListeners();
}

// Configurar event listeners
function setupEventListeners() {
    // Carrito
    cartIcon.addEventListener('click', toggleCart);
    closeCart.addEventListener('click', toggleCart);
    checkoutBtn.addEventListener('click', checkout);
    
    // Categorías y búsqueda
    categoryButtons.forEach(button => {
        button.addEventListener('click', handleCategoryChange);
    });
    
    searchInput.addEventListener('input', handleSearch);
    
    // Usuario
    userAvatar.addEventListener('click', showLoginModal);
    userName.addEventListener('click', showLoginModal);
    loginForm.addEventListener('submit', handleLogin);
    registerLink.addEventListener('click', showRegisterForm);
    
    // Overlay
    overlay.addEventListener('click', closeModals);
}

// Renderizar productos
function renderProducts() {
    productsGrid.innerHTML = '';
    
    const filteredProducts = products.filter(product => {
        const matchesCategory = currentCategory === 'all' || product.category === currentCategory;
        const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase());
        return matchesCategory && matchesSearch;
    });
    
    if (filteredProducts.length === 0) {
        productsGrid.innerHTML = '<p style="grid-column: 1 / -1; text-align: center; padding: 2rem;">No se encontraron productos.</p>';
        return;
    }
    
    filteredProducts.forEach(product => {
        const productCard = document.createElement('div');
        productCard.className = 'product-card';
        productCard.innerHTML = `
            <img src="${product.image}" alt="${product.name}" class="product-image">
            <div class="product-info">
                <h3 class="product-name">${product.name}</h3>
                <p class="product-price">$${product.price.toFixed(2)}</p>
                <button class="add-to-cart-btn" data-id="${product.id}">Agregar al carrito</button>
            </div>
        `;
        
        productsGrid.appendChild(productCard);
    });
    
    // Agregar event listeners a los botones de agregar al carrito
    document.querySelectorAll('.add-to-cart-btn').forEach(button => {
        button.addEventListener('click', (e) => {
            const productId = parseInt(e.target.getAttribute('data-id'));
            addToCart(productId);
        });
    });
}

// Manejar cambio de categoría
function handleCategoryChange(e) {
    categoryButtons.forEach(button => button.classList.remove('active'));
    e.target.classList.add('active');
    currentCategory = e.target.getAttribute('data-category');
    renderProducts();
}

// Manejar búsqueda
function handleSearch(e) {
    searchTerm = e.target.value;
    renderProducts();
}

// Funciones del carrito
function addToCart(productId) {
    const product = products.find(p => p.id === productId);
    const existingItem = cart.find(item => item.id === productId);
    
    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({
            id: product.id,
            name: product.name,
            price: product.price,
            image: product.image,
            quantity: 1
        });
    }
    
    updateCart();
    showNotification(`${product.name} agregado al carrito`);
}

function removeFromCart(productId) {
    cart = cart.filter(item => item.id !== productId);
    updateCart();
}

function updateQuantity(productId, change) {
    const item = cart.find(item => item.id === productId);
    if (item) {
        item.quantity += change;
        
        if (item.quantity <= 0) {
            removeFromCart(productId);
        } else {
            updateCart();
        }
    }
}

function updateCart() {
    // Actualizar contador del carrito
    const totalItems = cart.reduce((total, item) => total + item.quantity, 0);
    cartCount.textContent = totalItems;
    
    // Actualizar elementos del carrito
    cartItems.innerHTML = '';
    
    if (cart.length === 0) {
        cartItems.innerHTML = '<p style="text-align: center; padding: 2rem;">Tu carrito está vacío</p>';
        cartSubtotal.textContent = '$0.00';
        return;
    }
    
    let subtotal = 0;
    
    cart.forEach(item => {
        const itemTotal = item.price * item.quantity;
        subtotal += itemTotal;
        
        const cartItem = document.createElement('div');
        cartItem.className = 'cart-item';
        cartItem.innerHTML = `
            <img src="${item.image}" alt="${item.name}" class="cart-item-image">
            <div class="cart-item-details">
                <h4 class="cart-item-name">${item.name}</h4>
                <p class="cart-item-price">$${item.price.toFixed(2)} c/u</p>
                <div class="cart-item-controls">
                    <button class="quantity-btn minus" data-id="${item.id}">-</button>
                    <span class="item-quantity">${item.quantity}</span>
                    <button class="quantity-btn plus" data-id="${item.id}">+</button>
                    <button class="remove-btn" data-id="${item.id}">Quitar</button>
                </div>
            </div>
        `;
        
        cartItems.appendChild(cartItem);
    });
    
    // Actualizar subtotal
    cartSubtotal.textContent = `$${subtotal.toFixed(2)}`;
    
    // Agregar event listeners a los controles del carrito
    document.querySelectorAll('.quantity-btn.minus').forEach(button => {
        button.addEventListener('click', (e) => {
            const productId = parseInt(e.target.getAttribute('data-id'));
            updateQuantity(productId, -1);
        });
    });
    
    document.querySelectorAll('.quantity-btn.plus').forEach(button => {
        button.addEventListener('click', (e) => {
            const productId = parseInt(e.target.getAttribute('data-id'));
            updateQuantity(productId, 1);
        });
    });
    
    document.querySelectorAll('.remove-btn').forEach(button => {
        button.addEventListener('click', (e) => {
            const productId = parseInt(e.target.getAttribute('data-id'));
            removeFromCart(productId);
        });
    });
}

function toggleCart() {
    cartSidebar.classList.toggle('active');
    overlay.classList.toggle('active');
}

function checkout() {
    if (cart.length === 0) {
        alert('Tu carrito está vacío');
        return;
    }
    
    if (!currentUser) {
        alert('Debes iniciar sesión para realizar una compra');
        showLoginModal();
        return;
    }
    
    const subtotal = cart.reduce((total, item) => total + (item.price * item.quantity), 0);
    alert(`¡Gracias por tu compra, ${currentUser.name}! Total: $${subtotal.toFixed(2)}`);
    
    // Limpiar carrito después de la compra
    cart = [];
    updateCart();
    toggleCart();
}

// Funciones de usuario
function showLoginModal() {
    loginModal.classList.add('active');
    overlay.classList.add('active');
}

function closeModals() {
    loginModal.classList.remove('active');
    cartSidebar.classList.remove('active');
    overlay.classList.remove('active');
}

function handleLogin(e) {
    e.preventDefault();
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    
    // Simulación de autenticación
    if (username && password) {
        currentUser = {
            name: username,
            avatar: username.charAt(0).toUpperCase()
        };
        
        userAvatar.textContent = currentUser.avatar;
        userName.textContent = currentUser.name;
        
        closeModals();
        showNotification(`¡Bienvenido, ${currentUser.name}!`);
    } else {
        alert('Por favor, ingresa usuario y contraseña');
    }
}

function showRegisterForm() {
    alert('Funcionalidad de registro en desarrollo');
}

// Utilidades
function showNotification(message) {
    const notification = document.createElement('div');
    notification.style.cssText = `
        position: fixed;
        bottom: 20px;
        right: 20px;
        background-color: var(--accent-color);
        color: white;
        padding: 1rem 1.5rem;
        border-radius: 5px;
        box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
        z-index: 3000;
        transition: transform 0.3s ease;
    `;
    notification.textContent = message;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.style.transform = 'translateX(100%)';
        setTimeout(() => {
            document.body.removeChild(notification);
        }, 300);
    }, 3000);
}

// Inicializar la aplicación cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', init);