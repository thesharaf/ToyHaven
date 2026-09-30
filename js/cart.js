// This is the cart page JavaScript.
function showCart() {
    // This holds the HTML that will be displayed.
    let html = "";

    // This goes through each cart entry.
    for (let i = 0; i < cart.length; i++) {
        // This gets one saved cart entry.
        let item = cart[i];
        // This gets the details of this product.
        let p = products[item.id];

        // This builds the product card HTML, including its image, price and buttons.
        html += `
        <article class="cart-row panel">
            <img src="images/${p.image}" alt="${p.name}" width="160" height="160">
            <div>
                <p class="category">${p.category}</p>
                <h2>${p.name}</h2>
                <p>${money(p.price)} each</p>
                <div class="quantity">
                    <button aria-label="Decrease quantity" onclick="changeQuantity(${i}, -1)">−</button>
                    <span>${item.quantity}</span>
                    <button aria-label="Increase quantity" onclick="changeQuantity(${i}, 1)">+</button>
                </div>
            </div>
            <div class="row-end">
                <p class="price">${money(p.price * item.quantity)}</p>
                <button class="text-button" onclick="removeItem(${i})">Remove</button>
            </div>
        </article>`;
    }

    // This checks whether the cart is empty.
    if (cart.length == 0) {
        html = `<div class="panel empty">
                    <h2>Your cart is waiting.</h2>
                    <a class="button" href="products.html">Explore products</a>
                </div>`;
    }
    // This inserts the generated HTML into the page.
    document.getElementById("cart-items").innerHTML = html;
    // This updates the text shown on the page.
    document.getElementById("cart-total").innerText = money(cartTotal());
    // This disables the button when it cannot be used.
    document.getElementById("clear-cart").disabled = cart.length == 0;
    // This hides checkout when the cart is empty.
    document.getElementById("checkout-link").hidden = cart.length == 0;
    // This refreshes the cart number in the navigation.
    updateCartCount();
}
// This increases or decreases the selected quantity.
function changeQuantity(index, change) {
    // This prevents a quantity below one.
    if (cart[index].quantity + change < 1) { showNotice("Use Remove to delete this product."); return; }
    // This adds the change to the current quantity.
    cart[index].quantity += change;
    // This saves the updated data in localStorage.
    saveData("toyCart", cart);
    // This displays the current cart.
    showCart();
    showNotice("Quantity updated.");
}
// This removes one product from the cart.
function removeItem(index) {
    // This deletes one entry at the selected position.
    cart.splice(index, 1);
    // This saves the updated data in localStorage.
    saveData("toyCart", cart);
    // This displays the current cart.
    showCart();
    showNotice("Product removed from cart.");
}
// This is the Clear cart button action.
document.getElementById("clear-cart").addEventListener("click", function () {
    // This empties the cart array.
    cart = [];
    // This deletes the saved cart from the browser.
    localStorage.removeItem("toyCart");
    // This displays the current cart.
    showCart();
    showNotice("Your cart is now empty.");
});
// This displays the current cart.
showCart();
