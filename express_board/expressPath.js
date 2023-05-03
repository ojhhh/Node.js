// express path
// path는 내장 모듈
// path 모듈은 경로에 대한 조작을 도와주는 모듈
// 파일시스템의 상대경로나 절대경로를 설정 할 수 있도록 도와주는 모듈
// 상대경로나 절대경로를 쉽게 연결 할 수 있도록 메소드를 지원

const express = require("express");

const path = require("path");

// 서버 인스턴스 생성
const app = express();

// get 방식으로 요청해서 데이터를 가져오는 메소드
app.get("/", (req, res) => {
  // join 메소드 : 전달 받은 경로를 합쳐주는 동작을 수행
  const body = path.join(__dirname, "views", "index.html");
  // console.log(body);
  // sendFile 메소드 : html 파일을 브라우저로 보냄
  res.sendFile(body);
});

// list.html 불러오기
app.get("/list", (req, res) => {
  const list = path.join(__dirname, "views", "list.html");
  res.sendFile(list);
});

// mypage.html 불러오기
app.get("/mypage", (req, res) => {
  const mypage = path.join(__dirname, "views", "mypage.html");
  res.sendFile(mypage);
});

app.listen(4000, () => {
  console.log("Server On");
});
