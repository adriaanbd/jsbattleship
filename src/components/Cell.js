class Cell {
  static generateCells(amount, className = 'cell') {
    const cells = document.createElement('div');
    for (let i = 0; i < amount; i += 1) {
      const cell = document.createElement('div');
      cell.id = i;
      cell.className = className;
      cells.appendChild(cell);
    }
    return cells;
  }
}

export default Cell;