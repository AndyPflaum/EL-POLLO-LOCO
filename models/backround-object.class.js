class BackgroundObject extends MovableObject {
    width = 480;
    height = 720;

    IMAGE_IS_DEAD = [
        'img/9_intro_outro_screens/game_over/game over!.png'
    ]

    constructor(imagePatch, x) {
        super().loadImage(imagePatch);
        this.loadImages(this.IMAGE_IS_DEAD);
        this.x = x;
        this.y = 480 - this.width;
        // this.animate();
    }

    animate(){
        setInterval(() => {
            if (world.character.isDead()) {
                this.playAnimation(this.IMAGE_IS_DEAD);
            } else {
                // Hier kannst du die Animation für den normalen Hintergrund einfügen, falls erforderlich
            }
        }, 300);
        
       
    }
}