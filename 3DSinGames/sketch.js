var confLocs;
var confTheta;
let sliderStep, sliderLength;

function setup() {
    createCanvas(900, 800, WEBGL);

    sliderStep = createSlider(30, 80, 50, 10);
    sliderStep.position(10, 20);
    sliderStep.style('width', '150px');
    
    sliderLength = createSlider(200, 500, 300, 50);
    sliderLength.position(10, 50); 
    sliderLength.style('width', '150px');
    
    confLocs = [];
    confTheta = [];
    for(var i = 0; i < 200; i++){
        var locX = random(-500, 500);
        var locY = random(-800, 0);
        var locZ = random(-500, 500);
        confLocs.push(createVector(locX, locY, locZ));
        var angle = random(0, 360);
        confTheta.push(angle);
    }
}

function draw() {
    background(125);
    angleMode(DEGREES);
    normalMaterial();
    stroke(0);
    strokeWeight(2);
    
    confetti();

    camera(cos(frameCount) * width, -600, sin(frameCount) * width, 0, 0, 0, 0, 1, 0);
    //camera(800, -600, 800, 1, 1, 1, 0, 1, 0 );
    
    var step = sliderStep.value();
    
    //ambientMaterial(255, 255, 255);
    pointLight(255, 0, 0, mouseX - width/2, mouseY - height/2, 100);

    for (var x = -400; x < 400; x += step) {
        for (var z = -400; z < 400; z += step) {
            push();
            specularMaterial(250);
            
            translate(x, 0, z);
            
            var distance = dist(0, 0, x, z) + frameCount;
            var range = sliderLength.value();
            var length = map(sin(distance), -1, 1, 100, range);
            
            box(step, length, step);
            pop();            
        }
    }
}

function confetti() {
    for (var i = 0; i < confLocs.length; i++) {
        push();
        noStroke();
        translate(confLocs[i].x, confLocs[i].y, confLocs[i].z);
        confLocs[i].y += 1;
        confTheta[i] += 10;
        rotateX(confTheta[i]);
        plane(15, 15);
        pop();
        
        if (confLocs[i].y > 0){
            confLocs[i].y = -800;
        }
    }
}