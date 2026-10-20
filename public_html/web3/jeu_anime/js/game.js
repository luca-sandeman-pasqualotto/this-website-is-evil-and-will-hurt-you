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

// player sprites
let playerImage = new Image();
playerImage.src = "images/spritesheet_simple.png";


// Image des goodies
let goodyImage = new Image();
goodyImage.src = "images/goody.png";

// Image des bullets
let bulletImage = new Image();
bulletImage.src = "images/bullet_spritesheet.png";


/* GLOBAL OBJECTS */
const player = {
    speed : 5, // movement in pixels per tick
    width : 32,
    height : 32,
    sprite: 1
};

// put 3 goodies into the array
goodies = [
    {width: 32, height: 32}, // one goody
    {width: 32, height: 32}, // two goodies
    {width: 32, height: 32}, // three goodies
];

/* VARIABLES */
let bullets = []; // variable for bullets

// variables of speed
let vY = 0;
let vX = 0;

let canShoot = true;

/* CONTROLS */
// manage the keyboard commands
addEventListener("keydown", function (e) {
    if (e.key == "ArrowUp") { // up arrowkey
        vX = 0;
        vY = -player.speed;
        player.sprite = 0;
    }
    if (e.key == "ArrowDown") { // down arrowkey
        vX = 0;
        vY = player.speed;
        player.sprite = 1;
    }
    if (e.key == "ArrowLeft") { // left arrowkey
        vX = -player.speed;
        vY = 0;
        player.sprite = 3;
    }
    if (e.key == "ArrowRight") { // right arrowkey
        vX = player.speed;
        vY = 0;
        player.sprite = 2;
    }
    if (e.key == " ") { // SHOOT space bar
        shoot();
    }
}, false);

//  manage the mobile commands
addEventListener("touchstart", function (e) {
    if (e.target.id == "uArrow") { // up
        vX = 0;
        vY = -player.speed;
    }
    else if (e.target.id == "dArrow") { // down
        vX = 0;
        vY = player.speed;
    }
    else if (e.target.id == "lArrow") { // left
        vX = -player.speed;
        vY = 0;
    }
    else if (e.target.id == "rArrow") { // right
        vX = player.speed;
        vY = 0;
    }
    else { // STOP if you touch another key
        vX = 0;
        vY = 0;
    }
}, false);


/* INITIAL STATE : INIT */
const init = function () {
    // put the player in the middle
    player.x = (canvas.width - player.width) / 2;
    player.y = (canvas.height - player.height) / 2;
     
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
        // not won yet, play game
        // place the player
        if (player.x > 0 &&
            player.x < canvas.width - player.width) {
            player.x += vX;
        }
        else {
            player.x -= vX;
            vX = -vX; //bounce
            // vX = vY // makes it not bounce
            // canvas.height - player.height - 1
        }
        if (player.y > 0 &&
            player.y < canvas.height - player.height) {
            player.y += vY
        }
        else {
            player.y -= vY;
            vY = -vY; // bounce
            // vY = vX // not bounce
            // canvas.width - player.width - 1
            
        }
        
        // moves goodies
        if (Math.random() > 0.99){
            spawnGoodies();
        }
        
        // Verifies collisions
        for (let i in goodies) {
            if (checkCollision(player,goodies[i])) {
                goodies.splice(i,1);
                break;
            }
            /* BULLETS */
            // this needs to be in the main loop since bullets can collide and kill goodies
            for (var c in bullets) {
                
                if (checkCollision(goodies[i], bullets[c])) {
                    goodies.splice(i, 1);
                    bullets.splice(c, 1);
                }
            }
        }
        for (var c in bullets) {
            bullets[c].x = bullets[c].x + bullets[c].bvX;
            bullets[c].y = bullets[c].y + bullets[c].bvY;
        }

        render()
        window.requestAnimationFrame(main)
    }
};

