class DrawableObject{
    img;
    imageCache = {};
    currentImage = 0;
    x = -1000;
    y = 250;
    

    loadImage(path) {
        this.img = new Image();
        this.img.src = path;
    }
    
    draw(ctx) {
        ctx.drawImage(this.img, this.x, this.y, this.height, this.width);
    }

    drawFrame(ctx) {
        // if (this instanceof Character || this instanceof Chicken || this instanceof Endboss || this instanceof Bottle || this instanceof SmallChicken || this instanceof Coin) {
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