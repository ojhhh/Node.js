const { createWorker } = require("tesseract.js");

const tesseractModule = async (url) => {
  try {
    const worker = await createWorker("kor+eng");
    const {
      data: { text },
    } = await worker.recognize(url);
    await worker.terminate();
    return text;
  } catch (error) {
    console.error(error);
  }
};

module.exports = tesseractModule;
