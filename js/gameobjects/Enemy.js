// Enemies our player must avoid
var Enemy = function(row, speed) {
    // -101 x makes sure the enemy starts just offscreen.
    GameObject.call(this, 'images/enemy-bug.png', -101, 0);

    this.speed = speed;
    this.row = row;

    // Just eyeballing the y val per row
    if (row === 1) {
      this.y = 60;
    } else if (row === 2) {
      this.y = 145;
    } else if (row === 3) {
      this.y = 230;
    } else if (row === 4) {
      this.y = 310;
    }
};
// Inherit from GameObject
Enemy.prototype = Object.create(GameObject.prototype);
Enemy.prototype.constructor = Enemy;

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
  // You should multiply any movement by the dt parameter
  // which will ensure the game runs at the same speed for
  // all computers.
  this.moveX(this.speed*dt);
};

// Returns true if the Enemy has scrolled off the board.
Enemy.prototype.scrolledOff = function() {
  return this.x > 505;
};

// Returns true if the Enemy is one length away from scrolling off the board.
Enemy.prototype.aboutToScrollOff = function() {
  return this.x > 405;
}
