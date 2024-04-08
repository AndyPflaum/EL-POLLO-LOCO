class ThrowableObject extends MovableObject {
IMAGES_BOTTEL = [
    'img/6_salsa_bottle/bottle_rotation/1_bottle_rotation.png',
    'img/6_salsa_bottle/bottle_rotation/2_bottle_rotation.png',
    'img/6_salsa_bottle/bottle_rotation/3_bottle_rotation.png',
    'img/6_salsa_bottle/bottle_rotation/4_bottle_rotation.png'
]



    constructor(x, y) {
        super().loadImage('img/6_salsa_bottle/bottle_rotation/1_bottle_rotation.png');
        this.loadImages(this.IMAGES_BOTTEL);
        this.x = x;
        this.y = y;
        this.height= 50;
        this.width = 60;
        this.trow();
        this.animate();
        
    }

    trow(){
        this.speedY = 30;
        this.applygravity();
        setInterval(() => {
            this.x += 10
        }, 25);
    }

    animate(){
        setInterval(() => {
            this.playAnimation(this.IMAGES_BOTTEL);

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