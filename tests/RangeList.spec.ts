import RangeList from '@/RangeList';

describe('@/RangeList', () => {
  it('is empty by default', () => {
    const rangeList = new RangeList();

    expect(rangeList.toString()).toBe('');
  });

  describe('[add]', () => {
    it('should not make any changes if param range is empty', () => {
      const rangeList = new RangeList();
      rangeList.add([1, 1]);

      expect(rangeList.toString()).toBe('');
    });
    it('should add new range to list if param range has no intersection with existed ranges in list', () => {
      const rangeList = new RangeList();

      rangeList.add([1, 2])
        .add([3, 4]);

      expect(rangeList.toString()).toBe('[1, 2) [3, 4)');
    });

    it('should connect intersection part if param range has intersection with existed ranges in list', () => {
      const rangeList = new RangeList();

      rangeList.add([1, 3])
        .add([2, 4]);

      expect(rangeList.toString()).toBe('[1, 4)');
    });

    it('should connect intersection part if intersection part cover multiple existed ranges in list', () => {
      const rangeList = new RangeList();

      rangeList.add([1, 3])
        .add([5, 6])
        .add([9, 10])
        .add([1, 7]);

      expect(rangeList.toString()).toBe('[1, 7) [9, 10)');
    });
  });

  describe('[remove]', () => {
    it('should not make any changes if param range is empty', () => {
      const rangeList = new RangeList();
      rangeList.add([1, 2]);
      rangeList.remove([1, 1]);

      expect(rangeList.toString()).toBe('[1, 2)');
    });

    it('should not make any changes if param range has no intersection with ranges in list', () => {
      const rangeList = new RangeList();
      rangeList.add([1, 2]);

      expect(rangeList.toString()).toBe('[1, 2)');

      rangeList.remove([5, 6]);

      expect(rangeList.toString()).toBe('[1, 2)');
    });

    it('should remove range if param range is exactly same with one in list', () => {
      const rangeList = new RangeList();
      rangeList.add([1, 2])
        .add([4 ,5]);
      rangeList.remove([1, 2]);

      expect(rangeList.toString()).toBe('[4, 5)');
    });

    it('should split range if param range is totally inside one range in list', () => {
      const rangeList = new RangeList();
      rangeList.add([1, 10]);
        
      rangeList.remove([2, 3]);

      expect(rangeList.toString()).toBe('[1, 2) [3, 10)');
    });

    it('should remove all covered ranges if param range covers multiple ranges in list', () => {
      const rangeList = new RangeList();
      rangeList.add([1, 3])
        .add([4, 5])
        .add([6, 7])
        .add([9, 11]);
      
      expect(rangeList.toString()).toBe('[1, 3) [4, 5) [6, 7) [9, 11)');  

      rangeList.remove([2, 10]);

      expect(rangeList.toString()).toBe('[1, 2) [10, 11)');
    });
  });

  it('[toString]join all ranges with one space', () => {
    const rangeList = new RangeList();

    rangeList.add([1, 2])
      .add([3, 4]);

    expect(rangeList.toString()).toBe('[1, 2) [3, 4)');
  });
});