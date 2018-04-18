export class LazyLoad{
    constructor(images, config){
        this.imageCount = images.length;
        if('IntersectionObserver' in window){
            this.observer = new IntersectionObserver(this.onIntersection, config);
            for(const image of images){
                this.observer.observe(image);
            }
        }
    }

    onIntersection = (entries) => {
        for(const entry of entries){
            if(entry.intersectionRatio){
                this.imageCount--;
                this.observer.unobserve(entry.target);
                this.preloadImage(entry.target);
            }
        }
    }

    preloadImage = (image) => {
        const imgsrc = image.dataset.src;
        return new Promise((resolve, reject) =>{
            const img = new Image();
            img.src = imgsrc;
            img.onload = resolve;
            img.onerror = reject;
        }).then((success) => { image.src = imgsrc; });
    }
}
