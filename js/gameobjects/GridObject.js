// Base class for objects that can occupy a certain area on the board grid.
// The only object this does NOT apply to will be our Enemies.
var GridObject = function(sprite, row, col) {
  GameObject.call(this, sprite, 0, 0);

  // All GridObjects occupy a row and column.
  this.row = row;
  this.col = col;
};

// Inherit from GameObject
GridObject.prototype = Object.create(GameObject.prototype);
GridObject.prototype.constructor = GridObject;

GridObject.prototype.update = function(dt) {
    this.x = this.col * 100;
    this.y = (this.row * 80) - 20; // just eyeballing how it looks
};

// Returns true if this GridObject is located at the specified row and column.
GridObject.prototype.isAt = function(row, col) {
  return this.row === row && this.col === col;
};
