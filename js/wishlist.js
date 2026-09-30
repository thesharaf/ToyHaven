// This is the wishlist page JavaScript.
function showWishlist() {
    // This holds the HTML that will be displayed.
    let html = "";

    // This goes through each wishlist entry.
    for (let i = 0; i < wishlist.length; i++) {
        // This gets the details of this product.
        const p = products[wishlist[i].id];

        // This builds the product card HTML, including its image, price and buttons.
        html +=
            '<article class="product-card">' +
            '<div class="product-image"><img src="images/' +
            p.image +
            '" alt="' +
            p.name +
            '" width="600" height="600"></div>' +
            '<div class="product-info"><p class="category">' +
            p.category +
            '</p><h2>' +
            p.name +
            '</h2><p class="price">' +
            money(p.price) +
            '</p><label for="status-' +
            i +
            '">Collection status</label><select id="status-' +
            i +
            '" onchange="changeStatus(' +
            i +
            ',this.value)"><option>Interested</option><option>Owned</option><option>Not Interested</option></select>' +
            '<div class="card-actions"><button onclick="addCart(' +
            wishlist[i].id +
            ')">Add to cart</button><button class="secondary" onclick="removeWish(' +
            i +
            ')">Remove<span class="sr-only"> ' +
            p.name +
            '</span></button></div></div></article>';
    }

    // This shows a message when the wishlist is empty.
    if (wishlist.length == 0) {
        html =
            '<div class="panel empty"><h2>A collection starts with one favourite.</h2><p>Save a product from the collection to see it here.</p><a class="button" href="products.html">Find your favourites</a></div>';
    }

    // This inserts the generated HTML into the page.
    document.getElementById("wishlist-items").innerHTML = html;
    // This updates the text shown on the page.
    document.getElementById("wishlist-count").innerText = wishlist.length + " saved products";

    // This goes through each wishlist entry.
    for (let i = 0; i < wishlist.length; i++) {
        // This restores the saved status in the dropdown.
        document.getElementById("status-" + i).value = wishlist[i].status;
    }
}

// This saves the selected collection status.
function changeStatus(index, status) {
    // This changes the status for the selected saved product.
    wishlist[index].status = status;
    // This saves the updated data in localStorage.
    saveData("toyWishlist", wishlist);
    showNotice("Collection status saved.");
}

// This removes one product from the wishlist.
function removeWish(index) {
    // This deletes one saved product at the selected position.
    wishlist.splice(index, 1);
    // This saves the updated data in localStorage.
    saveData("toyWishlist", wishlist);
    // This displays the current wishlist.
    showWishlist();
    showNotice("Product removed from wishlist.");
}

// This displays the current wishlist.
showWishlist();
