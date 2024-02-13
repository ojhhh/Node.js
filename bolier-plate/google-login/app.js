require("dotenv").config();
const express = require("express");
const axios = require("axios");
const app = express();

app.get("/auth/google", (req, res) => {
  const authUrl = `https://accounts.google.com/o/oauth2/v2/auth?response_type=code&client_id=${process.env.GOOGLE_CLIENT_ID}&redirect_uri=${process.env.REDIRECT_URI}&scope=profile email&access_type=offline`;
  res.redirect(authUrl);
});

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

    const userInfo = await axios.get(
      `https://www.googleapis.com/oauth2/v1/userinfo?alt=json&access_token=${data.access_token}`,
      {
        headers: {
          Authorization: `Bearer ${data.access_token}`,
        },
      }
    );

    // console.log("userInfo : ", userInfo);

    console.log(userInfo.data);
    res.send(userInfo.data);
  } catch (error) {
    console.error(error);
    res.status(500).send("Authentication error");
  }
});

app.listen(3000, () => {
  console.log(`Server `);
});
