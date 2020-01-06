import Grid from './components/Grid';
import Ship from './components/Ship';
import Options from './helpers/Scout';
// import Gameboard from './factories/board';
// const board = Gameboard();

const destroyer1 = new Ship();
const destroyer2 = new Ship();
// const ships = [
//   new Ship(), new Ship(3), new Ship(3), new Ship(4), new Ship(5),
// ];

const ships = [
  new Ship(), new Ship(3),
];
ships[0].location = [0, 1];
ships[1].location = [99, 98, 97];
const grid = Grid(ships);

const startApp = () => {
  const content = document.querySelector('#content');
  grid.makeGrid(100, content);
  grid.placeShips([destroyer1, destroyer2]);
  grid.setListeners(content);
};

document.addEventListener('DOMContentLoaded', () => startApp());
const choices = Options(5);
console.log(choices);
