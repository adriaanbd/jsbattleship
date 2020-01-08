import FirstMate from '../src/helpers/FirstMate';

describe('Getting a position', () => {
  const mate = new FirstMate();
  describe('When the pivot is a corner', () => {
    describe('if corner is 0', () => {
      mate.point = 0;
      mate.setCounters();
      it('counters are 1 and 10', () => {
        expect(mate.counters).toEqual([10, 1]);
      });
      it('positions are [0 10] and [0 1]', () => {
        const positions = mate.getPositions();
        expect(positions).toEqual([[0, 10], [0, 1]]);
      });
    });
    describe('if corner is 9', () => {
      it('counters are 10 and -1', () => {
        mate.point = 9;
        mate.setCounters();
        expect(mate.counters).toEqual([10, -1]);
      });
      it('positions are [9 19] and [9 8]', () => {
        const positions = mate.getPositions();
        expect(positions).toEqual([[9, 19], [9, 8]]);
      });
    });
    describe('if corner is 90', () => {
      it('counters are -10 and 1', () => {
        mate.point = 90;
        mate.setCounters();
        expect(mate.counters).toEqual([-10, 1]);
      });
      it('positions are [90 80] and [90 91]', () => {
        const positions = mate.getPositions();
        expect(positions).toEqual([[90, 80], [90, 91]]);
      });
    });
    describe('if corner is 99', () => {
      it('counters are -10 and -1', () => {
        mate.point = 99;
        mate.setCounters();
        expect(mate.counters).toEqual([-10, -1]);
      });
      it('positions are [99 88] and [99 98]', () => {
        const positions = mate.getPositions();
        expect(positions).toEqual([[99, 89], [99, 98]]);
      });
    });
  });
  describe('When the pivot is an edge', () => {
    describe('Given it is at the top', () => {
      it('it does not have -10 as a counter', () => {
        mate.point = 5;
        mate.setCounters();
        expect(mate.counters.includes(-10)).toBe(false);
      });
    });
    describe('Given it is at the bottom', () => {
      it('it does not have 10 as a counter', () => {
        mate.point = 95;
        mate.setCounters();
        expect(mate.counters.includes(10)).toBe(false);
      });
    });
    describe('Given it is at the left', () => {
      it('it does not have -1 as a counter', () => {
        mate.point = 50;
        mate.setCounters();
        expect(mate.counters.includes(-1)).toBe(false);
      });
    });
    describe('Given it is at the right', () => {
      it('it does not have 1 as a counter', () => {
        mate.point = 19;
        mate.setCounters();
        expect(mate.counters.includes(1)).toBe(false);
      });
    });
  });
  describe('When the pivot is not a corner or an edge', () => {
    describe('Given the y value is less than 5', () => {
      describe('and the ship length does not fit', () => {
        it('does not suggest -10 as a counter', () => {
          mate.point = 30;
          mate.size = 5;
          mate.setCounters();
          expect(mate.counters.includes(-10)).toBe(false);
        });
        it('does suggests 10 as a counter', () => {
          mate.point = 30;
          mate.size = 5;
          mate.setCounters();
          expect(mate.counters.includes(10)).toBe(true);
        });
      });
      describe('and the ship length fits', () => {
        it('suggests -10 as a counter', () => {
          mate.point = 40;
          mate.size = 5;
          mate.setCounters();
          expect(mate.counters.includes(-10)).toBe(true);
        });
        it('does suggests 10 as a counter', () => {
          mate.point = 40;
          mate.size = 5;
          mate.setCounters();
          expect(mate.counters.includes(10)).toBe(true);
        });
      });
    });
    describe('Given the x value is 5 or greater', () => {
      describe('and the ship length does not fit', () => {
        it('does not suggest 10 as a counter', () => {
          mate.point = 60;
          mate.size = 5;
          mate.setCounters();
          expect(mate.counters.includes(10)).toBe(false);
        });
      });
      describe('and the ship length fits', () => {
        it('suggests 10 as counter', () => {
          mate.point = 50;
          mate.size = 5;
          mate.setCounters();
          expect(mate.counters.includes(10)).toBe(true);
        });
      });
    });
    describe('Given the x value is less than 5', () => {
      describe('and the ship does not fit', () => {
        it('does not suggest -1 as counter', () => {
          mate.point = 53;
          mate.size = 5;
          mate.setCounters();
          expect(mate.counters.includes(-1)).toBe(false);
        });
      });
      describe('and the ship does fit', () => {
        it('does suggest -1 as counter', () => {
          mate.point = 54;
          mate.size = 5;
          mate.setCounters();
          expect(mate.counters.includes(-1)).toBe(true);
        });
      });
    });
    describe('Given the y value is 5 or greater', () => {
      describe('and the ship does not fit', () => {
        it('does not suggest 1 as counter', () => {
          mate.point = 56;
          mate.size = 5;
          mate.setCounters();
          expect(mate.counters.includes(1)).toBe(false);
        });
      });
      describe('and the ship does fit', () => {
        it('does suggest 1 as counter', () => {
          mate.point = 55;
          mate.size = 5;
          mate.setCounters();
          expect(mate.counters.includes(1)).toBe(true);
        });
      });
    });
  });
});
