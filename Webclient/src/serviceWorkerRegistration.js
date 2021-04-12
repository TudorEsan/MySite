export default class Sw {
  SW = null;
  #cacheName = 'v1'
  async init() {
    // if it is valid
    // if ('serviceWorker' in navigator) {
    //   const registration = await navigator.serviceWorker.register('./sw.js', {
    //     scope: '/'
    //   });
    //   this.SW = registration.installing || registration.waiting || registration.active;
    // }

    // if (navigator.serviceWorker.controller) {
    //   console.log("We already have a service worker")
    // }
    
    // navigator.serviceWorker.oncontrollerchange = (e) => {
    //   console.log("New service worker activated!")
    // }
    this.startCaching();

  }

  async startCaching() {
    // open the cache
    const cache = await caches.open(this.#cacheName)
    let urlString = "/MyPhoto.jpg";
    cache.add(urlString) //add = fetch + push
  }

  async deleteCache() {

  }

}