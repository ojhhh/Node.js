const { User, Post } = require("../models");

exports.borderMain = async (req, res) => {
  try {
    // 해당 유저가 작성할 글 보여주는 페이지
    const { acc_decoded } = req;
    const user = await User.findOne({
      where: {
        name: acc_decoded.name,
      },
    });
    res.render("main", { data: user });
  } catch (error) {
    console.error(error);
  }
};

exports.createBorder = async (req, res) => {
  const { acc_decoded } = req;
  const { user_post } = req.body;
  try {
    // post 테이블에 글 추가
    await Post.create({
      msg: user_post,
      user_id: acc_decoded.id,
    });
  } catch (error) {
    console.error(error);
  }
  // 해당 유저가 작성한 글을 볼 수 있는 페이지로 유도
  res.redirect(`/border/view/${acc_decoded.id}`);
};

exports.borderView = (req, res) => {
  User.findOne({
    where: { id: req.params.id },
    // Post 모델을 참조
    include: [{ model: Post }],
  }).then((e) => {
    // map 함수 화살표 함수뒤에 중괄호를 생략하면 바로 값을 반환
    e.dataValues.Posts = e.dataValues.Posts.map((i) => i.dataValues);
    const Posts = e.dataValues;
    res.render("border", { data: Posts });
  });
};

exports.borderUpdate = async (req, res) => {
  const { acc_decoded } = req;
  const { msg } = req.body;
  const id = req.params.id;
  try {
    // 데이터베이스 수정
    // 첫번째 매개변수 : 수정할 객체를 넘겨줌
    // 두번째 매개변수 : 객체를 찾을 조건
    await Post.update({ msg }, { where: { id } });
    res.redirect("/border/view/" + acc_decoded.id);
  } catch (error) {
    console.error(error);
  }
};

// 게시글 삭제
exports.borderDelete = async (req, res) => {
  try {
    await Post.destroy({
      where: {
        id: req.params.id,
      },
    });

    res.redirect("/border");
  } catch (error) {
    console.error(error);
  }
};
