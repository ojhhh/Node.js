const router = require("express").Router();
const { Admin } = require("../models");
const {
  isAdminLogin,
  Accept,
  Denied,
} = require("../controllers/adminController");

router.get("/", (req, res) => {
  res.render("admin");
});

router.get("/accept/:user_id", Accept);

router.get("/denied/:user_id", Denied);

router.post("/userlist", isAdminLogin);

module.exports = router;
