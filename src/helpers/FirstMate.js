const FirstMate = (size = 2, point = null) => {
  const getPoint = () => point;

  const setPoint = (newPoint) => {
    point = newPoint;
  };

  const setSize = (newSize) => {
    size = newSize;
  };

  const setCounters = () => {
    const y = Math.floor(point / 10);
    const x = point % 10;
    const counters = [];
    // y range
    if (y >= 5) {
      counters.push(-10);
      if (y + size <= 10) counters.push(10);
    } else {
      counters.push(10);
      if (y >= (size - 1)) counters.push(-10);
    }
    // x range
    if (x >= 5) {
      counters.push(-1);
      if (x + size <= 10) counters.push(1);
    } else {
      counters.push(1);
      if (x - (size - 1) >= 0) counters.push(-1);
    }
    return counters;
  };

  const getPositions = (counters = []) => {
    if (!counters) {
      counters = setCounters();
    }
    const positions = [];
    counters.forEach((counter) => {
      let sum = point;
      const position = [point];
      for (let i = 1; i < size; i += 1) {
        sum += counter;
        position.push(sum);
      }
      positions.push(position);
    });
    return positions;
  };

  const filterRoutes = (routes, positions) => {
    const validOptions = [];
    for (let i = 0; i < routes.length; i += 1) {
      const position = routes[i];
      const isValid = position.every((point) => !positions[point]);
      if (!isValid) continue;
      validOptions.push(position);
    }
    return validOptions;
  };

  const setPivot = (positions, gridSize = 100) => {
    let p;
    while (true) {
      p = Math.floor(Math.random() * gridSize);
      if (!positions[p]) {
        setPoint(p);
        break;
      }
    }
  };

  const selectRoute = (routes) => {
    const option = Math.floor(Math.random() * routes.length);
    const choice = routes[option];
    return choice;
  };

  const routes = (positions) => {
    if (!getPoint()) setPivot(positions);
    const counters = setCounters();
    const routes = getPositions(counters);
    const validRoutes = filterRoutes(routes, positions);
    const route = selectRoute(validRoutes);
    return route;
  };

  return {
    routes,
    setCounters,
    getPositions,
    setPoint,
    getPoint,
    setPivot,
    setSize,
  };
};

export default FirstMate;
