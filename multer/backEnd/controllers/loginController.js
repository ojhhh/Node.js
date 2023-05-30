const { User } = require("../models");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

exports.Login = async (req, res) => {
  const { user_id, user_pw } = req.body;
  try {
    if (!user_id) {
      console.log("아이디를 입력하세요.");
      return;
    }
    if (!user_pw) {
      console.log("비밀번호를 입력하세요.");
      return;
    }

    const data = await User.findOne({ where: { user_id } });

    if (!data?.user_id) {
      console.log("없는 아이디입니다.");
      return;
    }
    const compare = bcrypt.compareSync(user_pw, data.user_pw);
    if (compare) {
      console.log("login success");
      const token = jwt.sign(
        {
          name: user_id,
        },
        process.env.ACCESS_TOKEN_KEY,
        {
          expiresIn: "5m",
        }
      );
      req.session.accessToken = token;
      res.redirect("http://127.0.0.1:5500/frontEnd/index.html");
    } else {
      console.log("비밀번호가 틀립니다.");
    }
  } catch (error) {
    console.error(error);
  }
};
