const Grid = (positions) => {
  const cell = (classStr, idx) => {
    const cellDiv = document.createElement('div');
    cellDiv.className = classStr;
    cellDiv.id = `${idx}`;
    return cellDiv;
  };

  const cells = (size, classStr = 'cell') => {
    const grid = document.createElement('div');
    for (let i = 0; i < size; i += 1) {
      const cellDiv = cell(classStr, i);
      grid.appendChild(cellDiv);
    }
    return grid;
  };

  const makeGrid = (size, parent, classStr = 'battle-grid') => {
    const root = cells(size);
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
    removeShip(ship.position);
    ship.navigate(prevID, target.id);
    addShip(ship);
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
