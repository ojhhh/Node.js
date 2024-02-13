require("dotenv").config();
const express = require("express");
const path = require("path");
const axios = require("axios");

const app = express();

// 로그아웃 기능 test용 변수들
let test_access_token;
let test_user_id;

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

const AccessTokenDecode = async (access_token) => {
  try {
    const decode = await axios.get(
      "https://kapi.kakao.com/v1/user/access_token_info",
      {
        headers: {
          Authorization: `Bearer ${access_token}`,
          "Content-type": "application/x-www-form-urlencoded;charset=utf-8",
        },
      }
    );

    return decode.data;
  } catch (error) {
    console.error(error);
  }
};

const UserInfo = async (access_token) => {
  try {
    const decode = await axios.get(`https://kapi.kakao.com/v2/user/me`, {
      headers: {
        Authorization: `Bearer ${access_token}`,
        "Content-type": "application/x-www-form-urlencoded;charset=utf-8",
      },
    });

    return decode.data;
  } catch (error) {
    console.error(error);
  }
};

app.get("/login", async (req, res) => {
  try {
    const kakaoAuthUrl = `https://kauth.kakao.com/oauth/authorize?client_id=${process.env.REST_API_KEY}&redirect_uri=${process.env.REDIRECT_URI}&response_type=code`;
    res.redirect(kakaoAuthUrl);
  } catch (error) {
    console.error(error);
  }
});

app.get("/logout", async (req, res) => {
  try {
    const result = await axios.post(
      `https://kapi.kakao.com/v1/user/logout`,
      null,
      {
        params: {
          target_id_type: "user_id",
          target_id: test_user_id,
        },
        headers: {
          Authorization: `Bearer ${test_access_token}`,
          "Content-Type": "application/x-www-form-urlencoded",
        },
      }
    );

    res.send(result.status == 200 ? "logout success" : "logout failed");
  } catch (error) {
    console.error(error);
  }
});

app.get("/auth/kakao", async (req, res) => {
  try {
    const { code } = req.query;

    const result = await axios.post(
      "https://kauth.kakao.com/oauth/token",
      null,
      {
        params: {
          grant_type: "authorization_code",
          client_id: process.env.REST_API_KEY,
          redirect_uri: process.env.REDIRECT_URI,
          code: code,
        },
        headers: {
          "Content-type": "application/x-www-form-urlencoded;charset=utf-8",
        },
      }
    );

    const access_token = result.data.access_token;

    const refresh_token = result.data.refresh_token;

    // 사용자 카카오 고유 id 값과 접속 시간이 반환
    const access_token_decode = await AccessTokenDecode(access_token);

    // 카카오 디벨로퍼에 설정 해둔 개인정보 값을 반환
    const user_info = await UserInfo(access_token);

    // console.log("userInfo : ", id_token_decode);

    // logout test용 access_token
    test_access_token = result.data.access_token;
    // logout test용 user_id
    test_user_id = user_info.id;

    res.json({
      access_token,
      refresh_token,
      access_token_decode,
      user_info,
    });
  } catch (error) {
    console.error(error);
  }
});

// access_token 내용 보기
// app.get("/user_info", async (req, res) => {
//   try {
//     const userInfoResponse = await axios.get(
//       "https://kapi.kakao.com/v2/user/me",
//       {
//         headers: {
//           Authorization: `Bearer ${access_token}`,
//           "Content-type": "application/x-www-form-urlencoded;charset=utf-8",
//         },
//       }
//     );

//     console.log(userInfoResponse.data);
//   } catch (error) {
//     console.error(error);
//   }
// });

app.listen(3000, () => {
  console.log("Server On");
});
