import Cells from './Cells';

const Grid = (positions) => {
  const makeGrid = (size, parent, classStr = 'battle-grid') => {
    const root = Cells(size);
    root.className = classStr;
    parent.appendChild(root);
  };

  const addShip = (ship) => {
    ship.position.forEach((id) => {
      const cell = document.getElementById(`${id}`);
      cell.classList.add('ship');
      cell.draggable = true;
      positions[id] = ship; // add to state
    });
  };

  const placeShips = (shipsArray) => {
    shipsArray.forEach((ship) => {
      addShip(ship);
    });
  };

  const removeShip = (positionArray) => {
    positionArray.forEach((id) => {
      const cell = document.getElementById(`${id}`);
      cell.removeAttribute('draggable');
      cell.classList.remove('ship');
      delete positions[id]; // remove from state
    });
  };

  const dragStart = (event) => {
    event.dataTransfer.setData('text/plain', event.target.id);
  };

  const dragDrop = (event) => {
    const { dataTransfer, target } = event;
    const prevID = dataTransfer.getData('text');
    const ship = positions[prevID];
    const position = ship.position;
    ship.navigate(prevID, target.id); // change ship.position
    const isWithinValidRange = ship.position.every((id) => id < 9 && id >= 0);
    if (isWithinValidRange) {
      removeShip(position);
      addShip(ship);
    } else {
      ship.position = position;
    }
  };

  const dragOver = (event) => {
    event.preventDefault();
  };

  const dragEnter = (event) => {
    event.preventDefault();
  };

  const isValidDrag = (dragType, target) => {
    const isShip = target.classList.contains('ship');
    const isCell = target.classList.contains('cell');
    if (dragType === 'dragstart') { return isShip; }
    if (dragType === 'drop') { return !isShip && isCell; }
    if (dragType === 'dragenter') { return isCell; }
    if (dragType === 'dragover') { return isCell; }
  };

  const dragHandler = (event) => {
    const { type, target } = event;
    if (isValidDrag(type, target)) {
      switch (type) {
        case 'dragstart':
          dragStart(event);
          break;
        case 'drop':
          dragDrop(event);
          break;
        case 'dragenter':
          dragEnter(event);
          break;
        case 'dragover':
          dragOver(event);
          break;
        default:
          break;
      }
    }
  };

  const setListeners = (parent) => {
    parent.addEventListener('dragstart', (event) => dragHandler(event));
    parent.addEventListener('dragenter', (event) => dragHandler(event));
    parent.addEventListener('dragover', (event) => dragHandler(event));
    parent.addEventListener('drop', (event) => dragHandler(event));
  };

  return {
    makeGrid,
    placeShips,
    setListeners,
  };
};

export default Grid;
