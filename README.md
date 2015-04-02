### Conway's game of life
[![Coverage Status](https://coveralls.io/repos/boennemann/badges/badge.png)](https://coveralls.io/r/boennemann/badges)
## Methods :

```js

var Life = require('lifeGame');

var life = new Life(5, 4); // Create a 5*4 sized game of life.

life.initRandomState(12); // init 12 random cells to alive. FIX : It can be less than 12 if the same cell is setted twice

life.setAliveCell(1, 1); // set a cell to 1.

life.setDeadCell(2, 2); // set a cell to 0.

getCellState(1, 1); // return 0 for a dead cell. 1 for alive cell.

life.nextState(); // Move to the next state of the game.

console.log(life.grid); 

```
