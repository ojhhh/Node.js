// 액세스 토큰, 리프레쉬 토큰

// Access Token 사용한 방식
// 1. 이용자가 로그인 시도
// 2. 서버에서 이용자를 확인하고 입장권을 발급. JWT 토큰 인증정보를 payload에 할당 하고 생성
// 3. 생성한 토큰을 클라이언트에 반환해주고 클라이언트는 입장권을 가짐
// 4. 클라이언트가 서버에 요청을 할 때 입장권도 같이 보내 요청을 시도
// 5. 서버는 요청을 받을때 입장권이 유효한지 확인하고 유효한 입장권이면 요청 처리
// 6. 만료 또는 위변조 된 입장권인지 확인 (입장권 재발급)

// Refresh token
// Access token만 사용하면 인증 보안이 취약할 수 있음 (토큰의 유효기간이 끝날때 까지는 막을 수 없음)
// Refresh token은 유효기간을 길게 주고 Access token의 유효기간은 짧게 설정
// 토큰의 유효기간을 짧게 설정하는게 좋지만 로그인을 계쏙해야 하는 번거로움이 발생

// Access Token 과 Refresh Token을 같이 사용한 인증 방식
// 1. 클라이언트 로그인
// 2. 서버에서 사용자를 확인하고 입장권 권한 인증 정보를 payload에 할당 하고 생성
// Refresh Token을 만들어서 데이터베이스에 저장해두고 2개의 토큰 전부 클라이언트에 전달
// 3. 클라이언트가 요청을 할때 Access Token 전달하여 요청
// 4. 서버는 전달받은 토큰을 확인하고 Access Token을 디코드해서 사용자 정보를 확인
// 5. 위변조 된 토큰인지 확인 (내용에 해당 할 시 재 로그인)
// 6. 날짜가 지난 토큰이면 Refresh Token으로 다시 재발급

// 사용할 모듈
// dotenv express cookie-parser jsonwebtoken ejs
//
const express = require("express");
const dot = require("dotenv").config();
const jwt = require("jsonwebtoken");
const cookie = require("cookie-parser");
const path = require("path");
const app = express();

app.set("views", path.join(__dirname, "page"));
app.set("view engine", "ejs");

app.use(express.urlencoded({ extended: false }));
app.use(cookie());

// 회원가입한 사람의 객체 생성
const user = {
  id: "oh",
  password: "123",
};

app.get("/", (req, res) => {
  res.render("login");
});

app.post("/login", (req, res) => {
  // 요청 객체의 body의 user_id, user_pw 입력
  const { user_id, user_pw } = req.body;
  if (user_id === user.id && user_pw === user.password) {
    // access token 발급
    const accessToken = jwt.sign(
      {
        id: user.id,
      },
      process.env.ACCESS_TOKEN_KEY,
      {
        expiresIn: "10s",
      }
    );
    const refreshToken = jwt.sign(
      {
        id: user.id,
      },
      process.env.REFRESH_TOKEN_KEY,
      {
        expiresIn: "1d",
      }
    );
    // 쿠키 생성
    res.cookie("refresh", refreshToken, {
      maxAge: 24 * 60 * 60 * 1000,
    });
    // join 페이지에서 새로고침했는데 왜 토큰이 새로 만들어짐?
    // login에서 post 요청으로 join 페이지로 넘어 왔을때 페이지를 새로 고침하면 페이지가 다시 로딩되는게 아니라 그전에 로그인 페이지에서 넘어오는 동작을 다시 하는거 같음
    res.render("join", { accessToken });
  }
});

app.post("/refresh", (req, res) => {
  // 옵션 체이닝. 뒤에 오는 키값이 있는지 먼저 확인하고 반환햐여 크래쉬 방지
  if (req.cookies?.refresh) {
    const refreshToken = req.cookies.refresh;
    jwt.verify(refreshToken, process.env.REFRESH_TOKEN_KEY, (err, decode) => {
      if (err) {
        res.send("다시 로그인 해주세요.");
      } else {
        const accessToken = jwt.sign(
          {
            id: user.id,
          },
          process.env.ACCESS_TOKEN_KEY,
          {
            expiresIn: "20s",
          }
        );
        res.render("join", { accessToken });
      }
    });
  } else {
    res.send("로그인 해주세요.");
  }
});

app.listen(8080, () => {
  console.log("Server On");
});
