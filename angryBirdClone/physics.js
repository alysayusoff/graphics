////////////////////////////////////////////////////////////////
function setupGround(){
    ground = Bodies.rectangle(500, 600, 1000, 40, {
        isStatic: true, angle: 0
    });
    World.add(engine.world, [ground]);
}

////////////////////////////////////////////////////////////////
function drawGround(){
    push();
        fill(128);
        drawVertices(ground.vertices);
    pop();
}
////////////////////////////////////////////////////////////////
function setupPropeller(){
// your code here
    propeller = Bodies.rectangle(150, 480, 200, 15, {isStatic : true, angle : angle});
    World.add(engine.world, [propeller]);    
}
////////////////////////////////////////////////////////////////
//updates and draws the propeller
function drawPropeller(){
    push();
        // your code here
        fill(255);
        Body.setAngle(propeller, angle);
        Body.setAngularVelocity(propeller, angleSpeed);
        angle = angle + angleSpeed;
        drawVertices(propeller.vertices);
    pop();
}
////////////////////////////////////////////////////////////////
function setupBird(){
    var bird = Bodies.circle(mouseX, mouseY, 20, {friction: 0,
    restitution: 0.95 });
    Matter.Body.setMass(bird, bird.mass*10);
    World.add(engine.world, [bird]);
    birds.push(bird);
}
////////////////////////////////////////////////////////////////
function drawBirds(){
    push();
    //your code here
        fill(255, 0, 0);
        for (var i = this.birds.length - 1; i >= 0; i--){
            drawVertices(birds[i].vertices);
            if (isOffScreen(birds[i])){
                removeFromWorld(birds[i]);
                this.birds.splice(i, 1);
            }
        }
    pop();
}
////////////////////////////////////////////////////////////////
//creates a tower of boxes
function setupTower(){
    //your code here
    let xpos = 700;
    let xstep = 80;
    let ypos = 140;
    let ystep = 80;
    for (var h = 0; h < 6; h++){
        for (var w = 0; w < 3; w++){
            var box = Bodies.rectangle(xpos + (xstep * w), ypos + (ystep * h), 80, 80);
            boxes.push(box);
            colors.push(random(255));
            World.add(engine.world, [box]);
        }
    }
}
////////////////////////////////////////////////////////////////
//draws tower of boxes
function drawTower(){
    push();
    //your code here
        for (var i = 0; i < boxes.length; i++){
            for (var j = 0; j < colors.length; j++){
                strokeWeight(0.5);
                fill(0, 120, colors[i]);
                drawVertices(boxes[i].vertices);
            }
            if (isOffScreen(boxes[i])){
                removeFromWorld(boxes[i]);
                this.boxes.splice(i, 1);
            }
            if (boxes.length == 0){
                gameWin();
            }
        }
    pop();
}
////////////////////////////////////////////////////////////////
function setupSlingshot(){
//your code here
    slingshotBird = Bodies.circle(190, 215, 20, {friction : 0, restitution : 0.95});
    Matter.Body.setMass(slingshotBird, slingshotBird.mass*10);

    slingshotConstraint = Constraint.create({
        pointA : {x : 190, y : 190},
        bodyB : slingshotBird,
        stiffness : 0.01,
        damping : 0.0001
    });

    World.add(engine.world, [slingshotBird, slingshotConstraint]);
}
////////////////////////////////////////////////////////////////
//draws slingshot bird and its constraint
function drawSlingshot(){
    push();
        // your code here
        fill(255, 100, 0);
        drawVertices(slingshotBird.vertices);
        fill(0);
        drawConstraint(slingshotConstraint);
    pop();
}
/////////////////////////////////////////////////////////////////
function setupMouseInteraction(){
    var mouse = Mouse.create(canvas.elt);
    var mouseParams = {
        mouse: mouse,
        constraint: { stiffness: 0.05 }
    }
    mouseConstraint = MouseConstraint.create(engine, mouseParams);
    mouseConstraint.mouse.pixelRatio = pixelDensity();
    World.add(engine.world, mouseConstraint);
}
