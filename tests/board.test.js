import Gameboard from '../src/factories/board';
import Ship from '../src/factories/ship';

const destroyer = new Ship(2);
const cruiser = new Ship(3);
const submarine = new Ship(3);
const battleship = new Ship(4);
const carrier = new Ship(5);

const positions = {
  0: destroyer,
  10: destroyer,
  97: cruiser,
  98: cruiser,
  99: cruiser,
  35: submarine,
  45: submarine,
  55: submarine,
  54: carrier,
  64: carrier,
  74: carrier,
  84: carrier,
  94: carrier,
  23: battleship,
  24: battleship,
  25: battleship,
  26: battleship,
};

describe('receiveAttack', () => {
  const gameboard = new Gameboard(positions);
  test('receive attack in correct position returns true', () => {
    expect(gameboard.receiveAttack(10)).toBe(true);
  });
  test('receive attack in incorrect position returns false', () => {
    expect(gameboard.receiveAttack(11)).toBe(false);
  });
  test('expect reveive attack to hit ship in accurate position', () => {
    const initialLength = carrier.getLength();
    gameboard.receiveAttack(74);
    expect(carrier.getLength()).toEqual(initialLength - 1);
  });
});
