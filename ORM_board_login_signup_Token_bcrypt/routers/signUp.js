const router = require("express").Router();
const { signUp } = require("../controllers/signUpContoller");

router.get("/", (req, res) => {
  res.render("signup");
});

router.post("/", signUp);

module.exports = router;
