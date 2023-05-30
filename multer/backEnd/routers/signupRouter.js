const router = require("express").Router();
const { SignUp } = require("../controllers/signupController");

router.post("/", SignUp);

module.exports = router;
