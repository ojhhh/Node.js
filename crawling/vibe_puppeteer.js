const puppeteer = require("puppeteer");
const fs = require("fs");

(async () => {
  const browser = await puppeteer.launch({ headless: "new" });
  const page = await browser.newPage(); // 새로운 브라우저 창을 만듬

  await page.goto("https://vibe.naver.com/chart/total"); // 해당 경로로 이동

  // 웹 페에지 DOM을 조작하는 로직

  // path : 스크린샷 이름
  // fullpage : 해당 페이지의 전체 스크린샷
  // await page.screenshot({ path: "음악차트.png", fullPage: true }); // 해당 페이지를 스크린샷을 찍어서 저장

  // const html = await page.content(); // 해당 페이지 html 파일 가져오기
  // const title = await page.evaluate(() => document.title); // 페이지 제목?
  // console.log(title); // VIBE (바이브)

  // const text = await page.evaluate(() => document.body.innerText); // 페이지 안에 모든 텍스트를 다 가져옴
  // console.log(text);

  // const links = await page.evaluate(
  //   () =>
  //     // Array.from : 이터러블 요소에서 배열을 생성하는 함수
  //     Array.from(document.querySelectorAll("a"), (e) => e.href) // 페이지에 있는 모든 a 태그의 href 가져와서 배열로 저장
  // );

  // version 1
  // ======= vibe 사이트 오늘 Top 100 랭킹 스크래핑 =======
  // const songs = await page.evaluate(() =>
  //   Array.from(document.querySelectorAll(".tracklist tbody tr"), (e) => ({
  //     rank: e.querySelector(".rank span").innerText,
  //     song: e.querySelector(".song .link_text").innerText,
  //     artist: e.querySelector(".artist .link_artist span").innerText,
  //   }))
  // );
  // await console.log(songs);

  // version 2
  // ======= vibe 사이트 오늘 Top 100 랭킹 스크래핑 =======
  const songs = await page.$$eval(".tracklist tbody tr", (elements) =>
    elements.map((e) => ({
      rank: e.querySelector(".rank span").innerText,
      song: e.querySelector(".song .link_text").innerText,
      artist: e.querySelector(".artist .link_artist span").innerText,
    }))
  );
  // await console.log(songs);

  // 가져온 랭킹 정보를 파일로 저장
  fs.writeFile("top100.json", JSON.stringify(songs), (err) => {
    if (err) throw err;
    console.log("create json file");
  });

  await browser.close();
})();
