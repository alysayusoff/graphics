// Image of Husky Creative commons from Wikipedia:
// https://en.wikipedia.org/wiki/Dog#/media/File:Siberian_Husky_pho.jpg
var imgIn;
//var dropdown;

var matrix = [
    [1/64, 1/64, 1/64, 1/64, 1/64, 1/64, 1/64, 1/64],
    [1/64, 1/64, 1/64, 1/64, 1/64, 1/64, 1/64, 1/64],
    [1/64, 1/64, 1/64, 1/64, 1/64, 1/64, 1/64, 1/64],
    [1/64, 1/64, 1/64, 1/64, 1/64, 1/64, 1/64, 1/64],
    [1/64, 1/64, 1/64, 1/64, 1/64, 1/64, 1/64, 1/64],
    [1/64, 1/64, 1/64, 1/64, 1/64, 1/64, 1/64, 1/64],
    [1/64, 1/64, 1/64, 1/64, 1/64, 1/64, 1/64, 1/64],
    [1/64, 1/64, 1/64, 1/64, 1/64, 1/64, 1/64, 1/64]
];
/////////////////////////////////////////////////////////////////
function preload() {
    imgIn = loadImage("assets/husky.jpg");
}
/////////////////////////////////////////////////////////////////
function setup() {
    createCanvas((imgIn.width * 2), imgIn.height + 60);
    
    /*dropdown = createSelect();
    dropdown.position(50, imgIn.height + 30);
    dropdown.option("Early Bird Filter");
    dropdown.option("Grayscale");
    dropdown.option("Invert");
    dropdown.option("Radial Blur");*/
    //dropdown.changed(filter);
}
/////////////////////////////////////////////////////////////////
var buttonSepia, buttonCorners, buttonBlur, buttonBorder;
function draw() {
    background(255);
    image(imgIn, 0, 0);
    image(earlyBirdFilter(imgIn), imgIn.width, 0);
    
    /*buttonSepia = createButton('Add Sepia Filter');
    buttonSepia.position(20, 731);
    
    buttonCorners = createButton('Add Dark Corners');
    buttonCorners.position(150, 731);
    
    buttonBlur = createButton('Blur Image');
    buttonBlur.position(293, 731);
    
    buttonBorder = createButton('Add a Border');
    buttonBorder.position(393, 731);*/
    
    noLoop();
}
/////////////////////////////////////////////////////////////////
function mousePressed(){
  loop();
}
/////////////////////////////////////////////////////////////////
function earlyBirdFilter(img){
    var resultImg = createImage(imgIn.width, imgIn.height);
    resultImg = sepiaFilter(imgIn);
    resultImg = darkCorners(resultImg);
    resultImg = radialBlurFilter(resultImg);
    resultImg = borderFilter(resultImg);
    return resultImg;
}

function sepiaFilter(img) {
    var imgOut = createImage(img.width, img.height);
    imgOut.loadPixels();
    img.loadPixels();
    
    for (var x = 0; x < img.width; x++) {
        for (var y = 0; y < img.height; y++) {
            var index = (img.width * y + x) * 4;
            
            var oldRed = img.pixels[index + 0];
            var oldGreen = img.pixels[index + 1];
            var oldBlue = img.pixels[index + 2];
            
            var newRed = (oldRed * 0.393) + (oldGreen * 0.769) + (oldBlue * 0.189);
            var newGreen = (oldRed * 0.349) + (oldGreen * 0.686) + (oldBlue * 0.168);
            var newBlue = (oldRed * 0.272) + (oldGreen * 0.534) + (oldBlue * 0.131);
            
            nreRed = constrain(newRed, 0, 255);
            newGreen = constrain(newGreen, 0, 255);
            newBlue = constrain(newBlue, 0, 255);
            
            imgOut.pixels[index] = newRed;
            imgOut.pixels[index + 1] = newGreen;
            imgOut.pixels[index + 2] = newBlue;            
            imgOut.pixels[index + 3] = 255;            
        }
    }
    
    imgOut.updatePixels();
    return imgOut;
}

function darkCorners(img) {
    var imgOut = createImage(img.width, img.height);
    imgOut.loadPixels();
    img.loadPixels();
                
    var corner = dist(0, 0, imgOut.width / 2, imgOut.height / 2);
    
    for (var x = 0; x < img.width; x++) {
        for (var y = 0; y < img.height; y++) {
            var index = (img.width * y + x) * 4;
            var d = dist(img.width/2, img.height/2, x, y);
            
            var dynLum;
            
            if (d <= 300)
                dynLum = 1;
            else if (d <= 450)
                dynLum = map(d, 300, 450, 1, 0.4);
            else 
                dynLum = map(d, 450, corner, 0.4, 0);
            
            var r = img.pixels[index] * dynLum;
            var g = img.pixels[index + 1] * dynLum;
            var b = img.pixels[index + 2] * dynLum;
            var a = img.pixels[index + 3] * dynLum;
            
            r = constrain(r, 0, 255);
            g = constrain(g, 0, 255);
            b = constrain(b, 0, 255);
            a = constrain(a, 0, 255);
                        
            imgOut.pixels[index] = r;
            imgOut.pixels[index + 1] = g;
            imgOut.pixels[index + 2] = b;
            imgOut.pixels[index + 3] = (r + g + b) * a;
        }
    }
    
    imgOut.updatePixels();
    return imgOut;
}

function radialBlurFilter(img) {
    var imgOut = createImage(img.width, img.height);
    var matrixSize = matrix.length;
    imgOut.loadPixels();
    img.loadPixels();
    
    for (var x = 0; x < img.width; x++) {
        for (var y = 0; y < img.height; y++) {
            var index = (img.width * y + x) * 4;
            
            var c = convolution(x, y, matrix, matrixSize, img);
            
            var r = img.pixels[index + 0];
            var g = img.pixels[index + 1];
            var b = img.pixels[index + 2];
            
            var mouseD = dist(x, y, mouseX, mouseY);
            
            var dynBlur = map(mouseD, 100, 300, 0, 1);
            dynBlur = constrain(dynBlur, 0, 1);
            
            imgOut.pixels[index + 0] = c[0] * dynBlur + r * (1 - dynBlur);
            imgOut.pixels[index + 1] = c[1] * dynBlur + g * (1 - dynBlur);
            imgOut.pixels[index + 2] = c[2] * dynBlur + b * (1 - dynBlur);
            imgOut.pixels[index + 3] = 255;
        }
    }
    
    imgOut.updatePixels();
    return imgOut;
}

function convolution(x, y, matrix, matrixSize, img) {
    var totalRed = 0;
    var totalGreen = 0;
    var totalBlue = 0;
    
    var offset = floor(matrixSize/2);
    
    for (var i = 0; i < matrixSize; i++) {
        for (var j = 0; j < matrixSize; j++) {
            var xloc = x + i - offset;
            var yloc = y + j - offset;
            
            var index = (img.width * yloc + xloc) * 4;
            
            index = constrain(index, 0, img.pixels.length -1);
            
            totalRed += img.pixels[index + 0] * matrix[i][j];
            totalGreen += img.pixels[index + 1] * matrix[i][j];
            totalBlue += img.pixels[index + 2] * matrix[i][j];
        }
    }
    
    return [totalRed, totalGreen, totalBlue];
}

function borderFilter(img) {
    var buffer = createGraphics(img.width, img.height);
    buffer.image(img, 0, 0);
    buffer.noFill();
    buffer.stroke(255);
    buffer.strokeWeight(40);
    buffer.rect(0, 0, img.width, img.height, 50);
    return buffer;
}