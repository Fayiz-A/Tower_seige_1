class Ground extends Box {
    constructor(x, y, width, height){
        super(x, y, width, height);

        this.body = Bodies.rectangle(x, y, width, height, {isStatic:true});
        World.add(world, this.body);
    }

    display(colour) {
        super.display(colour);
    }
}