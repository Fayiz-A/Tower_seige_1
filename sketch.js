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

function setup() {
  createCanvas(1500, 700);

  engine = Engine.create();
  world = engine.world;

  ground = new Ground(400, 400, 400, 40);

  for (var i = 0; i < 1; i++) {
    boxArray.push(new Box(200, 200, 40, 40));
  }

}

function draw() {
  background(0);
  Engine.update(engine);

  rectMode(CENTER);

  boxArray.forEach((item, index) => item.display("yellow"));
  ground.display("brown");
}