import Cells from '../components/Cells';
import Ship from './Ship';

class Board {
  constructor(size = 100, positions = {}) {
    this.size = size;
    this.grid = Cells(size);
    this.cells = Array.from(this.grid.children);
    this.ships = [];
    this.positions = positions;
  }

  receiveAttack(pos) {
    const ship = this.positions[pos];
    if (ship) {
      ship.hit();
      return true;
    }
    return false;
  }

  createShips(sizes = [5, 4, 3, 3, 2]) {
    for (let i = 0; i < sizes.length; i += 1) {
      const ship = new Ship(sizes[i]);
      this.ships.push(ship);
    }
  }

  addShip(ship) {
    const hasPosition = ship.position.length;
    if (!hasPosition) ship.setSail(this.positions);
    const shipPos = ship.position;
    shipPos.forEach((id) => {
      const cell = this.cells[id];
      cell.classList.add('ship');
      cell.draggable = true;
      this.positions[id] = ship; // add to state
    });
  }

  addShips() {
    if (this.ships.length === 0) this.createShips();
    this.ships.forEach((ship) => {
      this.addShip(ship);
    });
  }

  removeShip(position) {
    position.forEach((id) => {
      const cell = this.cells[id];
      cell.removeAttribute('draggable');
      cell.removeAttribute('style');
      cell.classList.remove('ship');
      delete this.positions[id]; // remove from state
    });
  }

  dragStart(event) {
    event.dataTransfer.setData('text/plain', event.target.id);
  }

  dragDrop(event) {
    const { dataTransfer, target } = event;
    const prevID = dataTransfer.getData('text');
    const ship = this.positions[prevID];
    if (!ship) {
      return
    }
    const { position } = ship;
    ship.navigate(prevID, target.id); // change ship.position
    const isWithinValidRange = ship.position.every((id) => {
      const inGrid = id < 100 && id >= 0;
      const isShip = this.positions[id];
      const myShip = this.positions[id] === ship;
      if (inGrid && isShip) { return myShip; }
      return inGrid && !isShip;
    });
    if (isWithinValidRange) {
      this.removeShip(position);
      this.addShip(ship);
    } else {
      ship.position = position;
    }
  }

  dragOver(event) {
    event.preventDefault();
  }

  dragEnter(event) {
    event.preventDefault();
  }

  isValidDrag(dragType, target) {
    const isShip = target.classList.contains('ship');
    const isCell = target.classList.contains('cell');
    if (dragType === 'dragstart') { return isShip; }
    if (dragType === 'drop') { return !isShip && isCell; }
    if (dragType === 'dragenter') { return isCell; }
    if (dragType === 'dragover') { return isCell; }
  }

  dragHandler(event) {
    const { type, target } = event;
    if (this.isValidDrag(type, target)) {
      switch (type) {
        case 'dragstart':
          this.dragStart(event);
          break;
        case 'drop':
          this.dragDrop(event, this.positions);
          break;
        case 'dragenter':
          this.dragEnter(event);
          break;
        case 'dragover':
          this.dragOver(event);
          break;
        default:
          break;
      }
    }
  }

  setListeners(root) {
    root.addEventListener('dragstart', (event) => this.dragHandler(event));
    root.addEventListener('dragenter', (event) => this.dragHandler(event));
    root.addEventListener('dragover', (event) => this.dragHandler(event));
    root.addEventListener('drop', (event) => this.dragHandler(event));
  }

  setUp(root, gridName) {
    root.appendChild(this.grid);
    this.grid.className = gridName;
    this.addShips();
    this.setListeners(root);
  }
}

export default Board;