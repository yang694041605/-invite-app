// Service Worker版本
const CACHE_NAME = 'fucai-3d-v1.0.0';

// 需要缓存的资源列表
const urlsToCache = [
  '/',
  '/login.html',
  '/index.html',
  '/admin.html',
  '/manifest.json',
  '/resonance-analysis/index.html',
  '/resonance-analysis/d-D胆码-prediction.html',
  '/resonance-analysis/js/D胆码-rules-engine.js',
  '/utils/predictUtils.js',
  '/utils/d胆码RuleEngine.js',
  'https://cdn.jsdelivr.net/npm/font-awesome@4.7.0/css/font-awesome.min.css',
  'https://imgcache.qq.com/qcloud/tcbjs/1.10.0/tcb.js',
  'https://cdn.tailwindcss.com',
  'https://cdn.jsdelivr.net/npm/chart.js@4.4.8/dist/chart.umd.min.js'
];

// 安装Service Worker
self.addEventListener('install', function(event) {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(function(cache) {
        console.log('Opened cache');
        return cache.addAll(urlsToCache);
      })
      .then(function() {
        // 立即激活新的Service Worker
        return self.skipWaiting();
      })
  );
});

// 激活Service Worker，清理旧缓存
self.addEventListener('activate', function(event) {
  event.waitUntil(
    caches.keys().then(function(cacheNames) {
      return Promise.all(
        cacheNames.filter(function(cacheName) {
          return cacheName !== CACHE_NAME;
        }).map(function(cacheName) {
          return caches.delete(cacheName);
        })
      );
    })
    .then(function() {
      // 立即控制所有客户端
      return self.clients.claim();
    })
  );
});

// 处理网络请求
self.addEventListener('fetch', function(event) {
  // 只缓存GET请求
  if (event.request.method !== 'GET') {
    return;
  }
  
  event.respondWith(
    caches.match(event.request)
      .then(function(response) {
        // 如果缓存中有匹配的响应，则直接返回
        if (response) {
          return response;
        }
        
        // 否则从网络获取
        return fetch(event.request)
          .then(function(response) {
            // 检查响应是否有效
            if (!response || response.status !== 200 || response.type !== 'basic') {
              return response;
            }
            
            // 克隆响应，因为响应流只能使用一次
            const responseToCache = response.clone();
            
            // 将响应添加到缓存
            caches.open(CACHE_NAME)
              .then(function(cache) {
                cache.put(event.request, responseToCache);
              });
            
            return response;
          })
          .catch(function(error) {
            console.error('Fetch failed:', error);
            return caches.match('/login.html');
          });
      })
  );
});

// 处理推送通知
self.addEventListener('push', function(event) {
  if (!event.data) return;
  
  const data = event.data.json();
  const options = {
    body: data.body,
    vibrate: [100, 50, 100],
    data: {
      url: data.url || '/index.html'
    }
  };
  
  event.waitUntil(
    self.registration.showNotification(data.title, options)
  );
});

// 处理通知点击
self.addEventListener('notificationclick', function(event) {
  event.notification.close();
  
  event.waitUntil(
    clients.openWindow(event.notification.data.url)
  );
});

// 处理后台同步（可选）
self.addEventListener('sync', function(event) {
  if (event.tag === 'sync-auth-data') {
    event.waitUntil(syncAuthData());
  }
});

// 同步授权数据
async function syncAuthData() {
  console.log('Syncing auth data...');
  // 这里可以添加同步授权数据的逻辑
}
