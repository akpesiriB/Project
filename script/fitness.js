import { products, products2, products3 } from "../data/products.js";

let productHTML = '';

//looping through each products array to generate html for each products
products.forEach((product) => {
    productHTML += `
              <!---prototype grid-->
                        <div class="card card-sm bg-base-200 shadow hover:-translate-y-2 transition-all product-box group relative overflow-hidden">
                            <figure><img src="${product.image}" alt="mes1"></figure>
                            <!---overlay right -->
                            <div
                                class="absolute inset-0 flex items-start justify-start p-3 bg-black/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                <button type="button" class="btn btn-secondary w-2 h-6 hover:cursor-pointer add-cart" title="Add to Cart"><i
                                        class="fa-solid fa-cart-arrow-down"></i></button>
                            </div>
                            <div class="card-body">
                                <div class="card-title flex flex-col">
                                    <h2 class="text-[10px] product-title">${product.name} </h2>

                                    <div class="flex gap-2">
                                        <img src="img/ratings/rating-${Math.round(product.stars * 10)}.png" alt="${product.stars} stars" class="h-2 ">
                                        <p class="text-[10px] price">$${product.priceCents}</p>
                                    </div>

                                    <p class="text-[10px] opacity-40">performance</p>
                                </div>
                            </div>
                        </div>`
});

//parse the generated html to the main html page
const productGrid = document.querySelector('.js-products-grid');
if (productGrid) {
    productGrid.innerHTML = productHTML;
}
//loop for product 2
let product2HTML = '';

//looping through each products array to generate html for each products
products2.forEach((product) => {
    product2HTML += `
      <!---prototype grid-->
                        <div class="card card-sm bg-base-200 shadow hover:-translate-y-2 transition-all product-box group relative overflow-hidden">
                            <figure><img src="${product.image}" alt="mes1"></figure>
                            <!---overlay right -->
                            <div
                                class="absolute inset-0 flex items-start justify-start p-3 bg-black/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                <button type="button" class="btn btn-secondary w-2 h-6 hover:cursor-pointer add-cart" title="Add to Cart"><i
                                        class="fa-solid fa-cart-arrow-down"></i></button>
                            </div>
                            <div class="card-body">
                                <div class="card-title flex flex-col">
                                    <h2 class="text-[10px] product-title">${product.name}</h2>

                                    <div class="flex gap-2">
                                    <img src="img/ratings/rating-${Math.round(product.stars * 10)}.png" alt="${product.stars} stars" class="h-2 ">
<p class="text-[10px] price">$${product.priceCents}</p>
                                    </div>

                                    <p class="text-[10px] opacity-40">performance</p>
                                </div>
                            </div>
                        </div>
    `
});
//parse the generated html to the main html page
const productGrid1 = document.querySelector('.js-product2-grid');
if (productGrid1) {
    productGrid1.innerHTML = product2HTML;
}

//loop for product 3
let product3HTML = '';

//looping through each products array to generate html for each products
products3.forEach((product) => {
    product3HTML += `
      <div class="card  bg-base-100 shadow hover:-translate-y-2 transition-all product-box">

                        <figure class="">
                            <img src="${product.image}">
                        </figure>

                        <div class="card-body p-4">

                            <h3 class="font-semibold text-[10px] product-title">
                               ${product.name}
                            </h3>

                            <div class="flex ">
                                <p class="font-bold text-[10px] price">$${product.priceCents}</p>
                                <button type="button"
                                    class="border rounded-xl p-1 bg-blue-900 text-white w-fit active:bg-pink-400 hover:cursor-pointer add-cart"><i
                                        class="fa-solid fa-cart-arrow-down"></i></button>
                            </div>
                        </div>

                    </div>
    `
});

//parse the generated html to the main html page
const productGrid2 = document.querySelector('.js-product3-grid');
if (productGrid2) {
    productGrid2.innerHTML = product3HTML;
}







// Activate sections that use fade-in animation when they scroll into view
const fadeSections = document.querySelectorAll('.fade-section');

if ('IntersectionObserver' in window) {
    const fadeObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.15,
        rootMargin: '0px 0px -80px 0px',
    });

    fadeSections.forEach((section) => fadeObserver.observe(section));
} else {
    // Fallback for older browsers: reveal all sections immediately
    fadeSections.forEach((section) => section.classList.add('active'));
}





