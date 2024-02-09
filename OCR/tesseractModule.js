const { createWorker } = require("tesseract.js");

const tesseractModule = async (url) => {
  try {
    const worker = await createWorker("eng");
    const {
      data: { text },
    } = await worker.recognize(url);
    console.log(text);
    await worker.terminate();
  } catch (error) {
    console.error(error);
  }
};

module.exports = tesseractModule;
