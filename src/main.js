import {LazyLoad} from './lazy-load';

const config = {
    rootMargin: '50px 0px',
    threshold: 0.01,
};
const images = document.querySelectorAll('.lazy-image');
const lazyLoad = new LazyLoad(images, config);
