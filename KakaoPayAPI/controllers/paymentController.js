const axios = require("axios");

exports.payReady = async (req, res) => {
  try {
    const { item_name, quantity, total_amount, vat_amount, tax_free_amount } =
      req.body;
    const response = await axios({
      url: "https://kapi.kakao.com/v1/payment/ready",
      method: "POST",
      headers: {
        Authorization: `KakaoAK ${process.env.MY_ADMIN_KEY}`,
        "Content-type": "application/x-www-form-urlencoded;charset=utf-8",
      },
      params: {
        cid: "TC0ONETIME",
        partner_order_id: "partner_order_id",
        partner_user_id: "partner_user_id",
        item_name: item_name,
        quantity: quantity,
        total_amount: total_amount,
        vat_amount: vat_amount,
        tax_free_amount: tax_free_amount,
        approval_url: "http://localhost:8080/v1/payment/approve",
        fail_url: "http://localhost:8080/v1/payment/fail",
        cancel_url: "http://localhost:8080/v1/payment/cancel",
      },
    });
    req.session.tid = response.data.tid;
    res.redirect(response.data.next_redirect_pc_url);
  } catch (error) {
    res.status(400).json(error.response.data);
  }
};

exports.payApprove = async (req, res) => {
  try {
    const { pg_token } = req.query;
    const response = await axios({
      url: "https://kapi.kakao.com/payment/approve",
      method: "POST",
      headers: {
        Authorization: `KakaoAK ${process.env.MY_ADMIN_KEY}`,
        "Content-type": "application/x-www-form-urlencoded;charset=utf-8",
      },
      params: {
        cid: "TC0ONETIME",
        tid: req.session.tid,
        partner_order_id: "partner_order_id",
        partner_user_id: "partner_user_id",
        pg_token: pg_token,
      },
    });
    res.json(response.data);
  } catch (error) {
    res.status(400).json(error.response.data);
  }
};
