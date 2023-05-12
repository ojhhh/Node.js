// jsonwebtoken, dotenv install
// npm install jsonwebtoken dotenv
const router = require("express").Router();
const jwt = require("jsonwebtoken");
const dot = require("dotenv").config();

router.post("/login", (req, res) => {
  const name = "test";
  const key = process.env.KEY;
  console.log(key);
  let token = jwt.sign(
    {
      type: "JWT",
      name: name,
    },
    key,
    {
      expiresIn: "3m",
      issuer: "admin",
    }
  );
  req.session.token = token;
  res.render("page2");
});

// 발행한 토큰을 데이터베이스에 저장하여 중복 로그인을 방지

module.exports = router;
