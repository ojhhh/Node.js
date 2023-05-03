// HTTP 프로토콜을 사용해 네트워크 통신을 수행하는 모듈 만들기

// 요청과 응답을 처리하는 기능을 제공하는 모듈
// 내장모듈 http
const http = require("http");

const server = http.createServer((req, res) => {
  // createServer 메소드로 서버 객체를 만듬
  // req : http 요청의 정보 URL, 메소드(GET, POST 등) 헤더 정보, 바디의 내용을 담음
  // res : http 응답의 정보를 가지고 있는 객체. 상태 코드는 statusCode 응답 헤더, 바디의 내용이 있음

  // statusCode 200 == 성공
  res.statusCode = 200;

  // serHeader() : 응답 헤더의 내용을 설정
  // Content-Type : 응답의 내용
  // application/json : 응답의 내용을 JSON 형식의 데이터로 전송
  // charset=utf-8 : 응답 문자를 utf-8로 인코딩
  res.setHeader("Content-Type", "application/json", "charset=utf-8");
  // 요청한 URL 확인
  const URL = req.url;

  // 브라우저에 요청을 보내면 파비콘 URL을 자동으로 요청
  if (URL === "/favicon.ico") {
    res.end();
    return;
  }
  // end() : 응답하고 종료하는 메소드
  // 응답하는 내용은 매개변수로 전달
  // res.end("hi");

  switch (URL) {
    case "/":
      res.end("main page");
      break;
    case "/list":
      res.end("list page");
      break;
    case "/add":
      res.end("add page");
      break;
    default:
      break;
  }

  console.log(URL);
});

// listen 메소드의 첫번째 매개변수는 PORT
server.listen(4000, () => {
  console.log("server on");
});
