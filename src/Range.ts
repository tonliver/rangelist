import RangeTuple from './RangeTuple';

export default class Range {
  protected start: number;
  protected end: number;

  constructor(rangeTuple: RangeTuple)
  constructor(start: number, end: number)
  constructor(start: number | RangeTuple, end?: number) {
    if (Array.isArray(start)) {
      [start, end] = start;
    } else if (typeof end !== 'number') {
      throw new Error('second param(end of the range) is required.');
    }
    if (start > end) {
      throw new Error('[Range.constructor]start cannot be greater than end.')
    }
    this.start = start;
    this.end = end;
  }

  /**
   * determine if target range has an intersecting part with current range instance
   * @param {Range} range - target range instance
   * @returns {boolean}
   */
  public isIntersective(range: Range): boolean {
    const [start, end] = range.toTuple();

    return !(start > this.end || end < this.start);
  }

  /**
   * determine if the target range is before current range instance
   * @param {Range} range - target range instance
   * @returns {boolean}
   */
  public isBefore(range: Range): Boolean {
    const [start] = range.toTuple();

    return this.end < start;
  }

  /**
   * determine if current range instance is an empty range
   * @returns {boolean}
   */
  public isEmpty(): boolean {
    return this.start === this.end;
  }

  /**
   * merge the range given in params with current instance.
   * Rules
   * 1. return copy of current instance if there is no intersection between two ranges.
   * 2. return a new range which start is minimum of two ranges and end is maximum of two ranges
   *    if there is intersection between two ranges. 
   * @param {Range} range - range instance to merge
   * @returns {Range} - new range instance after merging
   */
  public merge(range: Range): Range {
    if (!this.isIntersective(range)) {
      return this.clone();
    }
    const [start, end] = range.toTuple();

    return new Range(Math.min(start, this.start), Math.max(end, this.end));
  }

  /**
   * remove the range given in params from current instance
   * Rules:
   * current range instance - C
   * param range instance - P
   * 1. no intersection - return array with one element which is copy of C
   * 2. P is totally inside C - return array with two range elements which cutting by P
   * 3. P's start is ahead of C's start and end is ahead C's end - array with one element which is a range using P's start and C's end
   * 4. P's start is behind C's start and end is bebind C's end - array with one element which is a range using C's start and P's end
   * 5. C is inside P - empty array
   * @param {Range} range - range to remove from current instance
   * @returns {Range[]} - array of new range instance after removing
   */
  public remove(range: Range): Range[] {
    if (!this.isIntersective(range)) {
      return [this.clone()];
    }

    const results = [];
    const [start, end] = range.toTuple();
    
    if (this.start < start) {
      results.push(new Range(this.start, start));
    }
    if (this.end > end) {
      results.push(new Range(end, this.end));
    }

    return results;
  }

  /**
   * return a new range which is copy of current instance
   * @returns {Range}
   */
  public clone(): Range {
    return new Range(this.start, this.end);
  }

  /**
   * return an array which first element is start of current range, second element is end of current range
   * @example
   * const range = new Range(1, 2);
   * range.toTuple(); // [1, 2]
   * @returns {RangeTuple}
   */
  public toTuple(): RangeTuple {
    return [this.start, this.end];
  }

  public toString(): string {
    return `[${this.start}, ${this.end})`;
  }
}