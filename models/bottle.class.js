class Bottle extends MovableObject {
    width = 80;
    height = 80;
    y = 100

    IMAGES_BOTTLE_SPLASH = [
        'img/6_salsa_bottle/bottle_rotation/bottle_splash/1_bottle_splash.png',
        'img/6_salsa_bottle/bottle_rotation/bottle_splash/2_bottle_splash.png',
        'img/6_salsa_bottle/bottle_rotation/bottle_splash/3_bottle_splash.png',
        'img/6_salsa_bottle/bottle_rotation/bottle_splash/4_bottle_splash.png',
        'img/6_salsa_bottle/bottle_rotation/bottle_splash/5_bottle_splash.png',
        'img/6_salsa_bottle/bottle_rotation/bottle_splash/6_bottle_splash.png'
    ]

    constructor(imagePatch) {
        super().loadImage(imagePatch);
        this.x = Math.random() * (719 * 2 + 1400) - 1350;
        this.y = 356;

    }

animate(){
    if (this.isAboveGround()) {
    
    } else{
        this.playAnimation(this.IMAGES_BOTTLE_SPLASH);
    }
}



}