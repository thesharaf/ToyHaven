// This is the product search and filter JavaScript.
const search = document.getElementById("search");
// This selects the category dropdown.
const category = document.getElementById("category");


// This reads a category link opened from the home page.
if (window.location.hash != "") {
    // This reads the category after # and converts encoded spaces.
    category.value = decodeURIComponent(window.location.hash.substring(1));
}
// This uses All if there is no valid category selection.
if (category.value == "") {
    category.value = "All";
}

// This displays products matching the search and category.
function showProducts() {
    // This holds the HTML that will be displayed.
    let html = "";
    // This starts the counter at zero.
    let count = 0;
    // This removes outer spaces and uses lowercase for searching.
    const word = search.value.toLowerCase().trim();

    // This checks each product.
    for (let i = 0; i < products.length; i++) {
        // This checks whether the product belongs to the selected category.
        let correctCategory = category.value == "All" || category.value == products[i].category;
        // This checks whether the product name contains the search word.
        let correctName = products[i].name.toLowerCase().indexOf(word) != -1;

        // This displays the product only when both checks match.
        if (correctCategory && correctName) {
            // This builds the product card HTML, including its image, price and buttons.
            html += productCard(i);
            count++;
        }
    }

    // This shows a message when no products match.
    if (count == 0) {
        html = '<p class="empty panel">No matching products. Try another name or category.</p>';
    }

    // This inserts the generated HTML into the page.
    document.getElementById("products").innerHTML = html;
    // This updates the text shown on the page.
    document.getElementById("result-count").innerText = count + " of 6 products";
}

// This updates the products while the user types.
search.addEventListener("input", showProducts);
// This updates the products when the category changes.
category.addEventListener("change", showProducts);

// This displays the initial product list.
showProducts();
