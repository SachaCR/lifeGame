'use strict';

var validator = require('validator');

function randCoord(gridWidth, gridHeight) {
  return {
    x: Math.floor(Math.random() * gridWidth),
    y: Math.floor(Math.random() * gridHeight)
  };
}

function validateCoord(x, y, xMax, yMax) {
  if (!validator.isInt(x) || !validator.isInt(y)) {
    throw new Error('x and y must be integer');
  }

  x = validator.toInt(x);
  y = validator.toInt(y);

  if (x < 0 ||
      x >= xMax  ||
      y < 0 ||
      y >= yMax ) {
    throw new Error('coordinates are out of bounds');
  }

  return 1;
}

function countAliveNeighbors(x, y, grid) {
  validateCoord(x, y, grid.length, grid[0].length);

  var aliveNeighbors = 0;
  var neighbors = [
    { x: -1, y: -1 },
    { x: 1, y: 1 },
    { x: -1, y: 1 },
    { x: 1, y: -1 },
    { x: 0, y: -1 },
    { x: 0, y: 1 },
    { x: 1, y: 0 },
    { x: -1, y: 0 },
  ];

  for (var i = 0 ; i < neighbors.length ; i++) {
    var neiborCoord = {
      x: x + neighbors[i].x,
      y: y + neighbors[i].y
    };

    if (neiborCoord.x >= 0 &&
        neiborCoord.x < grid.length &&
        neiborCoord.y >= 0 &&
        neiborCoord.y < grid[x].length &&
        grid[neiborCoord.x][neiborCoord.y] === 1) {

        aliveNeighbors++;
    }
  }
  return aliveNeighbors;
}

function findChangingCells(grid) {

  var changingCells = [];

  for (var i = 0; i < grid.length; i++) {
    for (var j = 0 ; j < grid[i].length; j++) {

      var aliveNeighbors = countAliveNeighbors(i, j, grid);

      if (grid[i][j] === 0 && aliveNeighbors === 3) {
        changingCells.push({ x:i, y:j, state: 1 });
      } else if (grid[i][j] === 1 && (aliveNeighbors < 2 || aliveNeighbors > 3) ) {
        changingCells.push({ x:i, y:j, state: 0 });
      }

    }
  }
  return changingCells;
}

function Life(height, width) {
  if (!validator.isInt(width) || !validator.isInt(height)) {
    throw new Error('Width and height must be integer');
  }

  this.width = validator.toInt(width);
  this.height = validator.toInt(height);
  this.grid = [];

  for (var k = 0 ; k < this.height ; k++) {
     this.grid.push( new Array(this.width) );
  }

  // TODO replace with ES6 method array.fill() when available.
  for (var i = 0; i < this.grid.length; i++) {
    for (var j = 0 ; j < this.grid[i].length; j++) {
      this.grid[i][j] = 0;
    }
  }
}

Life.prototype.initRandomState = function initRandomState(nbAliveCells) {
  if (!validator.isInt(nbAliveCells) ) {
    throw new Error('nbAliveCells must be integer');
  }

  nbAliveCells = validator.toInt(nbAliveCells);

  for (var i = 0; i < nbAliveCells ; i++) {
    var coord = randCoord(this.width, this.height);
    this.grid[coord.x][coord.y] = 1;
  }
};

Life.prototype.setAliveCell = function initRandomState(x, y) {
  validateCoord(x, y, this.height, this.width);
  this.grid[x][y] = 1;
};

Life.prototype.setDeadCell = function initRandomState(x, y) {
  validateCoord(x, y, this.height, this.width);
  this.grid[x][y] = 0;
};

Life.prototype.getCellState = function getCellState(x, y) {
  validateCoord(x, y, this.height, this.width);
  return this.grid[x][y];
};

Life.prototype.nextState = function nextState() {
  var changingCells = findChangingCells(this.grid);
  for (var i = 0 ; i < changingCells.length ; i++) {
    var x = changingCells[i].x;
    var y = changingCells[i].y;
    this.grid[x][y] = changingCells[i].state;
  }
};

module.exports = {
  findChangingCells: findChangingCells,
  countAliveNeighbors: countAliveNeighbors,
  validateCoord: validateCoord,
  randCoord: randCoord,
  Life: Life
};
