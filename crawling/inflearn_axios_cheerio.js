const axios = require("axios");
const cheerio = require("cheerio");

// 인프런 사이트에 특정 검색어를 입력했을때 결과값에 대한 HTML 문서를 가져옴
// encodeURI 한글로 받으면 꺠지기 때문에 인코딩
const getHTML = async (keyword) => {
  try {
    return await axios.get(
      "https://www.inflearn.com/courses?s=" + encodeURI(keyword)
    );
  } catch (error) {
    console.error(error);
  }
};

// 데이터 파싱
const parsing = async (keyword) => {
  const html = await getHTML(keyword);
  // console.log(html);
  const $ = cheerio.load(html.data);
  const $courseList = $(".course_card_item");

  let courses = [];
  $courseList.each((idx, node) => {
    // const title = $(node).find(".course_title").text();
    // '자바스크립트 제대로 배워볼래?' title이 2개 가 연속으로 넘어오는 상황
    // eq(0)를 사용하여 2개중 1개만 저장
    courses.push({
      title: $(node).find(".course_title:eq(0)").text(),
      instructor: $(node).find(".instructor").text(),
      price: $(node).find(".price").text(),
      rating: $(node).find(".star_solid").css("width"),
      img: $(node).find(".card-image > figure > img").attr("src"), // card-image 태그 밑에 figure  태그 밑에 img 가져오기
    });
  });
  console.log(courses);
};

parsing("자바스크립트");
