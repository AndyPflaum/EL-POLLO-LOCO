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
        'img/6_salsa_bottle/bottle_rotation/bottle_splash/6_bottle_splash.png',
    ]



    constructor(x, y) {
        super().loadImage('img/6_salsa_bottle/bottle_rotation/1_bottle_rotation.png');
        this.loadImages(this.IMAGES_BOTTEL);
        this.loadImages(this.IMAGES_BOTTEL_SPLASH);
        this.x = x;
        this.y = y;
        this.height = 50;
        this.width = 60;
        this.trow();
        this.animate();

    }
    
    trowInterval;

    trow() {
        this.speedY = 30;
        this.applygravity();
        this.trowInterval = setInterval(() => {
                this.x += 10
                if (this.isBroken) {
                    clearInterval(this.applygravityInterval);
                    clearInterval(this.trowInterval);
                }
            
            
        }, 25);
    }

    animate() {
        setInterval(() => {
            if (this.isBroken) {
                this.playAnimation(this.IMAGES_BOTTEL_SPLASH)
            } else{
                this.playAnimation(this.IMAGES_BOTTEL);
            }
        }, 50);
    }

    isColliding(enemy) {
        // Überprüfe, ob die Position des gegnerischen Objekts im Bereich des Wurfs ist
        return (
            this.x < enemy.x + enemy.width &&
            this.x + this.width > enemy.x &&
            this.y < enemy.y + enemy.height &&
            this.y + this.height > enemy.y
        );
    }


}