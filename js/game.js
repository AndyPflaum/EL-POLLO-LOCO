let canvas;
let world;
let keybord = new Kayboard();

function init() {
    canvas = document.getElementById('canvas');

}

function start() {
    let startPolloLoco = document.getElementById('startPolloLoco');
    let soundPaused = false;
    startPolloLoco.style.display = 'none';
    closInfo();
    initLevel();
    world = new World(canvas, keybord);

    function updateSound() {
        if (world.character.x <= 1160) {
            if (!soundPaused) {
                world.mexico_sound.play();
                soundPaused = true;
            }
        } else {
            world.mexico_sound.pause();
            soundPaused = true;
        }
        test123()
    }
    setInterval(updateSound, 100);
}

function reStart() {
    let restartPolloLoco = document.getElementById('gameOver');
    restartPolloLoco.style.display = 'none';
    startAnew();
}

function startAnew() {
    location.reload();
}

function closInfo() {
    let infoNote = document.getElementById('infoNote');
    infoNote.style.display = 'none';
}

function infoNote() {
    let infoNote = document.getElementById('infoNote');
    if (infoNote.style.display === 'flex') {
        infoNote.style.display = 'none'; // Ausblenden
    } else {
        infoNote.style.display = 'flex'; // Einblenden
    }
}


function test123() {
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
};

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
})