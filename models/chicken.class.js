class Chicken extends MovableObject {
    y = 360;
    width = 80;
    height = 80;
    offset = {
        top: 0,
        left: 20,
        right: 20,
        bottom: 0
    }
    IMAGES_WALKING = ['img/3_enemies_chicken/chicken_normal/1_walk/1_w.png',
        'img/3_enemies_chicken/chicken_normal/1_walk/2_w.png',
        'img/3_enemies_chicken/chicken_normal/1_walk/3_w.png'
    ];

    IMAGES_DEAD = [
        'img/3_enemies_chicken/chicken_normal/2_dead/dead.png'
    ]

    constructor() {
        super().loadImage('img/3_enemies_chicken/chicken_normal/1_walk/1_w.png');
        this.x = 300 + Math.random() * 1200;
        this.loadImages(this.IMAGES_WALKING);
        this.loadImages(this.IMAGES_DEAD);
        this.speed = 1 + Math.random() * 5;
        this.animate();
    }

    /**
    * Animates the character by repeatedly executing movement and animation logic.
    */
    animate() {
        setInterval(() => {
            if (this.isDead()) {
                this.playAnimation(this.IMAGES_DEAD);
            } else {
                this.moveLeft();
                this.playAnimation(this.IMAGES_WALKING);
            }
        }, 100);
        setInterval(() => {
            if (!this.isDead()) {
                this.moveLeft();
            }
        }, 100);
    }
}