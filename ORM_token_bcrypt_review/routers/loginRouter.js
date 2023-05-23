const router = require("express").Router();
const { isLogin } = require("../controllers/loginController");

router.get("/", (req, res) => {
  res.render("login");
});

router.post("/", isLogin);

module.exports = router;
