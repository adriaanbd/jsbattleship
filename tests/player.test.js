import Player from '../src/factories/Player';

describe('Player attributes', () => {
  const player = new Player('maya');
  const player2 = new Player('maya2', 'computer');
  test('name attribute to not be undefined', () => {
    expect(player.name).not.toBeUndefined();
  });
  test('name attribute present in Player object', () => {
    expect(player.name).toBe('maya');
  });
  test('type attribute to not be undefined', () => {
    expect(player.type).not.toBeUndefined();
  });
  test('type attribute present in Player object when not defined', () => {
    expect(player.type).toBe('human');
  });
  test('type attribute present in Player object when defined', () => {
    expect(player2.type).toBe('computer');
  });
});
