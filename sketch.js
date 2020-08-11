//name spacing for Matter.js' modules
const Engine = Matter.Engine;
const World = Matter.World;
const Bodies = Matter.Bodies;
const Body = Matter.Body;
const Constraint = Matter.Constraint;

var engine, world;

//objects
var ground;
var boxArray = [];

var boxNumber = 1;
var boxCorX = 750, boxCorY = 10, incrementBoxNumber = true;

function setup() {
  createCanvas(1500, 700);

  engine = Engine.create();
  world = engine.world;

  ground = new Ground(1000, 600, 700, 40);

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

function draw() {
  background(0);
  Engine.update(engine);

  rectMode(CENTER);

  boxArray.forEach((item, index) => item.display("yellow"));
  ground.display("brown");
}