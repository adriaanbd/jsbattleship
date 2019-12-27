import Grid from './interface/grid';

const grid = Grid(100);

const makeGrid = (parent, classStr, idStr, cellClass) => {
  const gridNode = grid.cells(classStr, idStr, cellClass)
  parent.appendChild(gridNode);
};

document.addEventListener('DOMContentLoaded', () => {
  const content = document.querySelector('#content');
  makeGrid(content, 'battle-grid', 'left-grid', 'cell');
  // makeGrid(content, 'battle-grid', 'right-grid', 'cell');
});
