const dragStart = (event) => {
  event.dataTransfer.setData('text/plain', event.target.id);
};

const dragDrop = (event) => {
  const { dataTransfer, target } = event;
  const prevID = dataTransfer.getData('text');
  const ship = positions[prevID];
  const position = ship.position;
  ship.navigate(prevID, target.id); // change ship.position
  const isWithinValidRange = ship.position.every((id) => {
    const inGrid = id < 100 && id >= 0;
    const isShip = positions[id];
    const myShip = positions[id] === ship;
    if (inGrid && isShip) { return myShip; }
    return inGrid && !isShip;
  });
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