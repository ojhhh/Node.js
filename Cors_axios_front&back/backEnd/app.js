// 협업 할때 편의 성을 위해 프론트와 백엔드단을 나눠서 연습

const express = require("express");
const session = require("express-session");
// env는 제일 위로 올려야함
const dot = require("dotenv").config();
const { sequelize } = require("./models");
const loginRouter = require("./routers/loginRouter");
const signupRouter = require("./routers/signupRouter");
const postRouter = require("./routers/postRouter");

const cors = require("cors");
const app = express();

app.use(express.urlencoded({ extended: false }));

// cors
// 다른 도메인에서 접근할 수 없도록 도메인 접근시 발생하는 보안 정책 설정
// 다른 도메인과 통신을 안전하게 유지 시키기 위한 보안정책
// Access-control-Allow-origin을 헤더에 포함하여 접근을 허용하고 응답

app.use(
  cors({
    // 도메인 허용 옵션
    // 접근을 허용할 도메인 설정
    // 여러개의 도메인을 허용하고 싶으면 배열의 형태로 넣어줌
    origin: "http://127.0.0.1:5500",
    credentials: true,
  })
);

app.use(
  session({
    secret: process.env.SESSION_KEY,
    resave: false,
    saveUninitialized: false,
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

app.get("/", (req, res) => {
  res.send("main");
});

app.use("/signUp", signupRouter);
app.use("/login", loginRouter);
app.use("/posts", postRouter);

app.listen(8080, () => {
  console.log("Server On");
});
