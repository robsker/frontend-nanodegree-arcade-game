// Class that represents Gems on the board that our player can collect for points.
var Gem = function() {
  GridObject.call(this, null, random(1, 4), random(0, 4));

  // Randomly selecting the type of Gem this will be
  var rand = random(2, 5);
  if (rand === 2) {
    this.color = "Orange";
  } else if (rand === 3) {
    this.color = "Green";
  } else {
    this.color = "Blue";
  }
  this.sprite = 'images/Gem ' + this.color + '.png';
};

// Inherit from GameObject
Gem.prototype = Object.create(GridObject.prototype);
Gem.prototype.constructor = Gem;

Gem.prototype.pointsFor = function() {
  if (this.color === 'Orange') {
    return 200;
  } else if (this.color === 'Green') {
    return 500;
  } else {
    return 1000;
  }
};
