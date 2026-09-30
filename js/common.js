// These functions are shared by the website pages.

// This reads saved browser data. Fallback is used if data is missing or cannot be read.
function readData(key, fallback) {
    try {
        // This reads the saved text using its storage name.
        let value = localStorage.getItem(key);
        // This uses the fallback when nothing has been saved.
        if (value == null) return fallback;
        // This changes the saved text back into usable data.
        return JSON.parse(value);
    } catch (error) {
        return fallback;
    }
}

// This saves data as text in the browser.
function saveData(key, value) {
    // JSON.stringify changes the data into text before saving.
    localStorage.setItem(key, JSON.stringify(value));
}

// This shows prices in rupees with two decimal places.
function money(value) {
    return "Rs. " + value.toFixed(2);
}

// This remembers the message timer.
let noticeTimer;

// This shows a short message for three seconds.
function showNotice(message) {
    // This selects the small notification message.
    const notice = document.getElementById("notice");
    notice.innerText = message;
    notice.classList.add("visible");
    // This cancels the previous message timer.
    clearTimeout(noticeTimer);
    // This starts a timer to hide the message after three seconds.
    noticeTimer = setTimeout(function () {
        notice.classList.remove("visible");
    }, 3000);
}


// This loads the saved cart, or starts with an empty array.
let cart = readData("toyCart", []);
// This loads the saved wishlist, or starts with an empty array.
let wishlist = readData("toyWishlist", []);

// This updates the number beside the Cart link.
function updateCartCount() {
    // This starts the counter at zero.
    let count = 0;
    // This goes through each cart entry.
    for (let i = 0; i < cart.length; i++) count += cart[i].quantity;
    // This updates the text shown on the page.
    document.getElementById("cart-count").innerText = count;
}

// This adds all product prices multiplied by their quantities.
function cartTotal() {
    // This starts the total at zero.
    let total = 0;
    // This goes through each cart entry.
    for (let i = 0; i < cart.length; i++) {
        // This adds the subtotal for this product.
        total += products[cart[i].id].price * cart[i].quantity;
    }
    return total;
}

// This adds a product or increases its existing quantity.
function addCart(id) {
    // This records whether the product is already in the cart.
    let found = false;
    // This goes through each cart entry.
    for (let i = 0; i < cart.length; i++) {
        // This checks whether the same product is already in the cart.
        if (cart[i].id == id) {
            // This adds one more of the same product.
            cart[i].quantity++;
            found = true;
        }
    }
    // This adds a new cart entry with quantity one.
    if (found == false) cart.push({ id: id, quantity: 1 });
    // This saves the updated data in localStorage.
    saveData("toyCart", cart);
    // This refreshes the cart number in the navigation.
    updateCartCount();
    showNotice(products[id].name + " added to cart.");
}

// This saves a product without adding a duplicate.
function addWishlist(id) {
    // This goes through each wishlist entry.
    for (let i = 0; i < wishlist.length; i++) {
        // This stops the same product being saved twice.
        if (wishlist[i].id == id) {
            showNotice("This product is already in your wishlist.");
            return;
        }
    }
    // This saves the product with Interested as its starting status.
    wishlist.push({ id: id, status: "Interested" });
    // This saves the updated data in localStorage.
    saveData("toyWishlist", wishlist);
    showNotice(products[id].name + " saved to your wishlist.");
}


// This builds a product card with its image, details and buttons.
function productCard(id) {
    // This gets the details of this product.
    const p = products[id];
    // This returns the HTML used to display one product card.
    return (
        '<article class="product-card">' +
        '<div class="product-image"><img src="images/' +
        p.image +
        '" alt="' +
        p.name +
        '" width="600" height="600" loading="lazy"></div>' +
        '<div class="product-info"><p class="category">' +
        p.category +
        '</p><h2>' +
        p.name +
        '</h2><p class="price">' +
        money(p.price) +
        '</p>' +
        '<div class="card-actions"><button onclick="addCart(' +
        id +
        ')">Add to cart</button><button class="secondary" onclick="addWishlist(' +
        id +
        ')">Add to wishlist</button></div>' +
        '<button class="text-button" onclick="viewProduct(' +
        id +
        ')">View details<span class="sr-only"> for ' +
        p.name +
        '</span> &rarr;</button></div></article>'
    );
}

// This selects the product details popup.
const dialog = document.getElementById("product-dialog");

