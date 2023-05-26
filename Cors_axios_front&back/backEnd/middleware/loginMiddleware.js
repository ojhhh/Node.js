const jwt = require("jsonwebtoken");

exports.isLogin = async (req, res, next) => {
  const { accessToken } = req.session;

  // console.log(accessToken);
  try {
    jwt.verify(
      accessToken,
      process.env.ACCESS_TOKEN_KEY,
      (err, acc_decoded) => {
        if (err) {
          res.send("다시 로그인하세요.");
        } else {
          req.acc_decoded = acc_decoded;
          // console.log(acc_decoded);
          next();
        }
      }
    );
  } catch (error) {
    console.error(error);
  }
};
