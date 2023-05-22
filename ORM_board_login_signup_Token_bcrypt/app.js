// login 기능 및 게시글 수정 삭제

const express = require("express");
const session = require("express-session");
// dotenv는 프로젝트 내에서 한번 선언해주면 모든 파일에 적용됨
// 파일마다 require 해줄 필요가 없음
const dot = require("dotenv").config();
const path = require("path");
const { sequelize } = require("./models");
const SignUpRouter = require("./routers/signUp");
const LoginRouter = require("./routers/login");
const borderRouter = require("./routers/border");

const app = express();

app.set("views", path.join(__dirname, "page"));
app.set("view engine", "ejs");

app.use(express.urlencoded({ extended: false }));
app.use(
  session({
    secret: process.env.SESSION_KEY,
    resave: false,
    saveUninitialized: false,
  })
);

// force : 초기화 여부. true는 강제 초기화 false는 있으면 안함
// -> true로 해놓으니 테이블안의 내용이 계속 초기화됨
sequelize
  .sync({ force: false })
  .then((e) => {
    console.log("connect seccess");
  })
  .catch((err) => {
    console.error(err);
  });

app.use("/signup", SignUpRouter);
app.use("/login", LoginRouter);
app.use("/border", borderRouter);

app.listen(process.env.PORT, () => {
  console.log(`Server On open ${process.env.PORT} port`);
});
