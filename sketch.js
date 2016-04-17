//============================
//  Paint
//============================

//html elements
var drawingCanvas;
var saveButton;
var brushPicker;

//values saved from html elements
var colorPicker;
var brushSize;
var brushType;
var goldball;

function preload (){
  goldball = loadImage("images/goldball.png");

}


function setup() {

    //Make the canvas and then insert it into a div
    drawingCanvas = createCanvas(760, 480);
    drawingCanvas.parent('drawingContainer');
    background("white");

    //set up the color picker
    colorPicker = select("#ColorPicker");

    //set up the paintbrush width slider
    brushSize = createSlider(1, 50, 10);
    brushSize.parent('brushSize');

    //set up the save button
    saveButton = select('.saveButton');
    saveButton.mouseClicked(saveFunction);

    //set up the clear button
    clearButton = select('.clearButton');
    clearButton.mouseClicked(clearFunction);

    //set up the brush types
    brushPicker = createSelect();
    brushPicker.parent("brushType")
    brushPicker.option('paint brush');
    brushPicker.option('paint bucket');
    brushPicker.option('eraser')
    brushPicker.option('triangle')
    brushPicker.option('gold')

    //TASK: add two new brush options

    //Set up the brush type event listener:
    brushPicker.changed(changeBrush);

    //Set the default brush type to the first item in the menu:
    brushType = brushPicker.value();
}


function draw() {

    if (mouseIsPressed) {
        if (brushType == "paint brush"){
            standardStroke();
        }
        //add your other brush options here using else if
        else if (brushType == "paint bucket") {
            background("#"+colorPicker.value());
        }

        else if (brushType == "eraser"){
            stroke("white");
            strokeWeight(brushSize.value());
            line(pmouseX, pmouseY, mouseX, mouseY);
        }

        else if (brushType == "triangle"){
            fill("#"+ColorPicker.value());
            
        }

        else if (brushType == "gold"){
            imageMode(CENTER);
            image(goldball,mouseX,mouseY);


        }

    } else {
        //Cursor options: ARROW, CROSS, HAND, MOVE, TEXT, or WAIT, or path for image
        //if you use an image, the recommended size is 16x16 or 32x32 pixels
        cursor(CROSS);
    }
}



//--------------------------
// Brushes
//--------------------------

function standardStroke(){
    //set the size of the brush from the slider
    strokeWeight(brushSize.value());

    //use the hex code for the stroke color
    stroke("#"+colorPicker.value());
    //If you want to use the RGB values instead you can do so like this:
    //(useful if you want to add opacity with RGBA)
    // stroke(colorPicker.elt.color.rgb[0]*255,
    //         colorPicker.elt.color.rgb[1]*255,
    //         colorPicker.elt.color.rgb[2]*255
    //         );

    //pmouseX and pmouseY give you the previous mouse position
    line(pmouseX, pmouseY, mouseX, mouseY);

}

//TASK: set up  two new brushes
//each one should have its own function

//--------------------------
// Event Listeners
//--------------------------

function changeBrush(){
    //This takes the name of the drop-down item you selected
    //and saves it as a string to the brushType variable.
    //There's no need to edit this function for you assignment
    brushType = brushPicker.value();
}

function saveFunction() {
    save(drawingCanvas, "myDrawing.jpg");
}

function clearFunction() {
    clear(drawingCanvas)
    background("white")
}

//Create a new function for drawing it (similar to the existing standardStroke function).
//Detect if the dropdown equals your new brush in draw() and call your new function for drawing it
