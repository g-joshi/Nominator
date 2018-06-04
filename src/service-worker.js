self.addEventListener("fetch", function () {
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