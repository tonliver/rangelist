# RangeList

## Code organization
```
|- build          // config file for build
|- docs           // ts docs
|- src            // implementation source code
  |- Range.ts
  |- RangeList.ts
|- tests          // unit tests
  |- Range.spec.ts
  |- RangeList.spec.ts
```

## Example
```ts
import RangeList from './RangeList';

const rangeList = new RangeList();

rangeList.add([1, 2]);
rangeList.remove([3, 4]);
```

## Qucik start
### Install all required packages
```shell
npm install
```
### Run example
```shell
npm run app
```
### All commands
```shell
npm run app     # run example
npm run test    # run all unit test
npm run doc     # generate ts docs
npm run build   # build code for production env
```