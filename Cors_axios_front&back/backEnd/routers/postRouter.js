const router = require("express").Router();
const { isLogin } = require("../middleware/loginMiddleware");
const {
  viewAllPost,
  insertPost,
  updatePage,
  selectPost,
  updatePost,
  myPage,
  myPosts,
  myInfoPage,
  getMyInfo,
  myInfoUpdate,
  deletePost,
} = require("../controllers/postController");

router.get("/", isLogin, (req, res) => {
  res.redirect("http://127.0.0.1:5500/frontEnd/posts.html");
});

router.get("/viewAll", isLogin, viewAllPost);
router.get("/insert", isLogin, (req, res) => {
  res.redirect("http://127.0.0.1:5500/frontEnd/insert.html");
});

// 게시물 정보 수정 페이지 띄워주기
router.get("/update/:id", isLogin, updatePage);

// 선택한 게시물의 데이터를 가져와 띄워줌
router.get("/selectPost", isLogin, selectPost);

// 마이페이지 연결
router.get("/mypage", isLogin, myPage);

// 내가쓴 글 가져오기
router.get("/mypost", isLogin, myPosts);

// 내정보 변경 페이지
router.get("/myinfo", isLogin, myInfoPage);
// 내정보 불러오기
router.get("/getmyinfo", isLogin, getMyInfo);
// 게시글 삭제
router.get("/delete/:id", isLogin, deletePost);

// 글쓰기 기능
router.post("/insert", isLogin, insertPost);
// 수정 기능
router.post("/update/:id", isLogin, updatePost);
// 내정보 변경
router.post("/myinfoupdate/:id", isLogin, myInfoUpdate);

module.exports = router;
