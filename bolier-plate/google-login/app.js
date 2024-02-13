require("dotenv").config();
const express = require("express");
const session = require("express-session");
const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// 세션 설정
app.use(
  session({
    secret: "secret",
    resave: false,
    saveUninitialized: true,
  })
);

// Passport 초기화
app.use(passport.initialize());
// Passport 세션 사용 설정
app.use(passport.session());

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: "http://localhost:3000/auth/google/callback",
    },
    (accessToken, refreshToken, profile, cb) => {
      // console.log("accessToken : ", accessToken);
      // console.log("refreshToken : ", refreshToken);
      // console.log("profile : ", profile);
      return cb(null, profile);
    }
  )
);

// 사용자 세션에 저장
passport.serializeUser((user, done) => {
  done(null, user);
});

// 세션에서 사용자 정보 추출
passport.deserializeUser((obj, done) => {
  done(null, obj);
});

app.get("/", (req, res) => {
  try {
    // console.log(req);

    const user = req.user;

    res.json(user);
  } catch (error) {
    console.error(error);
  }
});

app.get(
  "/auth/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);

app.get(
  "/auth/google/callback",
  passport.authenticate("google", { failureRedirect: "/login" }),
  function (req, res) {
    // 성공적인 인증 후 리다이렉션
    res.redirect("/");
  }
);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
