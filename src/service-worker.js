
self.addEventListener("fetch", function () {
});

self.addEventListener('push', function (e) {
    const data = e.data.json();
    e.waitUntil(
        self.registration.showNotification('XT Nomination', {
            body: data.title,
            icon: '/assets/icons/favicon.ico'
        })
    );
});

self.addEventListener("install", function (event) {
    event.waitUntil(
        caches.open('xt-nt-cache').then(function (cache) {
            return cache.addAll([
                'https://fonts.gstatic.com/s/roboto/v18/KFOmCnqEu92Fr1Mu4mxKKTU1Kg.woff2',
                'https://fonts.gstatic.com/s/roboto/v18/KFOlCnqEu92Fr1MmEU9fBBc4AMP6lQ.woff2',
                'https://fonts.googleapis.com/css?family=Roboto:300,400,500',
                '/assets/icons/outline-create-24px.svg',
                '/assets/icons/outline-check-24px.svg',
                '/assets/icons/outline-person-24px.svg',
                '/assets/icons/outline-more_vert-24px.svg',
                '/assets/icons/favicon.ico',
                '/assets/icons/manifest-icon.png',
                'manifest.json'
            ]);
        })
    )
});

self.addEventListener('notificationclick', function (e) {
    var notification = e.notification;
    var action = e.action;

    if (action === 'close') {
        notification.close();
    } else {
        clients.openWindow('http://localhost:4200');
        notification.close();
    }
});
