const jwt = require("jsonwebtoken");

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
