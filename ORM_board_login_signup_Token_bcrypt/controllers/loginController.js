const { User } = require("../models");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

exports.Login = async (req, res) => {
  try {
    const { user_id, user_pw } = req.body;
    const user = await User.findOne({
      where: {
        user_id,
      },
    });

    console.log(user_id, user_pw, user);

    // 결과가 없으면 데이터베이스에 없기 떄문에 null이 출력됨
    if (user == null) {
      return res.send("id not found");
    }

    // 데이터베이스에 저장된 비밀번호와 지금 입력한 비밀번호가 같은지 확인
    const same = bcrypt.compareSync(user_pw, user.user_pw);
    if (same) {
      let token = jwt.sign(
        {
          id: user.id,
          name: user.name,
          age: user.age,
        },
        process.env.ACCESS_TOKEN_KEY,
        {
          expiresIn: "5m",
        }
      );

      req.session.access_token = token;
      res.redirect("/border");
    } else {
      res.send("The password is different");
    }
  } catch (error) {
    console.error(error);
  }
};
