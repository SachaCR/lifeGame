'use strict';

var expect = require('chai').expect;

var Life = require('../lib/life').Life;
var findChangingCells = require('../lib/life').findChangingCells;
var countAliveNeighbors = require('../lib/life').countAliveNeighbors;
var validateCoord = require('../lib/life').validateCoord;

describe('validateCoord', function() {
  it('should validate coordinates', function() {
    var result = validateCoord(1, 2, 3, 3);
    expect(result).to.equal(1);
  });
  it('should throw an error', function() {
    try{
      var result = validateCoord(5, 5, 5, 5);
      expect(result).to.not.exist;
    }
    catch (err) {
      expect(err).to.exist;
      expect(err.message).to.equal('coordinates are out of bounds');
    }
  });

  it('should throw an error', function() {
    try{
      var result = validateCoord(-1, 2, 3, 3);
      expect(result).to.not.exist;
    }
    catch (err) {
      expect(err).to.exist;
      expect(err.message).to.equal('coordinates are out of bounds');
    }
  });
});

describe('countAliveNeighbors', function() {
  it('should count 3 alive neighbors', function() {
    var life = new Life(2, 3);

    life.setAliveCell(0, 0);
    life.setAliveCell(1, 0);
    life.setAliveCell(1, 2);
    var count = countAliveNeighbors(1, 1, life.grid);
    expect(count).to.be.equal(3);

  });
});

describe('findChangingCells', function() {
  it('should find 5 changing cells', function() {
    var life = new Life(3, 3);

    life.setAliveCell(0, 0);
    life.setAliveCell(1, 0);
    life.setAliveCell(1, 2);
    var changingCells = findChangingCells(life.grid);
    expect(changingCells.length).to.be.equal(5);
    expect(changingCells[0].x).to.be.equal(0);
    expect(changingCells[0].y).to.be.equal(0);
    expect(changingCells[0].state).to.be.equal(0);

    expect(changingCells[1].x).to.be.equal(0);
    expect(changingCells[1].y).to.be.equal(1);
    expect(changingCells[1].state).to.be.equal(1);

    expect(changingCells[2].x).to.be.equal(1);
    expect(changingCells[2].y).to.be.equal(0);
    expect(changingCells[2].state).to.be.equal(0);

    expect(changingCells[3].x).to.be.equal(1);
    expect(changingCells[3].y).to.be.equal(1);
    expect(changingCells[3].state).to.be.equal(1);

    expect(changingCells[4].x).to.be.equal(1);
    expect(changingCells[4].y).to.be.equal(2);
    expect(changingCells[4].state).to.be.equal(0);
  });

  it('should find 5 changing cells', function() {
    var life = new Life(3, 3);

    life.setAliveCell(0, 1);
    life.setAliveCell(1, 0);
    life.setAliveCell(1, 1);
    life.setAliveCell(1, 2);
    life.setAliveCell(2, 1);

    var changingCells = findChangingCells(life.grid);
    expect(changingCells.length).to.be.equal(5);

    expect(changingCells[0].x).to.be.equal(0);
    expect(changingCells[0].y).to.be.equal(0);
    expect(changingCells[0].state).to.be.equal(1);

    expect(changingCells[1].x).to.be.equal(0);
    expect(changingCells[1].y).to.be.equal(2);
    expect(changingCells[1].state).to.be.equal(1);

    expect(changingCells[2].x).to.be.equal(1);
    expect(changingCells[2].y).to.be.equal(1);
    expect(changingCells[2].state).to.be.equal(0);

    expect(changingCells[3].x).to.be.equal(2);
    expect(changingCells[3].y).to.be.equal(0);
    expect(changingCells[3].state).to.be.equal(1);

    expect(changingCells[4].x).to.be.equal(2);
    expect(changingCells[4].y).to.be.equal(2);
    expect(changingCells[4].state).to.be.equal(1);
  });
});


