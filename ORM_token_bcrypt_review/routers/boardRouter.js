const router = require("express").Router();
const { loginChk } = require("../middleware/loginchk");
const { Insert, BoardMain } = require("../controllers/boardController");

router.get("/", loginChk, BoardMain);

router.get("/write", loginChk, (req, res) => {
  res.render("write");
});

router.post("/write", loginChk, Insert);

module.exports = router;
