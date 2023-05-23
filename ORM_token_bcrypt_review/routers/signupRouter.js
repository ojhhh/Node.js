const router = require("express").Router();
const { SignUp } = require("../controllers/signupController");

router.get("/", (req, res) => {
  res.render("signup");
});

router.post("/", SignUp);

module.exports = router;
