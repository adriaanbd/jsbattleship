class Ship {
  constructor(length = 2, position = [3, 6]) {
    this.length = length;
    this.position = position;
    this.lives = length;
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

  hit() {
    this.length -= 1;
    return true;
  }

  isSunk() {
    return this.lives < 1;
  }
}

export default Ship;
