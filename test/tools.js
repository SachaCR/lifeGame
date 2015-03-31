'use strict';

var expect = require('chai').expect;

var Life = require('../lib/life');
var findChangingCells = require('../lib/tools').findChangingCells;
var countAliveNeighbors = require('../lib/tools').countAliveNeighbors;
var validateCoord = require('../lib/tools').validateCoord;

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
