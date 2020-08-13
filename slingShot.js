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
            if(this.sling.bodyA){
                var pointA = this.sling.bodyA.position;
                var pointB = this.pointB;

                push();
                strokeWeight(4);
                stroke("brown");
                if(pointA.x < 250 && pointA.x > 200) {
                    strokeWeight(7);
                    line(pointA.x, pointA.y, pointB.x - 10, pointB.y);
                    line(pointA.x, pointA.y, pointB.x + 30, pointB.y - 3);
                }   
                else {
                    strokeWeight(3);
                    line(pointA.x, pointA.y, pointB.x - 10, pointB.y);
                    line(pointA.x, pointA.y, pointB.x + 30, pointB.y - 3);
                }
                pop();
            }
    
        }
    }
}