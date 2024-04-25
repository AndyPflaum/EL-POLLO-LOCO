class MovableObject extends DrawableObject {
    speed = 0.15;
    otherDiretion = false;
    speedY = 0;
    acceleration = 2.5;
    energy = 100;
    lastHit = 0;
    applygravityInterval;
    offset = {
        top: 0,
        left: 0,
        right: 0,
        bottom: 0
    }
   
    applygravity() {
        this.applygravityInterval = setInterval(() => {
            if (this.isAboveGround() || this.speedY > 0) {
                this.y -= this.speedY;
                this.speedY -= this.acceleration;
            }
        }, 1000 / 25);
    }

    isAboveGround() {
        if (this instanceof ThrowableObject) { 
            return true
        } else {
            return this.y < 100;
        }
    }

    isColliding(mo) {
        return this.x + this.height - this.offset.right > mo.x + mo.offset.left &&
            this.y + this.width - this.offset.bottom > mo.y + mo.offset.top &&
            this.x + this.offset.left < mo.x + mo.height - mo.offset.right &&
            this.y + this.offset.top < mo.y + mo.width -mo.offset.bottom;
    }

    hit() {
        this.energy -= 5;
        if (this.energy < 0) {
            this.energy = 0;
        } else {
            this.lastHit = new Date().getTime();
        }
    }

    isHurt() {
        let timepassed = new Date().getTime() - this.lastHit;
        timepassed = timepassed / 1000;
        return timepassed < 1;
    }

    isDead() {
        return this.energy == 0;
    }

    playAnimation(images) {
        let i = this.currentImage % images.length;
        let path = images[i];
        this.img = this.imageCache[path];
        this.currentImage++;
    }

    moveRight() {
        this.x += this.speed;
    }

    moveLeft() {
        this.x -= this.speed;
    }
}