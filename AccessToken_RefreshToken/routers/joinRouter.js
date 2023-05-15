const router = require("express").Router();
const { SignUp } = require("../controllers/usersController");

router.get("/", (req, res) => {
  res.render("join");
});

router.post("/", SignUp);

module.exports = router;
