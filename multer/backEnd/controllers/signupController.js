const { User } = require("../models");
const bcrypt = require("bcrypt");

exports.SignUp = async (req, res) => {
  const { user_id, user_pw } = req.body;
  const img = "/img/redposion.png";
  try {
    const data = await User.findOne({ where: { user_id } });

    if (!data?.user_id) {
      const hash = bcrypt.hashSync(user_pw, 10);

      await User.create({
        user_id,
        user_pw: hash,
        img,
      });

      res.redirect("http://127.0.0.1:5500/login.html");
    } else {
      console.log("이미 가입한 아이디입니다.");
    }
  } catch (error) {
    console.error(error);
  }
};
