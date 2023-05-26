const { User } = require("../models");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

exports.Login = async (req, res) => {
  const { user_id, user_pw } = req.body;
  try {
    const user = await User.findOne({
      where: {
        user_id,
      },
    });
    if (user == null) {
      return res.send("없는 아이디 입니다.");
    }

    const same = bcrypt.compareSync(user_pw, user.user_pw);
    const { id, name, age } = user;
    if (same) {
      let token = jwt.sign(
        {
          id,
          name,
          age,
          user_id,
        },
        process.env.ACCESS_TOKEN_KEY,
        {
          expiresIn: "20m",
        }
      );
      req.session.accessToken = token;
      // 여기서 / 경로는 백엔드의 도메인 경로
      // 프론트 경로를 작성해야함
      // 리다이렉트 할게 아니면 프론트에서 응답 받은 값으로 조건 분기 처리해서 페이지를 전환하면됨
      // return res.send();
      // 배포된 프론트의 경로를 작성
      res.redirect("http://127.0.0.1:5500/frontEnd/main.html");
    } else {
      return res.send("비밀번호 틀림");
    }
  } catch (error) {
    console.error(error);
  }
};

exports.viewUser = async (req, res) => {
  const acc_decoded = req.acc_decoded;
  console.log(acc_decoded);
  try {
    const user = await User.findOne({
      where: { id: acc_decoded.id },
    });
    // json 형태로 데이터를 응답
    res.json(user);
  } catch (error) {
    console.error(error);
  }
};
