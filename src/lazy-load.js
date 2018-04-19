export class LazyLoad{
    /**
     * @description This Class use intersection observer to lazy load full images if supported by current browser environment.
     * @param {NodeListOf<Element>} images Image nodes to observe from html.
     * @param {Object} config Intersection observer settings, including when to consider as intersected.
     */
    constructor(images, config){
        if('IntersectionObserver' in window){
            this.observer = new IntersectionObserver(this.onIntersection, config);
            for(const image of images){
                this.observer.observe(image);
            }
        } else {
            for(const image of images){
                this.preloadImage(image);
            }
        }
    }
    /**
     * @description On intersection criteria been met, load full image and unobserve.
     * @param {IntersectionObserverEntry[]} entries Intersection observer entries information.
     */
    onIntersection = (entries) => {
        for(const entry of entries){
            if(entry.intersectionRatio){
                this.observer.unobserve(entry.target);
                this.preloadImage(entry.target);
            }
        }
    }
    /**
     * @description Load full image and apply if fetch succeeds.
     * @param {HTMLImageElement} image Image element in html.
     * @returns {Promise<any>} The response for fetching full image by url.
     */
    preloadImage = (image) => {
        const imgsrc = image.dataset.src;
        if(!imgsrc){ return Promise.reject(null); }
        return new Promise((resolve, reject) =>{
            const img = new Image();
            img.src = imgsrc;
            img.onload = resolve;
            img.onerror = reject;
        }).then((success) => { this.applyImage(image, imgsrc); });
    }
    /**
     * @description Replace image with new source for full image and apply entering animation.
     * @param {HTMLImageElement} image Image element in html.
     * @param {String} src Source path for full image.
     */
    applyImage = (image, src) => {
        image.src = src;
        image.classList.add('image-handled');
    }
}