describe('Life', function() {

  it('should return a life object initialized with 0', function() {
    var life = new Life(4,4);
    expect(life.height).to.equal(4);

    for (var i = 0; i < life.height; i++) {

      expect(life.width).to.equal(4);
      for (var j = 0 ; j < life.width; j++) {
        expect(life.getCellState(i, j)).to.equal(0);
      }
    }
  });

  it('should return an asymetric grid', function() {
    var life = new Life(4,3);
    expect(life.height).to.equal(4);

    for (var i = 0; i < life.height; i++) {

      expect(life.width).to.equal(3);
      for (var j = 0 ; j < life.width; j++) {
        expect(life.getCellState(i, j)).to.equal(0);
      }
    }
  });

  it('should return a life object initialized with 0', function() {
    var life = new Life(4, '4');
    expect(life.height).to.equal(4);

    for (var i = 0; i < life.height; i++) {

      expect(life.width).to.equal(4);
      for (var j = 0 ; j < life.width; j++) {
        expect(life.getCellState(i, j)).to.equal(0);
      }
    }
  });

  it('should return a life object initialized with 0', function() {
    var life = new Life('4', 4);
    expect(life.height).to.equal(4);

    for (var i = 0; i < life.height; i++) {

      expect(life.width).to.equal(4);
      for (var j = 0 ; j < life.width; j++) {
        expect(life.getCellState(i, j)).to.equal(0);
      }
    }
  });

  it('should throw an exception', function() {
    try {
      var life = new Life('a', 4);
      life.initRandomState(25);
    } catch(e) {
      expect(e).to.be.an.instanceof(Error);
      expect(e.message).to.be.equal('Width and height must be integer');
    }
  });

  it('should throw an exception', function() {
    try {
      var life = new Life(4, 'b');
      life.initRandomState(25);
    } catch(e) {
      expect(e).to.be.an.instanceof(Error);
      expect(e.message).to.be.equal('Width and height must be integer');
    }
  });

  describe('setAliveCell', function() {
    it('should set cell [1,1] to alive', function() {
      var life = new Life(3, 3);
      life.setAliveCell(1,1);
      expect(life.getCellState(1, 1)).to.be.equal(1);
    });

    it('should set cell [1,1] to alive', function() {
      var life = new Life(3, 3);
      life.setAliveCell('1',1);
      expect(life.getCellState(1, 1)).to.equal(1);
    });

    it('should throw an exception', function() {
      try {
        var life = new Life(3, 3);
        life.setAliveCell('a',1);
      } catch(e) {
        expect(e).to.be.an.instanceof(Error);
        expect(e.message).to.be.equal('x and y must be integer');
      }
    });

    it('should throw an exception', function() {
      try {
        var life = new Life(3, 3);
        life.setAliveCell(1, 'a');
      } catch(e) {
        expect(e).to.be.an.instanceof(Error);
        expect(e.message).to.be.equal('x and y must be integer');
      }
    });
  });

  describe('setDeadCell', function() {
    it('should set cells [1,1] to dead', function() {
      var life = new Life(3, 3);
      life.setAliveCell(1, 1);
      expect(life.getCellState(1, 1)).to.be.equal(1);
      life.setDeadCell(1, 1);
      expect(life.getCellState(1, 1)).to.be.equal(0);
    });

    it('should set cells [1,1] to dead', function() {
      var life = new Life(3, 3);
      life.setAliveCell(1, 1);
      expect(life.getCellState(1, 1)).to.be.equal(1);
      life.setDeadCell('1', 1);
      expect(life.getCellState(1, 1)).to.be.equal(0);
    });

    it('should throw an exception', function() {
      try {
        var life = new Life(3, 3);
        life.setDeadCell('a',1);
      } catch(e) {
        expect(e).to.be.an.instanceof(Error);
        expect(e.message).to.be.equal('x and y must be integer');
      }
    });

    it('should throw an exception', function() {
      try {
        var life = new Life(3, 3);
        life.setDeadCell(1, 'a');
      } catch(e) {
        expect(e).to.be.an.instanceof(Error);
        expect(e.message).to.be.equal('x and y must be integer');
      }
    });
  });

  describe('nextState', function() {
    it('should find the expect state', function() {
      var life = new Life(4, 4);

      life.setAliveCell(0, 0);
      life.setAliveCell(1, 0);
      life.setAliveCell(1, 2);
      expect(life.getCellState(1, 1)).to.be.equal(0);
      life.nextState();
      expect(life.getCellState(0, 0)).to.be.equal(0);
      expect(life.getCellState(0, 1)).to.be.equal(1);
      expect(life.getCellState(1, 0)).to.be.equal(0);
      expect(life.getCellState(1, 1)).to.be.equal(1);
      expect(life.getCellState(1, 2)).to.be.equal(0);
    });
  });

  describe('initRandomState', function() {
    it('should init a grid with random values', function() {
      var life = new Life(4, 4);
      life.initRandomState(5);
    });

    it('should init a grid with random values', function() {
      var life = new Life(4, 4);
      life.initRandomState('5');
    });

    it('should throw an error', function() {
      try {
        var life = new Life(4, 4);
        life.initRandomState('a');
      } catch (err) {
        expect(err).to.exist;
        expect(err.message).to.equal('nbAliveCells must be integer');
      }
    });
  });
});
