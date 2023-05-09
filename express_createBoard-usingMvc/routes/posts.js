// 게시글의 route만 모아둘을 파일
const express = require("express");
// Router 메소드 : 라우팅을 관리 할 수 있게 도와주는 메소드. 라우팅의 내용을 작성해 놓고 app.use() 메소드로 추가
const router = express.Router();
// 컨트롤러의 작성한 내용을 가져오기
const {
  ViewPostAll,
  SelectPost,
  Insert,
  Update,
  Delete,
} = require("../controllers/posts");

// root 경로에 접근 했을 경우
router.get("/", async (req, res) => {
  try {
    // 컨트롤러에 전달해야 하기 위해 요청 객체와 응답 객체를 전달
    // 컨트롤러로 응답객체를 넘기면 컨트롤러에서 처리후 다시 라우터로옴

    const data = await ViewPostAll(req, res);
    res.render("main", { data });
    // return data;
  } catch (error) {
    console.log("전체글 화면 라우터 에러");
    console.error(error);
  }
});

// 게시글 상세 페이지
router.get("/view/:id", async (req, res) => {
  try {
    const data = await SelectPost(req, res);
    res.render("detail", { data });
  } catch (error) {
    console.log("게시글 상세 페이지 라우터 에러");
    console.error(error);
  }
});

// 게시글 추가 페이지
router.get("/insert", (req, res) => {
  res.render("insert");
});

// 게시글 추가 요청이 들어오면
router.post("/insert", async (req, res) => {
  try {
    await Insert(req, res);
    res.redirect("/posts");
  } catch (error) {
    console.log("게시글 추가 라우터 에러");
    console.error(error);
  }
});

// 게시글 수정 페이지
router.get("/edit/:id", async (req, res) => {
  try {
    const data = await SelectPost(req, res);
    res.render("edit", { data });
  } catch (error) {
    console.log("게시글 수정 라우터 에러");
    console.error(error);
  }
});

// 게시글 수정
router.post("/edit/:id", async (req, res) => {
  try {
    await Update(req, res);
    res.redirect("/posts");
  } catch (error) {
    console.log("게시글 수정 라우터 에러");
    console.error(error);
  }
});

// 게시글 삭제
router.get("/delete/:id", async (req, res) => {
  try {
    await Delete(req, res);
    res.redirect("/posts");
  } catch (error) {
    console.log("게시글 삭제 라우터 에러");
    console.error(error);
  }
});

module.exports = router;
