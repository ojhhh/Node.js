const router = require("express").Router();
const { signUp } = require("../controllers/signUpController");

router.post("/", signUp);

module.exports = router;
