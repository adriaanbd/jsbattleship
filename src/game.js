import Board from './factories/Board';

const Game = (size, parent) => {
  const play = () => {
    const leftBoard = new Board(size);
    const rightBoard = new Board(size);
    const content = document.querySelector(parent);

    leftBoard.setUp(content, 'battle-grid');
    rightBoard.setUp(content, 'battle-grid');
  };

  return {
    play,
  };
};

export default Game;