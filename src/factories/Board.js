import Cells from '../components/Cells';
import Ship from './Ship';
import Options from '../helpers/Scout';

class Board {
  constructor(size = 100, positions = {}) {
    this.grid = Cells(size);
    this.cells = Array.from(this.grid.children);
    this.ships = [];
    this.positions = positions;
    this.size = size;
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

  getValidOptions(options) {
    const validOptions = [];
    for (let i = 0; i < options.length; i += 1) {
      const position = options[i];
      const isValid = position.every((point) => !this.positions[point]);
      if (!isValid) continue
      validOptions.push(position);
    }
    return validOptions;
  }

  getRandomIndex(containerLength) {
    let point;
    let position;
    while (true) {
      point = Math.floor(Math.random() * containerLength);
      position = this.positions[point];
      if (!position) return point;
    }
  }

  setPosition(shipLength, point = null) {
    if (!point) point = this.getRandomIndex(this.size);
    const options = Options(shipLength, point);
    const validOptions = this.getValidOptions(options);
    const optionIdx = Math.floor(Math.random() * validOptions.length);
    const validShipLocation = validOptions[optionIdx];
    return validShipLocation;
  }

  addShip(ship) {
    const hasPosition = ship.position.length;
    if (!hasPosition) {
      ship.position = this.setPosition(ship.length);
    }
    const shipPos = ship.position;
    shipPos.forEach((id) => {
      const cell = this.cells[id];
      cell.classList.add('ship');
      cell.draggable = true;
      this.positions[id] = ship; // add to state
    });
  }

  placeShips() {
    if (this.ships.length === 0) this.createShips();
    this.ships.forEach((ship) => {
      this.addShip(ship);
    });
  }

  removeShip(ship) {
    const { position } = ship;
    position.forEach((id) => {
      const cell = this.cells[id];
      cell.removeAttribute('draggable');
      cell.removeAttribute('style');
      cell.classList.remove('ship');
      delete this.positions[id]; // remove from state
    });
  }

  setUp(root, gridName) {
    root.appendChild(this.grid);
    this.grid.className = gridName;
    this.parent = root;
    this.placeShips();
  }
}

export default Board;