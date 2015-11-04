/**********************************
*	Objects
***********************************/
var player = {
    color: "#0095DD",
    radius: 10,
    x: 220,
    y: 270,
    width: 32,
    height: 32
};

function Asteroid() {
    this.color = getRandomHexColor();
    this.radius = getRandomNumber(4, 80);
    this.x = getRandomNumber(0, canvas.width);
    this.y = getRandomNumber(0, canvas.height);
    this.draw = drawAsteroid;
}

/**********************************
*	Variables
***********************************/

var canvas;
var ctx;

var offsetX = 0;
var offsetY = 0;

var asteroids = [];

/**********************************
*	Functions
***********************************/
$( document ).ready(function() {

	canvas = document.getElementById("gameCanvas");
	ctx = canvas.getContext("2d");
	initWindow();

	$( window ).resize(function() {
  		initWindow();
	});

    $(document).keydown(onKeyDown);
    $(document).keyup(onKeyUp);

	player.x = canvas.width/2;
	player.y = canvas.height/2;

    generateAsteroids(10);

	var FPS = 60;
	setInterval( function(){ 
		draw();
        update(); 
	}, 1000/FPS);
});

/**********************************
*   Initializers
***********************************/
function initWindow() {
	canvas.width = document.body.clientWidth;
	canvas.height = 600;
}

function generateAsteroids(size) {
	for(var i = 0; i < size; i++) {
		var asteroid = new Asteroid();
        asteroids.push(asteroid);
	}
}

/**********************************
*   Draw
***********************************/
function draw() {

    // Camera
    ctx.save();
    ctx.translate(offsetX, offsetY);

    // Game Objects
    ctx.clearRect(0, 0, canvas.width, canvas.height);
	drawPlayer();
    drawAsteroids();

    ctx.restore();
}

function drawAsteroid() {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius, 0, Math.PI*2);
    ctx.fillStyle = this.color;
    ctx.fill();
    ctx.closePath();
}

function drawPlayer() {
    ctx.beginPath();
    ctx.arc(player.x, player.y, player.radius, 0, Math.PI*2);
    ctx.fillStyle = player.color;
    ctx.fill();
    ctx.closePath();
}

function drawAsteroids () {
    for (var i = asteroids.length - 1; i >= 0; i--) {
        asteroids[i].draw();
    };
}

/**********************************
*   Update
***********************************/
function update() {

    player.x += 2;
    player.y += 2;



    ballWallsCollisions();
}


function ballWallsCollisions() {

}

/**********************************
*   Event Handling
***********************************/
function onKeyDown(e) {
    if (e.keyCode == 39) {
        offsetX += 2;
    } else if (e.keyCode == 37) {
        offsetX -= 2;
    }

    if (e.keyCode == 38) {
        offsetY -= 2;
    }
    else if (e.keyCode == 40) {
        offsetY += 2;
    }
}

function onKeyUp(e) {
    if (e.keyCode == 39) {
        offsetX = 0;
    } else if (e.keyCode == 37) {
        offsetX = 0;
    }

    if (e.keyCode == 38) {
        offsetY = 0;
    }
    else if (e.keyCode == 40) {
        offsetY = 0;
    }
}