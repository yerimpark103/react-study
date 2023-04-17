import {add} from "pages/34-01-jest";

// 테스트 제목
it("더하기 잘 되는지 테스트해보기", () => {
  // 테스트 할 내용 -> 문제도 정답도 본인이 만들어야 합니다.
  const result = add(3, 5);
  expect(result).toBe(8);
});

// describe("나만의 테스트 그룹 만들기", () => {
//   it("Test 1", () => {});
//   it("Test 2", () => {});
//   it("Test 3", () => {});
// });
