import Ship from '../src/factories/Ship';


describe('Behaviour', () => {
  describe('hit', () => {
    test('substracts lives by 1', () => {
      const ship = Ship(3);
      const defaultLives = ship.getLives();
      ship.hit();
      expect(ship.getLives()).toEqual(defaultLives - 1);
    });
  });

  describe('sunk', () => {
    test('returns false if length is greater than 0', () => {
      const ship = Ship(3);
      ship.hit();
      ship.hit();
      expect(ship.isSunk()).toBe(false);
    });

    test('returns true if length is 0', () => {
      const ship = Ship(3);
      ship.hit();
      ship.hit();
      ship.hit();
      expect(ship.isSunk()).toBe(true);
    });
  });
});
