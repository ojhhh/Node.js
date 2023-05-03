// REPL : 읽기(Read) - 해석(Eval) - 출력(Print) - 반복(Loop)
// 콘솔 환경에서 코드를 입력하면 즉시 실행해서 결과를 반환해주는 인터페이스
// nodejs의 코드를 test하고 실행할 수 있도록 해주는 대화형 콘솔

// 레포 모드 사용
// > Terminal에서 node 입력하면 들어가짐

// 레포 모드에서 test 코드 작성
const str = "hello nodejs";
console.log(str);

// 결과
// hello nodejs
// undefined
// console.log()의 결과를 출력. 반환 값이 없으니 undefined

// 브라우저의 런타임과 node의 런타임이 다름
// 브라우저의 console.log와 node의 console.log는 비슷한거지 같은건 아님
// 브라우저의 this의 전역객체는 window, node 런타임 환경에서 this의 전역객체는 global

// 레포 모드 종료 : ctrl + c

// 파일 실행 모드
// node로 파일을 실행할떄 node 구문 뒤에 파일의 경로 작성
// 예) node index.js
