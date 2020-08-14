//name spacing for Matter.js' modules
const Engine = Matter.Engine;
const World = Matter.World;
const Bodies = Matter.Bodies;
const Body = Matter.Body;
const Constraint = Matter.Constraint;

var engine, world;

//objects
var ground, bottomGround;
var boxArray = [];
var stone;
var slingshot;

var boxNumber = 1;//this will determine the number of boxes per row
var boxCorX = 822, boxCorY = 10, incrementBoxNumber = true;

var boxFallenArray = [];
var boxFallen = 0;

var mgr;//objectName for scene manager

//buttons
var instructionsButton, gameButton, backButton1;

//the information to be displayed on the how to play page
var information = "The objective of this game is to hit the tower with the stone and make it fall. " +

  "\n\nThis game is played just like the angry birds game. " +
  "Just stretch the band (not too much) where the stone is hung and release it. " +
  "The stone \nwill get launched. " +
  "You can get another stone by Pressing the SPACE BAR. All the best!"

var stretch_sound;
var timeStretched = 0;


function preload() {
  //loads the sound file
  stretch_sound = loadSound("Stretch.mp3");
}

function setup() {
  createCanvas(1440, 822);

  //making an object for the scene manager library
  mgr = new SceneManager();
  mgr.showScene(intro);//the initial scene
}

function draw() {

  mgr.draw();//draws the scene 
}

function drawGameScene() {
  //this function contains the code for the actual game scene

  this.setup = function () {
    createCanvas(1440, 822);

    //creating the engine
    engine = Engine.create();
    world = engine.world;

    rectMode(CENTER);
    imageMode(CENTER);

    //making the objects
    ground = new Ground(1000, 600, 750, 50, "brown");
    bottomGround = new Ground(width / 2, height, width, 60, "brown");

    makePyramid();//contains the code for making multiple box objects and positioning them as a pyramid

    stone = new Stone(190, 110, 50, 50);

    slingShot = new SlingShot(stone.body, { x: 220, y: 120 });//this is a constraint
  }

  this.draw = function () {

    background(0);
    Engine.update(engine);
    rectMode(CENTER);

    //displays all the objects
    boxArray.forEach((item, index) => item.display());//displays each box in the array;
    ground.display();
    bottomGround.display();

    stone.display();

    slingShot.display();

    boxArray.forEach((item, index) => item.checkVisibility());//checks whether the box has fallen or not
    //(when the box falls, its visibility reduces)

    for(i = 0; i < boxArray.length; i++) {
      if(boxFallenArray[i] == true) {
        //increments the number of boxes fallen when they fall
        boxFallen++;
      }
    }

    if(boxFallen >= boxArray.length) {
      //changes the scene when all the boxes have fallen
      mgr.showScene(showWinningScreen);
      boxFallenArray = [];
    }
    else {
      //if all the boxes have not fallen, it empties the array
      boxFallenArray = [];
    }
  }

  this.mouseDragged = function () {
    Body.setPosition(stone.body, { x: mouseX, y: mouseY });//stretches the rubber band and the stone when mouse is dragged
    if (timeStretched < 1) {
      //this condition executes only once whenever the band is stretched
      stretch_sound.play();
      timeStretched++;
    }
  }

  this.mouseReleased = function () {
    //executes when the user leaves the rubber abnd after stretching it
    slingShot.fly();

    stretch_sound.stop();
  }

  this.keyPressed = function () {
    if (keyCode == 32) {
      //attaches the stone back when space is pressed
      slingShot.attach(stone.body);
      timeStretched = 0;
    }
  }

}

function intro() {
  //this is the main screen
  this.setup = function () {
    createCanvas(1440, 822);

    gameButton = new Button(550, 300, "PLAY");
    instructionsButton = new Button(550, 400, "HOW TO PLAY?");
  }

  this.draw = function () {

    background("teal")

    gameButton.display();
    instructionsButton.display();

    gameButton.button.onRelease = function () {
      mgr.wire();
      mgr.showScene(drawGameScene);
    }

    instructionsButton.button.onRelease = function () {
      mgr.wire();
      mgr.showScene(displayRules);
    }

  }
}

function displayRules() {
  //this is the display rules page
  this.setup = function () {
    createCanvas(1440, 822);

    engine = Engine.create();
    world = engine.world;

    backButton1 = new Button(20, 20, "Back");
  }

  this.draw = function () {
    background(0);

    backButton1.display();

    backButton1.button.onRelease = function () {
      mgr.showScene(intro);
    }

    displayText("HOW TO PLAY?", 600, 60, "yellow", 45, "timesNewRoman", "bold");
    displayText(information, 30, 140, "white", 25, "Gangsofthree");
  }

}

function showWinningScreen(){
  //this is the winning screen
  this.setup = function () {
    createCanvas(1440, 822);
  }

  this.draw = function () {
    background("yellow");
  
    displayText("Yay! You won the game.", 600, 300, "black", 45, "GangsofThree");
  }
}

function makePyramid() {
  //function for positioning the boxes as a pyramid
  for (var row = 0; row < 9; row++) {
    boxCorY = 10;
    for (var column = 0; column < boxNumber; column++) {
      boxArray.push(new Box(boxCorX, boxCorY, 60, 60, [random(0, 255), random(0, 255), random(0, 255)]));
      boxCorY += 60;
    }

    if (boxNumber == 5) {
      incrementBoxNumber = false;
    }

    if (incrementBoxNumber == false) {
      boxNumber--;
    } else {
      boxNumber++;
    }

    boxCorX += 60;
  }

}