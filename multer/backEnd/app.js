// 이미지 업로드
// 이미지 파일을 서버측 컴퓨터에 폴더 저장
// 파일의 경로를 설정하고 서버측에서 이미지 파일을 가져와서 보여줌

// 사용할 모듈
// express path multer
// multer : 모듈을 사용해서 이미지 업로드. 파일이 저장될 경로나 파일의 확장자 이름들을 설정해서 파일을 저장

const express = require("express");
const session = require("express-session");
const path = require("path");
const multer = require("multer");
const cors = require("cors");
const dot = require("dotenv").config();
const { sequelize } = require("./models");

const uploadRouter = require("./routers/uploadRouter");
const signupRotuer = require("./routers/signupRouter");
const loginRotuer = require("./routers/loginRouter");
const mypageRouter = require("./routers/mypageRouter");

const app = express();

app.use(
  cors({
    origin: "http://127.0.0.1:5500",
    credentials: true,
  })
);

sequelize
  .sync({
    force: false,
  })
  .then((e) => {
    console.log("database connect");
  })
  .catch((err) => {
    console.error(err);
  });

app.use(
  session({
    secret: process.env.SESSION_KEY,
    resave: false,
    saveUninitialized: false,
  })
);

app.use(express.urlencoded({ extended: false }));

app.use("/img", express.static(path.join(__dirname, "uploads")));
// json 형식의 데이터를 전달 받았을때 json 파싱을 해서 자바스크립트 객체로 변환 시켜주는 미들웨어
app.use(express.json());

app.use("/upload", uploadRouter);
app.use("/signup", signupRotuer);
app.use("/login", loginRotuer);
app.use("/mypage", mypageRouter);

app.listen(8080, () => {
  console.log("Server On");
});