// This fills and opens the product details popup.
function viewProduct(id) {
    // This gets the details of this product.
    const p = products[id];
    // This builds the popup image, description, information table and Add to cart button.
    document.getElementById("product-details").innerHTML =
        '<img src="images/' +
        p.image +
        '" alt="' +
        p.name +
        '" width="600" height="600">' +
        '<p class="category">' +
        p.category +
        '</p><h2 id="detail-name">' +
        p.name +
        '</h2><p>' +
        p.description +
        '</p><table class="details-table"><caption>Product information</caption><tr><th scope="row">Category</th><td>' +
        p.category +
        '</td></tr><tr><th scope="row">Price</th><td>' +
        money(p.price) +
        '</td></tr></table><button onclick="addCart(' +
        id +
        '); dialog.close()">Add to cart</button>';
    // This opens the details popup.
    dialog.showModal();
}

// This is the close popup button action.
document.getElementById("close-dialog").addEventListener("click", function () {
    // This closes the details popup.
    dialog.close();
});


// This checks the form fields and shows an error when needed.
function validateForm(form, messageId) {
    // This selects the input and message fields.
    const fields = form.querySelectorAll("input, textarea");
    // This checks each form field.
    for (let i = 0; i < fields.length; i++) {
        // This clears the previous custom error.
        fields[i].setCustomValidity("");
        // This checks the minimum number of characters.
        if (fields[i].minLength > 0 && fields[i].value.trim().length < fields[i].minLength) {
            fields[i].setCustomValidity(
                "Please enter at least " + fields[i].minLength + " characters."
            );
        }
    }

    // This finds the first field that fails the HTML rules.
    const invalid = form.querySelector(":invalid");
    // This selects the area for the form message.
    const output = document.getElementById(messageId);
    output.classList.remove("good");

    // This displays the error for the first invalid field.
    if (invalid != null) {
        output.innerText = invalid.previousElementSibling.innerText + ": " + invalid.validationMessage;
        invalid.focus();
        return false;
    }

    output.innerText = "";
    return true;
}

// This selects the mobile menu button.
const menu = document.getElementById("menu-button");

// This opens or closes the mobile menu.
menu.addEventListener("click", function () {
    // This checks whether this control is currently open.
    let open = menu.getAttribute("aria-expanded") == "true";
    menu.setAttribute("aria-expanded", !open);
    menu.setAttribute("aria-label", open ? "Open navigation" : "Close navigation");
    document.getElementById("navigation").classList.toggle("open");
});

// This runs when the form is submitted.
document.getElementById("newsletter-form").addEventListener("submit", function (event) {
    // This stops form submission from reloading the page.
    event.preventDefault();

    
    // This selects the newsletter email field.
    const email = document.getElementById("newsletter-email");
    // This selects the message field or message area.
    const message = document.getElementById("newsletter-message");
    message.classList.remove("good");

    // This checks whether the email field is valid.
    if (email.checkValidity() == false) {
        message.innerText = "Please enter a valid email address.";
        email.focus();
        return;
    }

    // This saves the updated data in localStorage.
    saveData("toyNewsletter", email.value.trim());
    message.innerText = "Thank you for subscribing!";
    message.classList.add("good");
    email.value = "";
});


// This shows sections when they enter the screen during scrolling.
function revealSections() {
    // This selects the sections with a scroll reveal effect.
    const sections = document.querySelectorAll(".reveal");
    // This checks the position of each section.
    for (let i = 0; i < sections.length; i++) {
        // This checks whether the section is near the visible screen area.
        if (sections[i].getBoundingClientRect().top < window.innerHeight - 40) {
            sections[i].classList.add("shown");
        }
    }
}

// This enables styles that depend on JavaScript.
document.body.classList.add("js-ready");


// This hides the loading screen.
function finishLoading() {
    // This hides this part of the page.
    document.getElementById("page-loader").hidden = true;
}

// This hides the loader if the page has already loaded.
if (document.readyState == "complete") finishLoading();
// This hides the loader after the page finishes loading.
window.addEventListener("load", finishLoading);
// This checks reveal sections whenever the user scrolls.
window.addEventListener("scroll", revealSections);
// This shows sections already visible when the page opens.
revealSections();
// This refreshes the cart number in the navigation.
updateCartCount();


// This checks whether the browser supports the offline service worker.
if ("serviceWorker" in navigator) {
    // This registers sw.js for offline support.
    navigator.serviceWorker
        .register("sw.js")
        .catch(function () {
            console.log("Offline mode needs HTTPS or localhost.");
        });
}
