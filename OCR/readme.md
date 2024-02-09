## OCR

- 광학 문자 인식
- 이미지에서 글씨를 추출

## Tesseract.js

- OCR 라이브러리를 이용하여 이미지 추출

### npm install

```js
npm install tesseract.js
```

### basic

```js
const { createWorker } = require("tesseract.js");

const worker = await createWorker("eng");

(async () => {
  const {
    data: { text },
  } = await worker.recognize(
    "https://tesseract.projectnaptha.com/img/eng_bw.png"
  );
  console.log(text);
  await worker.terminate();
})();
```
