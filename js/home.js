// This is the home page JavaScript.

// This gets the current date and time.
const today = new Date();
// This counts whole days since 1 January 1970. One day is 86400000 milliseconds.
const day = Math.floor(today.getTime() / 86400000);
// The remainder selects a product ID for this day.
const dailyId = day % products.length;
// This gets the selected daily product.
const daily = products[dailyId];

// This fills the daily product area with its image, details and button.
document.getElementById("daily-product").innerHTML = `
    <img src="images/${daily.image}" alt="${daily.name}" width="600" height="600">
    <div>
        <p class="category">Today’s pick / ${daily.category}</p>
        <h3>${daily.name}</h3>
        <p>${daily.description}</p>
        <p class="price">${money(daily.price)}</p>
        <button onclick="viewProduct(${dailyId})">Discover this product &rarr;</button>
    </div>`;


// This starts the HTML for the featured products.
let featured = "";

// This displays the first three products.
for (let i = 0; i < 3; i++) {
    featured += productCard(i);
}

// This inserts the generated HTML into the page.
document.getElementById("featured-products").innerHTML = featured;


// These are the four promotional banners.
const banners = [
    {
        category: "THE FIGURINE EDIT",
        title: "A little wonder.\nA lot of imagination.",
        text: "Meet the little characters made for your favourite shelf.",
        id: 0,
        caption: "Collect a little character."
    },
    {
        category: "THE TOY EDIT",
        title: "Big adventures.\nLittle best friends.",
        text: "Make room for soft hugs, bright colours and everyday play.",
        id: 2,
        caption: "Make someone’s day."
    },
    {
        category: "THE GAME NIGHT EDIT",
        title: "Your next move.\nA great night in.",
        text: "Bring everyone to the table for a little friendly competition.",
        id: 4,
        caption: "Let the good games begin."
    },
    {
        category: "THE DIECAST EDIT",
        title: "Small scale.\nSerious character.",
        text: "Find a miniature classic with a place in your collection.",
        id: 5,
        caption: "A classic, in miniature."
    }
];

// This starts with the first banner, at position zero.
let banner = 0;


// This displays the next promotional banner.
function changeBanner() {
    // This moves to the next banner number.
    banner++;

    
    // This returns to the first banner after the last one.
    if (banner == banners.length) {
        banner = 0;
    }

    // This gets the current banner details.
    let b = banners[banner];

    // This updates the text shown on the page.
    document.getElementById("banner-category").innerText = b.category;
    // This updates the text shown on the page.
    document.getElementById("banner-title").innerText = b.title;
    // This updates the text shown on the page.
    document.getElementById("banner-text").innerText = b.text;
    // This updates the text shown on the page.
    document.getElementById("banner-caption").innerText = b.caption;
    // This updates the text shown on the page.
    document.getElementById("banner-number").innerText = "0" + (banner + 1) + " / 04";
    // This changes the banner image.
    document.getElementById("banner-image").src = "images/" + products[b.id].image;
    // This updates the image description for accessibility.
    document.getElementById("banner-image").alt = products[b.id].name;
}


// This changes the banner every five seconds.
setInterval(changeBanner, 5000);