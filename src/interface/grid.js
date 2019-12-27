const Grid = (size) => {
  const node = (classStr, idStr) => {
    const grid = document.createElement('div');
    grid.className = classStr;
    grid.id = idStr;
    return grid;
  };

  const cell = (classStr, idx) => {
    const cellDiv = document.createElement('div');
    cellDiv.className = classStr;
    cellDiv.id = `${idx}`;
    return cellDiv;
  };

  const cells = (classStr, idStr, cellClass) => {
    const grid = node(classStr, idStr);
    for (let i = 0; i < size; i += 1) {
      const cellDiv = cell(cellClass, i);
      grid.appendChild(cellDiv);
    }
    return grid;
  };

  return {
    cells,
  };
};

export default Grid;
