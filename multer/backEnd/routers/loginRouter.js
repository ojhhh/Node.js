const router = require("express").Router();
const { Login } = require("../controllers/loginController");

router.post("/", Login);

module.exports = router;
