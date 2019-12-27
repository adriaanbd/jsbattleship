const Ship = (length = 2) => {
  const hit = () => {
    length -= 1;
    return true;
  };

  const getLength = () => length;

  const isSunk = () => length === 0;

  return {
    getLength,
    isSunk,
    hit,
  };
};

export default Ship;
