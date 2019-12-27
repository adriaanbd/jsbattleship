const Gameboard = (positions) => {
  const receiveAttack = (pos) => {
    const ship = positions[pos];
    if (ship) {
      ship.hit();
      return true;
    }
    return false;
  };
  return {
    receiveAttack,
  };
};

export default Gameboard;
