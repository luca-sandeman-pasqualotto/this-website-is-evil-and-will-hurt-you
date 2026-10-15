/* THE ACTUAL THING THE GAME IS ON */
// this is the canvas for the game
const canvas = document.createElement("canvas");
const ctx = canvas.getContext("2d");
canvas.width = document.documentElement.clientWidth;
canvas.height = document.documentElement.clientHeight;
document.querySelector("#gameBox").appendChild(canvas);

/* SPRITES */
// Image d'arrière-plan
let bgImage = new Image();
bgImage.src = "images/background.png";

// Estampe gagnant
let winImage = new Image();
winImage.src = "images/win.png";

// Image du joueur
let playerImage = new Image();
playerImage.src = "images/player.png";

// Image des goodies
let goodyImage = new Image();
goodyImage.src = "images/goody.png";

// Image des bullets
let bulletImage = new Image();
bulletImage.src = "images/goody.png";


/* GLOBAL OBJECTS */
const player = {
    speed : 10, // speed in pixels per tick
    width : 32,
    height : 32
};


/* VARIABLES */
let goodies = []; // variable that contains the goodies in an array
let bullets = []; // variable for bullets

// variables of speed
let vY = 0;
let vX = 0;

let facingX = 0;
let facingY = -1;

let canShoot = true;

/* CONTROLS */
//  manage the mobile commands
addEventListener("touchstart", function (e) {
    if (e.target.id == "uArrow") { // up
        vX = 0;
        vY = -player.speed;
        facingX = 0;
        facingY = -1;
    }
    else if (e.target.id == "dArrow") { // down
        vX = 0;
        vY = player.speed;
        facingX = 0;
        facingY = 1;
    }
    else if (e.target.id == "lArrow") { // left
        vX = -player.speed;
        vY = 0;
        facingX = -1;
        facingY = 0
    }
    else if (e.target.id == "rArrow") { // right
        vX = player.speed;
        vY = 0;
        facingX = 1;
        facingY = 0;
    }
    else { // STOP if you touch another key
        vX = 0;
        vY = 0;
        
    }
}, false);

// manage the keyboard commands
addEventListener("keydown", function (e) {
    if (e.key == "ArrowUp") { // up arrowkey
        vX = 0;
        vY = -player.speed;
        facingX = 0;
        facingY = -1;
    }
    if (e.key == "ArrowDown") { // down arrowkey
        vX = 0;
        vY = player.speed;
        facingX = 0;
        facingY = 1;
    }
    if (e.key == "ArrowLeft") { // left arrowkey
        vX = -player.speed;
        vY = 0;
        facingX = -1;
        facingY = 0;
    }
    if (e.key == "ArrowRight") { // right arrowkey
        vX = player.speed;
        vY = 0;
        facingX = 1;
        facingY = 0;
    }
    if (e.key == " ") { // SHOOT space bar
        shoot();
        vX = 0;
        vY = 0;
    }
}, false);

/* INITIAL STATE : INIT */
const init = function () {
    // put the player in the middle
    player.x = (canvas.width - player.width) / 2;
    player.y = (canvas.height - player.height) / 2;
    
    // put 3 goodies into the array
    goodies = [
        {width: 32, height: 32}, // one goody
        {width: 32, height: 32}, // two goodies
        {width: 32, height: 32}, // three goodies
    ];

    
    // put the goodies in random places
    for (let i in goodies) {
        goodies[i].x = (Math.random() * (canvas.width - goodies[i].width));
        goodies[i].y = (Math.random() * (canvas.height - goodies[i].height));
    }
    main(); // starts the loop
};

/* MAIN LOOP : MAIN */
const main = function () {
    if (checkWin()) {
        render("win");
    }
    else {
        // place the player
        if (player.x > 0 && player.x < canvas.width - player.width) {
            player.x += vX;
        }
        else {
            player.x -= vX;
            // vX = -vX; //bounce
            vX = vY // makes it not bounce
            canvas.height - player.height - 1  
        }
        if (player.y > 0 && player.y < canvas.height - player.height) {
            player.y += vY
        }
        else {
            player.y -= vY;
            // vY = -vY; //bounce
            vY = vX // makes it not bounce
            canvas.width - player.width - 1 
            
        }
        
        // moves goodies
        if (Math.random() > 0.99){
            spawnGoodies();
        }
        
        // Verifies collisions
        for (let i in goodies) {
            if (checkCollision(player,goodies[i])) {
                goodies.splice(i,1);
            }
            /* BULLETS */
            // this needs to be in the main loop since bullets can collide and kill goodies
            for (var c in bullets) {
                bullets[c].y =bullets[c].y -2;
                bullets[c].x =bullets[c].x -2;
                if (checkCollision(goodies[i], bullets[c])) {
                    goodies.splice(i, 1);
                    bullets.splice(c, 1);
                }
            }
        }


        render()
        window.requestAnimationFrame(main)
    }
};

/* DISPLAY : RENDER */
const render = function (s) {
    //Nettoyer l’écran/canvas sur chaque tic
    ctx.clearRect(0,0,canvas.width, canvas.height);
    
    if (s == "win") {  // statut: on a gagné, afficher le cadre gagnant
        ctx.fillStyle = "rgb(200,230,200)";  //vert pale
        ctx.fillRect(0,0,canvas.width, canvas.height);
        
        if (winImage.complete) {
            ctx.drawImage(winImage, (canvas.width - winImage.width)/2,
            (canvas.height - winImage.height)/2);
        }
    }
    else {  // sinon, afficher le jeu
        if (bgImage.complete) {
            ctx.fillStyle = ctx.createPattern(bgImage, 'repeat');
            ctx.fillRect(0,0,canvas.width,canvas.height);
        }
        if (playerImage.complete) {
            ctx.drawImage(playerImage, player.x, player.y);
        }
        if (goodyImage.complete) {
            for (let i in goodies) {
                ctx.drawImage(goodyImage, goodies[i].x, goodies[i].y);
            }
        }
        //Label
        ctx.fillStyle = "rgb(250, 250, 250)";
        ctx.font = "14px monospace"; //peut être une fonte CSS
        ctx.fillText("Goodies restants : "+goodies.length, 32, 32);

        for (var c in bullets) {
            ctx.drawImage(bulletImage, bullets[c].x, bullets[c].y)
        }
    }
};

// spawns goodies after random period
var spawnGoodies = function () {
    goodies.push({
        width: 32,
        height: 32,
        x: (Math.random() * (canvas.width - 32)),
        y: (Math.random() * (canvas.height - 32))
    });
};


/* OTHER FUNCTIONS */
//  Verifies collisions
const checkCollision = function (obj1,obj2) {
    return (obj1.x < (obj2.x + obj2.width) &&
    (obj1.x + obj1.width) > obj2.x &&
        obj1.y < (obj2.y + obj2.height) &&
        (obj1.y + obj1.height) > obj2.y
    );
};

// verify if the player won
const checkWin = function () {
    if (goodies.length > 0) {
        return false;
    } else {
        return true;
    }
};

console.log(goodies.length)

// BULLETS this function creates new bullets
var shoot = function() {
    if (canShoot) {
        var newB = bullets.push( {
            width: 2,
            height: 20
        }) - 1; //add bullet to array
        bullets[newB].x = player.x + player.width /2;
        bullets[newB].y = player.y + player.width;
        canShoot = false;
        setTimeout(function() {
            canShoot = true;
        }, 200);
    }
};

console.log(facingX)
console.log(facingY)

// load the game
init();