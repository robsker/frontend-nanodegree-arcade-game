// Class that represents the Keys that can be found on top row for extra points.
var Key = function() {
  GridObject.call(this, 'images/Key.png', 0, random(0, 4));
};

// Inherit from GameObject
Key.prototype = Object.create(GridObject.prototype);
Key.prototype.constructor = Key;

Key.prototype.pointsFor = function() {
  return 1000;
};
