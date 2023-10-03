const circularShapes = require('./circular-shapes'); // 모듈 불러오기
const { getCircumference } = require("./circular-shapes");
// 비구조화 할당을 통해 모듈 내의 특정 함수만 불러올 수도 있다.
// getCircumference 라는 이름을 가진 속성의 value를 import.
const path = require('path');
// 내부 모듈의 경우 경로 대신 모듈 이름을 입력

const r = 10; 

console.log(`Circumference - ${circularShapes.getCircumference(r)}`);

const myFile = '/wonjun/home/kweb/example.js';
const dirname = path.dirname(myFile);
console.log(dirname);
const basename = path.basename(myFile);
console.log(basename);
const extname = path.extname(myFile);
console.log(extname);

console.log(getCircumference);