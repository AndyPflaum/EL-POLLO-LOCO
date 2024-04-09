class Endboss extends MovableObject {
    height = 400;
    width = 400;
    y = 50;
    bossLife = 100;

    IMAGES_WALKING = ['img/4_enemie_boss_chicken/2_alert/G5.png',
        'img/4_enemie_boss_chicken/2_alert/G6.png',
        'img/4_enemie_boss_chicken/2_alert/G7.png',
        'img/4_enemie_boss_chicken/2_alert/G8.png',
        'img/4_enemie_boss_chicken/2_alert/G9.png',
        'img/4_enemie_boss_chicken/2_alert/G10.png',
        'img/4_enemie_boss_chicken/2_alert/G11.png',
        'img/4_enemie_boss_chicken/2_alert/G12.png',
    ];

    IMAGES_DEAD = [
        'img/4_enemie_boss_chicken/5_dead/G24.png',
        'img/4_enemie_boss_chicken/5_dead/G25.png',
        'img/4_enemie_boss_chicken/5_dead/G26.png'
    ]

    constructor() {
        super().loadImage('img/4_enemie_boss_chicken/2_alert/G5.png');
        this.loadImages(this.IMAGES_WALKING);
        this.loadImages(this.IMAGES_DEAD);
        this.x = 1750;
        this.speed = 0.15 + Math.random() * 1;
        this.animate();
        this.moveLeft();
    }

    animate() {
        setInterval(() => {
            if (this.bossLife == 0) {
                this.playAnimation(this.IMAGES_DEAD)
            } else {
                this.playAnimation(this.IMAGES_WALKING);
            }

        }, 300);
    }
}