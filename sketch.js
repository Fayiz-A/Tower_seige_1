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

function setup() {
  createCanvas(1500, 700);

  engine = Engine.create();
  world = engine.world;

  ground = new Ground(1000, 600, 700, 40);
  bottomGround = new Ground(width/2, height, width, 20);

  makePyramid();

  stone = new Stone(190, 110, 50);

  slingShot = new SlingShot(stone.body, {x: 220, y: 120});
}

function draw() {
  background(0);
  Engine.update(engine);

  rectMode(CENTER);

  boxArray.forEach((item, index) => item.display("yellow"));
  ground.display("brown");
  bottomGround.display("brown");
  
  stone.display();

  slingShot.display();
}

function makePyramid(){
  for (var row = 0; row < 9; row++) {
    boxCorY = 10;
    for (var column = 0; column < boxNumber; column++) {
      boxArray.push(new Box(boxCorX, boxCorY, 60, 60));
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

function mouseDragged() {
  Body.setPosition(stone.body, {x: mouseX, y: mouseY});
}

function mouseReleased() {
  slingShot.fly();
}

function keyPressed() {
  if (keyCode == 32) {
    slingShot.attach(stone.body);
  }
}