let canvas;
let world;
let keybord = new Kayboard();
// let mexico_sound = new Audio('audio/mexico_sound.mp3');


function init() {
    canvas = document.getElementById('canvas');
    world = new World(canvas, keybord);
    // mexico_sound.play();
    // mexico_sound.volume = 0.2;
    
}

window.addEventListener("keydown", (e) =>{
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
window.addEventListener("keyup", (e) =>{
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