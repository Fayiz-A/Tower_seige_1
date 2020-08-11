class Box {
    constructor(x, y, width, height) {
        var options = {
            restitution: 0.1,
            density: 0.8,
            friction: 0.9
        }

        this.body = Bodies.rectangle(x, y, width, height, options);
        World.add(world, this.body);

        this.width = width;
        this.height = height;
    }
    display(colour) {
        var pos = this.body.position;
        var angle = this.body.angle;

        fill(colour);
        push();
        translate(pos.x, pos.y);
        rotate(angle);
        rect(0, 0, this.width, this.height);
        pop();
    }
}