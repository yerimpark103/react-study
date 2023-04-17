import JestUnitTestPage from "pages/34-03-unit-test-snapshot";

import {render, screen} from "@testing-library/react";
import "@testing-library/jest-dom";

it("기존 사진이랑 바뀐 게 없는지 비교 : 스냅샷 테스트", () => {
  const result = render(<JestUnitTestPage />);
  expect(result.container).toMatchSnapshot();
});
