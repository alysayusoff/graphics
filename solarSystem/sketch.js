var speed;

function setup() {
    createCanvas(900, 700);
}

function draw() {
    background(0);
    speed = frameCount;
    
    //sun
    push();
    translate(width/2, height/2);
    rotate(radians(speed/3));
    celestialObj(color(255,150,0), 200);
        //earth
        push();
        rotate(radians(speed));
        translate(300,0);
        push();
            rotate(radians(speed));
            celestialObj(color(0,0,255), 80);
        pop();
            //moon
            push();
            rotate(radians(-speed*2));
            translate(100,0);
            celestialObj(color(255,255,255), 30);
                //asteroid
                push();
                rotate(radians(-speed*3));
                translate(30,0);
                celestialObj(color(192,192,192), 20);
                pop();
            pop();
            //second moon
            push();
            rotate(radians(speed*1.2));
            translate(150,0);
            celestialObj(color(255,255,255), 35);
            pop();
        pop();
    pop();
}

function celestialObj(c, size){
    strokeWeight(5);
    fill(c);
    stroke(0);
    ellipse(0, 0, size, size);
    line(0, 0, size/2, 0);
}