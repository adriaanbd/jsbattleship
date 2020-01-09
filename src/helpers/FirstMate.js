class FirstMate {
  constructor(size = 2, point = null) {
    this.size = size;
    this.point = point;
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
    return counters;
  }

  getPositions(counters = []) {
    if (!counters) {
      this.counters = this.setCounters();
    }
    const positions = [];
    counters.forEach((counter) => {
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

  filterRoutes(routes, positions) {
    const validOptions = [];
    for (let i = 0; i < routes.length; i += 1) {
      const position = routes[i];
      const isValid = position.every((point) => !positions[point]);
      if (!isValid) continue;
      validOptions.push(position);
    }
    return validOptions;
  }

  setPivot(positions, gridSize = 100) {
    let point;
    while (true) {
      point = Math.floor(Math.random() * gridSize);
      if (!positions[point]) {
        this.point = point;
        break;
      }
    }
  }

  selectRoute(routes) {
    const option = Math.floor(Math.random() * routes.length);
    const choice = routes[option];
    return choice;
  }

  routes(positions) {
    if (!this.point) this.setPivot(positions);
    const counters = this.setCounters();
    const routes = this.getPositions(counters);
    const validRoutes = this.filterRoutes(routes, positions);
    const route = this.selectRoute(validRoutes);
    return route;
  }
}

export default FirstMate;
