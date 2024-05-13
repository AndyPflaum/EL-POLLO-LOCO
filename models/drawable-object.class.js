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
    * Draws a frame around the object on the canvas context if it belongs to specific classes.
    * 
    * @param {CanvasRenderingContext2D} ctx - The canvas rendering context to draw on.
    */
    drawFrame(ctx) {
        // if (this instanceof Character || this instanceof Chicken || this instanceof Endboss || this instanceof Bottle || this instanceof SmallChicken || this instanceof Coin) {
        //     ctx.beginPath();
        //     ctx.lineWidth = '5';
        //     ctx.strokeStyle = 'blue';
        //     ctx.rect(this.x, this.y, this.height, this.width);
        //     ctx.stroke();
        // }
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