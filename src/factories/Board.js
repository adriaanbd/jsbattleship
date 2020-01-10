import Ship from './Ship';
import Cell from '../components/Cell';

const Board = (size = 100, positions = {}) => {
  const grid = Cell.generateCells(size);
  const cells = Array.from(grid.childNodes);
  const ships = [];
  const shots = {};

  const getGrid = () => grid;

  const getPositions = () => positions;
  const setPosition = (id, ship) => {
    positions[id] = ship;
  };
  const getCells = () => cells;

  const getShips = () => ships;

  const getShots = () => shots;

  const noShips = () => getShips().length === 0;

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
      const ship = Ship(sizes[i]);
      ships.push(ship);
    }
  };
  
  const addShip = (ship, player = 'human') => {
    if (!ship.hasPosition()) {
      const boardPositions = getPositions();
      ship.setSail(boardPositions);
      console.log(boardPositions);
    }
    const shipPos = ship.getPosition();
    if (player === 'computer') {
      shipPos.forEach((id) => {
        setPosition(id, ship);
      });
    } else {
      shipPos.forEach((id) => {
        const cell = getCells()[id];
        cell.classList.add('ship');
        cell.draggable = true;
        setPosition(id, ship);
      });
    }
  };

  const addShips = (player) => {
    if (noShips()) {
      createShips();
    }
    const boardShips = getShips();
    boardShips.forEach((ship) => {
      addShip(ship, player);
    });
  };

  const removeShip = (position) => {
    position.forEach((id) => {
      const cell = getCells()[id];
      cell.removeAttribute('draggable');
      cell.removeAttribute('style');
      cell.classList.remove('ship');
      delete getPositions()[id]; // remove from state
    });
  };

  const setUp = (root, gridName, player) => {
    const grid = getGrid();
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
    getShips,
    addShip,
    createShips,
    removeShip,
  };
};

export default Board;