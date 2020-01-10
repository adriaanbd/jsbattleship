import FirstMate from '../helpers/FirstMate';

const Ship = (length = 2, position = []) => {
  let lives = length;
  const mate = new FirstMate(length);

  const getLives = () => lives;

  const setSail = (positions) => {
    const route = mate.routes(positions);
    position = route;
  };

  const navigate = (fromID, toID) => {
    const diff = Math.abs(fromID - toID);
    const prevPosition = position;
    if (fromID > toID) {
      position = prevPosition.map((pos) => pos - diff);
    } else {
      position = prevPosition.map((pos) => pos + diff);
    }
  };

  const isValidPos = (pos) => {
    const valid = pos < 100 && pos > 0;
    return valid;
  };

  const hit = () => {
    lives -= 1;
    return true;
  };

  const isSunk = () => lives === 0;

  return {
    isSunk,
    hit,
    navigate,
    setSail,
    isValidPos,
    getLives,
  };
};

export default Ship;
