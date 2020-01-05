import Grid from './components/Grid';
import Ship from './components/Ship';
// import Gameboard from './factories/board';
// const board = Gameboard();

const destroyer1 = new Ship();
const destroyer2 = new Ship();
const ships = [destroyer1, destroyer2];
destroyer1.location = [3, 6];
destroyer2.location = [5, 8];
const grid = Grid(ships);

const startApp = () => {
  const content = document.querySelector('#content');
  grid.makeGrid(9, content);
  grid.placeShips([destroyer1, destroyer2]);
  grid.setListeners(content);
};

document.addEventListener('DOMContentLoaded', () => startApp());
