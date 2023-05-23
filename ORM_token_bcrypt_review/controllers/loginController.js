const { User } = require("../models");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

exports.isLogin = async (req, res, next) => {
  const { user_id, user_pw } = req.body;
  console.log(user_id, user_pw);
  try {
    if (!user_id) {
      res.send("아이디를 입력해주세요.");
    }
    if (!user_pw) {
      res.send("패스워드를 입력해주세요.");
    }

    const user = await User.findOne({
      where: {
        user_id,
      },
    });

    if (user?.lv == 0) {
      res.send("가입 승인 대기 중입니다.");
    }

    if (user?.user_id) {
      const campare = bcrypt.compareSync(user_pw, user.user_pw);
      if (campare) {
        const token = jwt.sign(
          {
            id: user.id,
            user_id: user_id,
            lv: user.lv,
          },
          process.env.ACCESS_TOKEN_KEY,
          {
            expiresIn: "10m",
          }
        );

        req.session.accessToken = token;
        // console.log(req.session);
        res.redirect("/board");
        next();
      }
    } else {
      res.send("없는 아이디입니다.");
    }
  } catch (error) {
    console.error(error);
  }
};
