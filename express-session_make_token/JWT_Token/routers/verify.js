const router = require("express").Router();
const jwt = require("jsonwebtoken");
const dot = require("dotenv").config();

router.post("/", (req, res) => {
  const token = req.session.token;
  const reqsession = req.session;
  console.log("req");
  console.log(req);
  console.log("token");
  console.log(token);
  console.log("reqsession");
  console.log(reqsession);
  // verify() : 토큰 유효성 검사
  // 첫번째 매개변수 : 토큰 전달
  // 두번째 매개변수 : key 전달
  // 세번째 매개변수 : 콜백 함수 전달
  // 콜백 함수 첫번째 매개변수 : 에러 내용을 담은 객체
  // 콜백 함수 두번째 매개변수 : 해석된 객체
  const key = process.env.KEY;
  jwt.verify(token, key, (err, decoded) => {
    if (err) {
      console.log(" / token error");
      console.error(err);
      res.send("token was Expiration");
    } else {
      console.error(decoded);
      res.send(decoded);
    }
  });
});

module.exports = router;
