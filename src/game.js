import Board from './factories/Board';

const Game = (size, parent) => {
  let turn = 0;
  let boards;

  const enemyBoard = () => {
    return turn === 0 ? 1 : 0;
  };

  const switchTurn = () => {
    turn = turn === 0 ? 1 : 0;
  };

  const dragStart = (event) => {
    event.dataTransfer.setData('text/plain', event.target.id);
  };

  const dragDrop = (event, board) => {
    const { dataTransfer, target } = event;
    const prevID = dataTransfer.getData('text');
    const ship = board.positions[prevID];
    if (!ship) {
      return;
    }
    const { position } = ship;
    ship.navigate(prevID, target.id); // change ship.position
    const isWithinValidRange = ship.position.every((id) => {
      const inGrid = id < 100 && id >= 0;
      const isShip = board.positions[id];
      const myShip = board.positions[id] === ship;
      if (inGrid && isShip) { return myShip; }
      return inGrid && !isShip;
    });
    if (isWithinValidRange) {
      board.removeShip(position);
      board.addShip(ship);
    } else {
      ship.position = position;
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
    const { type, target } = event;
    if (isValidDrag(type, target)) {
      if (type === 'dragstart') dragStart(event);
      else if (type === 'drop') {
        const board = boards[turn];
        dragDrop(event, board);
      } else if (type === 'dragenter') dragEnter(event);
      else if (type === 'dragover') dragOver(event);
    }
  };

  const isOver = (board) => {
    const { ships } = board;
    return ships.every((s) => s.isSunk());
  };

  const clickHandler = (event) => {
    const { target } = event;
    const isCell = target.classList.contains('cell');
    const where = target.parentNode.classList.contains('left') ? 0 : 1;
    if (isCell && where === enemyBoard()) {
      const { id } = target;
      const board = boards[enemyBoard()];
      const ship = board.positions[id];
      const cell = board.cells[id];
      if (board.shots[id]) return; // if its been played
      if (ship) { // its a hit
        cell.style.backgroundColor = 'red';
        delete board.positions[id];
        ship.hit();
      } else { // its a miss
        cell.style.backgroundColor = 'grey';
      }
      board.shots[id] = true; // point played
      if (isOver(boards[enemyBoard()])) {
        console.log('GAME OVER!');
      }
      switchTurn();
      console.log('now it is the turn of: ', turn);
    }
  };

  const setListeners = (root, boards) => {
    root.addEventListener('dragstart', (event) => dragHandler(event, boards));
    root.addEventListener('dragenter', (event) => dragHandler(event, boards));
    root.addEventListener('dragover', (event) => dragHandler(event, boards));
    root.addEventListener('drop', (event) => dragHandler(event, boards));
    root.addEventListener('click', (event) => clickHandler(event));
  };


  const play = () => {
    boards = [new Board(size), new Board(size)];
    const content = document.querySelector(parent);
    boards[0].setUp(content, 'battle-grid left', 'human');
    boards[1].setUp(content, 'battle-grid right', 'computer');

    console.log(boards[0].positions, boards[1].positions);
    setListeners(content, boards);
  };

  return {
    play,
  };
};

export default Game;