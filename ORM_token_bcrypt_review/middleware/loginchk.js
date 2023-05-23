const { User } = require("../models/users");
const jwt = require("jsonwebtoken");

exports.loginChk = async (req, res, next) => {
  const { accessToken } = req.session;
  try {
    const data = jwt.verify(
      accessToken,
      process.env.ACCESS_TOKEN_KEY,
      (err, decoded) => {
        if (err) {
          res.send("다시 로그인하세요");
        } else {
          req.decoded = decoded;
          next();
        }
      }
    );
  } catch (error) {
    console.error(error);
  }
};
