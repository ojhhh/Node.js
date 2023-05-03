// 내장모듈 http, fs 사용
const http = require("http");
const fs = require("fs");

const server = http.createServer((req, res) => {
  // req : 요청 내용을 가지고 있는 객체
  // res : 응답 내용을 가지고 있는 객체
  // setHeader() : 응답 헤더 내용 설정
  res.setHeader("Content-Type", "application/json", "charset=utf-8");

  // 요청한 URL을 URL에 담음
  const URL = req.url;
  // 요청한 URL이 favicon이면 무시
  if (URL == "/favicon/ico") {
    // end() : 내용을 응답하고 종료하는 메소드
    // 응답을 하지 않으면 클라이언트는 요청이 올떄까지 대기
    res.end();
    return;
  }

  // 요청한 URL의 내용에 따라서 응답
  switch (URL) {
    case "/":
      fs.readFile("./views/main.html", (err, data) => {
        if (err) {
          // 파일을 불러오지 않으면 상태코드를 보냄
          // 404 : 파일을 불러오지 못함
          res.statusCode = 404;
          res.end("file not found");
        } else {
          // 파일이 잘 받아와 졌으면
          res.statusCode = 200;
          // 전달하는 컨텐츠의 내용은 html 파일
          res.setHeader("Content-Type", "text/html");
          res.end(data);
        }
      });
      break;
    case "/list":
      fs.readFile("./views/list.html", (err, data) => {
        if (err) {
          res.statusCode = 404;
          res.end("file not found");
        } else {
          res.statusCode = 200;
          res.setHeader("Content-Type", "text/html");
          res.end(data);
        }
      });
      break;
    case "/add":
      fs.readFile("./views/add.html", (err, data) => {
        if (err) {
          res.statusCode = 404;
          res.end("file not found");
        } else {
          res.statusCode = 200;
          res.setHeader("Content-Type", "text/html");
          res.end(data);
        }
      });
      break;

    default:
      break;
  }
});

// 서버를 대기상태로 만듬 port 번호 4000
server.listen(4000, () => {
  console.log("server on");
});
