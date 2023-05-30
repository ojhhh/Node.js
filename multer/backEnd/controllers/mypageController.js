const { User } = require("../models");
const multer = require("multer");
const path = require("path");

exports.Mypage = async (req, res) => {
  const { decoded } = req;
  try {
    const data = await User.findOne({ where: { user_id: decoded.name } });
    // console.log(data.dataValues);
    res.redirect("http://127.0.0.1:5500/frontEnd/mypage.html");
  } catch (error) {
    console.error(error);
  }
};

exports.userInfo = async (req, res) => {
  const { decoded } = req;
  try {
    const { id, user_id, img } = await User.findOne({
      where: { user_id: decoded.name },
    });
    const userInfo = {
      id,
      user_id,
      img,
    };
    res.json(userInfo);
  } catch (error) {
    console.error(error);
  }
};

exports.UpdateImg = multer({
  storage: multer.diskStorage({
    destination: (req, file, done) => {
      console.log("----------file -----------");
      console.log(file);
      console.log("----------file -----------");
      done(null, "uploads/");
    },
    filename: (req, file, done) => {
      const ext = path.extname(file.originalname);
      console.log("ext");
      console.log(ext);
      const filename =
        path.basename(file.originalname, ext) + "_" + Date.now() + ext;
      console.log("filename");
      console.log(filename);
      done(null, filename);
    },
  }),
  limits: { fileSize: 5 * 1024 * 1024 },
});

exports.UpdateUserImg = async (req, res) => {
  const { decoded } = req;
  const { file } = req;
  try {
    // console.log(file.filename);
    const img = "/img/" + file.filename;
    await User.update({ img }, { where: { user_id: decoded.name } });
  } catch (error) {
    console.error(error);
  }
};
