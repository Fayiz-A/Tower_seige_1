function displayText(information, coordinateX, coordinateY, color, size, font, style) {
  //this function makes the formatting of text possible in just one line

  push();
  if (color) {
    fill(color);
  }

  if (style) {
    textStyle(style);
  }

  if (font) {
    textFont(font);
  }

  if (size) {
    textSize(size);
  }

  text(information, coordinateX, coordinateY);
  pop();
}