// This service worker saves website files for offline use.

// This is the name and version of the offline cache.
const CACHE = "toy-haven-v1";

// These files are saved for offline use.
const FILES = [
    "./",
    "manifest.webmanifest",
    "support.html",
    "cart.html",
    "wishlist.html",
    "products.html",
    "index.html",
    "checkout.html",
    "css/style.css",
    "icons/favicon.svg",
    "icons/icon-192.png",
    "icons/icon-512.png",
    "js/support.js",
    "js/data.js",
    "js/home.js",
    "js/checkout.js",
    "js/products.js",
    "js/common.js",
    "js/wishlist.js",
    "js/cart.js",
    "images/bear.webp",
    "images/astronaut.webp",
    "images/chess.webp",
    "images/car.webp",
    "images/blocks.webp",
    "images/robot.webp"
];


// This saves website files when the service worker installs.
self.addEventListener("install", function (event) {
    // This keeps the worker active until these tasks finish.
    event.waitUntil(
        // This opens the offline cache.
        caches.open(CACHE).then(function (cache) {
            // This downloads and saves all files in the list.
            return cache.addAll(FILES);
        })
    );
    // This lets the new worker activate without waiting for the old one.
    self.skipWaiting();
});


// This removes old cache versions when the worker activates.
self.addEventListener("activate", function (event) {
    // This keeps the worker active until these tasks finish.
    event.waitUntil(
        // This reads the names of the stored caches.
        caches.keys().then(function (keys) {
            // This collects the tasks that delete old cache versions.
            let oldCaches = [];
            // This checks each saved cache name.
            for (let i = 0; i < keys.length; i++) {
                // This finds older Toy Haven caches while keeping the current one.
                if (keys[i].indexOf("toy-haven-") == 0 && keys[i] != CACHE) {
                    // This schedules an old cache for deletion.
                    oldCaches.push(caches.delete(keys[i]));
                }
            }
            // This waits for all old cache deletions to finish.
            return Promise.all(oldCaches);
        }).then(function () {
            // This lets the worker control open pages within its scope.
            return self.clients.claim();
        })
    );
});


// This handles requests for website files.
self.addEventListener("fetch", function (event) {
    // This only handles GET requests for reading files.
    if (event.request.method != "GET") return;

    // This supplies a response for the requested file.
    event.respondWith(
        // This searches for a saved copy of the requested file.
        caches.match(event.request).then(function (saved) {
            // This returns the saved file if it is available.
            if (saved) return saved;
            // This requests the file from the network if it is not cached.
            return fetch(event.request);
        })
    );
});