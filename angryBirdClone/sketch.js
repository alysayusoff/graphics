// Example is based on examples from: http://brm.io/matter-js/, https://github.com/shiffman/p5-matter
// add also Benedict Gross credit

var Engine = Matter.Engine;
var Render = Matter.Render;
var World = Matter.World;
var Bodies = Matter.Bodies;
var Body = Matter.Body;
var Constraint = Matter.Constraint;
var Mouse = Matter.Mouse;
var MouseConstraint = Matter.MouseConstraint;

var engine;
var propeller;
var boxes = [];
var birds = [];
var colors = [];
var ground;
var slingshotBird, slingshotConstraint;
var angle=0;
var angleSpeed=0;
var canvas;
let timer = 60;
let button;
var record = 0;
////////////////////////////////////////////////////////////
function setup() {
    canvas = createCanvas(1000, 600);

    engine = Engine.create();  // create an engine

    setupGround();

    setupPropeller();

    setupTower();

    setupSlingshot();

    setupMouseInteraction();
}
////////////////////////////////////////////////////////////
function draw() {
    background(0);

    Engine.update(engine);

    drawGround();

    drawPropeller();

    drawTower();

    drawBirds();

    drawSlingshot();

    getTime();

    push();
        fill(0, 255, 255);
        textSize(15);
        textAlign(CENTER);
        text("Objective: Hit all boxes out of the screen in 60 seconds to win!", width/2, 30);
    pop();
}

function getTime() {
    if (frameCount % 60 == 0 && timer <= 60) {
        timer --;
    }
    fill(245, 245, 30);
    textSize(30);
    text("Game time: " + timer + "s", 5, 30);
    if (timer == 0){
        gameOver();
    }
}
////////////////////////////////////////////////////////////
//use arrow keys to control propeller
function keyPressed(){
    if (keyCode == LEFT_ARROW){
    //your code here
        angleSpeed += 0.01;
    }
    else if (keyCode == RIGHT_ARROW){
    //your code here
        angleSpeed += -0.01;
    }
}
////////////////////////////////////////////////////////////
function keyTyped(){
//if 'b' create a new bird to use with propeller
    if (key==='b'){
        setupBird();
    }

//if 'r' reset the slingshot
    if (key==='r'){
        removeFromWorld(slingshotBird);
        removeFromWorld(slingshotConstraint);
        setupSlingshot();
    }
}

function gameWin(){
    fill(255);
    textSize(80);
    textAlign(CENTER);
    text("WINNER!", width/2, height/2);
    
    record = 60 - timer;
    storeItem('record', record);
    textSize(40);
    textAlign(CENTER);
    if (getItem('record') > record) {
        removeItem('record');
        storeItem('record', record);
        text("New record: " + getItem('record') + "s", width/2, height/2+40);
    } else {
        text("Fastest record: " + getItem('record') + "s", width/2, height/2+40);
    }
    
    button = createButton("REPLAY");
    button.style('font-size', '22px');
    button.style('background-color', color(255, 50, 255, 200));
    button.position(width/2-50, height/2+53);
    button.mousePressed(reset);
    
    noLoop();
}

function gameOver(){
    fill(255);
    textSize(80);
    textAlign(CENTER);
    text("GAME OVER", width/2, height/2);
    
    button = createButton("RETRY");
    button.style('font-size', '22px');
    button.style('background-color', color(255, 50, 255, 200));
    button.position(width/2-45, height/2+25);
    button.mousePressed(reset);
    
    noLoop();
}

function reset(){
    window.location.reload();
}

//**********************************************************************
//  HELPER FUNCTIONS - DO NOT WRITE BELOW THIS line
//**********************************************************************

//if mouse is released destroy slingshot constraint so that
//slingshot bird can fly off
function mouseReleased(){
    setTimeout(() => {
        slingshotConstraint.bodyB = null;
        slingshotConstraint.pointA = { x: 0, y: 0 };
    }, 100);
}
////////////////////////////////////////////////////////////
//tells you if a body is off-screen
function isOffScreen(body){
    var pos = body.position;
    return (pos.y > height || pos.x<0 || pos.x>width);
}
////////////////////////////////////////////////////////////
//removes a body from the physics world
function removeFromWorld(body) {
    World.remove(engine.world, body);
}
////////////////////////////////////////////////////////////
function drawVertices(vertices) {
    beginShape();
    for (var i = 0; i < vertices.length; i++) {
        vertex(vertices[i].x, vertices[i].y);
    }
    endShape(CLOSE);
}
////////////////////////////////////////////////////////////
function drawConstraint(constraint) {
    push();
        var offsetA = constraint.pointA;
        var posA = {x:0, y:0};
        if (constraint.bodyA) {
            posA = constraint.bodyA.position;
        }
        var offsetB = constraint.pointB;
        var posB = {x:0, y:0};
        if (constraint.bodyB) {
            posB = constraint.bodyB.position;
        }
        strokeWeight(5);
        stroke(255);
        line(
            posA.x + offsetA.x,
            posA.y + offsetA.y,
            posB.x + offsetB.x,
            posB.y + offsetB.y
        );
    pop();
}
