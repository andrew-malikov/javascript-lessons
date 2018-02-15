const ZOOM_IN = 'zoom_in';
const ZOOM_OUT = 'zoom_out';

const FPS = 30;

function ImageComponent(src, label) {
    let image = getImage(src, label);

    let originalSize = {
        width: image.width,
        height: image.height
    };

    let restrictedSize = {
        width: originalSize.width + (originalSize.width / 5),
        height: originalSize.height + (originalSize.height / 5)
    };

    

    let state = ZOOM_OUT;

    let animationTime = 300;

    function zoomInAnimation() {
        state = ZOOM_IN;

        let startTime = Date.now();

        let timer = setInterval(function () {
            if (state !== ZOOM_IN || Date.now() - startTime > animationTime) {
                clearInterval(timer);
                return;
            }

            updateSize({
                width: (restrictedSize.width - image.width) / (animationTime/FPS),
                height: (restrictedSize.width - image.width) / (animationTime/FPS)
            });
        }, 16);
    };

    function zoomOutAnimation() {
        state = ZOOM_OUT;

        let startTime = Date.now();

        let timer = setInterval(function () {
            if (state !== ZOOM_OUT || Date.now() - startTime > animationTime) {
                clearInterval(timer);
                return;
            }

            updateSize({
                width: (originalSize.width - image.width) / (animationTime/FPS),
                height: (originalSize.height - image.height) / (animationTime/FPS)
            });
        }, 16);
    };

    function updateSize(sizeDifference) {
        image.width += sizeDifference.width;
        image.height += sizeDifference.height;
    };

    function setSize(size) {
        image.width = size.width;
        image.height = size.height;
    }

    image.addEventListener('mouseenter', zoomInAnimation);
    image.addEventListener('mouseleave', zoomOutAnimation);

    this.image = function () {
        return image;
    }

    this.state = function () {
        return state;
    }
}

function getImage(src, label) {
    let image = document.createElement('img');

    image.setAttribute('src', src);
    image.setAttribute('alt', label);

    return image;
}

var imageComponent = new ImageComponent('resources/img_01.jpg', 'darknes');

document.body.appendChild(imageComponent.image());