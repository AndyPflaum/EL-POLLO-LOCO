let level1
function initLevel() {

    level1 = new Level(

        [
            new Chicken(),
            new Chicken(),
            new Chicken(),
            new Chicken()
        ],
        [
            new Cloud(),
            new Cloud(),
            new Cloud(),
            new Cloud(),
            new Cloud(),
            new Cloud(),
            new Cloud(),
            new Cloud()
        ],
        [
            new BackgroundObject('img/5_background/layers/air.png', -719 * 2),
            new BackgroundObject('img/5_background/layers/3_third_layer/1.png', -719 * 2),
            new BackgroundObject('img/5_background/layers/2_second_layer/1.png', -719 * 2),
            new BackgroundObject('img/5_background/layers/1_first_layer/1.png', -719 * 2),
            new BackgroundObject('img/5_background/layers/air.png', -719),
            new BackgroundObject('img/5_background/layers/3_third_layer/2.png', -719),
            new BackgroundObject('img/5_background/layers/2_second_layer/2.png', -719),
            new BackgroundObject('img/5_background/layers/1_first_layer/2.png', -719),
            new BackgroundObject('img/5_background/layers/air.png', 0),
            new BackgroundObject('img/5_background/layers/3_third_layer/1.png', 0),
            new BackgroundObject('img/5_background/layers/2_second_layer/1.png', 0),
            new BackgroundObject('img/5_background/layers/1_first_layer/1.png', 0),
            new BackgroundObject('img/5_background/layers/air.png', 719),
            new BackgroundObject('img/5_background/layers/3_third_layer/2.png', 719),
            new BackgroundObject('img/5_background/layers/2_second_layer/2.png', 719),
            new BackgroundObject('img/5_background/layers/1_first_layer/2.png', 719),
            new BackgroundObject('img/5_background/layers/air.png', 719 * 2),
            new BackgroundObject('img/5_background/layers/3_third_layer/1.png', 719 * 2),
            new BackgroundObject('img/5_background/layers/2_second_layer/1.png', 719 * 2),
            new BackgroundObject('img/5_background/layers/1_first_layer/1.png', 719 * 2)
        ],
        [
            new Coin(),
            new Coin(),
            new Coin(),
            new Coin(),
            new Coin()
        ],
        [
            new Bottle('img/6_salsa_bottle/1_salsa_bottle_on_ground.png'),
            new Bottle('img/6_salsa_bottle/2_salsa_bottle_on_ground.png'),
            new Bottle('img/6_salsa_bottle/1_salsa_bottle_on_ground.png'),
            new Bottle('img/6_salsa_bottle/2_salsa_bottle_on_ground.png'),
            new Bottle('img/6_salsa_bottle/1_salsa_bottle_on_ground.png'),
            new Bottle('img/6_salsa_bottle/2_salsa_bottle_on_ground.png'),
            new Bottle('img/6_salsa_bottle/1_salsa_bottle_on_ground.png'),
            new Bottle('img/6_salsa_bottle/2_salsa_bottle_on_ground.png'),
            new Bottle('img/6_salsa_bottle/1_salsa_bottle_on_ground.png'),
            new Bottle('img/6_salsa_bottle/1_salsa_bottle_on_ground.png'),
            new Bottle('img/6_salsa_bottle/2_salsa_bottle_on_ground.png')
        ],
        [
            new Endboss()
        ], 
        [
            new SmallChicken(),
            new SmallChicken(),
            new SmallChicken(),
            new SmallChicken()
        ]
    );
}