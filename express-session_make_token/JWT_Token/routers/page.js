const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
  console.log(req);
  console.log(process.env.KEY2);
  res.render("page");
});

module.exports = router;
