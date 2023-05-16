const router = require("express").Router();
const { Login } = require("../controllers/usersController");

router.get("/", (req, res) => {
  res.render("login");
});

router.post("/", Login);

module.exports = router;
