// 폴더까지만 지정을 하게 되면 기본적으로 index.js를 찾음
const { posts } = require("../models");

// 전체글 조회 메소드
exports.ViewPostAll = async function (req, res) {
  try {
    const data = await posts.viewPostAll();
    return data;
  } catch (err) {
    console.log("전체글 조회 컨트롤러에서 에러");
  }
};

// 해당 게시글 보기
exports.SelectPost = async function (req, res) {
  // req 요청 객체를 매개변수로 전달해줄 예정
  const { id } = req.params;
  try {
    const data = await posts.selectPost(id);
    return data;
  } catch (err) {
    console.log("해당 게시글 보기 에러");
  }
};

// 게시글 등록
exports.Insert = async function (req, res) {
  // 요청 객체를 매개변수로 전달해줄 예정
  const { title, content } = req.body;
  try {
    await posts.insert(title, content);
  } catch (err) {
    console.log("게시글 등록 컨트롤러 에러");
  }
};

// 게시글 수정
exports.Update = async function (req, res) {
  const { id } = req.params;
  const { title, content } = req.body;
  try {
    await posts.update(id, title, content);
  } catch (err) {
    console.log("게시글 수정 컨트롤러 에러");
  }
};

// 게시글 삭제
exports.Delete = async function (req, res) {
  const { id } = req.params;
  try {
    await posts.delete(id);
  } catch (err) {
    console.log("게시글 삭제 컨트롤러 에러");
  }
};
