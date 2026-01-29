// Import your products array (you'll need to make it accessible)
// For now, duplicate the product constructor and array

function product(id, name, type, price, qty, imgUrl) {
    this.id = id;
    this.productName = name;
    this.productType = type;
    this.price = price;
    this.qty = qty;
    this.imgUrl = imgUrl;
}

const products = [
    new product(1, "Blue Shirt", "Shirt", 249.90, 12, "https://thefoschini.vtexassets.com/arquivos/ids/222420555-1536-2048?v=638998019119070000&width=1536&height=2048&aspect=true"),
    new product(2, "Black Shirt", "Shirt", 249.90, 5, "https://thefoschini.vtexassets.com/arquivos/ids/220603926-800-1067?v=638936258572730000&width=800&height=1067&aspect=true"),
    new product(3, "Long Navy Shirt", "Shirt", 299.90, 0, "https://thefoschini.vtexassets.com/arquivos/ids/195934776-800-1067?v=638850354172300000&width=800&height=1067&aspect=true"),
    new product(4, "Black Trousers", "Legwear", 349.90, 1, "https://thefoschini.vtexassets.com/arquivos/ids/220134829-1200-1600?v=638924206034630000&width=1200&height=1600&aspect=true"),
    new product(5, "Running Shoes", "Shoes", 1099.90, 3, "https://thefoschini.vtexassets.com/arquivos/ids/208557649-1200-1600?v=638889837915570000&width=1200&height=1600&aspect=true"),
    new product(6, "Headband", "Accessory", 74.90, 1, "https://thefoschini.vtexassets.com/arquivos/ids/220323190-800-1067?v=638929260200600000&width=800&height=1067&aspect=true")
];

// Get the product ID from URL
const urlParams = new URLSearchParams(window.location.search);
const productId = parseInt(urlParams.get('id'));

// Find the product
const currentProduct = products[productId];

// Populate the page
if (currentProduct) {
    document.getElementById('product-image').src = currentProduct.imgUrl;
    document.getElementById('product-image').alt = currentProduct.productName;
    document.getElementById('product-name').textContent = currentProduct.productName;
    document.getElementById('product-type').textContent = currentProduct.productType;
    document.getElementById('product-price').textContent = `R${currentProduct.price.toFixed(2)}`;
    
    const stockText = currentProduct.qty > 1 
        ? `${currentProduct.qty} in stock` 
        : currentProduct.qty === 1 
        ? 'Only 1 left!' 
        : 'Out of stock';
    
    const stockClass = currentProduct.qty > 0 ? 'text-success' : 'text-danger';
    
    document.getElementById('product-stock').textContent = stockText;
    document.getElementById('product-stock').className = stockClass;
    
    document.title = currentProduct.productName;
} else {
    document.querySelector('.container').innerHTML = '<h2>Product not found</h2>';
}