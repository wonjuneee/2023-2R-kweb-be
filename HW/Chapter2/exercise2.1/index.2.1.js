// Code 2.22 Exercise 2.1 Example
const cases = require('./cases'); // 비구조화 할당으로 특정 함수만 import하는 것도 가능

const n = 8;
const r = 3;

console.log(`n = ${n}, r = ${r}`)
console.log(`Permutation: ${cases.permutation(n, r)}`);
console.log(`Combination: ${cases.combination(n, r)}`);
console.log(`Multi Permutation: ${cases.multiPermutation(n, r)}`);
console.log(`Multi Combination: ${cases.multiCombination(n, r)}`);