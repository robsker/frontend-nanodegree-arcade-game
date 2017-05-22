// Base class that provides basic information for any object on our game board.
var GameObject = function(sprite, x, y) {
  this.sprite = sprite;
  this.x = x;
  this.y = y;
}

GameObject.prototype.moveX = function(distance) {
  this.x += distance;
};

GameObject.prototype.moveY = function(distance) {
  this.y += distance;
};

// Draws all objects on the screen, required method for game
GameObject.prototype.render = function() {
  ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Override this in subclasses to update the object in its own specific way.
// Enemies will implement this differently than will GridObjects.
GameObject.prototype.update = function(dt) {
  // Abstract by default.
};
