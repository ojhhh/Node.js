// 웹서버 만들어보기

// 내장모듈 가져오기
const http = require("http");

// createServer 메소드
// 서버 객체를 만들어 주고 클라이언트의 요청을 받으면 호출
// 전달된 콜백 함수는 클라이언트의 요청을 받아 처리 후 클라이언트에 응답

const server = http.createServer((req, res) => {
  // 받은 요청을 처리 후 응답
  // utf-8로 인코딩 추가 해야 한글이 안깨짐
  res.end("server on");
});

// 포트 설정
const PORT = 4000;

// 서버 객체의 listen 메소드를 호출해서 클라이언트의 요청을 대기 상태로 만들어줌
// 이벤트 루프를 돌면서 요청을 기다리다가 요청이 오면 응답
// listen 메소드에 매개변수로 첫번째 매개변수로 port를 전달
server.listen(PORT, () => {
  // 콜백함수를 동록해서 서버가 열린것인지 확인 가능
  console.log("working " + PORT);
});

const os = require('os');

console.log('Platform:', os.platform());
console.log('CPU architecture:', os.arch());
console.log('Total memory:', os.totalmem());
console.log('Free memory:', os.freemem());
