// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player
var allEnemies = new Array();

// The active player
var player = new Player();

// Players that have made it to the top safely
var safePlayers = new Array();

// Arrays for some board objects.
var allRocks = new Array();
var allGems = new Array();
var allKeys = new Array();

// Game progress information.
var score = 0;
var livesRemaining = 3;
var level = 1;

// How fast the enemies can move. This is variable per level.
var minEnemySpeed = 50;
var maxEnemySpeed = 120;

// Returns true if moving to the space is allowed.
function isSpaceFree(row, col) {
    var isFree = true;

    // Can't move where rocks are.
    isFree = !gridObjectAt(safePlayers, row, col);
    if (isFree) isFree = !gridObjectAt(allRocks, row, col);

    // Eats the Gem and scores points.
    if (isFree && gridObjectAt(allGems, row, col)) {
      score += allGems.pop().pointsFor();
    }

    // Eats the Key and scores points.
    if (isFree && gridObjectAt(allKeys, row, col)) {
      score += allKeys.pop().pointsFor();
    }

    return isFree;
};

// Generic function for determining if a GridObject instance lives at the row and column.
function gridObjectAt(objs, row, col) {
  var occupied = false;

  objs.forEach(function(obj) {
    if (!occupied) {
      occupied = obj.isAt(row, col);
    }
  });

  return occupied;
}

// Evaluates whether our Player made it to the top.
// If so, will score points and track the player in safePlayers array.
function evalSafePlayer() {
  if (player.isSafe()) {
    safePlayers.push(player);
    player = new Player();
    score += 100;
  }
}

// Are we done with the level?? Returns true, if so.
function allPlayersSafe() {
  return safePlayers.length > 4;
}

// Detects a collision between our enemy and player.
function detectEnemyCollision() {
  var collided = allEnemies.filter(function(enemy) {
    if (enemy.row !== player.row) return false;

    // Just eyeballing the pixels. Assuming our character occupies 40px of the 100 total.
    var playerLeft = player.x + 30;
    var playerRight = player.x + 70;
    var enemyLeft = enemy.x;
    var enemyRight = enemy.x + 100;

    // This is the collision logic.
    return enemyRight > playerLeft && enemyLeft < playerRight;
  });

  if (collided.length > 0) {
    player = new Player();
    livesRemaining--;
  }
}

// Function attempts to keep at least n (level) enemies on the board at all times.
// More enemies per level.
function evalEnemies() {
  var visibleEnemies = allEnemies.filter(function(enemy) {
      return !enemy.scrolledOff();
  });

  // Reset our allEnemies array to be the enemies that have not yet scrolled off.
  allEnemies = visibleEnemies.slice(0);

  // One extra temp filter that will make sure we start creating new
  // enemies when they're ABOUT to scroll off.
  // Just helps make sure there's a constant flow.
  visibleEnemies = visibleEnemies.filter(function(enemy) {
    return !enemy.aboutToScrollOff();
  });

  for (var i = 0; i < (level - visibleEnemies.length); i++) {
    createNewEnemy();
  }
}

// Create a new enemy and track it in our array.
function createNewEnemy() {
  var row = random(1, 5);
  if (row > 4) row = 4;
  allEnemies.push(new Enemy(row, random(minEnemySpeed, maxEnemySpeed)));
}

// Function to return a random value from the given range.
function random(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}

// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});
