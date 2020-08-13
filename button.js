class Button {
    constructor(x, y, text) {
        this.button = new Clickable();

        var button = this.button;//name spacing

        //positioning and dimensions
        button.x = x;
        button.y = y;
        button.width = 200;
        button.height = 70;
        
        //formatting of the button
        button.color = "blanchedAlmond";

        //text and its formatting
        button.textSize = 20;
        button.textFont = "GangOfThree";
        button.text = text;
    }

    display() {
        push();
        rectMode(CORNER);
        this.button.draw();
        pop();
    }
}