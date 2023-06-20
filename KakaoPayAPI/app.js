const express = require("express");
const session = require("express-session");
const dot = require("dotenv").config();
const axios = require("axios");
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(
  session({
    secret: process.env.SECRET_KEY,
    resave: false,
    saveUninitialized: false,
    cookie: { maxAge: 60000 },
  })
);

// 결제 정보를 입력할 수 있는 페이지
app.get("/", (req, res) => {
  res.send(`
        <h1>결제 테스트 페이지</h1>
        <form action="/v1/payment/ready" method="POST">
            <label>
                상품 이름:
                <input type="text" name="item_name" value="원피스" />
            </label><br />
            <label>
                상품 개수:
                <input type="number" name="quantity" value="1" />
            </label><br />
            <label>
                총 결제 금액:
                <input type="number" name="total_amount" value="22000" />
            </label><br />
            <label>
                VAT 금액:
                <input type="number" name="vat_amount" value="2200" />
            </label><br />
            <label>
                비과세 금액:
                <input type="number" name="tax_free_amount" value="0" />
            </label><br />
            <button type="submit">결제 준비</button>
        </form>
    `);
});

// 카카오페이 결제 준비
app.post("/v1/payment/ready", async (req, res) => {
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
});

// 카카오페이 결제 승인
app.get("/v1/payment/approve", async (req, res) => {
  try {
    const { pg_token } = req.query;
    const response = await axios({
      url: "https://kapi.kakao.com/v1/payment/approve",
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
});

app.listen(process.env.SERVER_PORT, () => {
  console.log(`Server is running on port ${process.env.SERVER_PORT}`);
});
