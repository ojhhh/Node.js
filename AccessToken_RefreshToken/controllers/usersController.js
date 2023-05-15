const {
  userList,
  userSelect,
  userInsert,
  userPwUpdate,
  userDelete,
  userRefresh,
} = require("../models");
const jwt = require("jsonwebtoken");

// 유저 전체 리스트
exports.UserList = async (req, res) => {
  try {
    const data = await userList();
    return data;
  } catch (error) {
    console.error(error);
  }
};

// 회원 가입
exports.SignUp = async (req, res) => {
  const { user_id, user_pw } = req.body;
  try {
    await userInsert(user_id, user_pw);
    res.redirect("/login");
  } catch (error) {
    console.error(error);
  }
};

// 로그인
exports.Login = async (req, res) => {
  const { user_id, user_pw } = req.body;
  try {
    const [data] = await userSelect(user_id);
    // user id가 없으면 실행
    if (!data?.user_id) {
      return res.send("아이디 없음");
    }
    if (data.user_pw !== user_pw) {
      return res.send("비밀번호 틀림");
    }

    // access token 발급
    const accessToken = jwt.sign(
      {
        user_id: data.user_id,
        mail: "user1@naver.com",
        nickname: "user1",
      },
      process.env.ACCESS_TOKEN_KEY,
      {
        expiresIn: "5s",
      }
    );

    // refresh token 발급
    const refreshToken = jwt.sign(
      {
        user_id: data.user_id,
      },
      process.env.REFRESH_TOKEN_KEY,
      {
        expiresIn: "20s",
      }
    );

    await userRefresh(user_id, refreshToken);
    req.session.accessToken = accessToken;
    req.session.refreshToken = refreshToken;
    res.send({ access: accessToken, refresh: refreshToken });
  } catch (error) {
    console.error(error);
  }
};

// user 토큰 검증
// next 함수를 실행 시키면 다음 미들웨어로 실행이동
exports.verifyLogin = async (req, res, next) => {
  const { accessToken, refreshToken } = req.session;
  jwt.verify(accessToken, process.env.ACCESS_TOKEN_KEY, (err, acc_decoded) => {
    if (err) {
      // access 토큰이 위변조되거나 만료됬으면
      jwt.verify(
        refreshToken,
        process.env.REFRESH_TOKEN_KEY,
        async (err, ref_decoded) => {
          if (err) {
            console.log("refresh token 만료");
            res.send("다시 로그인 하세요.");
          } else {
            const data = await userSelect(ref_decoded.user_id);
            if (data.refresh == refreshToken) {
              const accessToken = jwt.sign(
                {
                  user_id: ref_decoded.user_id,
                },
                process.env.ACCESS_TOKEN_KEY,
                {
                  expiresIn: "1m",
                }
              );
              req.session.accessToken = accessToken;
              console.log("access_token 재발급");
              next();
            } else {
              res.send("중복 로그인");
            }
          }
        }
      );
    } else {
      console.log("로그인 정상 유지");
      next();
    }
  });

  // try {
  // } catch (error) {
  //   console.error(error);
  // }
};
