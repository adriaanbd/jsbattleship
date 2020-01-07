import Board from '../src/factories/Board';
import Ship from '../src/factories/Ship';

const destroyer = new Ship();
const carrier = new Ship(5);
const positions = { 10: destroyer, 74: carrier };
const board = new Board(100, positions);

describe('receiveAttack', () => {
  test('receive attack in correct position returns true', () => {
    expect(board.receiveAttack(10)).toBe(true);
  });
  test('receive attack in incorrect position returns false', () => {
    expect(board.receiveAttack(11)).toBe(false);
  });
});

describe('Getting a Random Point on Grid', () => {
  describe('When there is a ship in the selected position', () => {
    it('Selects another random index in the grid', () => {
      const point = board.getPivotIndex(10);
      const isDiff = point !== 10;
      expect(isDiff).toBe(true);
    });
  });
});
