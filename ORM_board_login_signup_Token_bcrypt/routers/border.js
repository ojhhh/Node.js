const router = require("express").Router();
const { isLogin } = require("../middleware/login");
const {
  borderMain,
  borderView,
  createBorder,
  borderUpdate,
  borderDelete,
} = require("../controllers/boarderController");

router.get("/", isLogin, borderMain);

router.get("/view/:id", isLogin, borderView);

router.post("/create_border", isLogin, createBorder);

router.post("/view_update/:id", isLogin, borderUpdate);

router.get("/del/:id", isLogin, borderDelete);

module.exports = router;
