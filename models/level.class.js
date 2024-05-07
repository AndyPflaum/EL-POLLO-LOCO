class Level {
    enemies;
    clouds;
    backgroundObjects;
    coin;
    bottle;
    endboss;
    level_end_x = 1530;

    /**
    * Constructs a new Level object with the specified arrays of enemies, clouds, background objects, coins, bottles, endbosses, and small chickens.
    * 
    * @param {Enemy} enemies - An array of enemy objects.
    * @param {Cloud} clouds - An array of cloud objects.
    * @param {BackgroundObject} backgroundObjects - An array of background object elements.
    * @param {Coin} coin - An array of coin objects.
    * @param {Bottle} bottle - An array of bottle objects.
    * @param {Endboss} endboss - An array of endboss objects.
    * @param {SmallChicken} smallChicken - An array of small chicken objects.
    */
    constructor(enemies, clouds, backgroundObjects, coin, bottle, endboss, smallChicken) {
        this.enemies = enemies;
        this.clouds = clouds;
        this.backgroundObjects = backgroundObjects;
        this.coin = coin;
        this.bottle = bottle;
        this.endboss = endboss;
        this.smallChicken = smallChicken;

    }

    /**
    * Entfernt eine Münze aus dem Level
    * @param {Coin} coin Die Münze, die entfernt werden soll
    */
    removeCoin(coin) {
        const index = this.coin.indexOf(coin);
        if (index !== -1) {
            this.coin.splice(index, 1);
        }
    }
}