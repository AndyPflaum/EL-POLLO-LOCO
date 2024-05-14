class ThrowableObject extends MovableObject {
    isBroken = false;
    IMAGES_BOTTEL = [
        'img/6_salsa_bottle/bottle_rotation/1_bottle_rotation.png',
        'img/6_salsa_bottle/bottle_rotation/2_bottle_rotation.png',
        'img/6_salsa_bottle/bottle_rotation/3_bottle_rotation.png',
        'img/6_salsa_bottle/bottle_rotation/4_bottle_rotation.png'
    ]

    IMAGES_BOTTEL_SPLASH = [
        'img/6_salsa_bottle/bottle_rotation/bottle_splash/1_bottle_splash.png',
        'img/6_salsa_bottle/bottle_rotation/bottle_splash/2_bottle_splash.png',
        'img/6_salsa_bottle/bottle_rotation/bottle_splash/3_bottle_splash.png',
        'img/6_salsa_bottle/bottle_rotation/bottle_splash/4_bottle_splash.png',
        'img/6_salsa_bottle/bottle_rotation/bottle_splash/5_bottle_splash.png',
        'img/6_salsa_bottle/bottle_rotation/bottle_splash/6_bottle_splash.png'
    ]
    throwInterval;

    constructor(x, y) {
        super().loadImage('img/6_salsa_bottle/bottle_rotation/1_bottle_rotation.png');
        this.loadImages(this.IMAGES_BOTTEL);
        this.loadImages(this.IMAGES_BOTTEL_SPLASH);
        this.x = x;
        this.y = y;
        this.height = 50;
        this.width = 60;
        this.throw();
        this.animate();

    }

    /**
     * Throws the bottle.
     */
    throw() {
        this.speedY = 20;
        this.applygravity();
        this.trowInterval = setInterval(() => {
            this.bottleFallsOnTheFloor();
            if (this.isBroken) {
                this.stopBottle();
            } else {
                this.x += 10;
            }
        }, 25);
    }

    /** 
    * Stops the bottle animation.
    */
    stopBottle() {
        clearInterval(this.applygravityInterval);
        clearInterval(this.trowInterval);
    }

    /** 
    * Checks if the bottle falls on the floor.
    */
    bottleFallsOnTheFloor() {
        if (this.y >= 350) {
            this.isBroken = true;
        }
    }

    /**
    * Animates the bottle. 
    */
    animate() {
        setInterval(() => {
            if (this.isBroken && this.isAboveGround()) {
                this.playAnimation(this.IMAGES_BOTTEL_SPLASH)
            } else {
                this.playAnimation(this.IMAGES_BOTTEL);
            }
        }, 50);
    }
    
    test123(){
        if (world.character.moveLeft()) {
            world.otherDiretion = true;
        }else{
            world.otherDiretion = false;
        }
    }
}