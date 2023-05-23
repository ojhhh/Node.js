const jwt = require("jsonwebtoken");
const { User, Board, Comment } = require("../models");

exports.BoardMain = async (req, res) => {
  const decoded = req.decoded;
  try {
    const data = await Board.findAll();
    data.decoded = decoded;
    console.log(data);
    res.render("board", { data });
    // console.log(data);
  } catch (error) {
    console.error(error);
  }
};

exports.Insert = async (req, res) => {
  const decoded = req.decoded;
  const { msg } = req.body;
  try {
    await Board.create({
      msg,
      user_id: decoded.user_id,
      UserId: decoded.id,
    });
    res.redirect("/board");
  } catch (error) {
    console.error(error);
  }
};

exports.selectBoard = async (req, res) => {
  const id = req.params.id;
  console.log(id);
  try {
    const data = await Board.findAll({
      where: { id },
      include: [{ model: Comment }],
    });
    console.log(data);
    res.render("view", { data });
  } catch (error) {
    console.error(error);
  }
};

exports.updateView = async (req, res) => {
  const decoded = req.decoded;
  const id = req.params.id;
  try {
    const data = await Board.findOne({ where: { id: id } });
    if (data.user_id == decoded.user_id) {
      res.render("update", { data });
    } else {
      res.send("작성자만 수정 가능합니다.");
    }
  } catch (error) {
    console.error(error);
  }
};

exports.updateBoard = async (req, res) => {
  const decoded = req.decoded;
  const id = req.params.id;
  const { msg } = req.body;
  try {
    await Board.update(
      { msg },
      {
        where: {
          id,
        },
      }
    );
    res.redirect("/board");
  } catch (error) {
    console.error(error);
  }
};

exports.deleteBoard = async (req, res) => {
  const decoded = req.decoded;
  const id = req.params.id;
  console.log(req);
  try {
    const data = await Board.findOne({
      where: {
        id,
      },
    });
    if (data.user_id == decoded.user_id) {
      await Board.destroy({ where: { id } });
      res.redirect("/board");
    } else {
      res.send("작성자만 지울 수 있습니다.");
    }
  } catch (error) {
    console.error(error);
  }
};

exports.commentInsert = async (req, res) => {
  const decoded = req.decoded;
  const { ment } = req.body;
  const id = req.params.id;
  try {
    await Comment.create({
      ment,
      user_id: decoded.user_id,
      BoardId: id,
    });
    res.redirect(`/board/view/${id}`);
  } catch (error) {
    console.error(error);
  }
};
