class BackgroundObject extends MovableObject {
    width = 480;
    height = 720;

  

    constructor(imagePatch, x) {
        super().loadImage(imagePatch);
        this.x = x;
        this.y = 480 - this.width;
    }
}