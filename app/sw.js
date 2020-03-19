
// 'use strict';

// importScripts('sw-toolbox.js');

// toolbox.precache(["index.html","dist/style.main.css"]);

// toolbox.router.get('/images/*', toolbox.cacheFirst);

// toolbox.router.get('/*', toolbox.networkFirst, {
//   networkTimeoutSeconds: 5
// });
self.addEventListener('install', async event =>{
	console.log('SW installed')
});
self.addEventListener('activate', async event =>{
	console.log('SW activated')
});
self.addEventListener('fetch', async event =>{
	console.log(`trying to fetch ${event.request.url}`);
});