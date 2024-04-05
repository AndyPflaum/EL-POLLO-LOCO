class Level {
    enemies;
    clouds;
    backgroundObjects;
    coin;
    level_end_x = 1530;

    /**
     * 
     * @param {Chicken | Endboss} enemies 
     * @param {Clouds} clouds 
     * @param {BackgroundObjects} backgroundObjects 
     * @param {Coins} coin
     */
    constructor(enemies, clouds, backgroundObjects, coin, bottle) {
        this.enemies = enemies;
        this.clouds = clouds;
        this.backgroundObjects = backgroundObjects;
        this.coin = coin;
        this.bottle = bottle;

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