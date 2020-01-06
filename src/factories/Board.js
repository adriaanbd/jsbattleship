import Cells from '../components/Cells';

function Board(ships) {
  let rootNode;
  let cellsArr;
  const positions = {};

  const getPositions = () => positions;

  const makeGrid = (size, parent, classStr = 'battle-grid') => {
    // board = new Array(size);
    rootNode = Cells(size);
    cellsArr = Array.from(rootNode.children);
    rootNode.className = classStr;
    parent.appendChild(rootNode);
  };

  const receiveAttack = (pos) => {
    const ship = positions[pos];
    if (ship) {
      ship.hit();
      return true;
    }
    return false;
  };

  const addShip = (ship) => {
    ship.position.forEach((id) => {
      const cell = cellsArr[id];
      cell.classList.add('ship');
      cell.draggable = true;
      positions[id] = ship; // add to state
    });
  };

  const placeShips = () => {
    ships.forEach((ship) => {
      addShip(ship);
    });
  };

  const removeShip = (ship) => {
    const { position } = ship;
    position.forEach((id) => {
      const cell = cellsArr[id];
      cell.removeAttribute('draggable');
      cell.removeAttribute('style');
      cell.classList.remove('ship');
      delete positions[id]; // remove from state
    });
  };

  return {
    addShip,
    placeShips,
    removeShip,
    getPositions,
    receiveAttack,
    makeGrid,
  };
}

export default Board;