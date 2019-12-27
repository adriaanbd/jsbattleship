import Ship from '../src/factories/ship';


describe('Behaviour', () => {
  describe('hit', () => {
    test('substracts length by 1', () => {
      const ship = new Ship(3);
      const oldLength = ship.getLength();
      ship.hit();
      expect(ship.getLength()).toEqual(oldLength - 1);
    });
  });

  describe('sunk', () => {
    test('returns false if length is greater than 0', () => {
      const ship = new Ship(3);
      ship.hit();
      ship.hit();
      expect(ship.isSunk()).toBe(false);
    });

    test('returns true if length is 0', () => {
      const ship = new Ship(3);
      ship.hit();
      ship.hit();
      ship.hit();
      expect(ship.isSunk()).toBe(true);
    });
  });
});
