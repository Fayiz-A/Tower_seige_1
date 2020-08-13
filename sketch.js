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

var boxNumber = 1;
var boxCorX = 822, boxCorY = 10, incrementBoxNumber = true;

var mgr;//objectName for scene manager

//buttons
var instructionsButton, gameButton, backButton1, backButton2;

var information = "The objective of this game is to hit the tower with the stone and make it fall. "+ 
"You have only THREE STONES to do this. "+
"\n\nThis game is played just like the angry birds game. "+  
"Just stretch the band (not too much) where the stone is hung and release it. "+ 
"The stone \nwill get launched."

function setup() {
  createCanvas(1440, 822);

  mgr = new SceneManager();
  mgr.showScene(intro);
}

function draw() {
  mgr.draw();
}

function drawGameScene() {

  this.setup = function () {
    createCanvas(1440, 822);

    engine = Engine.create();
    world = engine.world;

    rectMode(CENTER);
    imageMode(CENTER);
    ground = new Ground(1000, 600, 750, 50, "brown");
    bottomGround = new Ground(width / 2, height, width, 60, "brown");

    makePyramid();

    stone = new Stone(190, 110, 50, 50);

    slingShot = new SlingShot(stone.body, { x: 220, y: 120 });
  }

  this.draw = function () {
    background(0);
    Engine.update(engine);

    rectMode(CENTER);

    boxArray.forEach((item, index) => item.display());
    ground.display();
    bottomGround.display();

    stone.display();

    slingShot.display();
  }

  this.mouseDragged = function () {
    Body.setPosition(stone.body, { x: mouseX, y: mouseY });
  }

  this.mouseReleased = function () {
    slingShot.fly();
  }

  this.keyPressed = function () {
    if (keyCode == 32) {
      slingShot.attach(stone.body);
    }
  }

}

function intro() {

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

  this.mouseDragged = function () {
    Body.setPosition(stone.body, { x: mouseX, y: mouseY });
  }

  this.mouseReleased = function () {
    slingShot.fly();
  }

  this.keyPressed = function () {
    if (keyCode == 32) {
      slingShot.attach(stone.body);
    }
  }

}

function makePyramid() {
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