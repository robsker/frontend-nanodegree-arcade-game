// Represents the player on our screen.
var Player = function() {
  // Starts at the bottom left of the screen
  GridObject.call(this, 'images/char-pink-girl.png', 5, 0);
};

// Inherit from GameObject
Player.prototype = Object.create(GridObject.prototype);
Player.prototype.constructor = Player;

// Function that handles keystroke input from the user.
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

// Will attempt to move the player to specified row and column.
// If the move involves an immovable object, this will prevent
// the player from moving to that location.
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
};

// Returns true if the player is safe at the top.
Player.prototype.isSafe = function() {
    return this.row === 0;
};
