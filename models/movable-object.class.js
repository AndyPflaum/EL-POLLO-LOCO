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
    sound = true;

    /**
    * Applies gravity to the object, causing it to fall downwards until it collides with the ground or reaches the maximum falling speed.
    */
    applygravity() {
        this.applygravityInterval = setInterval(() => {
            if (this.isAboveGround() || this.speedY > 0) {
                this.y -= this.speedY;
                this.speedY -= this.acceleration;
            }
        }, 1000 / 25);
    }
    /**
     * Checks if the object is above the ground level.
     * 
     * @returns {boolean} True if the object is above the ground, false otherwise.
     */
    isAboveGround() {
        if (this instanceof ThrowableObject) {
            return true
        } else {
            return this.y < 100;
        }
    }

    /**
        * Checks if the current object is colliding with another object.
        * 
        * @param {Object} mo - The other object to check collision with.
        * @returns {boolean} True if there is a collision, false otherwise.
        */
    isColliding(mo) {
        return this.x + this.height - this.offset.right > mo.x + mo.offset.left &&
            this.y + this.width - this.offset.bottom > mo.y + mo.offset.top &&
            this.x + this.offset.left < mo.x + mo.height - mo.offset.right &&
            this.y + this.offset.top < mo.y + mo.width - mo.offset.bottom;
    }

    /**
            * Decreases the energy level of the current object and records the last hit time.
            */
    hit() {
        this.energy -= 1;
        if (this.energy < 0) {
            this.energy = 0;
        } else {
            this.lastHit = new Date().getTime();
        }
    }

    /**
                * Checks if the character is currently hurt based on the last hit time.
                * 
                * @returns {boolean} True if the character is hurt, false otherwise.
                */
    isHurt() {
        let timepassed = new Date().getTime() - this.lastHit;
        timepassed = timepassed / 1000;
        return timepassed < 1;
    }

    /**
     * Checks if the character is dead based on its energy level.
     * 
     * @returns {boolean} True if the character is dead, false otherwise.
     */
    isDead() {
        return this.energy == 0;
    }

    /**
    * Plays the next frame of animation from the provided array of images.
    * 
    * @param {string[]} images - An array containing paths to the images for the animation.
    */
    playAnimation(images) {
        let i = this.currentImage % images.length;
        let path = images[i];
        this.img = this.imageCache[path];
        this.currentImage++;
    }

    /**
    * Moves the character to the right by adding its speed to the x-coordinate.
    */
    moveRight() {
        this.x += this.speed;
    }

    /**
    * Moves the character to the left by subtracting its speed from the x-coordinate.
    */
    moveLeft() {
        this.x -= this.speed;
    }
}