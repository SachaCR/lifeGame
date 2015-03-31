'use strict';

var validator = require('validator');

var validateCoord = require('./tools').validateCoord;
var findChangingCells = require('./tools').findChangingCells;
var randCoord = require('./tools').randCoord;

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

  for(var i = 0; i < nbAliveCells ; i++) {
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

module.exports = Life;
