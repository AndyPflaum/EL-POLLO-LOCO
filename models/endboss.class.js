class Endboss extends MovableObject {
    height = 400;
    width = 400;
    y = 50;


    IMAGES_ALERT = ['img/4_enemie_boss_chicken/2_alert/G5.png',
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
    ];

    IMAGES_HURT = [
        'img/4_enemie_boss_chicken/4_hurt/G21.png',
        'img/4_enemie_boss_chicken/4_hurt/G22.png',
        'img/4_enemie_boss_chicken/4_hurt/G23.png',
    ];
    IMAGES_ATTACK = [
        'img/4_enemie_boss_chicken/3_attack/G13.png',
        'img/4_enemie_boss_chicken/3_attack/G14.png',
        'img/4_enemie_boss_chicken/3_attack/G15.png',
        'img/4_enemie_boss_chicken/3_attack/G16.png',
        'img/4_enemie_boss_chicken/3_attack/G17.png',
        'img/4_enemie_boss_chicken/3_attack/G18.png',
        'img/4_enemie_boss_chicken/3_attack/G19.png',
        'img/4_enemie_boss_chicken/3_attack/G20.png',
    ];
    offset = {
        top: 20,
        left: 80,
        right: 80,
        bottom: 0
    }

    hadFirstContact = false;

    finalBoss_sound = new Audio('audio/finalBoss_sound.mp3.mp3');

    constructor() {
        super().loadImage('img/4_enemie_boss_chicken/2_alert/G5.png');
        this.loadImages(this.IMAGES_ALERT);
        this.loadImages(this.IMAGES_DEAD);
        this.loadImages(this.IMAGES_HURT);
        this.loadImages(this.IMAGES_ATTACK);
        this.x = 2100;
        this.speed = 40;
        this.animate();
    }

    animate() {
        setInterval(() => {
            if (this.energIsAtZero()) {
                this.finalBoss_sound.pause();
                world.mexico_sound.pause();
            } else if (world.character.x >= 1160 || this.hadFirstContact) {
                this.hadFirstContact = true;
                this.finalBoss_sound.play();
                this.finalBoss_sound.volume = 0.7;
                if (world.bossLife > 0) {
                    this.moveLeft();
                }
            }
            if (world.bossLife >= 80) {
                this.playAnimation(this.IMAGES_ATTACK)
            }
            if (this.bossGetsHit()) {
                this.playAnimation(this.IMAGES_HURT);
            } else if (world.bossLife <= 0) {
                this.playAnimation(this.IMAGES_DEAD);
                this.finalBoss_sound.pause();

            } else {
                this.playAnimation(this.IMAGES_ATTACK);
            }

        }, 250);
    }

    bossGetsHit() {
        let isHurt = false;
        world.throwableObject.forEach(bottle => {
            if (this.isColliding(bottle)) {
                isHurt = true;
            }
        });
        return isHurt;
    }

    energIsAtZero(){
       return world.character.energy <= 0;
    }

}