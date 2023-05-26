const { User } = require("../models");
const bcrypt = require("bcrypt");

exports.signUp = async (req, res) => {
  const { name, age, user_id, user_pw } = req.body;
  try {
    const user = await User.findOne({ where: { user_id } });
    if (user != null) {
      return res.send("사용중인 아이디 입니다.");
    }
    const hash = bcrypt.hashSync(user_pw, 10);
    await User.create({
      name,
      age,
      user_id,
      user_pw: hash,
    });
    res.redirect("http://127.0.0.1:5500/frontEnd/login.html");
  } catch (error) {
    console.error(error);
  }
};
