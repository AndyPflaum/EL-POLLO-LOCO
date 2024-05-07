class CoinBar extends DrawableObject {
    IMAGES = [
        'img/7_statusbars/1_statusbar/1_statusbar_coin/green/0.png',
        'img/7_statusbars/1_statusbar/1_statusbar_coin/green/20.png',
        'img/7_statusbars/1_statusbar/1_statusbar_coin/green/40.png',
        'img/7_statusbars/1_statusbar/1_statusbar_coin/green/60.png',
        'img/7_statusbars/1_statusbar/1_statusbar_coin/green/80.png',
        'img/7_statusbars/1_statusbar/1_statusbar_coin/green/100.png',

    ];

    percentage = 0;
    coinImageIndex = 0;

    constructor() {
        super();
        this.loadImages(this.IMAGES);
        this.x = 30;
        this.y = 40;
        this.width = 60;
        this.height = 200;
        this.setPercentage(0);
    }

    /*** Sets the percentage value and updates the image based on the provided percentage.* * @param {number} percentage - The percentage value to set.*/
    setPercentage(percentage) {
        this.percentage = percentage;
        let path = this.IMAGES[this.resolveImageIndex()];
        this.img = this.imageCache[path];
    }

    /**
     * Resolves the image index based on the current percentage value.
     * 
     * @returns {number} The index of the image to use based on the percentage.
     */
    resolveImageIndex() {
        if (this.percentage <= 0) {
            return 0;
        } else if (this.percentage <= 20) {
            return 1;
        } else if (this.percentage <= 40) {
            return 2;
        } else if (this.percentage <= 60) {
            return 3;
        } else if (this.percentage <= 80) {
            return 4;
        } else {
            return 5;
        }
    }
}