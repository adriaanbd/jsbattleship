function Cell(className, index) {
  const cell = document.createElement('div');
  cell.className = className;
  cell.id = `${index}`;
  return cell;
}

export default Cell;