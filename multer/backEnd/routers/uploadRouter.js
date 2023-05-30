const router = require("express").Router();
const { Upload } = require("../middleware/imgUpload");

// Upload.single 매개변수로 form에서 이미지 파일을 가지고 있는 input의 name을 작성
router.post("/", Upload.single("upload"), (req, res) => {
  const { file, body } = req;
  console.log(file, body);
  res.send("save file");
});

module.exports = router;
