// http 요청과 응답을 좀더 편하게 사용할 수 있도록 도와주는 모듈
// express : nodejs에서 제일 인기 많은 모듈
// nodejs 프레임워크
// http 요청과 응답을 더 쉽게 작성할 수 있도록 도와줌
// 기본적인 기능만 포함
// 자유도 높고 라우팅 미들웨어 등등 개발자가 원하는 방식으로 구성할 수 있음
// 본인만의 보일러 플레이팅이 가능
// 보일러 플레이팅은 반복적인 작업을 피할 수 있도록 개발자가 미리 작성하여 사용하므로 개발의 생산성을 향상 시킴

// express 사용
// express 설치
// npm init -y
// npm install express
// npm i express

// express 모듈 가져오기
const express = require("express");

// 서버 객체 생성
const app = express();

// 메소드 사용
// 요청의 내용이 get 메소드인지 post 메소드인지
// app.get();
// app.post();

// get 방식으로 요청이 들어오면
app.get("/", (req, res) => {
  // send 메소드로 응답하고 종료
  res.send("hello nodejs");
});

// 서버 대기 상태
app.listen(5000, () => {
  console.log("Server On");
});

// package.json

// "scripts": {
//   "test": "echo \"Error: no test specified\" && exit 1",
//   "start": "node index.js"
// },

// start 명령어는 npm start 로 동작
// 별도의 네이밍으로 작성한 스크립트 명령어를 실행 할 수 있음
// 예) npm run start
