// nodejs 내장 모듈
// nodejs에는 미리 만들어놓은 모듈을 내장 모듈이라고 함
// require에서 모듈 경로와 파일명을 적는게 아니라 모듈의 이름만 작성

// 운영체제 정보가 들어있는 모듈
const os = require("os");
console.log(os);

// nodejs의 내장 객체
// node의 전역 객체 global
// nodejs 모듈의 실행 컨텍스트와 전역 컨텍스트가 다르기 때문에 모듈은 각각의 파일 스코프를 가지고 있기 때문에 this는 모듈 자체를 가르키게 됨

// global.console.time() // 코드 시작 시간
// global.console.timeEnd() // 코드 종료 후 시간 출력
// global.console.table({a:{ name : "hi"}, b: {name: "hello"},c : {name: "hihello"}})

// 실행시키면 실행한 파일의 이름까지 보여줌
console.log(__filename);
// 실행한 파일의 폴더까지 경로를 보여줌
console.log(__dirname);

// process 객체
process.env;
// node 설치 버전 확인
process.version;
// node 설치 경로 확인
process.execPath;
// cpu 사용량
process.cpuUsage();
