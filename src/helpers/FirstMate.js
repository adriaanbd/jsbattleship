class FirstMate {
  constructor(size = 2, point = 0) {
    this.size = size;
    this.point = point;
    this.counters = [];
    // this.positions = [];
  }

  getPositions() {
    const positions = [];
    this.counters.forEach((counter) => {
      let sum = this.point;
      const position = [this.point];
      for (let i = 1; i < this.size; i += 1) {
        sum += counter;
        position.push(sum);
      }
      positions.push(position);
    });
    return positions;
  }

  setCounters() {
    const y = Math.floor(this.point / 10);
    const x = this.point % 10;
    const counters = [];
    // y range
    if (y >= 5) {
      counters.push(-10);
      if (y + this.size <= 10) counters.push(10);
    } else {
      counters.push(10);
      if (y >= (this.size - 1)) counters.push(-10);
    }
    // x range
    if (x >= 5) {
      counters.push(-1);
      if (x + this.size <= 10) counters.push(1);
    } else {
      counters.push(1);
      if (x - (this.size - 1) >= 0) counters.push(-1);
    }
    this.counters = counters;
  }
}

export default FirstMate;
