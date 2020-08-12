class Stone {
    constructor(x, y, width){
        var options = {
            restitution: 0.9,
            density: 1.2,
            friction: 0.9
        }
        this.body = Bodies.circle(x, y, width/2, options);
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
        // imageMode(CENTER);
        // image(this.image, 0, 0, this.width, this.height);
        circle(0, 0, this.width);
        pop();
    }
}