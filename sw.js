// Lưu app vào bộ nhớ đệm để chạy offline sau lần mở đầu tiên.
// Mỗi khi cập nhật EnglishEZ.html, tăng số phiên bản dưới đây để iPad tải bản mới.
const CACHE = 'mochi-v35';
const FILES = ['./', './index.html', './EnglishEZ.html', './manifest.webmanifest', './icon-192.png', './icon-512.png', './assets/backgrounds/forest.jpg', './assets/backgrounds/coast.jpg', './assets/backgrounds/dunes.jpg', './assets/fonts/baloo-2-latin-700-normal.woff2', './assets/fonts/baloo-2-latin-800-normal.woff2', './assets/fonts/baloo-2-vietnamese-700-normal.woff2', './assets/fonts/baloo-2-vietnamese-800-normal.woff2', './assets/fonts/quicksand-latin-500-normal.woff2', './assets/fonts/quicksand-latin-700-normal.woff2', './assets/fonts/quicksand-latin-ext-500-normal.woff2', './assets/fonts/quicksand-latin-ext-700-normal.woff2', './assets/fonts/quicksand-vietnamese-500-normal.woff2', './assets/fonts/quicksand-vietnamese-700-normal.woff2'];
self.addEventListener('install', e => {
  e.waitUntil(caches.open(CACHE).then(c => c.addAll(FILES)).then(() => self.skipWaiting()));
});
self.addEventListener('activate', e => {
  e.waitUntil(caches.keys()
    .then(keys => Promise.all(keys.filter(k => k !== CACHE).map(k => caches.delete(k))))
    .then(() => self.clients.claim()));
});
self.addEventListener('fetch', e => {
  if(e.request.method !== 'GET' || new URL(e.request.url).pathname.startsWith('/.netlify/')) return;
  e.respondWith(caches.match(e.request, {ignoreSearch: true}).then(hit => hit || fetch(e.request)));
});
