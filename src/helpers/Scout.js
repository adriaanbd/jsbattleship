function Options(size) {
  const point = Math.floor(Math.random() * 100);
  const corners = [0, 9, 90, 99];
  const isEdge = (point + 1) % 10 === 0;
  const isBot = point > 90 && point < 99;
  const isTop = point > 0 && point < 9;

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
    let counters;
    if (corners.includes(point)) {
      if (point === 0) {
        counters = [1, 10];
      } else if (point === 9) {
        counters = [-1, 10];
      } else if (point === 90) {
        counters = [-10, 1];
      } else if (point === 99) {
        counters = [-10, -1];
      }
    } else if (isEdge) {
      counters = [-10, -1, 10];
    } else if (isTop) {
      counters = [-1, 1, 10];
    } else if (isBot) {
      counters = [-10, -1, 1];
    } else {
      counters = [-10, -1, 1, 10];
    }
    return counters;
  }

  const counters = setCounters(point);
  const positions = getPositions(point, counters);
  return positions;
}

export default Options;
