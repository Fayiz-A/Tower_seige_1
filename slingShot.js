class SlingShot {
    constructor(bodyA, pointB) {
        var options = {
            bodyA: bodyA,
            pointB: pointB,
            length: 20,
            stiffness: 0.1
        }
        this.sling = Constraint.create(options);
        World.add(world, this.sling);

        this.pointB = pointB;
    }

    fly() {
        this.sling.bodyA = null;
    }

    attach(body) {
        this.sling.bodyA = body;
    }

    display() {
        if (this.sling.bodyA) {
            var start = this.sling.bodyA.position;
            var end = this.pointB;

            push();
            stroke("yellow");
            line(start.x, start.y, end.x, end.y);
            pop();
        }
    }
}