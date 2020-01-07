import Ship from '../src/factories/Ship';


describe('Behaviour', () => {
  describe('hit', () => {
    test('substracts lives by 1', () => {
      const ship = new Ship(3);
      const defaultLives = ship.lives;
      ship.hit();
      expect(ship.lives).toEqual(defaultLives - 1);
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
