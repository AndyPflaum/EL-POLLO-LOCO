class World {
    character = new Character();
    level = level1;
    canvas;
    ctx;
    keybord;
    camera_x = 0;
    stadusBar = new StatusBar();
    throwableObject = [];
    coin_sound = new Audio('audio/coin_sound.mp3');
    coinBar = new CoinBar();
    bottle = new Bottle();
    bottleBar = new BottleBar();
    coinValue = 0;
    bottleValue = 0;
    bottle_sound = new Audio('audio/bottle_sound.mp3');
    bossBar = new BossBar();
    bossLife = 100;
    breakBotte_sound = new Audio('audio/breakBottle.mp3');
    mexico_sound = new Audio('audio/mexico_sound.mp3');
    squeak_sound = new Audio('audio/squeak.mp3');
    finalBoss_sound = new Audio('audio/finalBoss_sound.mp3.mp3');
    sound = true;
    gameOverDisplayed = false;

    constructor(canvas, keybord) {
        this.ctx = canvas.getContext('2d');
        this.canvas = canvas;
        this.keybord = keybord;
        this.draw();
        this.setWorld();
        this.run();
    }

    setWorld() {
        this.character.world = this;
    }
    
/**
 * Runs a loop to continuously check for collisions, throwable objects, and character's life status.
 * If the boss's life reaches zero, triggers the transition to the next level after a delay.
 * Additionally, executes the `jumpofChicken()` function at a regular interval.
 */
    run() {
        const self = this;
        setInterval(() => {
            self.checkCollisions();
            self.checkThrowObject();
            self.isCharacterDead();
            if (self.bossLife <= 0) {
                setTimeout(() => {
                    self.nextLevel();
                }, 2000);
            }
        }, 200);
        setInterval(() => {
            this.jumpofChicken();
        }, 1000 / 25);
    }

    /**
    * Checks if the character is dead.
    * If the game over message is not yet displayed and the character's energy is 0 or less,
    * displays the game over message, calls the game over function, and pauses the character's sleep sound.
    */
    isCharacterDead() {
        if (!this.gameOverDisplayed && this.character.energy <= 0) {
            this.gameOverDisplayed = true;
            this.gameOver();
            this.character.sleep_sound.pause();
        }
    }

    /**
    * Displays or hides the game over message based on the character's energy level.
    * If the character's energy is 0 or less, displays the game over message.
    * Otherwise, hides the game over message and resets the game over displayed flag.
    */
    gameOver() {
        let gameOverElement = document.getElementById('gameOver');
        if (this.character.energy <= 0) {
            gameOverElement.style.display = 'block';
        } else {
            gameOverElement.style.display = 'none';
            this.gameOverDisplayed = false;
        }
    }

    /**
    * Displays the next level message.
    */
    nextLevel() {
        let nextLevel = document.getElementById('nextLevel');
        nextLevel.style.display = 'flex';
    }

    /**
     * Plays the coin sound if sound is enabled.
     */
    playCoinSound() {
        if (this.sound === true) {
            this.coin_sound.play();
        }
    }

    /**
    * Removes a throwable object from the game after a delay.
    * 
    * @param {number} index - The index of the throwable object to remove from the array.
    */
    removeThrowableObject(index) {
        setTimeout(() => {
            this.throwableObject.splice(index, 1);
            this.isThrowingBottle = false;
            if (this.sound === true) {
                this.breakBotte_sound.play();
            }
        }, 1250);
    }

    /**
     * Checks if the player can throw an object, and if so, performs necessary actions.
     */
    checkThrowObject() {
        if (this.iCanThrow()) {
            let bottle = this.bottleStatus();
            if (this.checkForCollidingBottleOfBoss(bottle)) {
                this.bossLifeToUpdate(this.bossBar);
            }
            this.removeThrowableObject();
        }
    }

    /**
    * Creates a new bottle object, updates game state, and returns the created bottle.
    * 
    * @returns {ThrowableObject} The newly created bottle object.
    */
    bottleStatus() {
        let bottle = new ThrowableObject(this.character.x + 100, this.character.y + 100);
        this.throwableObject.push(bottle);
        this.bottleValue -= 20;
        this.bottleBar.setPercentage(this.bottleValue);
        this.isThrowingBottle = true;
        return bottle;
    }

    /**
     * Checks if the player can throw a bottle based on game conditions.
     * 
     * @returns {boolean} True if the player can throw a bottle, otherwise false.
     */
    iCanThrow() {
        return this.keybord.D && this.bottleValue > 0 && !this.isThrowingBottle;
    }


    /**
    * Checks if a bottle collides with the end boss.
    * 
    * @param {ThrowableObject} bottle - The bottle to check collision with.
    * @returns {boolean} True if collision between the bottle and end boss is detected, otherwise false.
    */
    checkForCollidingBottleOfBoss(bottle) {
        return this.level.enemies.some(endboss => endboss instanceof Endboss && bottle.isColliding(endboss));
    }

    /**
     * Updates the life of the end boss.
     * 
     * @returns {number} The updated life of the end boss.
     */
    bossLifeToUpdate() {
        this.bossLife -= 20;
        this.bossBar.setPercentage(this.bossLife);

        return this.bossLife;
    }

    /**
    * Handles character receiving a hit.
    * Calls the character's hit method and updates the character's life.
    */
    characterReceivesHit() {
        this.character.hit();
        this.updatesCharacterLife();
    }

    /**
     * Handles jumping of the chicken.
     * Iterates through chicken groups and checks for jumping.
     */
    jumpofChicken() {
        let characterHasJumped = false;
        const chickenGroups = [this.level.enemies, this.level.smallChicken];
        chickenGroups.forEach((chickenGroup) => {
            this.checkChickenGroupForJump(chickenGroup, characterHasJumped);
        });
    }

    /**
    * Checks each chicken in the group for jumping interaction with the character.
    * 
    * @param {Array} chickenGroup - The group of chickens to check.
    * @param {boolean} characterHasJumped - A flag indicating if the character has already jumped on a chicken.
    */
    checkChickenGroupForJump(chickenGroup, characterHasJumped) {
        chickenGroup.forEach((chicken) => {
            if (!characterHasJumped && this.checkCharachrterForCollidingChicken(chicken)) {
                if (this.character.isAboveGround(chicken)) {
                    this.jumpOnChicken(chicken, chickenGroup);
                    characterHasJumped = true;
                } else {
                    this.characterReceivesHit();
                }
            }
        });
    }


    /**
    * Handles the character jumping on a chicken.
    * 
    * @param {Object} chicken - The chicken object on which the character jumps.
    * @param {Array} chickenGroup - The group of chickens from which the chicken is removed after jumping.
    */
    jumpOnChicken(chicken, chickenGroup) {
        this.jumpOnTheChicken(chicken);
        if (this.sound === true) {
            this.squeak_sound.play();
        }
        setTimeout(() => {
            const pos = chickenGroup.indexOf(chicken);
            chickenGroup.splice(pos, 1);
        }, 500);
    }

    /**
    * Checks for collisions between game elements.
    * 
    * This function checks for collisions between the character and the end boss,
    * and performs appropriate actions such as character receiving a hit or dying.
    * It also handles other game interactions such as thrown bottles, coins, and bottle value status.
    */
    checkCollisions() {
        if (this.isTheEndbossCollidingCharacter(this.character)) {
            this.characterReceivesHit();
            this.character.energy -= 20;
            if (this.character.energy <= 0) {
                this.isCharacterDead();
                if (this.sound === true) {
                    this.character.pains_sound.play();
                }
            }
            setTimeout(() => {
                this.sound = false;
            }, 1000);
        };
        this.thrownBottles();
        this.coinStatus();
        this.bottleValueStatus();
    }

    /**
    * Updates the status of the bottle value.
    * 
    * Checks if the bottle value is below 100 and handles character collisions with bottles.
    * If the character collides with a bottle, updates the bottle value and removes the bottle from the level.
    */
    bottleValueStatus() {
        if (this.bottleValue < 100) {
            this.level.bottle.forEach((bottle, index,) => {
                if (this.checkCharachrterForCollidingBottle(bottle)) {
                    this.characterIsCollidingBottle();
                    if (this.bottleValue > 100) {
                        this.bottleValue = 100;
                    }
                    this.bottleBar.setPercentage(this.bottleValue);
                    this.level.bottle.splice(index, 1);
                    this.bossBar.setPercentage(this.bossLife);
                }
            });
        }
    }

    /**
     * Updates the status of the coin value.
     * 
     * Checks if the coin value is below or equal to 100 and handles character collisions with coins.
     * If the character collides with a coin, updates the coin value.
     */
    coinStatus() {
        if (this.coinValue <= 100) {
            this.level.coin.forEach((coin) => {
                if (this.isCharacterCollidingCoin(coin)) {
                    this.characterIsCollidingCoin(coin)
                    if (this.coinValue === 100) {
                        this.coinValue = 100;
                    }
                    this.coinBar.setPercentage(this.coinValue);
                }
            });
        }
    }

    /**
    * Handles the thrown bottles in the game.
    * 
    * Iterates through the throwableObject array and handles collisions with end boss, chickens, and enemies.
    */
    thrownBottles() {
        this.throwableObject.forEach((bottle) => {
            const hitEndboss = this.handleHitEndboss(bottle);
            if (hitEndboss) return;
            const hitChicken = this.handleHitChicken(bottle);
            if (hitChicken) return;
            this.handleHitEnemies(bottle);
        });
    }

    /**
     * Handles the collision of a thrown bottle with the end boss.
     * 
     * @param {ThrowableObject} bottle - The thrown bottle object.
     * @returns {boolean} True if the bottle hits the end boss, otherwise false.
     */
    handleHitEndboss(bottle) {
        const hitEndboss = this.level.endboss.find(boss => !bottle.isBroken && boss instanceof Endboss && boss.isColliding(bottle));
        if (hitEndboss) {
            this.bossLife -= 20;
            if (this.bossLife <= 0) {
                this.bossLife = 0;
            }
            bottle.isBroken = true;
            this.bossBar.setPercentage(this.bossLife);
            if (this.sound === true) {
                this.breakBotte_sound.play();
            }
            setTimeout(() => {
                this.removeBottle();
            }, 300);
        }
        return hitEndboss;
    }

    /**
    * Handles the collision of a thrown bottle with a chicken.
    * 
    * @param {ThrowableObject} bottle - The thrown bottle object.
    * @returns {Object | boolean} The hit chicken object if collision occurs, otherwise false.
    */
    handleHitChicken(bottle) {
        const hitChicken = this.level.smallChicken.find(chicken => bottle.isColliding(chicken));
        if (hitChicken) {
            hitChicken.energy = 0;
            bottle.isBroken = true;
            this.removeBottle();
            if (this.sound === true) {
                this.breakBotte_sound.play();
            }
            setTimeout(() => {
                this.level.smallChicken.splice(this.level.smallChicken.indexOf(hitChicken), 1);
            }, 800);
        }
        return hitChicken;
    }

    /**
     * Handles the collision of a thrown bottle with enemies.
     * 
     * @param {ThrowableObject} bottle - The thrown bottle object.
     */
    handleHitEnemies(bottle) {
        let chickenHit = false;
        this.level.enemies.forEach((enemy, enemyIndex) => {
            if (this.isChickenCollidingBottle(bottle, chickenHit, enemy)) {
                enemy.energy = 0;
                setTimeout(() => {
                    this.level.enemies.splice(enemyIndex, 1);
                }, 500);
                bottle.isBroken = true;
                this.removeBottle();
                chickenHit = true;
                if (this.sound === true) {
                    this.breakBotte_sound.play();
                }
            }
        });
    }

    /**
    * Updates the character's life displayed on the status bar.
    */
    updatesCharacterLife() {
        this.stadusBar.setPercentage(this.character.energy);
    }

    /**
     * Checks if the end boss is colliding with the character.
     * 
     * @param {Object} character - The character object.
     * @returns {boolean} True if the end boss is colliding with the character, otherwise false.
     */
    isTheEndbossCollidingCharacter(character) {
        return this.level.endboss.some(boss => boss.isColliding(character))
    }

    /**
     * Checks if a chicken is colliding with a bottle and if it has not been hit yet.
     * 
     * @param {ThrowableObject} bottle - The thrown bottle object.
     * @param {boolean} chickenHit - Flag indicating if a chicken has already been hit.
     * @param {Object} enemy - The enemy object to check for collision with the bottle.
     * @returns {boolean} True if a chicken is colliding with the bottle and has not been hit yet, otherwise false.
     */
    isChickenCollidingBottle(bottle, chickenHit, enemy) {
        return !chickenHit && enemy instanceof Chicken && enemy.isColliding(bottle);
    }

    /**
     * Checks if the character is colliding with a coin.
     * 
     * @param {Object} coin - The coin object to check for collision with the character.
     * @returns {boolean} True if the character is colliding with the coin, otherwise false.
     */
    isCharacterCollidingCoin(coin) {
        return this.character.isColliding(coin)
    }

    /**
     * Handles the collision of the character with a coin.
     * Plays the coin sound, removes the coin from the level, and updates the coin value.
     * 
     * @param {Object} coin - The coin object with which the character is colliding.
     */
    characterIsCollidingCoin(coin) {
        this.playCoinSound();
        this.level.removeCoin(coin);
        this.coinValue += 20;
    }

    /**
     * Handles the character jumping on a chicken.
     * Plays the jump sound, makes the character jump, and sets the chicken's energy to 0.
     * 
     * @param {Object} enemy - The chicken object on which the character jumps.
     */
    jumpOnTheChicken(enemy) {
        if (this.sound === true) {
            this.character.jump_sound.play();
        }
        this.character.jump();
        enemy.energy = 0;
    }

    /**
    * Checks if the character is colliding with a chicken.
    * 
    * @param {Object} enemy - The chicken object to check for collision with the character.
    * @returns {boolean} True if the character is colliding with the chicken, otherwise false.
    */
    checkCharachrterForCollidingChicken(enemy) {
        return this.character.isColliding(enemy);
    }

    /**
     * Checks if the character is colliding with a bottle.
     * 
     * @param {ThrowableObject} bottle - The bottle object to check for collision with the character.
     * @returns {boolean} True if the character is colliding with the bottle, otherwise false.
     */
    checkCharachrterForCollidingBottle(bottle) {
        return this.character.isColliding(bottle);
    }

    /**
     * Handles the character colliding with a bottle.
     * Plays the bottle sound and updates the bottle value.
     */
    characterIsCollidingBottle() {
        if (this.sound === true) {
            this.bottle_sound.play();
            this.bottleValue += 20;
        } else {
            this.bottle_sound.pause();
            this.bottleValue += 20;
        }
    }

    /**
     * Removes a bottle from the throwableObject array.
     * 
     * @param {number} index - The index of the bottle to remove from the array.
     */
    removeBottle(index) {
        this.throwableObject.splice(index, 1);
    }

    draw() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.ctx.translate(this.camera_x, 0);
        this.addObjectsToMap(this.level.backgroundObjects);

        this.ctx.translate(-this.camera_x, 0);
        this.addToMap(this.stadusBar);
        this.addToMap(this.coinBar);
        this.addToMap(this.bottleBar);
        this.addToMap(this.bossBar);
        this.ctx.translate(this.camera_x, 0);

        this.addToMap(this.character);

        this.addObjectsToMap(this.level.bottle);
        this.addObjectsToMap(this.level.coin);
        this.addObjectsToMap(this.level.clouds);
        this.addObjectsToMap(this.level.enemies);
        this.addObjectsToMap(this.level.endboss);
        this.addObjectsToMap(this.level.smallChicken);
        this.addObjectsToMap(this.throwableObject);
        this.ctx.translate(-this.camera_x, 0);

        let self = this;
        requestAnimationFrame(function () {
            self.draw();
        });
    }

    addObjectsToMap(objects) {
        objects.forEach(o => {
            this.addToMap(o);
        });
    }

    addToMap(mo) {
        if (mo.otherDiretion) {
            this.flipImage(mo);
        }
        mo.draw(this.ctx);
        mo.drawFrame(this.ctx);
        if (mo.otherDiretion) {
            this.flipImageBack(mo);
        }
    }

    flipImage(mo) {
        this.ctx.save();
        this.ctx.translate(mo.height, 0);
        this.ctx.scale(-1, 1);
        mo.x = mo.x * -1;
    }

    flipImageBack(mo) {
        mo.x = mo.x * -1;
        this.ctx.restore();
    }
}