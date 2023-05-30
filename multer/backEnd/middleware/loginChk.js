const { User } = require("../models");
const jwt = require("jsonwebtoken");

exports.isLogin = async (req, res, next) => {
  const { accessToken } = req.session;
  try {
    await jwt.verify(
      accessToken,
      process.env.ACCESS_TOKEN_KEY,
      (err, decoded) => {
        if (err) {
          console.log("다시 로그인하세요");
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
