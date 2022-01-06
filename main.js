// DEFAULT
let PLAYER = 0;

// SELECTOR
signx = document.getElementById("signx");
signo = document.getElementById("signo");

// EVENT
signx.addEventListener("click", gameStart);
signo.addEventListener("click", gameStart);


// FUNCTION
function gameStart(e) {
    PLAYER = new createPlayer(e.target.value);
    console.log(PLAYER);
    
}

// OBJECTS
function createPlayer(marker){
    this.marker = marker;
}





// SELECT MARER
// PLAY ROUND OF GAME
// - CHOOSE 1 CELL
// - AI CHOOSE 1 CELL
// - CHECK 3 IN-A-ROW
// - REPEAT  