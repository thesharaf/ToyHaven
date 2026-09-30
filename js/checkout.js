// This is the checkout page JavaScript.
const form = document.getElementById("checkout-form");

// This starts the order summary list.
let summary = '<ul class="order-list">';
// This goes through each cart entry.
for (let i = 0; i < cart.length; i++) {
    // This gets the details of this product.
    const p = products[cart[i].id];
    summary +=
        '<li><span>' +
        p.name +
        ' &times; ' +
        cart[i].quantity +
        '</span><strong>' +
        money(p.price * cart[i].quantity) +
        '</strong></li>';
}

// This inserts the generated HTML into the page.
document.getElementById("order-items").innerHTML = summary + '</ul>';
// This updates the text shown on the page.
document.getElementById("checkout-total").innerText = money(cartTotal());

// This checks whether the cart is empty.
if (cart.length == 0) {
    // This updates the text shown on the page.
    document.getElementById("checkout-error").innerText =
        "Your cart is empty. Add a product before checkout.";
    // This disables the button when it cannot be used.
    document.getElementById("confirm-order").disabled = true;
}

// This runs when the form is submitted.
form.addEventListener("submit", function (event) {
    // This stops form submission from reloading the page.
    event.preventDefault();

    // This selects the name field.
    const name = document.getElementById("full-name");
    // This selects the delivery address field.
    const address = document.getElementById("address");

    // This removes spaces from the beginning and end of the name.
    name.value = name.value.trim();
    // This removes spaces from the beginning and end of the address.
    address.value = address.value.trim();

    // This stops here if the form is not valid.
    if (validateForm(form, "checkout-error") == false || cart.length == 0) return;

    // This groups the customer details and purchased items.
    const order = {
        name: name.value,
        email: document.getElementById("email").value.trim(),
        address: address.value,
        payment: document.getElementById("payment").value,
        items: cart,
        total: cartTotal(),
        date: new Date().toISOString()
    };

    // This reads the saved order history.
    let orders = readData("toyOrders", []);
    // This adds the new order to the history.
    orders.push(order);
    // This saves the updated data in localStorage.
    saveData("toyOrders", orders);

    // This deletes the saved cart from the browser.
    localStorage.removeItem("toyCart");
    // This empties the cart array.
    cart = [];
    // This refreshes the cart number in the navigation.
    updateCartCount();

    // This hides this part of the page.
    document.getElementById("checkout-content").hidden = true;
    // This shows this part of the page.
    document.getElementById("success").hidden = false;
    // This updates the text shown on the page.
    document.getElementById("success-message").innerText =
        "Thank you, " + order.name + ". Your total is " + money(order.total) + ".";
    // This moves keyboard focus to the confirmation heading.
    document.getElementById("success-title").focus();
});
