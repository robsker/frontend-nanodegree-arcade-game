// Enemies our player must avoid
var Enemy = function(rowNum) {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started
    this.x = -101;
    this.y = rowNum * 145; // just eyeballing ... 62, 145
    this.speed = 50;

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    this.x = this.x+(this.speed*dt);
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

Enemy.prototype.isVisible = function() {
    return this.x > 505;
};

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
var Player = function() {
    this.row = 5;
    this.col = 0;
    this.x = 0;
    this.y = 0; // just eyeballing ... 62, 145

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/char-boy.png';
};

Player.prototype.update = function(dt) {
    this.x = this.col * 100;
    this.y = (this.row * 80) - 20; // just eyeballing ... 62, 145
};

// Draw the enemy on the screen, required method for game
Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

Player.prototype.handleInput = function(keypress) {
    var desiredCol = this.col;
    var desiredRow = this.row;

    if (keypress === 'left') {
        desiredCol--;
    } else if (keypress === 'right') {
        desiredCol++;
    } else if (keypress === 'up') {
        desiredRow--;
    } else if (keypress === 'down') {
        desiredRow++;
    }

    this.move(desiredRow, desiredCol);
};

Player.prototype.move = function(row, col) {
    if (col < 0) col = 0;
    if (col > 4) col = 4;
    if (row < 0) row = 0;
    if (row > 5) row = 5;

    if (isSpaceFree(row, col)) {
        this.row = row;
        this.col = col;
    }

    this.update();

    if (this.row === 0) {
        playerSafe(this);
    }
};

// Return true if there is a Player who is already safe at the specified column.
Player.prototype.isSafeAt = function(col) {
    return this.row === 0 && this.col === col;
};

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player
var allEnemies = new Array();
var numEnemies = 1;
allEnemies.push(new Enemy(numEnemies));

// The active player
var player = new Player();

// Players that have made it to the top safely
var safePlayers = new Array();

function isSpaceFree(row, col) {
    var isFree = true;
    if (row === 0) {
        safePlayers.forEach(function(safePlayer) {
            if (safePlayer.isSafeAt(col)) {
                isFree = false;
            }
        });
    }

    return isFree;
};

function playerSafe(safePlayer) {
    safePlayers.push(safePlayer);
    player = new Player();
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
