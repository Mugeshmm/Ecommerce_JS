let products = [];
let cartCount = 0;

async function fetchProducts() {
    try {
        const response = await fetch('https://fakestoreapi.com/products');
        products = await response.json();
        displayProducts(products);
    } catch (error) {
        console.error('Error fetching products:', error);
    }
}

function displayProducts(products) {
    const productList = document.getElementById('product-list');
    productList.innerHTML = '';
    products.forEach(product => {
        const productItem = document.createElement('div');
        productItem.className = 'product-item';
        
        productItem.innerHTML = `
            <img src="${product.image}" alt="${product.title}">
            <h2>${product.title}</h2>
            <p>$${product.price}</p>
            <button onclick="addToCart()">Add to Cart</button>
        `;
        
        productList.appendChild(productItem);
    });
}

function filterProducts(category) {
    let filteredProducts = category === 'all' ? products : products.filter(product => product.category === category);
    displayProducts(filteredProducts);
}

function searchProducts(event) {
    const query = event.target.value.toLowerCase();
    const filteredProducts = products.filter(product => product.title.toLowerCase().includes(query));
    displayProducts(filteredProducts);
}

function addToCart() {
    cartCount++;
    document.getElementById('cart-count').textContent = cartCount;
}

document.getElementById('search').addEventListener('input', searchProducts);

fetchProducts();