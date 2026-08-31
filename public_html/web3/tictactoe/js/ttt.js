// console.log("loaded!")

// // references
 let boxes = document.querySelectorAll(".box");
let replayBtn = document.querySelector("#replay");
 let panneauMessage = document.querySelector("#message");

// // variables
let PlayerOne = true; //first player is X
let winner = ''; //no winner yet
const conditions = [ //these are the winning numbers
    [0, 1, 2],
    [0, 3, 6],
    [0, 4, 8],
    [1, 4, 7],
    [2, 5, 8],
    [2, 4, 6],
    [3, 4, 5],
    [6, 7, 8]
];

// // clicking boxes
for (let square of boxes) {
    square.active = true;
    square.addEventListener("click", function () {
       
        // this randomly chooses a sprite
        let sprite = Math.floor(Math.random() * 2);
        let spriteMeasure = "-" + sprite + "00%"
        console.log(spriteMeasure)
        if (square.active) {
            if (PlayerOne) { //tour du joueur X
                square.style.backgroundImage = "url('./img/n_sprite.svg')";
                square.style.backgroundPosition = spriteMeasure;
                PlayerOne = false;
            }
            else { //tour du jour O
                square.style.backgroundImage = "url('./img/s_sprite.svg')";
                square.style.backgroundPosition = spriteMeasure;
                PlayerOne = true;
            }
            square.style.backgroundSize = "cover"
            document.body.classList.toggle("player-0");
            document.body.classList.toggle("player-1");
            square.active = false;
            valid();
        }
     });
}

// valid: who wins or loses
const valid = function () {
    if ([...boxes].every((square) => square.active === false)) {
        //no boxes available
        afficheMessage("partie nulle");
    }
    else { //if there are no boxes but someone won
        for (let condition of conditions) { //winning patterns
            let val1 = boxes[condition[0]].style.backgroundImage.slice(5, 17);;
            let val2 = boxes[condition[1]].innerText;
            let val3 = boxes[condition[2]].innerText;
            // the values of the winning patterns
            if (val1 &&
                val1 === val2 &&
                val1 === val3) { //
                afficheMessage(`Le gagnant est ${val1}`);
                for (let square of boxes) {
                    square.active = false;
                }
            }
        }
    }
};

// erase the boxes
const eraseBoxes = function () {
    for (let square of boxes) {
        square.innerText = '';
    }
};

// affiche message
const afficheMessage = function (msg) {
    panneauMessage.innerText = msg;
};
