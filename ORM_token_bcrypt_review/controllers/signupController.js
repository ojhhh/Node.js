const { User } = require("../models");
const bcrypt = require("bcrypt");

exports.SignUp = async (req, res) => {
  const { user_id, user_pw } = req.body;
  try {
    const user = await User.findOne({ where: { user_id } });
    // console.log(user_id, user_pw);

    if (!user?.user_id) {
      const hash = bcrypt.hashSync(user_pw, 10);

      await User.create({
        user_id,
        user_pw: hash,
        lv: 0,
      });

      res.redirect("/");
    } else {
      res.send(
        `사용중인 아이디 입니다.<script><a href="/">돌아가기</a></script>`
      );
    }
  } catch (error) {
    console.error(error);
  }
};
