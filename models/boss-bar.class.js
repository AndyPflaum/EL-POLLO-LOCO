class BossBar extends MovableObject {
    IMAGES = [
        'img/7_statusbars/2_statusbar_endboss/blue/blue0.png',
        'img/7_statusbars/2_statusbar_endboss/blue/blue20.png',
        'img/7_statusbars/2_statusbar_endboss/blue/blue40.png',
        'img/7_statusbars/2_statusbar_endboss/blue/blue60.png',
        'img/7_statusbars/2_statusbar_endboss/blue/blue80.png',
        'img/7_statusbars/2_statusbar_endboss/blue/blue100.png'
    ];

    percentage = 100;

    constructor() {
        super();
        this.loadImages(this.IMAGES);
        this.x = 500;
        this.y = 30;
        this.width = 60;
        this.height = 200;
        this.setPercentage(100);
    }

    /**
    * Sets the percentage value and updates the image based on the provided percentage.
    * 
    * @param {number} percentage - The percentage value to set.
    */
    setPercentage(percentage) {
        this.percentage = percentage;
        let path = this.IMAGES[this.resolveImageIndex()];
        this.img = this.imageCache[path];
        this.otherDiretion = true;
    }

    /**
     * Resolves the image index based on the current percentage value.
     * 
     * @returns {number} The index of the image to use based on the percentage.
     */
    resolveImageIndex() {
        if (this.percentage >= 100) {
            return 5;
        } else if (this.percentage >= 80) {
            return 4;
        } else if (this.percentage >= 60) {
            return 3;
        } else if (this.percentage >= 40) {
            return 2;
        } else if (this.percentage >= 20) {
            return 1;
        } else {
            return 0;
        }
    }   
}
