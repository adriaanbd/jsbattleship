class Ship {
  constructor(length = 2, position = null) {
    this.length = length;
    this.position = position;
    this.lives = length;
  }

  get location() {
    return this.position;
  }

  set location(arr) {
    this.position = arr;
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
    const valid = pos < 9 && pos > 0;
    return valid;
  }

  hit() {
    this.length -= 1;
    return true;
  }

  isSunk() {
    return this.lives < 1;
  }
}

export default Ship;
