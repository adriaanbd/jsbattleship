const Grid = () => {
  const cell = (classStr, idx) => {
    const cellDiv = document.createElement('div');
    cellDiv.className = classStr;
    cellDiv.id = `${idx}`;
    return cellDiv;
  };

  const cells = (size, classStr = 'cell') => {
    const grid = document.createElement('div');
    for (let i = 0; i < size; i += 1) {
      const cellDiv = cell(classStr, i);
      grid.appendChild(cellDiv);
    }
    return grid;
  };

  const makeGrid = (size, parent, classStr = 'battle-grid') => {
    const root = cells(size);
    root.className = classStr;
    parent.appendChild(root);
  };

  return {
    makeGrid,
  };
};

export default Grid;
