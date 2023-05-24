const router = require("express").Router();
const { loginChk } = require("../middleware/loginchk");
const {
  Insert,
  BoardMain,
  updateView,
  updateBoard,
  deleteBoard,
  selectBoard,
  commentInsert,
  deleteComment,
  myPage,
} = require("../controllers/boardController");

router.get("/", loginChk, BoardMain);

router.get("/write", loginChk, (req, res) => {
  res.render("write");
});

router.get("/view/:id", loginChk, selectBoard);

router.get("/update/:id", loginChk, updateView);

router.get("/delete/:id", loginChk, deleteBoard);

router.get("/commentdel/:id", loginChk, deleteComment);

router.get("/mypage/:id", loginChk, myPage);

router.post("/write", loginChk, Insert);

router.post("/update/:id", loginChk, updateBoard);

router.post("/comment/:id", loginChk, commentInsert);

module.exports = router;
