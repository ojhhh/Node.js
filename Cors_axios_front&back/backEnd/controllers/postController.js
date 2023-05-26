const { User, Post } = require("../models");

exports.viewAllPost = async (req, res) => {
  try {
    const data = await Post.findAll();
    res.json(data);
  } catch (error) {
    console.error(error);
  }
};

exports.insertPost = async (req, res) => {
  const { user_id } = req.acc_decoded;
  const { title, content } = req.body;
  try {
    const getId = await User.findOne({
      where: {
        user_id,
      },
    });

    await Post.create({
      title,
      content,
      writer: user_id,
      UserId: getId.id,
    });

    res.redirect("http://127.0.0.1:5500/frontEnd/posts.html");
  } catch (error) {
    console.error(error);
  }
};

let postId;
exports.updatePage = async (req, res) => {
  const { id } = req.params;
  postId = id;
  try {
    // const data = await Post.findOne({ where: { id } });
    // res.json(data);
    res.redirect("http://127.0.0.1:5500/frontEnd/update.html");
  } catch (error) {
    console.error(error);
  }
};

exports.selectPost = async (req, res) => {
  try {
    const data = await Post.findOne({ where: { id: postId } });
    console.log(data);
    res.json(data);
  } catch (error) {
    console.error(error);
  }
};

exports.updatePost = async (req, res) => {
  const id = req.params.id;
  const { title, content } = req.body;
  try {
    await Post.update({ title, content }, { where: { id } });
    res.redirect("http://127.0.0.1:5500/frontEnd/posts.html");
  } catch (error) {
    console.error(error);
  }
};

exports.myPage = async (req, res) => {
  try {
    res.redirect("http://127.0.0.1:5500/frontEnd/mypage.html");
  } catch (error) {
    console.error(error);
  }
};

exports.myPosts = async (req, res) => {
  const { acc_decoded } = req;
  try {
    const data = await Post.findAll({ where: { writer: acc_decoded.user_id } });
    data.dataValues = data.map((i) => i.dataValues);
    // console.log(data);
    res.json(data);
  } catch (error) {
    console.error(error);
  }
};

exports.myInfoPage = async (req, res) => {
  try {
    res.redirect("http://127.0.0.1:5500/frontEnd/myinfo.html");
  } catch (error) {
    console.error(error);
  }
};

exports.getMyInfo = async (req, res) => {
  const { acc_decoded } = req;
  try {
    const data = await User.findOne({ where: { name: acc_decoded.name } });
    res.json(data);
  } catch (error) {
    console.error(error);
  }
};

exports.myInfoUpdate = async (req, res) => {
  const id = req.params.id;
  const { name, age } = req.body;
  try {
    await User.update({ name, age }, { where: { id } });
    res.redirect("http://127.0.0.1:5500/frontEnd/main.html");
  } catch (error) {
    console.error(error);
  }
};

exports.deletePost = async (req, res) => {
  const id = req.params.id;
  try {
    await Post.destroy({ where: { id } });
    res.redirect("http://127.0.0.1:5500/frontEnd/posts.html");
  } catch (error) {
    console.error(error);
  }
};
