// MVC (Model - View - Controller)
// ㄴ 가장 많이 사용하는 디자인 패턴. 유지보수와 확장성을 고려해서 개발 할 수 있음
// ㄴ 협업간의 코드의 표준화도 용이
// Model : 데이터를 다루는 로직으로 글 선택, 작성 등의 어플리케이션의 기능을 관리하는 폴더
// View : 사용자가 볼 수 있는 화면의 데이터를 표시 해주는 역할
// Controller : model 과 view의 사이에서 동작을 제어해주는 역할로 model의 상태를 가지고 view에 반영
// 이런 디자인 패턴으로 작업을 하면 유지보수와 코드의 표준화를 유지 할 수 있음

// 1. package.json 기본 값으로 설정해서 생성
// npm init -y
// 2. exporess 만들기
// sudo npm install express
// 3. 서버 대기 상태로 만들기
// 4. ejs , mysql2 설치
// sudo npm install ejs mysql2

const express = require("express");
const path = require("path");
// 라우터 객체 가져오기
const postRoute = require("./routes/posts");

const app = express();

// express 환경변수
app.set("views", path.join(__dirname, "page"));
app.set("view engine", "ejs");

// 미들웨어
app.use(express.urlencoded({ extended: false }));
// postRoute 객체에 get 메소드로 / 루트 경로를 지정했을때 "/posts" 경로로 추가되어 라우팅
app.use("/posts", postRoute);
// public 폴더의 파일들을 쓰기 위해 정적 경로 설정
// 아래 경로를 "/css" 같이 설정 할 수도 있지만 없을 경우 기본적으로 "/" 경로 지정
// app.use("/css",express.static(path.join(__dirname, "public")));
// "/css" 로 설정한 경우 ejs 파일의 link href를 /css/main.css로 설정 해야함
app.use(express.static(path.join(__dirname, "public")));

app.listen(8080, () => {
  console.log("Server On");
});
