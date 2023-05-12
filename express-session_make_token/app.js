//

const express = require("express");
const jwt = require("jsonwebtoken");
// dotenv 모듈을 가져오면서 config 메소드 실행
// 비밀키를 가지고 토큰을 만들어 암호화 시킬 예정
const dot = require("dotenv").config();
// proecce.env. : .env에 작성한 KEY 값을 가지고 있음
const KEY = process.env.KEY;

const path = require("path");
const app = express();
const PORT = 8080;

// JWT(JSON Web Token)
// 웹 표준으로 두 객체의 JSON 객체를 사용해서 정보를 안정성 있게 전달
// JWT은 사용할 정보를 자체적으로 가지고 있음(유저 정보)
// JWT로 발급한 토큰은 기본정보(유저의 정보 프로필)
// 토큰이 정상인지 검증(서명이 포함)

// 로그인이 정상인지 회원 인증 권한에서 사용
// JWT은 유저가 로그인을 요청하면 서버에서 유저의 정보를 가지고 정상적인 루트로 로그인을 요청한 유저면 토큰을 발급
// JWT를 가지고 있는 유저가 서버에 요청?을 보내면 토큰을 검사하여 유저가 요청한 작업을 처리

// JWT를 쓰는 이유는 안정성 있게 정보를 전달
// JWT를 생성하면 사용할 모듈이 인코딩과 해싱 작업을 해줌
// HMAC : 해싱 기법을 적용해서 메시지의 이변조를 방지하는 기법
// SHA-256 : 임의의 길이 메시지를 256비트의 축약된 메시지로 만들어 내는 해시 알고리즘

// JWT 구조

// let header = {
//   alg: "SHA256", // 사용하는 해싱 알고리즘
//   type: "JWT", // 토큰 타입
// };
// let payload = {
//   sub: "sub", // 토큰 이름
//   name: "root", // 유저의 이름(유저 프로필)
//   lat: "123", // 토큰 발급 시간
// };

// 토큰 서명 발급
// 비밀키 생성
// header : 타입과 알고리즘의 정보를 가지고 있음
// payload : 유저의 정보와 만료 기간이 포함된 객체를 가지고 있음
// signature : header, payload을 인코딩 후 합친 뒤 해싱하여 비밀키로 만듬
// let signature = HMACSHA256(BASE64URL(header)) + BASE64URL(payload);

// 접속 유지에 필요한 토큰 발행
// 사용 모듈 express, jsonwebtoken, dotenv
// dotenv : 어플리케이션을 마들면서 설정값을 작성해 두는 곳(보안에 민감한 정보를 모아둠)

app.set("views", path.join(__dirname, "page"));
app.set("view engine", "ejs");

app.use(express.urlencoded({ extended: false }));

app.get("/", (req, res) => {
  res.render("main");
});

// 로그인
app.post("/login", (req, res) => {
  // 로그인 성공 시 토큰 발급. 유저정보는 변수로 만듬
  const name = "user1";
  const KEY = process.env.KEY;
  // sign() :  토큰 생성
  // 첫번째 매개변수 : 헤더 객체
  // 두번째 매개변수 : 비밀키
  // 세번째 매개변수 : payload 객체
  let token = jwt.sign(
    {
      type: "JWT",
      name: name,
    },
    KEY,
    {
      // 토큰 유효시간
      expiresIn: "5m", // 5분동안 유지
      issuer: "user1", // 토큰을 발급한 사람
    }
  );
  res.send(JSON.stringify(token));
});

app.listen(PORT, () => {
  console.log("Server On");
});