/* DISPLAY : RENDER */
const render = function (s) {

    //Nettoyer l’écran/canvas sur chaque tic
    if (bgImage.complete) {
        ctx.fillStyle = ctx.createPattern(bgImage, 'repeat');
        ctx.fillRect(0, 0, canvas.width, canvas.height);
    }
    if (s == "win") {  // statut: on a gagné, afficher le cadre gagnant
        ctx.fillStyle = "rgb(200,230,200)";  //vert pale
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        
        if (winImage.complete) {
            ctx.drawImage(winImage, (canvas.width - winImage.width) / 2,
                (canvas.height - winImage.height) / 2);
        }
    }

    if (playerImage.complete) {
        // Draw the right image according to direction
    
        // First set the correct sprite reference according to movement
        if (vX != 0) { //we are moving horizontally
            //If X is over 0, move right; otherwise move left
            vX > 0 ? player.sprite = 2 : player.sprite = 3;
        }
        else { // we are moving vertically
            //If Y is over 0, move down; otherwise move up
            vY > 0 ? player.sprite = 0 : player.sprite = 1;
        }
        // Each sprite is 32 pixels wide on the spritesheet
        // So the value of player.frame can be used to switch between the sprites by multiplying by 32
        ctx.drawImage(playerImage, player.sprite * 16, 0, 16, 16, player.x, player.y, 32 , 32);
        //the elements of this are:
        // playerImage,
        // the x coordinate of the crop frame for the sprite (location of sprite in image)
        // the y coordinate of the crop frame for the sprite
        // the width of the sprite
        // the height of the sprite
        // the x coordinate where to paint on the canvas
        // the y coordinate where to paint on the canvas
        // the width of the sprite on the canvas
        // the height of the sprite on the canvas
    }
    if (goodyImage.complete) {
        for (let i in goodies) {
            ctx.drawImage(goodyImage, goodies[i].x, goodies[i].y);
            
        }
    }
    //Label
    ctx.fillStyle = "rgb(250, 250, 250)";
    ctx.font = "14px monospace"; //peut être une fonte CSS
    ctx.fillText("Goodies restants : " + goodies.length, 32, 32);
        
    for (var c in bullets) {
        ctx.drawImage(bulletImage, bullets[c].x, bullets[c].y)
        if (vX != 0) { //we are moving horizontally
            //If X is over 0, move right; otherwise move left
            vX > 0 ? player.sprite = 2 : player.sprite = 3;
        }
        else { // we are moving vertically
            //If Y is over 0, move down; otherwise move up
            vY > 0 ? bullets.sprite = 0 : player.sprite = 1;
        }
        // Each sprite is 32 pixels wide on the spritesheet
        // So the value of player.frame can be used to switch between the sprites by multiplying by 32
        ctx.drawImage(playerImage, player.sprite * 16, 0, 16, 16, player.x, player.y, 32 , 32);
        //the elements of this are:
        // playerImage,
        // the x coordinate of the crop frame for the sprite (location of sprite in image)
        // the y coordinate of the crop frame for the sprite
        // the width of the sprite
        // the height of the sprite
        // the x coordinate where to paint on the canvas
        // the y coordinate where to paint on the canvas
        // the width of the sprite on the canvas
        // the height of the sprite on the canvas
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

var winAnimation = function () {
		if (bgImage.complete) {
			ctx.fillStyle = ctx.createPattern(bgImage, 'repeat');
			ctx.fillRect(0,0,canvas.width,canvas.height);
		}
		//WIN display win frame
		if (winImage.complete) {
			//ctx.drawImage(winImage, 0, 0);
			ctx.drawImage(winImage,
				(canvas.width-winImage.width)/2,
				(canvas.height-winImage.height)/2);
		}

		//handle the animation
		switch(player.sprite) {  //we have 4 sprites
			case 0: //first frame
				ctx.drawImage(playerImage, 0, 0, 32, 32, player.x, player.y, 64, 64);
				player.sprite++;
				break;
			case 1: //second frame
				ctx.drawImage(playerImage, 96, 0, 32, 32, player.x, player.y, 64, 64);
				player.sprite++;
				break;
			case 2:  //third frame
				ctx.drawImage(playerImage, 32, 0, 32, 32, player.x, player.y, 64, 64);
				player.sprite++;
				break;
			case 3:  //fourth and last frame
				ctx.drawImage(playerImage, 64, 0, 32, 32, player.x, player.y, 64, 64);
				player.sprite = 0;
				break;
		}

};

// BULLETS this function creates new bullets
var shoot = function() {
    if (canShoot) {
        var newB = bullets.push( {
            width: 2,
            height: 20,
            bvX: vX * 1.5,
            bvY: vY * 1.5
        }) - 1; //add bullet to array
        bullets[newB].x = player.x + player.width /2; // places the bullet at the player's position
        bullets[newB].y = player.y;
        canShoot = false;
        setTimeout(function() {
            canShoot = true;
        }, 200);
    }
};

// load the game
init();