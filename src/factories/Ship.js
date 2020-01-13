import FirstMate from '../helpers/FirstMate';

const Ship = (length = 2, position = []) => {
  let lives = length;
  const mate = FirstMate(length);

  const getLength = () => length;
  const getPosition = () => position;
  const setPosition = (pos) => {
    position = pos;
  };
  const getLives = () => lives;
  const hasPosition = () => position.length > 0;

  const setSail = (positions) => {
    const route = mate.routes(positions);
    setPosition(route);
  };

  const navigate = (fromID, toID) => {
    const diff = Math.abs(fromID - toID);
    const prevPosition = getPosition();
    if (fromID > toID) {
      setPosition(prevPosition.map((pos) => pos - diff));
    } else {
      setPosition(prevPosition.map((pos) => pos + diff));
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
    getPosition,
    setPosition,
    getLength,
    hasPosition,
  };
};

export default Ship;
