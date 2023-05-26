const router = require("express").Router();
const { Login, viewUser } = require("../controllers/loginController");
const { isLogin } = require("../middleware/loginMiddleware");

router.post("/", Login);

router.get("/view", isLogin, viewUser);

module.exports = router;
