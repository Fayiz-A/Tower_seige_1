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

        this.visibility = 255;
    }

    display() {
        var pos = this.body.position;
        var angle = this.body.angle;

        if (pos.y < 750) {
            push();
            fill(this.colour);
            translate(pos.x, pos.y);
            rotate(angle);
            stroke(0, 0, 0);
            rect(0, 0, this.width, this.height);
            pop();
        }
        else {
            push();
            this.boxColour = color(this.colour);
            this.boxColour.setAlpha(this.visibility);
            fill(this.boxColour);
            translate(pos.x, pos.y);
            rotate(angle);
            noStroke();
            rect(pos.x, pos.y, this.width, this.height);
            this.visibility -= 5;
            World.remove(world, this.body);
            pop();
        }
    }
}