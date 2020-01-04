import Cell from './Cell';

function Cells(size, className = 'cell') {
  const cells = document.createElement('div');
  for (let i = 0; i < size; i += 1) {
    const cell = Cell(className, i);
    cells.appendChild(cell);
  }
  return cells;
}

export default Cells;