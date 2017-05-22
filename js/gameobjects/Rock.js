// Represents an immovable Rock on our board.
var Rock = function() {
  // Don't allow this to be in row 1, as there would be no way to get safe above it.
  GridObject.call(this, 'images/Rock.png', random(2, 4), random(0, 4));
};

// Inherit from GameObject
Rock.prototype = Object.create(GridObject.prototype);
Rock.prototype.constructor = Rock;
