class Chicken extends MovableObject {
    y = 360;
    width = 80;
    height = 80;
    IMAGES_WALKING = ['img/3_enemies_chicken/chicken_normal/1_walk/1_w.png',
        'img/3_enemies_chicken/chicken_normal/1_walk/2_w.png',
        'img/3_enemies_chicken/chicken_normal/1_walk/3_w.png'
    ];

    constructor() {
        super().loadImage('img/3_enemies_chicken/chicken_normal/1_walk/1_w.png');
        this.x = 200 + Math.random() * 500;
        this.loadImages(this.IMAGES_WALKING);
        this.speed = 0.15 + Math.random()* 1;
        this.animate();
    }


    animate() {
        setInterval(() => {
            this.moveLeft();
            // if (this.x <= -2000) {
            //     this.x += 4300; // Anpassen der x-Koordinate auf 2400px
            // } 
        }, 1000 / 60);
       

        setInterval(() => {
           this.playAnimation(this.IMAGES_WALKING);
        }, 100);

    }

}