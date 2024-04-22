class DrawableObject{
    img;
    imageCache = {};
    currentImage = 0;
    x = 100;
    y = 250;
    width = 100;
    height = 100;

    loadImage(path) {
        this.img = new Image();
        this.img.src = path;
    }
    
    draw(ctx) {
        ctx.drawImage(this.img, this.x, this.y, this.height, this.width);
    }

    drawFrame(ctx) {
        // if (this instanceof Character || this instanceof Chicken || this instanceof Endboss || this instanceof Bottle) {
        //     ctx.beginPath();
        //     ctx.lineWidth = '5';
        //     ctx.strokeStyle = 'blue';
        //     ctx.rect(this.x , this.y, this.height, this.width);
        //     ctx.stroke();
        // }
    }

       loadImages(arr) {
        arr.forEach(path => {
            let img = new Image();
            img.src = path;
            this.imageCache[path] = img;
        });
    }
}