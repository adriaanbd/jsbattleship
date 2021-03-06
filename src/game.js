import Board from './factories/Board';

const Game = (size, parent) => {
  let turn = 0;
  let boards;
  let isGameOn = false;

  const isGame = () => isGameOn;

  const isOver = (board) => {
    const ships = board.getShips();
    return ships.every((s) => s.isSunk());
  };

  const enemyBoard = () => {
    if (turn === 0) return 1;
    return 0;
  };

  const getBoard = (id) => boards[id];

  const getBoards = () => boards;

  const switchTurn = () => {
    if (!isGameOn) {
      const winner = turn === 0 ? 'won' : 'lost';
      alert(`GAME OVER, you ${winner}! Please refresh/reload the page to play again.`);
      return;
    }
    turn = turn === 0 ? 1 : 0;
    if (turn === 1) {
      let point = Math.floor(Math.random() * size);
      const board = getBoard(enemyBoard());
      while (true) {
        if (!board.getShots()[point]) break;
        point = Math.floor(Math.random() * size);
      }
      const ship = board.getPositions()[point];
      const node = board.getCells()[point];
      if (ship) {
        ship.hit();
        node.style.backgroundColor = 'red';
      } else {
        node.style.backgroundColor = 'grey';
      }
      board.getShots()[point] = true;
      if (isOver(board)) {
        isGameOn = false;
      }
      switchTurn();
    }
  };

  const dragStart = (event) => {
    event.dataTransfer.setData('text/plain', event.target.id);
  };

  const dragDrop = (event, board) => {
    const { dataTransfer, target } = event;
    const prevID = dataTransfer.getData('text');
    const ship = board.getPositions()[prevID];
    if (!ship) {
      return;
    }
    const position = ship.getPosition();
    ship.navigate(prevID, target.id);
    const isWithinValidRange = ship.getPosition().every((id) => {
      const inGrid = id < 100 && id >= 0;
      const isShip = board.getPositions()[id];
      const myShip = board.getPositions()[id] === ship;
      if (inGrid && isShip) { return myShip; }
      return inGrid && !isShip;
    });
    if (isWithinValidRange) {
      board.removeShip(position);
      board.addShip(ship);
    } else {
      ship.setPosition(position);
    }
  };

  const dragOver = (event) => {
    event.preventDefault();
  };

  const dragEnter = (event) => {
    event.preventDefault();
  };

  const isValidDrag = (dragType, target) => {
    const isShip = target.classList.contains('ship');
    const isCell = target.classList.contains('cell');
    if (dragType === 'dragstart') { return isShip; }
    if (dragType === 'drop') { return !isShip && isCell; }
    if (dragType === 'dragenter') { return isCell; }
    if (dragType === 'dragover') { return isCell; }
    return false;
  };

  const dragHandler = (event) => {
    if (isGame()) return;
    const { type, target } = event;
    if (isValidDrag(type, target)) {
      if (type === 'dragstart') dragStart(event);
      else if (type === 'drop') {
        const board = getBoard(turn);
        dragDrop(event, board);
      } else if (type === 'dragenter') dragEnter(event);
      else if (type === 'dragover') dragOver(event);
    }
  };


  const clickHandler = (event) => {
    const { target } = event;
    const isCell = target.classList.contains('cell');
    const where = target.parentNode.classList.contains('left') ? 0 : 1;
    if (isCell && where === enemyBoard()) {
      isGameOn = true;
      const { id } = target;
      const board = getBoard(enemyBoard());
      const ship = board.getPositions()[id];
      const cell = board.getCells()[id];
      if (board.getShots()[id]) return;
      if (ship) { // its a hit
        cell.style.backgroundColor = 'red';
        delete board.getPositions()[id];
        ship.hit();
      } else { // its a miss
        cell.style.backgroundColor = 'grey';
      }
      board.getShots()[id] = true; // point played
      if (isOver(boards[enemyBoard()])) {
        isGameOn = false;
      }
      switchTurn();
    }
  };

  const setListeners = (root) => {
    const gameBoards = getBoards();
    root.addEventListener('dragstart', (event) => dragHandler(event, gameBoards));
    root.addEventListener('dragenter', (event) => dragHandler(event, gameBoards));
    root.addEventListener('dragover', (event) => dragHandler(event, gameBoards));
    root.addEventListener('drop', (event) => dragHandler(event, gameBoards));
    root.addEventListener('click', (event) => clickHandler(event));
  };

  const play = () => {
    boards = [Board(size), Board(size)];
    const content = document.querySelector(parent);
    boards[0].setUp(content, 'battle-grid left', 'human');
    boards[1].setUp(content, 'battle-grid right', 'computer');

    setListeners(content);
  };

  return {
    play,
  };
};

export default Game;
