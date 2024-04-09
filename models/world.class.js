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
        setInterval(() => {
            this.checkCollisions();
            this.checkThrowObject();
        }, 200);
    }

    attackCharacter() {
        if (this.character.x > 1200) {
            this.bottleValue = 100;
        }
    }

    playCoinSound() {
        this.coin_sound.play();
    }

    checkThrowObject() {
        if (this.keybord.D && this.bottleValue > 0) {
            let bottle = new ThrowableObject(this.character.x + 100, this.character.y + 100);
            this.throwableObject.push(bottle);
            this.bottleValue -= 20; // Reduziere die Anzahl der verfügbaren Flaschen um 1
            this.bottleBar.setPercentage(this.bottleValue); // Aktualisiere die Flaschenanzeige

            // Überprüfe, ob eine geworfene Flasche den Boss trifft
            if (this.checkForCollidingBottleOfBoss(bottle)) {
                this.bossLifeToUpdate(bossBar);
            }
        }
    }
    checkForCollidingBottleOfBoss(bottle) {
        return this.level.enemies.some(boss => boss instanceof Endboss && bottle.isColliding(boss));
    }

    bossLifeToUpdate() {
        this.bossLife -= 20;
        this.bossBar.setPercentage(this.bossLife);
        return this.bossLife; // Rückgabe des aktualisierten Boss-Lebens
    }

    checkCollisions() {
        this.level.enemies.forEach((enemy) => {
            if (this.checkCharachrterForCollidingChicken(enemy)) {
                this.character.hit();
                this.stadusBar.setPercentage(this.character.energy);
            }
            if (this.coinValue < 0) {
                this.coinValue = 0;
            }
        });
        this.throwableObject.forEach((bottle, bottleIndex) => {
            if (this.level.enemies.some(boss => boss instanceof Endboss && boss.isColliding(bottle))) {
                // Die Flasche trifft den Boss
                this.bossLife -= 20; // Der Boss verliert 20 Lebenspunkte
                this.throwableObject.splice(bottleIndex, 1); // Die Flasche wird aus dem Spiel entfernt
                this.bossBar.setPercentage(this.bossLife); // Die Anzeige des Boss-Lebens wird aktualisiert
            }
        });
        if (this.coinValue < 100) {
            this.level.coin.forEach((coin) => {
                if (this.character.isColliding(coin)) {
                    this.playCoinSound();
                    this.level.removeCoin(coin);
                    this.coinValue += 20;
                    if (this.coinValue > 100) {
                        this.coinValue = 100;
                    }
                    this.coinBar.setPercentage(this.coinValue); // Aktualisiere die Münzanzeige
                }
            });
        }
        if (this.bottleValue < 100) {
            this.level.bottle.forEach((bottle, index,) => {
                if (this.checkCharachrterForCollidingBottle(bottle)) {
                    this.bottle_sound.play();
                    this.bottleValue += 20;
                    if (this.bottleValue > 100) {
                        this.bottleValue = 100;
                    }

                    this.bottleBar.setPercentage(this.bottleValue); // Aktualisiere die Flaschenanzeige
                    this.level.bottle.splice(index, 1); // Entferne die Flasche aus dem Array
                    this.bossBar.setPercentage(this.bossLife);
                }
            });
        };
    }
    checkCharachrterForCollidingChicken(enemy) {
        return this.character.isColliding(enemy);
    }
    checkCharachrterForCollidingBottle(bottle) {
        return this.character.isColliding(bottle);
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