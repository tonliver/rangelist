import RangeList from '@/RangeList';

function log(...args: any[]) {
  console.log('output: ', ...args, );
}

const r1 = new RangeList();
log(r1.toString()); // should be ''

r1.add([1, 5]);
log(r1.toString()); // should be '[1, 5)'

r1.add([10, 20]);
log(r1.toString()); // should be '[1, 5) [10, 20)'

r1.add([20, 20]);
log(r1.toString()); // should be '[1, 5) [10, 20)'

r1.add([20, 21]);
log(r1.toString()); // should be '[1, 5) [10, 21)'

r1.add([2, 4]);
log(r1.toString()); // should be '[1, 5) [10, 21)'

r1.add([3, 8]);
log(r1.toString()); // should be '[1, 8) [10, 21)'

r1.remove([10, 10]);
log(r1.toString()); // should be '[1, 8) [10, 21)'

r1.remove([10, 11]);
log(r1.toString()); // should be '[1, 8) [11, 21)'

r1.remove([15, 17]);
log(r1.toString()); // should be '[1, 8) [11, 15) [17, 21)'

r1.remove([3, 19]);
log(r1.toString()); // should be '[1, 3) [19, 21)'