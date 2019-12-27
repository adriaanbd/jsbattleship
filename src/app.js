import Grid from './interface/grid';

const grid = Grid();

document.addEventListener('DOMContentLoaded', () => {
  const content = document.querySelector('#content');
  grid.makeGrid(100, content);
});
