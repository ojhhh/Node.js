const router = require("express").Router();
const { payReady, payApprove } = require("../controllers/paymentController");

// 카카오페이 결제 준비
router.post("/ready", payReady);
// 카카오페이 결제 승인
router.get("/approve", payApprove);

module.exports = router;
