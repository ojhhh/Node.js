const { User } = require("../models");
const bcrypt = require("bcrypt");

exports.signUp = async (req, res) => {
  try {
    // signup 페이지에서 넘어온 데이터 구조 분해 할당
    const { name, age, user_id, user_pw } = req.body;
    // 중복된 아이디인지 확인
    const user = await User.findOne({
      where: {
        user_id,
      },
    });

    // 불러와지는게 있다면 아이디가 이미 있는 것이므로 사용중이라는 문구를 리턴
    if (user != null) {
      return res.send("already use id");
    }

    // bcrypt를 사용하여 비밀번호 암호화
    const hash = bcrypt.hashSync(user_pw, 10);

    // users 테이블에 데이터 입력(INSERT)
    User.create({
      name,
      age,
      user_id,
      user_pw: hash,
    });

    res.redirect("/login");
  } catch (error) {
    console.error(error);
  }
};
