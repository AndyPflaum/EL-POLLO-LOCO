let canvas;
let world;
let keybord = new Kayboard();
let character;
let endboss;
let isVolumeOn;

/**
 * Initializes the canvas element.
 */
function init() {
    canvas = document.getElementById('canvas');
    
}

/**
 * Starts the game.
 * Hides the start button and initializes the game world and level.
 */
function start() {
    let startPolloLoco = document.getElementById('startPolloLoco');
    startPolloLoco.style.display = 'none';
    closInfo();
    initLevel();
    mobilRun();
    lautSound();
    world = new World(canvas, keybord);  
}

/**
 * Restarts the game after game over.
 * Hides the game over message, resets the game world and level, and starts the game again.
 */
function reStart() {
    let restartPolloLoco = document.getElementById('gameOver');
    restartPolloLoco.style.display = 'none';
    WorldTwo= null;
    clearAllIntervals();
    start();
}
function lautSound(){
    let volume = document.getElementById('volume');
    volume.src = 'img/lautsprecher.png';
    isVolumeOn = false;
}

function clearAllIntervals() {
    for (let i = 1; i < 9999; i++) window.clearInterval(i);
  }


/**
 * Reloads the page to start the game anew.
 */
function startAnew() {
    let nextLevel = document.getElementById('nextLevel');
        nextLevel.style.display = 'none';
        reStart();
        
}

/**
 * Closes the info note displayed.
 */
function closInfo() {
    let infoNote = document.getElementById('infoNote');
    infoNote.style.display = 'none';
}

/**
 * Toggles the display of the info note.
 * If the note is currently displayed, hides it; otherwise, displays it.
 */
function infoNote() {
    let infoNote = document.getElementById('infoNote');
    if (infoNote.style.display === 'flex') {
        infoNote.style.display = 'none';
    } else {
        infoNote.style.display = 'flex';
    }
}

/**
 * Sets up event listeners for touch events on mobile devices to control the character's movement and actions.
 */
function mobilRun() {
    document.getElementById("left").addEventListener("touchstart", () => {
        keybord.LEFT = true;
    });

    document.getElementById("left").addEventListener("touchend", () => {
        keybord.LEFT = false;
    });

    document.getElementById("right").addEventListener("touchstart", () => {
        keybord.RIGHT = true;
    });

    document.getElementById("right").addEventListener("touchend", () => {
        keybord.RIGHT = false;
    });

    document.getElementById("jump").addEventListener("touchstart", () => {
        keybord.SPACE = true;
    });

    document.getElementById("jump").addEventListener("touchend", () => {
        keybord.SPACE = false;
    });

    document.getElementById("throw").addEventListener("touchstart", () => {
        keybord.D = true;
    });

    document.getElementById("throw").addEventListener("touchend", () => {
        keybord.D = false;
    });

    document.addEventListener("DOMContentLoaded", start);
}


/**
 * Listens for keydown events and sets corresponding keyboard input flags.
 */
window.addEventListener("keydown", (e) => {
    if (e.keyCode == 39) {
        keybord.RIGHT = true;
    }
    if (e.keyCode == 37) {
        keybord.LEFT = true;
    }
    if (e.keyCode == 38) {
        keybord.UP = true;
    }
    if (e.keyCode == 40) {
        keybord.DOWN = true;
    }
    if (e.keyCode == 32) {
        keybord.SPACE = true;
    }
    if (e.keyCode == 68) {
        keybord.D = true;
    }
});

/**
 * Listens for keyup events and resets corresponding keyboard input flags.
 * 
 * @param {Event} e - The keyup event object.
 */
window.addEventListener("keyup", (e) => {
    if (e.keyCode == 39) {
        keybord.RIGHT = false;
    }
    if (e.keyCode == 37) {
        keybord.LEFT = false;
    }
    if (e.keyCode == 38) {
        keybord.UP = false;
    }
    if (e.keyCode == 40) {
        keybord.DOWN = false;
    }
    if (e.keyCode == 32) {
        keybord.SPACE = false;
    }
    if (e.keyCode == 68) {
        keybord.D = false;
    }
});

/**
 * Toggles the game volume on and off.
 * Changes the volume icon and toggles the sound property of the game world and character.
 */
function volume() {
    let volume = document.getElementById('volume');
    if (isVolumeOn) {
        volume.src = 'img/lautsprecher.png';
        world.sound = true;
    } else {
        volume.src = 'img/stumm.png';
        world.sound = false;
    }
    isVolumeOn = !isVolumeOn;
}

/**
 * Checks the device orientation and adjusts the game display accordingly.
 * Displays or hides elements based on whether the device is in portrait or landscape mode.
 */
function checkOrientation() {
    let startButton = document.getElementById('startButton');
    if (window.innerHeight > window.innerWidth) {
        handy.style.display = 'block';
        mobileKeysNone.style.display = 'none';
        startButton.style.display = 'none';
    } else {
        let handy = document.getElementById('handy');
        let mobileKeysNone = document.getElementById('mobileKeysNone');
        handy.style.display = 'none';
        startButton.style.display = 'block';
        if (window.innerWidth >= 945) {
            mobileKeysNone.style.display = 'none';
        } else {
            mobileKeysNone.style.display = 'block';
        }
    }
}

// Event listener for the resize event to respond to changes in screen size
window.addEventListener("resize", checkOrientation);

// Event listener for the DOMContentLoaded event to check screen orientation when the page is loaded
document.addEventListener("DOMContentLoaded", function () {
    checkOrientation(); // Check screen orientation when the page is loaded
});
