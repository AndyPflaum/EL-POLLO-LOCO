class Bottle extends MovableObject {
    width = 80;
    height = 80;
    y = 100;
    offset = {
        top: 0,
        left: 50,
        right: 50,
        bottom: 0
    }

    constructor(imagePatch) {
        super().loadImage(imagePatch);
        this.x = Math.random() * (719 * 2 + 1400) - 1250;
        this.y = 356;
    }

}