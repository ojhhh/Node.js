const express = require("express");
const app = express();
const tesseractModule = require("./tesseractModule");

app.use(express.json());

app.get("/", async (req, res) => {
  try {
    const url = "./ocr_test.png";
    const text = await tesseractModule(url);
    res.json({ text });
  } catch (error) {
    console.error(error);
  }
});

app.listen(8080, () => {
  console.log("server on");
});
