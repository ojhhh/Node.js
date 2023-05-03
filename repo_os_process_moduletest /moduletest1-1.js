// 모듈이란?
// 하나의 큰 프로그램의 작은 단위
// 모듈은 각각의 파일단위로 구분
// 파일의 내용은 필요한 기능들의 함수나 변수들이 포함되어 있는 것
// 하나의 파일에 기능을 모두 작성하면 수정이나 유지보수, 협업에 있어 작업이 힘들기 때문에 파일을 규칙에 맞게 나누는게 좋음

// 테스트 모듈 만들기

// 다른 파일에서 이 파일의 내용을 실행시키면 오류가 나는데 모듛화 시켜 내보내면 다른 파일에서도 사용할 수 있음
// module.exports : 해당 파일의 리턴값을 내보내 줄 수 있음

const blockClass = [
  {
    name: "hi",
    age: 1,
    comment: function () {
      console.log(this.name + "하이");
    },
  },
  {
    name: "hello",
    age: 1,
    comment: function () {
      console.log(this.name + "헬로");
    },
  },
];

module.exports = blockClass;
