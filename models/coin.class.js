class Coin extends MovableObject {
    IMAGES_COIN = ['img/8_coin/coin_1.png',
        'img/8_coin/coin_2.png',
    ];
    
    offset = {
        top: 80,
        left: 100,
        right: 100,
        bottom: 80
    }

    constructor() {
        super().loadImage('img/8_coin/coin_1.png');
        this.x = Math.random() * -1400 + Math.random() * 1800;
        this.loadImages(this.IMAGES_COIN);
        this.y = 200;
        this.height = 200;
        this.width = 200;
        this.animate();
    }

    /**
    * Animates the character by repeatedly playing the animation for collecting coins.
    */
    animate() {
        setInterval(() => {
            this.playAnimation(this.IMAGES_COIN);

        }, 500);
    }
}