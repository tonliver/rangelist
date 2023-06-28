import Range from '@/Range';

describe('@/Range', () => {
  describe('[Constructor]', () => {
    it('throw error if missing second param using two number params', () => {
      expect(() => {
        // @ts-ignore
        return new Range(1);
      }).toThrowError();
    });
    it('throw error if start is greater than end', () => {
      expect(() => {
        return new Range(1, 0);
      }).toThrowError();
    });
  });

  it('[isIntersective]should return true if there is intersection between two ranges', () => {
    const range1 = new Range([1, 5]);
    const range2 = new Range([4, 6]);
    const range3 = new Range([7, 8]);

    expect(range1.isIntersective(range2)).toBe(true);
    expect(range1.isIntersective(range3)).toBe(false);
  });

  describe('[isBefore]', () => {
    it('[isBefore]should return true if current range\' start is smaller than param range and there is no intersection between them', () => {
      const range1 = new Range([1, 3]);
      const range2 = new Range([4, 5]);
  
      expect(range1.isBefore(range2)).toBe(true);
    });
  
    it('[isBefore]should return false if there is intersection between them', () => {
      const range1 = new Range([1, 3]);
      const range2 = new Range([2, 5]);
  
      expect(range1.isBefore(range2)).toBe(false);
    });
  
    it('[isBefore]should return false if current range\' start is greater than param range', () => {
      const range1 = new Range([5, 7]);
      const range2 = new Range([1, 3]);
  
      expect(range1.isBefore(range2)).toBe(false);
    });
  });

  it('[isEmpty]range is empty when start equals to end', () => {
    const range1 = new Range(1, 1);
    const range2 = new Range(1, 2);

    expect(range1.isEmpty()).toBe(true);    
    expect(range2.isEmpty()).toBe(false);
  });

  describe('[merge]', () => {
    it('should return copy of current range if param range has no intersection with current', () => {
      const range1 = new Range([1, 5]);
      const range2 = new Range([6, 7]);
      const mergedResult = range1.merge(range2);

      expect(mergedResult.toString()).toBe('[1, 5)');
    });

    it('should return merged range if there is intersection between two', () => {
      const range1 = new Range([1, 5]);
      const range2 = new Range([2, 7]);
      const mergedResult = range1.merge(range2);

      expect(mergedResult.toString()).toBe('[1, 7)');
    });
  });

  describe('[remove]', () => {
    it('should return copy of current range if there is no intersection between two ranges', () => {
      const range1 = new Range([1, 5]);
      const range2 = new Range([6, 7]);
      const result = range1.remove(range2);

      expect(result.length).toBe(1)
      expect(result[0].toString()).toBe('[1, 5)');
    });

    it('should return empty array if current range is totally inside param range', () => {
      const range1 = new Range([2, 5]);
      const range2 = new Range([1, 7]);
      const result = range1.remove(range2);

      expect(result.length).toBe(0);
    });

    it('should return array with two element which cut by instersection part if param range is totally inside current range', () => {
      const range1 = new Range([1, 7]);
      const range2 = new Range([2, 4]);
      const result = range1.remove(range2);

      expect(result.length).toBe(2);
      expect(result[0].toString()).toBe('[1, 2)');
      expect(result[1].toString()).toBe('[4, 7)');
    });

    it('should return array with one range element which remove intersection part if intersecting at start or end', () => {
      const range1 = new Range([3, 7]);
      const range2 = new Range([1, 4]);
  
      const result1 = range1.remove(range2);
      expect(result1.length).toBe(1);
      expect(result1[0].toString()).toBe('[4, 7)');

      const range3 = new Range([5, 8])
      const result2 = range1.remove(range3);
      expect(result2.length).toBe(1);
      expect(result2.toString()).toBe('[3, 5)');
    });
  });

  it('[clone]should return a new range has same start and end with current range', () => {
    const range = new Range([1, 2]);
    
    expect(range.clone().toString()).toBe('[1, 2)');
  });

  it('[toTuple]should return an array which first element is start of the range and second element is end of the range', () => {
    const range = new Range([1, 2]);
    const result = range.toTuple();
    
    expect(result.length).toBe(2);
    expect(result[0]).toBe(1);
    expect(result[1]).toBe(2);
  });
});
