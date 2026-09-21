console.log("Loaded!")

// RÃ©fÃ©rences HTML
let cases = document.querySelectorAll(".case");
let replayBtn = document.querySelector("#replay");
let panneauMessage = document.querySelector("#message");
let panneauMessageGagnant = document.querySelector("#message img");
let nSound = new Audio("./aud/n.wav");
let sSound = new Audio("./aud/s.wav");
let blockSound = new Audio("./aud/no.wav");

// Variables de lâ€™app
let joueurX = true; //premier joueur X
let gagnant = ''; //pas encore de gagnant
const patrons = [ //les patrons gagnants
    [0, 1, 2],
    [0, 3, 6],
    [0, 4, 8],
    [1, 4, 7],
    [2, 5, 8],
    [2, 4, 6],
    [3, 4, 5],
    [6, 7, 8]
];

// function getImageURL(bg) {
//     return bg.slice(-7, -2);
// }

document.body.classList.add("player-n")
document.getElementsByClassName("left_player")[0].classList.add("player-n")
// Fonctions

for (let boite of cases) {
    boite.active = true;
    blockSound.play()
    boite.addEventListener("click", function () {
        
        // math for sprites
        var nimg = ["./n_img/1n.svg", "./n_img/2n.svg"]
        var randomImgN = nimg [Math.floor(Math.random() * nimg.length)];
        console.log(randomImgN)

        var simg = ["./s_img/1s.svg", "./s_img/2s.svg"]
        var randomImgS = simg [Math.floor(Math.random() * simg.length)];
        
        if (boite.active) {
            if (joueurX) { //tour du joueur X
                //boite.innerText = "X";
                boite.style.backgroundImage = `url('${randomImgN}')`;
                nSound.play();
                joueurX = false;
            }
            else { //tour du jour O
                //boite.innerText = "O";
                boite.style.backgroundImage = `url('${randomImgS}')`;
                sSound.play();
                joueurX = true;
            }
            boite.active = false;
            document.body.classList.toggle("player-n")[0];
            document.body.classList.toggle("player-s")[0];
            valide();
        }
     });
}

// Valide lâ€™Ã©tat du jeu: gagnant ou nulle
const valide = function () {
    if ([...cases].every((boite)  => boite.active === false)) { //toutes les cases sont inactives
        showWinnerText("Partie nul");
    }
    else { //sinon valide gagnant
        for (let patron of patrons) { //boucle des patrons gagnants
            let val1 = cases[patron[0]].style.backgroundImage.slice(5,10); //les valeurs des positions du patron
            let val2 = cases[patron[1]].style.backgroundImage.slice(5,10);
            let val3 = cases[patron[2]].style.backgroundImage.slice(5,10);
            // const val1 = getImageURL(cases[0].style.backgroundImage);
            // const val2 = getImageURL(cases[1].style.backgroundImage);
            // const val3 = getImageURL(cases[2].style.backgroundImage);

            if (val1 &&
                val1 === val2 &&
                val1 === val3) {  //nous avons on gagnant
                // victoire = true;

                // let winner = "";
                // if (val1.includes("n.svg")) {
                //     winner = "x"
                //     afficheMessage("Le gagnant est Nintendo!")
                // }
                // else {
                //     winner = "o"
                //     afficheMessage("Le gagnant est SEGA!")
                // }

                //afficheMessage(`Le gagnant est ${val1}`);
                showWinnerText(`Le gagnant est ${val1}!`);
                    // afficheMessage(`Le gagnant est ${val1}!`);
                    for (let boite of cases) {
                        boite.active = false;
                }
            }
        }
    }
};

//Affiche message
const afficheMessage = function (msg) {
        panneauMessage.innerText = msg;
};

// changing text color on player turn
document.getElementById("grille").onclick=function(){
    const pTurn = document.getElementById("players");
    const nPlayer = document.getElementsByClassName("left_player")[0];
    const sPlayer = document.getElementsByClassName("right_player")[0];
    nPlayer.classList.toggle("player-n");
    sPlayer.classList.toggle("player-s");
    
}

// console.log(tColor.style.color)

//Vide les cases
const videCases = function () {
    for (let boite of cases) {
        boite.innerText = '';
        boite.style.backgroundImage = "";
    }
};


//Jouer encore
const nPlayer = document.getElementsByClassName("left_player")[0];
const sPlayer = document.getElementsByClassName("right_player")[0];
replayBtn.addEventListener("click", function() {
    videCases();
    afficheMessage("");
    joueurX = true;
    for (let boite of cases) {
        boite.active = true;
    }
    
    // resets players
    document.body.classList.remove("player-s")
    document.body.classList.add("player-n")
    nPlayer.classList.add("player-n")
    sPlayer.classList.remove("player-s")

    hideWinner();
});


const winner = document.getElementById("winner");
const winnerMessage = document.getElementById("message");

function showWinnerText(text) {
    winnerMessage.textContent = text;
    winner.classList.remove("hidden")
}

function hideWinner() {
    winner.classList.add("hidden")
}
