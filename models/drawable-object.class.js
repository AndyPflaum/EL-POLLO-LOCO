class DrawableObject {
    img;
    imageCache = {};
    currentImage = 0;
    x = -1000;
    y = 250;

    /**
     * Loads an image from the specified path.
     * 
     * @param {string} path - The path to the image to load.
     */
    loadImage(path) {
        this.img = new Image();
        this.img.src = path;
    }

    /**
    * Draws the loaded image on the canvas context.
    * 
    * @param {CanvasRenderingContext2D} ctx - The canvas rendering context to draw on.
    */
    draw(ctx) {
        ctx.drawImage(this.img, this.x, this.y, this.height, this.width);
    }

    /**
     * Loads images from an array of paths and stores them in the image cache.
     * 
     * @param {string[]} arr - An array of image paths to load.
     */
    loadImages(arr) {
        arr.forEach(path => {
            let img = new Image();
            img.src = path;
            this.imageCache[path] = img;
        });
    }
}