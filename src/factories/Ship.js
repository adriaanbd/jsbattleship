import FirstMate from '../helpers/FirstMate';

class Ship {
  constructor(length = 2, position = []) {
    this.length = length;
    this.position = position;
    this.lives = length;
    this.mate = new FirstMate(length);
  }

  setSail(positions) { // want to name it setSail
    const route = this.mate.routes(positions);
    this.position = route;
  }

  navigate(fromID, toID) {
    const diff = Math.abs(fromID - toID);
    const prevPosition = this.position;
    if (fromID > toID) {
      this.position = prevPosition.map((pos) => pos - diff);
    } else {
      this.position = prevPosition.map((pos) => pos + diff);
    }
  }

  isValidPos(pos) {
    const valid = pos < 100 && pos > 0;
    return valid;
  }

  hit() {
    this.lives -= 1;
    return true;
  }

  isSunk() {
    return this.lives === 0;
  }
}

export default Ship;
