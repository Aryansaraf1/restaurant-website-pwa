const CACHE_NAME = "cooking-cache-v2"; 
const FILES_TO_CACHE = [
    "/index.html",
    "/style.css",
    "/manifest.json",
    "/offline.html", 
    "/images/app.png",
    "/images/big.png",
    "delivery.png",
    "discount.png",
    "fresh.png",
    "grid_image1.png",
    "grid_image2.png",
    "grid_image3.png",
    "grid_image4.png",
    "grid_image5.png",
    "grid_image6.png",
    "grid_image7.png",
    "heri_image.png",
    "logo.png"
];


self.addEventListener("install", event => {
    event.waitUntil(
        caches.open(CACHE_NAME).then(cache => {
            console.log("[Service Worker] Pre-caching offline page");
            return cache.addAll(FILES_TO_CACHE);
        })
    );
    self.skipWaiting();
});


self.addEventListener("activate", event => {
    event.waitUntil(
        caches.keys().then(keyList => {
            return Promise.all(
                keyList.map(key => {
                    if (key !== CACHE_NAME) {
                        console.log("[Service Worker] Removing old cache:", key);
                        return caches.delete(key);
                    }
                })
            );
        })
    );
    self.clients.claim();
});


self.addEventListener("fetch", event => {
    event.respondWith(
        caches.match(event.request).then(response => {
            return response || fetch(event.request).catch(() => {
                return caches.match("/offline.html"); 
            });
        })
    );
});
