const express = require("express");
// const { createWorker } = require("tesseract.js");
const app = express();
const tesseractModule = require("./tesseractModule");

app.use(express.json());

app.get("/", async (req, res) => {
  try {
    const url = "https://tesseract.projectnaptha.com/img/eng_bw.png";
    await tesseractModule(url);
  } catch (error) {
    console.error(error);
  }
});

app.listen(8080, () => {
  console.log("server on");
});
