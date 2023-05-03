// 모듈 더 알아보기
// global과 module은 생략 가능
console.log(module.exports === exports); // true

exports.obj = {
  a: 1,
};

exports.add = () => {
  return 2;
};

function add2() {
  console.log("im function");
}

exports.add2 = add2;
