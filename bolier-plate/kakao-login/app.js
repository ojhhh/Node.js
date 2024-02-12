require("dotenv").config();
const express = require("express");
const path = require("path");
const axios = require("axios");

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

const AccessTokenDecode = async (access_token) => {
  try {
    const decode = await axios.get("https://kapi.kakao.com/v2/user/me", {
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

const IdTokenDecode = async (access_token) => {
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

app.get("/auth", async (req, res) => {
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
    const id_token_decode = await IdTokenDecode(access_token);

    res.json({
      access_token,
      refresh_token,
      access_token_decode,
      id_token_decode,
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
