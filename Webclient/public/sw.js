/* eslint-disable no-restricted-globals */
const cacheName = 'v1'

self.addEventListener("install", (e) => {
	e.waitUntil(
		caches.open(cacheName).then(() => {
			console.log("cache opened!");
		})
	);
});


self.addEventListener("fetch", async (e) => {
    console.log(e.request)
    if (
		e.request.method === "GET" &&
		!e.request.url.match(/tudoresan.herokuapp/i)
	) {
		e.respondWith(
			caches.match(e.request).then((response) => {
                if (response) {
					return response;
				}
				return fetch(e.request).then((response) => {
					if (!response && response.status !== 200) return response;
					const responseToCache = response.clone();
					caches.open(cacheName).then((cache) => {
						cache.put(e.request, responseToCache);
					});
					return response;
				});
			})
		);
	}
});