const cacheName = "DICE_V1";

const cacheAssets = [
    "sw.js",
    "manifest.json",
    "index.html",
    "main.js",
    "dice.png",
];

self.addEventListener("install", (e) => {
    console.log("[Service Worker] Install");
    e.waitUntil((async () => {
        const cache = await caches.open(cacheName);
        console.log("[Service Worker] Caching all: app shell and content");
        await cache.addAll(cacheAssets);
    })());
});

self.addEventListener("activate", (e) => {
    console.log("Service Worker: Activate");
    e.waitUntil(
        caches.keys().then((keyList) => {
            return Promise.all(
                keyList.map((key) => {
                    if (key === cacheName) {
                        return undefined;
                    }
                    console.log(`Service Worker: Clearing old cache ${key}`);
                    return caches.delete(key);
                })
            );
        }),
    );
});

self.addEventListener("fetch", (e) => {
    // Cache http and https only, skip unsupported chrome-extension:// and file://...
    if (!(e.request.url.startsWith("http:") || e.request.url.startsWith("https:"))) {
        return;
    }

    e.respondWith((async () => {
        const r = await caches.match(e.request);
        console.log(`[Service Worker] Fetching resource: ${e.request.url}`);
        if (r) return r;
        const response = await fetch(e.request);
        const cache = await caches.open(cacheName);
        console.log(`[Service Worker] Caching new resource: ${e.request.url}`);
        cache.put(e.request, response.clone());
        return response;
    })());
});
