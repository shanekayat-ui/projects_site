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
]

const container = document.querySelector('#product-container');
const filterData = {};




function renderProducts(productsArray) {
    container.innerHTML = ''; // Clear existing cards
    
    productsArray.forEach((item, index) => {
        const stockClass = item.qty > 1 ? 'in-stock' : item.qty === 1 ? 'low-stock' : 'out-of-stock';
        const stockText = item.qty > 1 ? `${item.qty} in stock` : item.qty === 1 ? 'Only 1 left!' : 'Out of stock';

        const cardHTML = `
            <div class="col-12 col-sm-6 col-md-4 col-lg-3 mb-4 showHide${item.productType}">
                <a href="product.html?id=${index}" class="text-decoration-none card-link">
                    <div class="card product-card h100">
                        <div class="card-title m-auto mt-3">
                            <h3>${item.productName}</h3>
                        </div>
                            <img src="${item.imgUrl}" alt="${item.productName}" class="card-img-top">
                        <div class="">
                            <div class="row-6 price-card stock-text">
                                <h5 class="m-auto">R${item.price.toFixed(2)}</h5>
                            </div>
                            <div class="row-6 stock-card ${stockClass}">
                                <h5 class="stock-text m-auto">${stockText}</h5>
                            </div>
                        </div>
                    </div>
                 </a>
            </div>
        `;
        
        container.innerHTML += cardHTML;
    });
    
    // Re-initialize filters after rendering
    initializeFilters();
    showHideProducts();
}


function sortProducts(sortType) {
    let sortedProducts = [...products]; // Create a copy
    
    if (sortType === 'name-az') {
        sortedProducts.sort((a, b) => a.productName.localeCompare(b.productName));
        sortButton.innerHTML = "Sort by: Name A-Z";
    } else if (sortType === 'price-high') {
        sortedProducts.sort((a, b) => b.price - a.price);
        sortButton.innerHTML = "Sort by: Price ↓";
    } else if (sortType === 'price-low') {
        sortedProducts.sort((a, b) => a.price - b.price);
        sortButton.innerHTML = "Sort by: Price ↑";
    }
    
    renderProducts(sortedProducts);
    // const sortDisplay = getElementById('sortDisplay');
    // sortDisplay.innerHTML = sortType;
}



function initializeFilters() {
    const filterMap = {
        'shirtCheck': 'Shirt',
        'legwearCheck': 'Legwear',
        'shoesCheck': 'Shoes',
        'accessoryCheck': 'Accessory'
    };

    Object.keys(filterData).forEach(key => delete filterData[key]);

    Object.keys(filterMap).forEach(checkboxId => {
        const productType = filterMap[checkboxId];
        const cards = document.querySelectorAll(`.showHide${productType}`);
        const typeAmount = cards.length;
        
        // Store everything we need for this filter
        filterData[checkboxId] = {
            productType: productType,
            cards: cards,
            count: typeAmount
        };
        
        const label = document.querySelector(`label[for="${checkboxId}"]`)

        if (label) {
            // Remove any existing count (text in parentheses)
            const currentText = label.textContent.replace(/\s*\(\d+\).*$/g, '').trim();
            label.textContent = `${currentText} (${typeAmount})`;
        }

        // Update label with count
        // document.querySelector(`label[for="${checkboxId}"]`).textContent = 
        // document.querySelector(`label[for="${checkboxId}"]`).textContent + ` (${typeAmount})`;
    });
}

// This function ONLY toggles visibility - runs on checkbox change
function showHideProducts() {
    const inStockOnly = document.getElementById('stockCheck')?.checked || false;
    
    // Check if all type filters are active
    const allFiltersActive = Object.keys(filterData).every(checkboxId => {
        return document.getElementById(checkboxId).checked;
    });
    
    Object.keys(filterData).forEach(checkboxId => {
        const isChecked = document.getElementById(checkboxId).checked;
        const { cards, productType } = filterData[checkboxId];
        
        // Toggle product cards
        cards.forEach(card => {
            if (!isChecked) {
                card.style.display = "none";
                return;
            }
            
            if (inStockOnly) {
                const hasOutOfStock = card.querySelector('.out-of-stock');
                card.style.display = hasOutOfStock ? "none" : "block";
            } else {
                card.style.display = "block";
            }
        });
        
        // Toggle individual filter tag buttons
        const filterTag = document.querySelector(`.filter-${productType}`);
        if (filterTag) {
            if (allFiltersActive) {
                filterTag.style.display = "none";  // Hide individual buttons
            } else {
                filterTag.style.display = isChecked ? "inline-block" : "none";
            }
        }
    });
}





// Call it initially to render products on page load
renderProducts(products);