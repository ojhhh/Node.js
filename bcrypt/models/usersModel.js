const mysql = require("./config");

// 테이블 초기화
exports.userInit = async () => {
  try {
    await mysql.query("SELECT * FROM bcrypt_users;");
  } catch (error) {
    await mysql.query(
      "CREATE TABLE bcrypt_users (id INT AUTO_INCREMENT PRIMARY KEY, user_id VARCHAR(20), user_pw VARCHAR(128));"
    );
  }
};

//
exports.userSelect = async (user_id) => {
  try {
    const [result] = await mysql.query(
      "SELECT * FROM bcrypt_users WHERE user_id = ?",
      [user_id]
    );
    return result[0];
  } catch (error) {
    console.error(error);
  }
};

exports.userInsert = async (user_id, user_pw) => {
  try {
    // 유효성 검사
    const [user] = await mysql.query(
      "SELECT * FROM bcrypt_users WHERE user_id = ?",
      [user_id]
    );
    if (user.length != 0) {
      let err = new Error("중복된 아이디");
      console.log(err);
      return err;
    }

    // 유효성 검사를 통과하면 데이터베이스에 insert
    await mysql.query(
      "INSERT INTO bcrypt_users (user_id, user_pw) VALUES (?, ?);",
      [user_id, user_pw]
    );
  } catch (error) {
    console.error(error);
  }
};
