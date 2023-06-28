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
   * @returns 
   */
  public remove(range: RangeTuple) {
    const targetRange = new Range(range);
    
    if (targetRange.isEmpty()) {
      return;
    }
    let positionOfFirstIntersectiveRange = 0;
    let countOfModifedRanges = 0;
    const modifiedRanges = [];
    for (let currentRange of this.ranges) {
      if (targetRange.isBefore(currentRange)) {
        break;
      }
      if (!targetRange.isIntersective(currentRange)) {
        positionOfFirstIntersectiveRange += 1;
        continue;
      }
      const removedResult = currentRange.remove(targetRange);
      if (removedResult.length > 0) {
        modifiedRanges.push(...removedResult);
      }
      countOfModifedRanges += 1;
    }

    this.ranges.splice(positionOfFirstIntersectiveRange, countOfModifedRanges, ...modifiedRanges);
  }

  public toString(): string {
    return this.ranges.join(' ');
  }
}
