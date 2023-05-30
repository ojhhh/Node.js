const router = require("express").Router();
const { isLogin } = require("../middleware/loginChk");
const {
  Mypage,
  userInfo,
  UpdateImg,
  UpdateUserImg,
} = require("../controllers/mypageController");
router.get("/", isLogin, Mypage);

router.get("/userinfo", isLogin, userInfo);

router.post(
  "/updateimg",
  isLogin,
  UpdateImg.single("updateimg"),
  UpdateUserImg
);

module.exports = router;
