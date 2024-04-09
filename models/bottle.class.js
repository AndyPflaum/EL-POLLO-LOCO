class Bottle extends MovableObject {
    width = 80;
    height = 80;
    y = 100

    constructor(imagePatch) {
        super().loadImage(imagePatch);
        this.x = Math.random() * (719 * 2 + 1400) - 1350;
        this.y = 356;
       

    }

}