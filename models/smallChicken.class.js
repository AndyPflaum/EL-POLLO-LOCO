class SmallChicken extends MovableObject {
    width = 50;
    height = 50;
    offset = {
        top: 0,
        left: 20,
        right: 20,
        bottom: 0
    }


    IMAGES_WALK = [
        'img/3_enemies_chicken/chicken_small/1_walk/1_w.png',
        'img/3_enemies_chicken/chicken_small/1_walk/2_w.png',
        'img/3_enemies_chicken/chicken_small/1_walk/3_w.png',
    ];

    IMAGES_DEAD = [
        'img/3_enemies_chicken/chicken_small/2_dead/dead.png'
    ]
    constructor() {
        super().loadImage('img/3_enemies_chicken/chicken_small/1_walk/1_w.png');
        this.loadImages(this.IMAGES_WALK);
        this.loadImages(this.IMAGES_DEAD);
        this.y = 390
        this.x = 300 + Math.random() * 1700;
        this.animate();
        super.moveLeft();
        this.speed = 1 + Math.random() * 5;


    }
    /**
     * Initiates animation for the character.
     */
    animate() {
        setInterval(() => {
            if (this.isDead()) {
                this.playAnimation(this.IMAGES_DEAD);

            } else {
                this.moveLeft();
                this.playAnimation(this.IMAGES_WALK);
            }
        }, 100);
    }
}