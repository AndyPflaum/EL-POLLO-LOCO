class WorldTwo{
    gameOverDisplayed = false;
    
    constructor(){
        this.play();
    }
    play(){
        setInterval(() => {
            this.gameOver();
            
        }, 1000);
    }

    /**
    * Checks if the character is dead.
    */
    isCharacterDead() {
        if (!this.gameOverDisplayed && world.character.energy <= 0) {
            this.gameOverDisplayed = true;
            this.gameOver();
            world.character.sleep_sound.pause();
        }
    }

     /**
    * Displays or hides the game over message based on the character's energy level.
    * If the character's energy is 0 or less, displays the game over message.
    * Otherwise, hides the game over message and resets the game over displayed flag.
    */
     gameOver() {
        let gameOverElement = document.getElementById('gameOver');
        if (world.character.energy <= 0) {
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
     * Updates the status of the coin value.
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
    * Updates the status of the bottle value.
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
    * Creates a new bottle object, updates game state, and returns the created bottle.
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
    * Removes a throwable object from the game after a delay.
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

}