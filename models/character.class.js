class Character extends MovableObject {
    width = 350;
    height = 150;
    y = 100;
    speed = 5;
    offset = {
        top: 50,
        left: 30,
        right: 25,
        bottom: 20
    }
    IMAGES_WALKING = [
        'img/2_character_pepe/2_walk/W-21.png',
        'img/2_character_pepe/2_walk/W-22.png',
        'img/2_character_pepe/2_walk/W-23.png',
        'img/2_character_pepe/2_walk/W-24.png',
        'img/2_character_pepe/2_walk/W-25.png',
        'img/2_character_pepe/2_walk/W-26.png'
    ];
    IMAGES_JUMPUNG = [
        'img/2_character_pepe/3_jump/J-31.png',
        'img/2_character_pepe/3_jump/J-32.png',
        'img/2_character_pepe/3_jump/J-33.png',
        'img/2_character_pepe/3_jump/J-34.png',
        'img/2_character_pepe/3_jump/J-35.png',
        'img/2_character_pepe/3_jump/J-36.png',
        'img/2_character_pepe/3_jump/J-37.png',
        'img/2_character_pepe/3_jump/J-38.png',
        'img/2_character_pepe/3_jump/J-39.png'

    ];
    IMAGES_DEAD = [
        'img/2_character_pepe/5_dead/D-51.png',
        'img/2_character_pepe/5_dead/D-52.png',
        'img/2_character_pepe/5_dead/D-53.png',
        'img/2_character_pepe/5_dead/D-54.png',
        'img/2_character_pepe/5_dead/D-55.png',
        'img/2_character_pepe/5_dead/D-56.png',
        'img/2_character_pepe/5_dead/D-57.png'
    ];
    IMAGES_HURT = [
        'img/2_character_pepe/4_hurt/H-41.png',
        'img/2_character_pepe/4_hurt/H-42.png',
        'img/2_character_pepe/4_hurt/H-43.png'
    ];
    IMAGES_STAND = [
        'img/2_character_pepe/1_idle/idle/I-1.png',
        'img/2_character_pepe/1_idle/idle/I-2.png',
        'img/2_character_pepe/1_idle/idle/I-3.png',
        'img/2_character_pepe/1_idle/idle/I-4.png',
        'img/2_character_pepe/1_idle/idle/I-5.png',
        'img/2_character_pepe/1_idle/idle/I-6.png',
        'img/2_character_pepe/1_idle/idle/I-7.png',
        'img/2_character_pepe/1_idle/idle/I-8.png',
        'img/2_character_pepe/1_idle/idle/I-9.png',
        'img/2_character_pepe/1_idle/idle/I-10.png'

    ]
    IMAGES_LONGSTAND = [
        'img/2_character_pepe/1_idle/long_idle/I-11.png',
        'img/2_character_pepe/1_idle/long_idle/I-12.png',
        'img/2_character_pepe/1_idle/long_idle/I-13.png',
        'img/2_character_pepe/1_idle/long_idle/I-14.png',
        'img/2_character_pepe/1_idle/long_idle/I-15.png',
        'img/2_character_pepe/1_idle/long_idle/I-16.png',
        'img/2_character_pepe/1_idle/long_idle/I-17.png',
        'img/2_character_pepe/1_idle/long_idle/I-18.png',
        'img/2_character_pepe/1_idle/long_idle/I-19.png',
        'img/2_character_pepe/1_idle/long_idle/I-20.png'
    ]
    wold;
    walking_sound = new Audio('audio/walking_sound.mp3');
    jump_sound = new Audio('audio/jump_sound.mp3');
    pains_sound = new Audio('audio/game-over-sound.mp3');
    sleep_sound = new Audio('audio/sleep.mp3');
    hasPlayedDeathSound = false;
    lastMovementTime = Date.now();

    constructor() {
        super().loadImage('img/2_character_pepe/2_walk/W-21.png');
        this.loadImages(this.IMAGES_WALKING);
        this.loadImages(this.IMAGES_JUMPUNG);
        this.loadImages(this.IMAGES_DEAD);
        this.loadImages(this.IMAGES_HURT);
        this.loadImages(this.IMAGES_STAND);
        this.loadImages(this.IMAGES_LONGSTAND);
        this.applygravity();
        this.animate();
    }

    /**
    * Initiates the animation loop for the character.
    * 
    * @remarks It controls character movement, camera position, and character animation.
    */
    animate() {
        setInterval(() => {
            this.soundcharacter();
            this.moveCharacter();
            this.notThrowToTheLeft();
            this.world.camera_x = -this.x + 100;
        }, 1000 / 60);

        setInterval(() => this.playCharacter(), 150);
    }

    /**
     * Pauses the walking sound of the character.
     */
    soundcharacter() {
        this.walking_sound.pause();
    }

    /**
    * Plays the appropriate character animation based on its current state.
    * 
    * @remarks It checks if the character is dead, hurt, jumping, moving, or standing,
    * and plays the corresponding animation.
    */
    playCharacter() {
        if (this.isDead()) {
            this.playDeadAnimation();
            return;
        }
        if (this.isHurt()) {
            this.playHurtAnimation();
            return;
        }
        if (this.isAboveGround()) {
            this.playJumpAnimation();
            return;
        }
        if (this.isMovingRightOrLeft()) {
            return;
        }
        this.characterStand();
    }

    /**
    * Plays the dead animation for the character.
    * If the death sound has not been played yet and the game sound is enabled,
    * plays the death sound and disables game sound.
    */
    playDeadAnimation() {
        if (!this.hasPlayedDeathSound) {
            this.playAnimation(this.IMAGES_DEAD);
            if (this.world.sound && !this.hasPlayedPainsSound) {
                this.pains_sound.play();
                this.hasPlayedPainsSound = true;
                this.world.sound = false;
            }
        }
    }

    /**
    * Plays the hurt animation for the character.
    */
    playHurtAnimation() {
        this.playAnimation(this.IMAGES_HURT);
    }

    /**
     * Plays the jumping animation for the character.
     */
    playJumpAnimation() {
        this.playAnimation(this.IMAGES_JUMPUNG);
    }

    /**
    * Checks if the character is currently moving to the right or left.
    * Updates the last movement time, plays walking animation, and pauses sleep sound if moving.
    * 
    * @returns {boolean} True if the character is moving right or left, otherwise false.
    */
    isMovingRightOrLeft() {
        if (this.world.keybord.RIGHT || this.world.keybord.LEFT) {
            this.lastMovementTime = Date.now();
            this.playAnimation(this.IMAGES_WALKING);
            this.sleep_sound.pause();
            return true;
        }
        return false;
    }

    /**
     * Sets the character's animation to standing.
     * If the character has not moved for 5 seconds, switches to a long-standing animation and plays a sleep sound.
     */
    characterStand() {
        this.playAnimation(this.IMAGES_STAND);
        if (Date.now() - this.lastMovementTime >= 5000) {
            this.playAnimation(this.IMAGES_LONGSTAND);
            this.sleepSound();
        }
    }

    /**
    * Checks if the character is currently moving to the right or left.
    * Updates the last movement time, plays walking animation, and pauses sleep sound if moving.
    * 
    * @returns {boolean} True if the character is moving right or left, otherwise false.
    */
    pressedRightOrLeft() {
        if (this.world.keybord.RIGHT || this.world.keybord.LEFT) {
            this.lastMovementTime = Date.now();
            this.playAnimation(this.IMAGES_WALKING);
            this.sleep_sound.pause();
            return true;
        }
        return false;
    }

    /**
    * Sets the character's animation to standing.
    * If the character has not moved for 5 seconds, switches to a long-standing animation and plays a sleep sound.
    */
    characterStand() {
        this.playAnimation(this.IMAGES_STAND);
        if (Date.now() - this.lastMovementTime >= 5000) {
            this.playAnimation(this.IMAGES_LONGSTAND);
            this.sleepSound();
        }
    }

    /**
     * Controls the sleep sound of the character based on game sound status.
     * Plays or pauses the sleep sound accordingly.
     */
    sleepSound() {
        if (this.world.sound === false) {
            this.sleep_sound.pause();
        } else {
            this.sleep_sound.play();
        }
    }

    /**
     * Moves the character based on keyboard input.
     * Checks if the character can move right, left, or jump, and performs the corresponding actions.
     */
    moveCharacter() {
        if (this.canMoveRight())
            this.moveRight();
        if (this.canMoveLeft())
            this.moveLeft();
        if (this.canJump())
            this.isJump();
    }

    /**
    * Initiates a jump action for the character if sound is enabled.
    * Plays the jump sound and performs the jump action.
    */
    isJump() {
        if (this.world.sound === true) {
            this.jump_sound.play();
        }
        this.jump();
    }

    /**
     * Moves the character to the right if sound is enabled.
     * Plays the walking sound and calls the parent moveRight method.
     */
    moveRight() {
        if (this.world.sound === true) {
            this.walking_sound.play();
        }
        super.moveRight();
        this.otherDiretion = false;
    }

    /**
     * Moves the character to the left if sound is enabled.
     * Plays the walking sound and calls the parent moveLeft method.
     */
    moveLeft() {
        if (this.world.sound === true) {
            this.walking_sound.play();
        }
        super.moveLeft();
        this.otherDiretion = true;
    }

    /**
    * Checks if the character can perform a jump action.
    * 
    * @returns {boolean} True if the character can jump, otherwise false.
    */
    canJump() {
        return this.world.keybord.SPACE && !this.isAboveGround();
    }

    /**
     * Checks if the character can move to the right.
     * 
     * @returns {boolean} True if the character can move right, otherwise false.
     */
    canMoveRight() {
        return this.world.keybord.RIGHT && this.x < world.level.level_end_x;
    }

    /**
     * Checks if the character can move to the left.
     * 
     * @returns {boolean} True if the character can move left, otherwise false.
     */
    canMoveLeft() {
        return this.world.keybord.LEFT && this.x > -1330;
    }

    /**
     * Initiates a jump action for the character by setting its vertical speed.
     */
    jump() {
        this.speedY = 30;
    }

    /**
    * Prevents throwing to the left direction.
    */
    notThrowToTheLeft() {
        if (this.otherDiretion === true) {
            keybord.D = false;
        }
    }
}