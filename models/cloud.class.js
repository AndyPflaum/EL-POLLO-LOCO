class Cloud extends MovableObject {
    y = 20;
    width = 350;
    height = 600;



    constructor() {
        super().loadImage('img/5_background/layers/4_clouds/1.png');
        this.x = Math.random() * 5000;
        this.speed = Math.random() * 0.5;
        this.animate();


    }
    /**
     * Animates the character by repeatedly executing movement logic and adjusting the x-coordinate if necessary.
     */
    animate() {
        setInterval(() => {
            this.moveLeft();
            if (this.x <= -2000) {
                this.x += 4000;
            }
        }, 1000 / 60);
    }
}