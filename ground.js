class Ground extends Box {
    constructor(x, y, width, height, colour){
        super(x, y, width, height, colour);

        this.body = Bodies.rectangle(x, y, width, height, {isStatic:true});
        World.add(world, this.body);

        this.colour = colour;
    }

    display() {
        fill(this.colour);
        rect(this.body.position.x, this.body.position.y, this.width, this.height);
    }
}