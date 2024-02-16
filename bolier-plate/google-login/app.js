require("dotenv").config();
const express = require("express");
const axios = require("axios");
const app = express();
const { OAuth2Client } = require("google-auth-library");
const client = new OAuth2Client();

const userinfo = async (access_token) => {
  try {
    const { data } = await axios.get(
      `https://www.googleapis.com/oauth2/v1/userinfo?alt=json&access_token=${access_token}`,
      {
        headers: {
          Authorization: `Bearer ${access_token}`,
        },
      }
    );

    return data;
  } catch (error) {
    console.error(error);
  }
};

// id token 검증
const verify = async (id_token) => {
  try {
    const ticket = await client.verifyIdToken({
      idToken: id_token,
      audience: process.env.GOOGLE_CLIENT_ID,
    });

    const payload = ticket.getPayload();
    const userid = payload["sub"];

    console.log("payload : ", payload);
    console.log("userid : ", userid);

    return { payload, userid };
  } catch (error) {
    console.error(error);
  }
};

// 로그인 페이지로 이동
app.get("/auth/google", (req, res) => {
  const authUrl = `https://accounts.google.com/o/oauth2/v2/auth?response_type=code&client_id=${process.env.GOOGLE_CLIENT_ID}&redirect_uri=${process.env.REDIRECT_URI}&scope=profile email&access_type=offline`;
  res.redirect(authUrl);
});

// 로그인에 성공하면 해당 사용자의 데이터를 콜백
app.get("/auth/google/callback", async (req, res) => {
  const code = req.query.code;
  try {
    const { data } = await axios.post(
      `https://oauth2.googleapis.com/token`,
      {
        code,
        client_id: process.env.GOOGLE_CLIENT_ID,
        client_secret: process.env.GOOGLE_CLIENT_SECRET,
        redirect_uri: process.env.REDIRECT_URI,
        grant_type: "authorization_code",
      },
      {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
      }
    );

    console.log("data.access_token  : ", data.access_token);

    console.log("data.refresh_token  : ", data.refresh_token);

    const userInfo = await userinfo(data.access_token);

    // 유저의 자세한 정보를 가져오기 위해 id token을 decode
    const idInfo = await verify(data.id_token);

    res.json({ userInfo, idInfo });
  } catch (error) {
    console.error(error);
    res.status(500).send("Authentication error");
  }
});

app.listen(3000, () => {
  console.log(`Server `);
});
