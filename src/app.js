import Board from './factories/Board';

const startApp = () => {
  const content = document.querySelector('#content');
  const board = new Board(100);
  board.setUp(content, 'battle-grid');
};

document.addEventListener('DOMContentLoaded', () => startApp());
