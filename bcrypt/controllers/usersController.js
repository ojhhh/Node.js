const { userInsert, userSelect } = require("../models");
const bcrypt = require("bcrypt");

// bcrypt
// 암호화 모듈 추가
// 강력한 암호화를 지원하고 쉽게 사용가능

// bcrypt 구조
// $2a$[cost]$[salt][hash]
// $2a$ : 사용 알고리즘. 고정값
// [cost] : key 스트레칭 횟수. 2의 ^으로 들어감. 10을 입력하면 2^10. 기본값이 10
// [salt] : 인코딩된 salt 값 문자열의 일부분을 사용
// [hash] : 비밀번호와 salt값을 합하고 해시화해서 인코딩된 값

// bcrypt : 보안에 집착하기로 유명한 OpenBSD에서 사용
// 반복횟수를 늘려 연산속도를 늦출 수 있음

const createHash = (password) => {
  return new Promise((resolve, reject) => {
    // hash 메소드로 해시값을 만듬
    // hash 메소드가 비동기인데 promise를 쓰는 이유는 ?
    // -> hash 메소드는 callback 기반의 비동기 함수
    // -> 콜백함수 기반일때 await를 사용하기 위해 promise를 사용
    // -> Promise는 성공과 실패를 반환해주기 때문에 결과가 나오기전까지 기다림
    bcrypt.hash(password, 10, (err, data) => {
      if (err) reject(err);

      resolve(data);
    });
  });
};

// 입력된 값이 해시화된 값이 맞는지 검증
const compare = (password, hash) => {
  return new Promise((resolve, reject) => {
    // compare 메소드를 사용해서 문자열과 해시값을 전달
    // -> 결과값을 true, false로 반환
    bcrypt.compare(password, hash, (err, same) => {
      resolve(same);
    });
  });
};

// 회원가입
exports.SignUp = async (req, res) => {
  const { user_id, user_pw } = req.body;
  // console.log(user_id, user_pw);
  try {
    // user의 비밀번호를 hash값으로 만듬
    // await를 빼먹으니 반환값이 pending됨
    // -> Promise { <pending> }
    // -> pending : 아직 처리 중이라는 뜻
    // -> createHash() 함수 내부의 return 동작이 비동기로 동작한다 해도  보내주는 쪽에서 기다려주진 않나봄
    const hash = await createHash(user_pw);
    console.log(hash);
    await userInsert(user_id, hash);
    res.redirect("/login");
  } catch (error) {
    console.error(error);
  }
};

// 로그인
exports.Login = async (req, res) => {
  const { user_id, user_pw } = req.body;
  try {
    const data = await userSelect(user_id);
    // 옵셔널 체이닝
    if (!data?.user_id) {
      return res.send("no user_id");
    }

    const compare_pw = await compare(user_pw, data.user_pw);
    if (!compare_pw) {
      return res.send("different password");
    }
    res.send("login");
  } catch (error) {
    console.error(error);
  }
};
