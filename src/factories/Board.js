import Cells from '../components/Cells';
import Ship from './Ship';
import Options from '../helpers/Scout';

class Board {
  constructor(size = 100) {
    this.grid = Cells(size);
    this.cells = Array.from(this.grid.children);
    this.ships = [];
    this.positions = {};
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
      if (!isValid) {continue}
      validOptions.push(position);
    }
    console.log(validOptions);
    return validOptions;
  }

  setPosition(ship) {
    let point = Math.floor(Math.random() * 100);
    while (this.positions[point]) {
      point = Math.floor(Math.random() * 100);
    }
    const options = Options(ship.length, point);
    const validOptions = this.getValidOptions(options);
    const optionIdx = Math.floor(Math.random() * validOptions.length);
    const validShipLocation = validOptions[optionIdx];
    ship.position = validShipLocation;
  }

  addShip(ship) {
    if (!ship.position) this.setPosition(ship);
    ship.position.forEach((id) => {
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