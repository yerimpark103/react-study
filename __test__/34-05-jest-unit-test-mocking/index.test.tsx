import {fireEvent, render, screen, waitFor} from "@testing-library/react";
import GraphqlMutationPage, {
  CREATE_BOARD,
} from "pages/34-05-jest-unit-test-mocking";
import {MockedProvider} from "@apollo/client/testing";
import {useRouter} from "next/router";

// 가짜 useRouter만들고 가짜 push 만들기
jest.mock("next/router", () => ({
  useRouter: jest.fn(), // 가짜 라우터
}));
const push = jest.fn();
(useRouter as jest.Mock).mockImplementation(() => ({
  push,
}));

// 가짜 mutation 만들기 (요청, 응답 모두)
const mocks = [
  {
    request: {
      query: CREATE_BOARD,
      variables: {
        createBoardInput: {
          writer: "철수",
          title: "안녕하세요",
          contents: "반갑습니다",
          password: "1234",
        },
      },
    },
    result: {
      data: {
        createBoard: {
          _id: "백엔드에서-받은-게시글ID",
          writer: "철수",
          title: "안녕하세요",
          contents: "반갑습니다",
        },
      },
    },
  },
];

it("API를 모킹하여 테스트하자", async () => {
  render(
    <MockedProvider mocks={mocks}>
      <GraphqlMutationPage />
    </MockedProvider>
  );

  fireEvent.change(screen.getByRole("input-writer"), {
    target: {value: "철수"},
  });

  fireEvent.change(screen.getByRole("input-title"), {
    target: {value: "안녕하세요"},
  });

  fireEvent.change(screen.getByRole("input-contents"), {
    target: {value: "반갑습니다"},
  });

  // TDD => 테스트를 먼저 만들자!
  // fireEvent.change(screen.getByRole("input-password"), {
  //   target: {value: "1234"}
  // })

  fireEvent.click(screen.getByRole("submit-button"));

  // await을 붙여야 페이지 이동을 기다림
  await waitFor(() => {
    expect(push).toHaveBeenCalledWith(`/boards/백엔드에서-받은-게시글ID`);
  });
});
