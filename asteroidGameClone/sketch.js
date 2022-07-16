var spaceship;
var asteroids;
var atmosphereLoc;
var atmosphereSize;
var earthLoc;
var earthSize;
var starLocs = [];
var highscore;
let button;
var timer = 0;

function setup() {
    createCanvas(1200,800);
    spaceship = new Spaceship();
    asteroids = new AsteroidSystem();

    //location and size of earth and its atmosphere
    atmosphereLoc = new createVector(width/2, height*2.9);
    atmosphereSize = new createVector(width*3, width*3);
    earthLoc = new createVector(width/2, height*3.1);
    earthSize = new createVector(width*3, width*3);
}

function draw() {
    background(0);
    sky();

    spaceship.run();
    asteroids.run();

    drawEarth();

    displayScore();
    getHighscore();
    getTime();
    
    checkCollisions(spaceship, asteroids); // function that checks collision between various elements
}

function getTime() {
    if (frameCount % 60 == 0 && timer >= 0) {
        timer ++;
    }
    fill(245, 245, 30);
    textSize(30);
    text("Game time: " + timer + "s", 5, 100);
}

function displayScore() {
    fill(255, 50, 100);
    textSize(30);
    text("Asteroid(s) destroyed: " + score, 5, 30);
}

function getHighscore() {
    fill(0, 150, 255);
    textSize(30);
    if (getItem('highscore') < score) {
        removeItem('highscore');
        storeItem('highscore', score);
        text("Highscore: " + getItem('highscore'), 5, 65);
    } else {
        text("Highscore: " + getItem('highscore'), 5, 65);
    }
}
//draws earth and atmosphere
function drawEarth(){
    noStroke();
    //draw atmosphere
    fill(0, 0, 255, 40);
    ellipse(atmosphereLoc.x, atmosphereLoc.y, atmosphereSize.x,  atmosphereSize.y);
    //draw earth
    fill(150, 255, 200,255);
    ellipse(earthLoc.x, earthLoc.y, earthSize.x, earthSize.y);
}
//checks collisions between all types of bodies
function checkCollisions(spaceship, asteroids){
    //spaceship-2-asteroid collisions
    //YOUR CODE HERE (2-3 lines approx)
    for (var i = 0; i < asteroids.locations.length; i++){
        if (isInside(spaceship.location, spaceship.size, asteroids.locations[i], asteroids.diams[i])){
            gameOver();
        }
    }

    //asteroid-2-earth collisions
    //YOUR CODE HERE (2-3 lines approx)
    for (var i = 0; i < asteroids.locations.length; i++){
        if (isInside(asteroids.locations[i], asteroids.diams[i], earthLoc, earthSize.y)){
            gameOver();
        }
    }

    //spaceship-2-earth
    //YOUR CODE HERE (1-2 lines approx)
    if (isInside(spaceship.location, spaceship.size, earthLoc, earthSize.y)){
        gameOver();
    }

    //spaceship-2-atmosphere
    //YOUR CODE HERE (1-2 lines approx)
    if (isInside(spaceship.location, spaceship.size, atmosphereLoc, atmosphereSize.x)){
        spaceship.setNearEarth();
    }

    //bullet collisions
    //YOUR CODE HERE (3-4 lines approx)
    for (i = 0; i < asteroids.locations.length; i++){
        for (j = 0; j < spaceship.bulletSys.bullets.length; j++){
            if (isInside(asteroids.locations[i], asteroids.diams[i], spaceship.bulletSys.bullets[j], spaceship.bulletSys.diam)){
                asteroids.destroy(i);
                break;
            }
        }
    }
}
//helper function checking if there's collision between object A and object B
function isInside(locA, sizeA, locB, sizeB){
    // YOUR CODE HERE (3-5 lines approx)
    sizeA=sizeA/2;
    sizeB=sizeB/2;
    if (dist(locA.x, locA.y, locB.x, locB.y) < sizeA + sizeB)
    {
        return true;
    }
    return false;
}

function keyPressed(){
    if (keyIsPressed && keyCode === 32){ // if spacebar is pressed, fire!
        spaceship.fire();
    }
}

function reset() {
    window.location.reload();
}

// function that ends the game by stopping the loops and displaying "Game Over"
function gameOver(){
    fill(255);
    textSize(80);
    textAlign(CENTER);
    text("GAME OVER", width/2, height/2);
    textSize(40);
    text("Score: " + score, width/2, height/2+50);
    button = createButton("RETRY");
    button.style('font-size', '22px');
    button.style('background-color', color(255, 50, 255, 200));
    button.position(width/2-45, height/2+70);
    button.mousePressed(reset);
    noLoop();
}
// function that creates a star lit sky
function sky(){
    push();
        while (starLocs.length<300){
            starLocs.push(new createVector(random(width), random(height)));
        }
        fill(255);
        for (var i=0; i<starLocs.length; i++){
            rect(starLocs[i].x, starLocs[i].y,2,2);
        }

        if (random(1)<0.3) starLocs.splice(int(random(starLocs.length)),1);
    pop();
}