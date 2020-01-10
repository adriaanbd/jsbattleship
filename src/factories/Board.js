import Ship from './Ship';
import Cell from '../components/Cell';

const Board = (size = 100, positions = {}) => {
  const grid = Cell.generateCells(size);
  const cells = Array.from(grid.childNodes);
  const ships = [];
  const shots = {};

  const getPositions = () => positions;

  const getCells = () => cells;

  const getShots = () => shots;

  const receiveAttack = (pos) => {
    const ship = getPositions()[pos];
    if (ship) {
      ship.hit();
      return true;
    }
    return false;
  };

  const createShips = (sizes = [5, 4, 3, 3, 2]) => {
    for (let i = 0; i < sizes.length; i += 1) {
      const ship = new Ship(sizes[i]);
      ships.push(ship);
    }
  };

  const addShip = (ship, player = 'human') => {
    const hasPosition = ship.position.length;
    if (!hasPosition) ship.setSail(positions);
    const shipPos = ship.position;
    if (player === 'computer') {
      shipPos.forEach((id) => {
        positions[id] = ship;
      });
    } else {
      shipPos.forEach((id) => {
        const cell = cells[id];
        cell.classList.add('ship');
        cell.draggable = true;
        positions[id] = ship;
      });
    }
  };

  const addShips = (player) => {
    if (ships.length === 0) this.createShips();
    ships.forEach((ship) => {
      addShip(ship, player);
    });
  };

  const removeShip = (position) => {
    position.forEach((id) => {
      const cell = cells[id];
      cell.removeAttribute('draggable');
      cell.removeAttribute('style');
      cell.classList.remove('ship');
      delete positions[id]; // remove from state
    });
  };

  const setUp = (root, gridName, player) => {
    root.appendChild(grid);
    grid.className = gridName;
    addShips(player);
  };

  return {
    setUp,
    receiveAttack,
    getPositions,
    getCells,
    getShots,
    createShips,
    removeShip,
  };
};

export default Board;