import Ship from './Ship';
import Cell from '../components/Cell';

class Board {
  constructor(size = 100, positions = {}) {
    this.size = size;
    this.grid = Cell.generateCells(size);
    this.cells = Array.from(this.grid.childNodes);
    this.ships = [];
    this.positions = positions;
    this.shots = {};
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

  addShip(ship, player = 'human') {
    const hasPosition = ship.position.length;
    if (!hasPosition) ship.setSail(this.positions);
    const shipPos = ship.position;
    if (player === 'computer') {
      shipPos.forEach((id) => {
        this.positions[id] = ship;
      });
    } else {
      shipPos.forEach((id) => {
        const cell = this.cells[id];
        cell.classList.add('ship');
        cell.draggable = true;
        this.positions[id] = ship; // add to state
      });
    }
  }

  addShips(player) {
    if (this.ships.length === 0) this.createShips();
    this.ships.forEach((ship) => {
      this.addShip(ship, player);
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

  setUp(root, gridName, player) {
    root.appendChild(this.grid);
    this.grid.className = gridName;
    this.addShips(player);
  }
}

export default Board;