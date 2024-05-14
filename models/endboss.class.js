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
        'img/4_enemie_boss_chicken/2_alert/G12.png'
    ];

    IMAGES_DEAD = [
        'img/4_enemie_boss_chicken/5_dead/G24.png',
        'img/4_enemie_boss_chicken/5_dead/G25.png',
        'img/4_enemie_boss_chicken/5_dead/G26.png'
    ];

    IMAGES_HURT = [
        'img/4_enemie_boss_chicken/4_hurt/G21.png',
        'img/4_enemie_boss_chicken/4_hurt/G22.png',
        'img/4_enemie_boss_chicken/4_hurt/G23.png'
    ];

    IMAGES_ATTACK = [
        'img/4_enemie_boss_chicken/3_attack/G13.png',
        'img/4_enemie_boss_chicken/3_attack/G14.png',
        'img/4_enemie_boss_chicken/3_attack/G15.png',
        'img/4_enemie_boss_chicken/3_attack/G16.png',
        'img/4_enemie_boss_chicken/3_attack/G17.png',
        'img/4_enemie_boss_chicken/3_attack/G18.png',
        'img/4_enemie_boss_chicken/3_attack/G19.png',
        'img/4_enemie_boss_chicken/3_attack/G20.png'
    ];

    offset = {
        top: 20,
        left: 80,
        right: 80,
        bottom: 0
    }

    hadFirstContact = false;
    chickenBoss_sound = new Audio('audio/chickenBoss.mp3');

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

    /**
    * Initiates the animation loop.
    * Checks the sound status and updates boss animation every 250 milliseconds.
    */
    animate() {
        setInterval(() => {
            this.checkMexicoSound();
            this.checkFinalBossSound();
            this.bossAnimation();
        }, 250);
    }

    /**
     * Checks if the boss is hit by a thrown bottle.
     * 
     * @returns {boolean} True if the boss is hit by a thrown bottle, otherwise false.
     */
    bossGetsHit() {
        let isHurt = false;
        world.throwableObject.forEach(bottle => {
            if (this.isColliding(bottle)) {
                isHurt = true;
            }
        });
        return isHurt;
    }

    /**
     * Checks if the character's energy is zero or less.
     * 
     * @returns {boolean} True if the character's energy is zero or less, otherwise false.
     */
    energIsAtZero() {
        return world.character.energy <= 0;
    }

    /**
    * Checks the sound status and controls the playing or pausing of the Mexico sound accordingly.
    */
    checkMexicoSound() {
        if (world.sound === false) {
            world.mexico_sound.pause();
        } else {
            world.mexico_sound.play();
        }
    }

    /**
     * Checks the final boss sound based on boss status.
     * Stops final boss sound if the boss is dead or character is not facing the boss.
     */
    checkFinalBossSound() {
        this.bossIsDead();
        this.characterSeesBoss();
    }

    /**
     * Manages the animation of the boss character based on its health and interactions.
     * Plays appropriate animation frames for boss attack, being hit, or being dead.
     */
    bossAnimation() {
        if (world.bossLife >= 80) {
            this.playAnimation(this.IMAGES_ATTACK);
        } else if (this.bossGetsHit()) {
            this.playAnimation(this.IMAGES_HURT);
            this.chickenBossSound();
        } else if (world.bossLife <= 0) {
            this.playAnimation(this.IMAGES_DEAD);
            world.finalBoss_sound.pause();
        } else {
            this.playAnimation(this.IMAGES_ATTACK);
        }
    }

    /**
    * Plays the chicken boss sound if the game sound is enabled.
    */
    chickenBossSound() {
        if (world.sound === true) {
            this.chickenBoss_sound.play();
        }
    }

    /**
     * Checks if the boss character is dead and stops related sounds if true.
     */
    bossIsDead() {
        if (this.energIsAtZero()) {
            world.finalBoss_sound.pause();
            world.mexico_sound.pause();
        }
    }

    /**
    * Checks if the character sees the boss and controls related game sounds and boss behavior.
    */
    characterSeesBoss() {
        if (world.character.x >= 1160 || this.hadFirstContact) {
            this.hadFirstContact = true;
            world.mexico_sound.pause();
            if (world.sound === true) {
                world.finalBoss_sound.play();
                world.mexico_sound.sound = false;
            }
            if (world.sound === false) {
                world.finalBoss_sound.pause();
            }
            world.finalBoss_sound.volume = 0.8;
            this.bossRanUntiltheEnd();
        }
    }

    /**
     * Controls the boss's movement until the end of its path or its defeat.
     * Moves the boss towards the character's position.
     * Stops boss sound if the boss is defeated.
     */
    bossRanUntiltheEnd() {
        if (world.bossLife > 0) {
            if (world.character.x > this.x) {
                this.moveRight();
            } else {
                this.moveLeft();
            }
        }
        else {
            world.sound = false;
        }
    }
}