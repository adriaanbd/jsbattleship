function Options(size, point) {
  const inRange = (num) => num > 0 && num < 100;

  function getPositions(point, counters) {
    const positions = [];
    counters.forEach((counter) => {
      let sum = point;
      const position = [point];
      for (let i = 1; i < size; i += 1) {
        sum += counter;
        position.push(sum);
      }
      if (position.every((num) => inRange(num))) {
        positions.push(position);
      }
    });
    return positions;
  }

  function setCounters(point) {
    const y = Math.floor(point / 10);
    const x = point % 10;
    const counters = [];
    // y range
    if (y >= 5) {
      counters.push(-10);
      if (y + size <= 10) counters.push(10);
    } else {
      counters.push(10);
      if (y + 1 + size <= 10) counters.push(-10);
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
  }

  const counters = setCounters(point);
  const positions = getPositions(point, counters);
  return positions;
}

export default Options;
