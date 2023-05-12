const express = require("express");
const path = require("path");
// 세션을 사용하기 위해 설치할 모듈
// npm install express-session
const session = require("express-session");
const pageRouter = require("./routers/page");
const tokenRouter = require("./routers/token");
const verifyRouter = require("./routers/verify");

const app = express();
const PORT = 8081;

app.set("views", path.join(__dirname, "page"));
app.set("view engine", "ejs");

app.use(express.urlencoded({ extended: false }));
app.use(
  session({
    // 세션을 발급할 떄 사용할 key. 소스코드에 노출 되지 않게 주의
    secret: process.env.KEY2,
    // 세션이 변경되거나 저장할떄나 불러올때 저장할지 여부
    // false로 설정할 경우 기존에 세션이 변경되지 않았으면 다시 저장하지 않음
    resave: false,
    // 세션에 저장 할 때 초기화 여부
    saveUninitialized: true,
  })
);
console.log(
  app.use(
    session({
      // 세션을 발급할 떄 사용할 key. 소스코드에 노출 되지 않게 주의
      secret: process.env.KEY2,
      // 세션이 변경되거나 저장할떄나 불러올때 저장할지 여부
      // false로 설정할 경우 기존에 세션이 변경되지 않았으면 다시 저장하지 않음
      resave: false,
      // 세션에 저장 할 때 초기화 여부
      saveUninitialized: true,
    })
  )
);

app.use(pageRouter);
app.use(tokenRouter);
app.use("/userVerify", verifyRouter);

app.listen(PORT, () => {
  console.log("Server On");
});
