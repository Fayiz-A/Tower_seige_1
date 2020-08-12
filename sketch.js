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
var boxCorX = 750, boxCorY = 10, incrementBoxNumber = true;

var mgr;//objectName for scene manager

//buttons
var instructionsButton, gameButton, backButton1, backButton2;

function setup() {
  createCanvas(1500, 700);

  mgr = new SceneManager();
  mgr.showScene(intro);

}

function draw() {

  mgr.draw();

}

function drawGameScene() {

  this.setup = function () {
    createCanvas(1500, 700);

    engine = Engine.create();
    world = engine.world;

    ground = new Ground(1000, 600, 700, 40, "brown");
    bottomGround = new Ground(width / 2, height, width, 20, "brown");

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
    createCanvas(1500, 700);

    instructionsButton = new Button(350, 300, "HOW TO PLAY?");
    gameButton = new Button(350, 600, "PLAY");
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
    createCanvas(1500, 700);

    backButton1 = new Button(100, 100, "Back");

  }

  this.draw = function () {
    backButton1.button.onRelease = function () {
      mgr.showScene(intro);
    }

    backButton1.display();

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