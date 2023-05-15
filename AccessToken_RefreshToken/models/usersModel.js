const mysql = require("./config");

// users 테이블이 없으면 생성
exports.userInit = async () => {
  try {
    // users 테이블이 있는지 확인
    await mysql.query("SELECT * FROM users;");
  } catch (error) {
    const sql =
      "CREATE TABLE users(id INT AUTO_INCREMENT PRIMARY KEY,user_id VARCHAR(20), user_pw VARCHAR(20), refresh VARCHAR(255));";
    await mysql.query(sql);
  }
};

// 유저 전체리스트
exports.userList = async () => {
  try {
    const [result] = await mysql.query("SELETE * FROM users;");
    return result;
  } catch (error) {
    console.error(error);
  }
};

// 특정 유저 정보 불러오기
exports.userSelect = async (user_id) => {
  try {
    const [result] = await mysql.query(
      "SELECT * FROM users WHERE user_id = ?",
      [user_id]
    );
    return [result[0]];
  } catch (error) {
    console.error(error);
  }
};

// 회원가입
exports.userInsert = async (user_id, user_pw) => {
  try {
    // 이미 가입한 아이디 인지 확인
    const [user] = await mysql.query("SELECT * FROM users WHERE user_id = ?;", [
      user_id,
    ]);
    // user의 길이가 0이 아니면 계정 정보를 가져왔다는 소리
    if (user.length != 0) {
      let err = new Error("중복된 아이디입니다.");
      console.log(err);
      return err;
    } else {
      await mysql.query("INSERT INTO users (user_id, user_pw) VALUES (?,?);", [
        user_id,
        user_pw,
      ]);
    }
  } catch (error) {
    console.error(error);
  }
};

// 패스워드 변경
// 패스워드 찾기는 없는 추세
exports.userPwUpdate = async (user_id, user_pw) => {
  try {
    await mysql.query("UPDATE users SET user_pw = ? WHERE user_id = ?;", [
      user_pw,
      user_id,
    ]);
  } catch (error) {
    console.error(error);
  }
};

// 토큰 refresh
exports.userRefresh = async (user_id, refresh) => {
  try {
    await mysql.query("UPDATE users SET refresh = ? WHERE user_id = ?;", [
      refresh,
      user_id,
    ]);
  } catch (error) {
    console.error(error);
  }
};

// 유저 삭제
exports.userDelete = async (user_id) => {
  try {
    await mysql.query(
      "DELETE FROM users WHERE user_id = ?;SET @CNT=0; UPDATE users SET users.id = @CNT:=@CNT+1; ALTER TABLE users AUTO_INCREMENT = 0;",
      [user_id]
    );
  } catch (error) {
    console.error(error);
  }
};
