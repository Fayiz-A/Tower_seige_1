class Stone {
    constructor(x, y, width, height){
        var options = {
            restitution: 0.9,
            density: 1.2,
            friction: 0.9
        }
        this.body = Bodies.polygon(x, y, 6, width/2, options);
        World.add(world, this.body);

        this.image = loadImage("hexagon.png");
        this.width = width;
        this.height = height;
    }

    display(){
        var pos = this.body.position;
        var angle = this.body.angle;

        push();
        translate(pos.x, pos.y);
        rotate(angle);
        rotate(100);
        imageMode(CENTER);
        image(this.image, 0, 0, this.width*1.28, this.height*1.28);
        pop();
    }
}