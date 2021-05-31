/**
 * service worker 安装激活
 */

let dataCacheName = 'new-data-v1'
let cacheName = 'first-pwa-app-1'
let filepath = '/pwa-demo/install-prompt/public';
let filesToCache = [
  filepath + '/',
  filepath + '/index.html',
  filepath + '/style/index.css',
  filepath + '/style/fonts/iconfont.css',
  filepath + '/style/fonts/iconfont.eot',
  filepath + '/style/fonts/iconfont.js',
  filepath + '/style/fonts/iconfont.svg',
  filepath + '/style/fonts/iconfont.ttf',
  filepath + '/style/fonts/iconfont.woff',
  filepath + '/assets/images/icons/icon_144x144.png',
  filepath + '/assets/images/icons/icon_152x152.png',
  filepath + '/assets/images/icons/icon_192x192.png',
  filepath + '/assets/images/icons/icon_512x512.png'
]

self.addEventListener('install', function (e) {
  console.log('SW Install')
  e.waitUntil(
    caches.open(cacheName).then(function (cache) {
      console.log('SW precaching')
      return cache.addAll(filesToCache)
    })
  )
  self.skipWaiting()
})

self.addEventListener('activate', function (e) {
  console.log('SW Activate')
  e.waitUntil(
    caches.keys().then(function (keyList) {
      return Promise.all(keyList.map(function (key) {
        if (key !== cacheName && key !== dataCacheName) {
          console.log('SW Removing old cache', key)
          return caches.delete(key)
        }
      }))
    })
  )
  return self.clients.claim()
})
