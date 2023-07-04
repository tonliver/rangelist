import RangeTuple from './RangeTuple';
import Range from './Range';

export default class RangeList {
  protected ranges: Range[] = [];

  /**
   * add new range to list
   * @param {RangeTuple} range - range to add to list
   * @returns {RangeList}
   */
  public add(range: RangeTuple): RangeList {
    let newRange = new Range(range);
    if (newRange.isEmpty()) {
      return this;
    }
    
    let positionOfNewRange = 0;
    let countOfMergedRange = 0;

    for (let currentRange of this.ranges) {
      if (newRange.isBefore(currentRange)) {
        break;
      }
      if (newRange.isIntersective(currentRange)) {
        newRange = newRange.merge(currentRange);
        countOfMergedRange += 1;
      } else {
        positionOfNewRange += 1;
      }
    }
    this.ranges.splice(positionOfNewRange, countOfMergedRange, newRange);

    return this;
  }

  /**
   * remove a range from list
   * @param {RangeTuple} range - range to remove from list 
   * @returns {RangeList}
   */
  public remove(range: RangeTuple): RangeList {
    const rangeToRemove = new Range(range);
    
    if (rangeToRemove.isEmpty()) {
      return this;
    }

    let positionOfFirstIntersectiveRange = 0;
    let countOfModifiedRanges = 0;
    const modifiedRanges = [];

    for (let currentRange of this.ranges) {
      if (rangeToRemove.isBefore(currentRange)) {
        break;
      }
      if (!rangeToRemove.isIntersective(currentRange)) {
        positionOfFirstIntersectiveRange += 1;
        continue;
      }
      const remainRanges = currentRange.remove(rangeToRemove);
      if (remainRanges.length > 0) {
        modifiedRanges.push(...remainRanges);
      }
      countOfModifiedRanges += 1;
    }

    this.ranges.splice(positionOfFirstIntersectiveRange, countOfModifiedRanges, ...modifiedRanges);
    return this;
  }

  public toString(): string {
    return this.ranges.join(' ');
  }
}
