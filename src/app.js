import Grid from './components/Grid';
import Ship from './components/Ship';
// import Gameboard from './factories/board';
// const board = Gameboard();

const destroyer = new Ship();
const positions = { 3: destroyer, 6: destroyer };
const grid = Grid(positions);

const startApp = () => {
  const content = document.querySelector('#content');
  grid.makeGrid(9, content);
  grid.placeShips([destroyer]);
  grid.setListeners(content);
};

document.addEventListener('DOMContentLoaded', () => startApp());
