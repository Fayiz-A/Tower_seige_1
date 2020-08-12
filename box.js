class Box {
    constructor(x, y, width, height, colour) {
        var options = {
            //restitution: 0.1,
            //density: 0.8,
            friction: 0.1
        }

        this.body = Bodies.rectangle(x, y, width, height, options);
        World.add(world, this.body);

        this.width = width;
        this.height = height;

        this.colour = colour;
    }
    display() {
        var pos = this.body.position;
        var angle = this.body.angle;

        fill(this.colour);
        push();
        translate(pos.x, pos.y);
        rotate(angle);
        stroke(0, 0, 0);
        rect(0, 0, this.width, this.height);
        pop();
    }
}