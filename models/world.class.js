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
    bottleBar = new BottleBar();
    coinValue = 0;
    bottle = new Bottle();
    bottleValue = 0;
    bottle_sound = new Audio('audio/bottle_sound.mp3');
    bossBar = new BossBar();
    bossLife = 100;
    breakBotte_sound = new Audio('audio/breakBottle.mp3');
    mexico_sound = new Audio('audio/mexico_sound.mp3');

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

    run() {
        const self = this;

        setInterval(() => {
            self.checkCollisions();
            self.checkThrowObject();
            if (self.character.energy <= 0 || self.level.endboss.x >= -1440) {
                self.gameOver();
            }
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

    gameOver() {
        let gameOverElement = document.getElementById('gameOver');
        gameOverElement.style.display = 'flex';
    }
    nextLevel() {
        let nextLevel = document.getElementById('nextLevel');
        nextLevel.style.display = 'flex';
    }

    playCoinSound() {
        this.coin_sound.play();
    }

    removeThrowableObject(index) {
        setTimeout(() => {
            this.throwableObject.splice(index, 1);
            this.isThrowingBottle = false;
            this.breakBotte_sound.play();
        }, 1250);
    }

    checkThrowObject() {
        if (this.iCanThrow()) {
            let bottle = this.bottleStatus();
            if (this.checkForCollidingBottleOfBoss(bottle)) {
                this.bossLifeToUpdate(this.bossBar);
            }
            this.removeThrowableObject();
        }
    }
    bottleStatus() {
        let bottle = new ThrowableObject(this.character.x + 100, this.character.y + 100);
        this.throwableObject.push(bottle);
        this.bottleValue -= 20;
        this.bottleBar.setPercentage(this.bottleValue);
        this.isThrowingBottle = true;
        return bottle;
    }

    iCanThrow() {
        return this.keybord.D && this.bottleValue > 0 && !this.isThrowingBottle
    }

    checkForCollidingBottleOfBoss(bottle) {
        return this.level.enemies.some(endboss => endboss instanceof Endboss && bottle.isColliding(endboss));
    }

    bossLifeToUpdate() {
        this.bossLife -= 20;
        this.bossBar.setPercentage(this.bossLife);

        return this.bossLife;
    }
    characterReceivesHit() {
        this.character.hit();
        this.updatesCharacterLife();
    }

    jumpofChicken(){
        let characterHasJumped = false; 

        const chickenGroups = [this.level.enemies, this.level.smallChicken];
        chickenGroups.forEach((chickenGroup) => {
            chickenGroup.forEach((chicken) => {
                if (!characterHasJumped && this.checkCharachrterForCollidingChicken(chicken)) {
                    if (this.character.isAboveGround(chicken)) {
                        this.jumpOnTheChicken(chicken);
                        setTimeout(() => {
                            const pos = chickenGroup.indexOf(chicken); 
                            chickenGroup.splice(pos, 1);
                        }, 500);
                        characterHasJumped = true; 
                    } else {
                        this.characterReceivesHit(); 
                    }
                }
            });
        });
    }
    checkCollisions() {
        if (this.isTheEndbossCollidingCharacter(this.character)) {
            this.characterReceivesHit();
        };
        
        this.throwableObject.forEach((bottle) => {
            const hitEndboss = this.handleHitEndboss(bottle);
            if (hitEndboss) return;
        
            const hitChicken = this.handleHitChicken(bottle);
            if (hitChicken) return;
        
            this.handleHitEnemies(bottle);
        });

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
        };

    }
    handleHitEndboss(bottle) {
        const hitEndboss = this.level.endboss.find(boss => !bottle.isBroken && boss instanceof Endboss && boss.isColliding(bottle));
        if (hitEndboss) {
            this.bossLife -= 20;
            if (this.bossLife <= 0) {
                this.bossLife = 0;
            }
            bottle.isBroken = true;
            this.breakBotte_sound.play();
            this.bossBar.setPercentage(this.bossLife);
            setTimeout(() => {
                this.removeBottle();
            }, 300);
        }
        return hitEndboss;
    }
    
    handleHitChicken(bottle) {
        const hitChicken = this.level.smallChicken.find(chicken => bottle.isColliding(chicken));
        if (hitChicken) {
            hitChicken.energy = 0;
            bottle.isBroken = true;
            this.removeBottle();
            this.breakBotte_sound.play();
            setTimeout(() => {
                this.level.smallChicken.splice(this.level.smallChicken.indexOf(hitChicken), 1);
            }, 800);
        }
        return hitChicken;
    }
    
    handleHitEnemies(bottle) {
        let chickenHit = false;
        this.level.enemies.forEach((enemy, enemyIndex) => {
            if (this.isChickenCollidingBottle(bottle, chickenHit, enemy)) {
                enemy.energy = 0;
                setTimeout(() => {
                    this.level.enemies.splice(enemyIndex, 1);
                }, 500);
                bottle.isBroken = true;
                this.breakBotte_sound.play();
                this.removeBottle();
                chickenHit = true;
            }
        });
    }
    updatesCharacterLife() {
        this.stadusBar.setPercentage(this.character.energy);
    }

    isTheEndbossCollidingCharacter(character) {
        return this.level.endboss.some(boss => boss.isColliding(character))
    }

    characterJumpsOnTheChicken(enemy) {
        return this.character.y + 270 <= enemy.y && this.character.x <= enemy.x;
    }   

    isChickenCollidingBottle(bottle, chickenHit, enemy) {
        return !chickenHit && enemy instanceof Chicken && enemy.isColliding(bottle);
    }

    isCharacterCollidingCoin(coin) {
        return this.character.isColliding(coin)
    }

    characterIsCollidingCoin(coin) {
        this.playCoinSound();
        this.level.removeCoin(coin);
        this.coinValue += 20;
    }

    jumpOnTheChicken(enemy) {
        this.character.jump();
        this.character.jump_sound.play();
        enemy.energy = 0;
    }

    checkCharachrterForCollidingChicken(enemy) {
        return this.character.isColliding(enemy);
    }
    checkCharachrterForCollidingBottle(bottle) {
        return this.character.isColliding(bottle);
    }
    characterIsCollidingBottle() {
        this.bottle_sound.play();
        this.bottleValue += 20;
    }

    removeBottle(index) {
        this.throwableObject.splice(index, 1);
    }

    draw() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.ctx.translate(this.camera_x, 0);
        this.addObjectsToMap(this.level.backgroundObjects);

        this.ctx.translate(-this.camera_x, 0);
        //------Space for fixed opjects----------
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

        // Draw() wird immer wieder aufgerufen!
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