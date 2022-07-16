var t = 0;
var stepSize = 20;

function setup() {
    createCanvas(500, 500);
}
///////////////////////////////////////////////////////////////////////
function draw() {
    background(125);

    colorGrid();
    compassGrid();
}
///////////////////////////////////////////////////////////////////////
function colorGrid(){
    // your code here
    let xpos = 0;
    let ypos = 0;
    for (var h = 0; h < 25; h++){
        for (var w = 0; w < 25; w++){
            var x = xpos + (stepSize * w);
            var y = ypos + (stepSize * h);
            
            colorMode(RGB);
            var speed = map(mouseX, 0, width, 100, 700);
            var zoom = map(mouseY, 0, height, 100, 1000);
            var n = noise(x/zoom, y/zoom, frameCount/speed);
            let yellow = color(255, 255, 0);
            let purple = color(255, 0, 255);
            colorMode(RGB);
            
            let lerp = lerpColor(yellow, purple, n);
            
            fill(lerp);
            noStroke();
            rect(x, y, stepSize, stepSize);
        }
    }
}
///////////////////////////////////////////////////////////////////////
function compassGrid(){
    // your code here
    for (var x = 0; x < 25; x++){
        for (var y = 0; y < 25; y++){
            var length = map(mouseY, 0, height, 5, 20);
            var speed = map(mouseX, 0, width, 450, 1200);
            var tX = (x * stepSize + frameCount) / speed;
            var tY = (y * stepSize + frameCount) / speed;
            var t = noise(tX, tY);
            var a = map(t, 0, 1, 0, 720);
            var gfill = map(mouseX, 0, width, 255, 50);
            
            push();
            stroke(125, gfill, 255);
            strokeWeight(2);
            translate(x * stepSize + stepSize/2, y * stepSize + stepSize/2);
            rotate(radians(a));
            line(0, 0, 0, -length);
            //ellipse(0, 0, 3, -length);
            pop();
        }
    }
    
    t += 0.001;
    if (t > 1){
        t = 0;
    }
}
