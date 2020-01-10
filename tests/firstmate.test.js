import FirstMate from '../src/helpers/FirstMate';

describe('Getting a position', () => {
  const mate = new FirstMate();
  describe('Getting a Random Point on Grid', () => {
    describe('When there is a ship in the selected position', () => {
      it('Selects another random index in the grid', () => {
        mate.setPivot({ 10: Object });
        const isDiff = mate.getPoint() !== 10;
        expect(isDiff).toBe(true);
      });
    });
  });
  describe('When the pivot is a corner', () => {
    describe('if corner is 0', () => {
      it('counters are 1 and 10', () => {
        mate.setPoint(0)
        const counters = mate.setCounters();
        expect(counters).toEqual([10, 1]);
      });
      it('positions are [0 10] and [0 1]', () => {
        mate.setPoint(0)
        const counters = mate.setCounters();
        const positions = mate.getPositions(counters);
        expect(positions).toEqual([[0, 10], [0, 1]]);
      });
    });
    describe('if corner is 9', () => {
      it('counters are 10 and -1', () => {
        mate.setPoint(9);
        const counters = mate.setCounters();
        expect(counters).toEqual([10, -1]);
      });
      it('positions are [9 19] and [9 8]', () => {
        const counters = mate.setCounters();
        const positions = mate.getPositions(counters);
        expect(positions).toEqual([[9, 19], [9, 8]]);
      });
    });
    describe('if corner is 90', () => {
      it('counters are -10 and 1', () => {
        mate.setPoint(90);
        const counters = mate.setCounters();
        expect(counters).toEqual([-10, 1]);
      });
      it('positions are [90 80] and [90 91]', () => {
        mate.setPoint(90);
        const counters = mate.setCounters();
        const positions = mate.getPositions(counters);
        expect(positions).toEqual([[90, 80], [90, 91]]);
      });
    });
    describe('if corner is 99', () => {
      it('counters are -10 and -1', () => {
        mate.setPoint(99);
        const counters = mate.setCounters();
        expect(counters).toEqual([-10, -1]);
      });
      it('positions are [99 88] and [99 98]', () => {
        mate.setPoint(99);
        const counters = mate.setCounters();
        const positions = mate.getPositions(counters);
        expect(positions).toEqual([[99, 89], [99, 98]]);
      });
    });
  });
  describe('When the pivot is an edge', () => {
    describe('Given it is at the top', () => {
      it('it does not have -10 as a counter', () => {
        mate.setPoint(5)
        const counters = mate.setCounters();
        expect(counters.includes(-10)).toBe(false);
      });
    });
    describe('Given it is at the bottom', () => {
      it('it does not have 10 as a counter', () => {
        mate.setPoint(95);
        const counters = mate.setCounters();
        expect(counters.includes(10)).toBe(false);
      });
    });
    describe('Given it is at the left', () => {
      it('it does not have -1 as a counter', () => {
        mate.setPoint(50);
        const counters = mate.setCounters();
        expect(counters.includes(-1)).toBe(false);
      });
    });
    describe('Given it is at the right', () => {
      it('it does not have 1 as a counter', () => {
        mate.setPoint(19);
        const counters = mate.setCounters();
        expect(counters.includes(1)).toBe(false);
      });
    });
  });
  describe('When the pivot is not a corner or an edge', () => {
    describe('Given the y value is less than 5', () => {
      describe('and the ship length does not fit', () => {
        it('does not suggest -10 as a counter', () => {
          mate.setPoint(30);
          mate.setSize(5);
          const counters = mate.setCounters();
          expect(counters.includes(-10)).toBe(false);
        });
        it('does suggests 10 as a counter', () => {
          mate.setPoint(30);
          mate.setSize(5);
          const counters = mate.setCounters();
          expect(counters.includes(10)).toBe(true);
        });
      });
      describe('and the ship length fits', () => {
        it('suggests -10 as a counter', () => {
          mate.setPoint(40);
          mate.setSize(5);
          const counters = mate.setCounters();
          expect(counters.includes(-10)).toBe(true);
        });
        it('does suggests 10 as a counter', () => {
          mate.setPoint(40);
          mate.setSize(5);
          const counters = mate.setCounters();
          expect(counters.includes(10)).toBe(true);
        });
      });
    });
    describe('Given the x value is 5 or greater', () => {
      describe('and the ship length does not fit', () => {
        it('does not suggest 10 as a counter', () => {
          mate.setPoint(60);
          mate.setSize(5);
          const counters = mate.setCounters();
          expect(counters.includes(10)).toBe(false);
        });
      });
      describe('and the ship length fits', () => {
        it('suggests 10 as counter', () => {
          mate.setPoint(50);
          mate.setSize(5);
          const counters = mate.setCounters();
          expect(counters.includes(10)).toBe(true);
        });
      });
    });
    describe('Given the x value is less than 5', () => {
      describe('and the ship does not fit', () => {
        it('does not suggest -1 as counter', () => {
          mate.setPoint(53);
          mate.setSize(5);
          const counters = mate.setCounters();
          expect(counters.includes(-1)).toBe(false);
        });
      });
      describe('and the ship does fit', () => {
        it('does suggest -1 as counter', () => {
          mate.setPoint(54);
          mate.setSize(5);
          const counters = mate.setCounters();
          expect(counters.includes(-1)).toBe(true);
        });
      });
    });
    describe('Given the y value is 5 or greater', () => {
      describe('and the ship does not fit', () => {
        it('does not suggest 1 as counter', () => {
          mate.setPoint(56);
          mate.setSize(5);
          const counters = mate.setCounters();
          expect(counters.includes(1)).toBe(false);
        });
      });
      describe('and the ship does fit', () => {
        it('does suggest 1 as counter', () => {
          mate.setPoint(55);
          mate.setSize(5);
          const counters = mate.setCounters();
          expect(counters.includes(1)).toBe(true);
        });
      });
    });
  });
});
