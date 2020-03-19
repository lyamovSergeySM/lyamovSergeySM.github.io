
// 'use strict';

// importScripts('sw-toolbox.js');

// toolbox.precache(["index.html","dist/style.main.css"]);

// toolbox.router.get('/images/*', toolbox.cacheFirst);

// toolbox.router.get('/*', toolbox.networkFirst, {
//   networkTimeoutSeconds: 5
// });
const staticCacheName = 'static-cache-v0';
const staticAssets = [
	'./',
	'./index.html',
	'./img/icons/icon-128x128.png',
	'./img/icons/icon-192x192.png',
	'./css/main.css',
	'./css/libs.css',
	'./js/main.js',
	'./js/libs.min.js',
];



self.addEventListener('install', async event =>{
	const cache = await caches.open(staticCacheName);
	await cache.addAll(staticAssets);
	
});
// self.addEventListener('activate', async event =>{
// 	console.log('SW activated')
// });
self.addEventListener('fetch', async event =>{
	event.respondWith(caches.match(event.request).then(cachedResponse => {
		return cachedResponse || fetch(event.request)
	}));
});