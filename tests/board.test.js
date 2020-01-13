import Board from '../src/factories/Board';
import Ship from '../src/factories/Ship';

const destroyer = Ship();
const carrier = Ship(5);
const positions = { 10: destroyer, 74: carrier };
const board = Board(100, positions);

describe('receiveAttack', () => {
  test('receive attack in correct position returns true', () => {
    expect(board.receiveAttack(10)).toBe(true);
  });
  test('receive attack in incorrect position returns false', () => {
    expect(board.receiveAttack(11)).toBe(false);
  });
});
