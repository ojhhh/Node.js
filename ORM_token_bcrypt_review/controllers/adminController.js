const { Admin } = require("../models/admin");
const User = require("../models/users");

exports.isAdminLogin = async (req, res) => {
  const { admin_id, admin_pw } = req.body;
  console.log(admin_id, admin_pw);
  try {
    if (!admin_id) {
      res.send("아이디를 입력해주세요.");
    }
    if (!admin_pw) {
      res.send("비밀번호를 입력해주세요.");
    }

    if (process.env.ADMIN_ID == admin_id && process.env.ADMIN_PW == admin_pw) {
      const data = await User.findAll();
      const user = data.map((i) => i.dataValues);
      res.render("userlist", { data: user });
    }
  } catch (error) {
    console.error(error);
  }
};

exports.Accept = async (req, res) => {
  const { user_id } = req.params;
  try {
    await User.update({ lv: 1 }, { where: { user_id } });
    const data = await User.findAll();
    const user = data.map((i) => i.dataValues);
    res.render("userlist", { data: user });
  } catch (error) {
    console.error(error);
  }
};

exports.Denied = async (req, res) => {
  const { user_id } = req.params;
  try {
    await User.update({ lv: 0 }, { where: { user_id } });
    const data = await User.findAll();
    const user = data.map((i) => i.dataValues);
    res.render("userlist", { data: user });
  } catch (error) {
    console.error(error);
  }
};
