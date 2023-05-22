const jwt = require("jsonwebtoken");

// 로그인 검증이 필요한 곳에 사용하기 위해 따로 만듬
exports.isLogin = (req, res, next) => {
  const { access_token } = req.session;
  jwt.verify(access_token, process.env.ACCESS_TOKEN_KEY, (err, acc_decoded) => {
    if (err) {
      res.send("refresh login");
    } else {
      // 다음 미들웨어로 decoded 정보를 담아서 넘김
      req.acc_decoded = acc_decoded;
      next();
    }
  });
};
