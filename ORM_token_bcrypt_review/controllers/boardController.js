const jwt = require("jsonwebtoken");
const { User, Board } = require("../models");

exports.BoardMain = async (req, res) => {
  const decoded = req.decoded;
  try {
    const data = await Board.findAll({
      where: {
        user_id: decoded.user_id,
      },
    });
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
    });
    res.redirect("/board");
  } catch (error) {
    console.error(error);
  }
};
