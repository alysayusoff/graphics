var imgs = [];
var avgImg;
var numOfImages = 30;
var val;
//////////////////////////////////////////////////////////
function preload() { // preload() runs once
    for (var i = 0; i < numOfImages; i++) {
        var string = 'assets/' + i + '.jpg';
        var filename = loadImage(string);
        imgs.push(filename);
    }
}
//////////////////////////////////////////////////////////
function setup() {
    createCanvas(imgs[0].width * 2, imgs[0].height);
    pixelDensity(1);
    avgImg = createGraphics(imgs[0].width, imgs[0].height);
    val = int(random(0, 29));
}
//////////////////////////////////////////////////////////
function draw() {
    background(125);
    image(imgs[val], 0, 0);
    
    for (var i = 0; i < imgs.length; i++) {
        imgs[i].loadPixels();
    }
    avgImg.loadPixels();
    
    for (var x = 0; x < avgImg.width; x++) {
        for (var y = 0; y < avgImg.height; y++) {
            var index = (avgImg.width * y + x) * 4;          
            var sumR = 0;
            var sumG = 0;
            var sumB = 0;
            
            for (var i = 0; i < imgs.length; i++) {
                sumR += imgs[i].pixels[index + 0];
                sumG += imgs[i].pixels[index + 1];
                sumB += imgs[i].pixels[index + 2];
            }
            
            avgImg.pixels[index + 0] = sumR/imgs.length;
            avgImg.pixels[index + 1] = sumG/imgs.length;
            avgImg.pixels[index + 2] = sumB/imgs.length;
            avgImg.pixels[index + 3] = 255;
            /*avgImg.pixels[index + 0] = mouseMoved(imgs[val].pixels[index + 0], sumR/imgs.length);
            avgImg.pixels[index + 1] = mouseMoved(imgs[val].pixels[index + 0], sumG/imgs.length);
            avgImg.pixels[index + 2] = mouseMoved(imgs[val].pixels[index + 0], sumB/imgs.length);
            avgImg.pixels[index + 3] = 255;*/
        }
    }
    avgImg.updatePixels();
    image(avgImg, imgs[0].width, 0);
    noLoop();
}

function keyPressed(){
    val = int(random(0, 29));
    loop();
}

function mouseMoved(index, length) {
    var l = lerp(index, length, mouseX / 1000);
    return l;
    loop();
}