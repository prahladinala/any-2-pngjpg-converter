self.addEventListener("install", e => {
    // FIREs UP WHEN EVER SERVICE WORKER IS BEING INSTALLED
    // SERVICE WORKERS WILL GET INSTALLED ONLY ONCE IN A LIFECYCLE
    // EVEN WE REFRESHED THE PAGE SERVICE WORKER WILL NOT BE INSTALLED AGAIN
    // console.log("Install!")

    // IF WE MAKE CHANGES TO SW.JS FILE THEN THE PAGE SHOULD BE RELOADED
    // AND CLICK SKIP WAITING IN NETWORK>SERVICE WORKER TAB IN BROWSER
    // console.log("Install! AGAIN")

    // CACHING DATA > STATIC RESOURCES LIKE> CSS, IMAGES, INDEX.HTML
    e.waitUntil(
        caches.open("static").then(cache => {
            return cache.addAll(["./", "./src/main.js", "./images/logo192.png", "./images/logo512.png"]);
        })
    );

});

self.addEventListener("fetch", e => {
    // RUNS WHEN EVER WE RUN A FETCH REQUEST
    // console.log(`Intercepting fetch request for: ${e.request.url}`)
    // NOW OUR PWA IS INSTALLABLE
    e.respondWith(
        caches.match(e.request).then(response => {
            return response || fetch(e.request);

            // IF RESPONSE IS FOUND IN CACHE > THEN RETURN THAT RESPONSE > SO DONT NEED THE NETWORK FOR THAT
            // IF RESPONSE IS UNDEFINED > IF NO CACHED VERSION OF RESOURCE > THEN CALL BACK TO THE NETWORK TO GET THE RESPONSE > REGULAR FETCH REQUEST
        })
    )
});