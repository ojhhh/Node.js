## 카카오톡 로그인 API 연결 방법

- 로그인, 로그아웃 기능 구현 테스트 완료

<br/>

## 사용 인증 받기

```js
app.get("/login", async (req, res) => {
  try {
    const kakaoAuthUrl = `https://kauth.kakao.com/oauth/authorize?client_id=${process.env.REST_API_KEY}&redirect_uri=${process.env.REDIRECT_URI}&response_type=code`;
    res.redirect(kakaoAuthUrl);
  } catch (error) {
    console.error(error);
  }
});
```

- kakao developer에서 발급 받은 REST_API_KEY와 REDIRECT_URI을 .env 파일에 정의해서 사용
- http://localhost:3000/login 으로 요청이 들어오면 kakao 로그인 관련 인증 페이지로 리다이렉트
- 인증 후 .env 파일에 정의 해둔 REDIRECT_URI로 보내짐

## 토큰 발급

#### Method : POST

#### URL : https://kauth.kakao.com/oauth/token

```js
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
    res.json({
      access_token,
      refresh_token,
    });
  } catch (error) {
    console.error(error);
  }
});
```

- 로그인 시도 후 정보 제공 동의를 하게 되면 REDIRECT_URL로 이동 되는데 그때 받은 Request에 code에 대한 정보가 들어있는데 이 code가 POST 요청을 하게 될때 필요
- 정상적인 요청이 이루어 지면 access_token, refresh_token, id_token 등의 정보가 반환

  <br/>

## Access Token Decode

```js
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

/*
결과 
"access_token_decode":
  {
    "expiresInMillis":21600401,
    "id":0000000000,
    "expires_in":21600,
    "app_id":1111111,
    "appId":1111111
  }
*/
```

- 사용자의 고유 id와 만료시간 등에 정보가 페이로드에 담겨져 있는 것을 볼 수 있다

  <br/>

## 유저 정보 확인

```js
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
/*
결과

{
  "id":0000000000,
  "connected_at":"2024-02-12T12:10:54Z",
  "kakao_account":
    {
      "profile_nickname_needs_agreement":false,"profile_image_needs_agreement":false}
    }
*/
```

- 사용자의 고유 id와 접속 시간, kakao developer에서 설정해둔 정보 제공 항목들에 대한 동의 여부 등에 대한 정보가 담겨 있는 것을 볼 수 있다

## 로그아웃

#### Method : POST

#### URL : https://kapi.kakao.com/v1/user/logout

```js
app.get("/logout", async (req, res) => {
  try {
    const result = await axios.post(
      `https://kapi.kakao.com/v1/user/logout`,
      null,
      {
        params: {
          target_id_type: "user_id",
          target_id: `${target_id}`, // 유저 고유 아이디
        },
        headers: {
          Authorization: `Bearer ${access_token}`,
          "Content-Type": "application/x-www-form-urlencoded",
        },
      }
    );

    res.send(result.status == 200 ? "logout success" : "logout failed");
  } catch (error) {
    console.error(error);
  }
});
```

- 해당 유저의 고유 id와 access token을 post 요청에 함께 보내면 된다
