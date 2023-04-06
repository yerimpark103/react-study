import {IQuery, IQueryFetchBoardsArgs} from "@/commons/types/generated/types";
import {useQuery, gql} from "@apollo/client";
import styled from "@emotion/styled";
import {MouseEvent} from "react";

const FETCH_BOARDS = gql`
  query fetchBoards($page: Int) {
    fetchBoards(page: $page) {
      _id
      writer
      title
      contents
    }
  }
`;

const Row = styled.div`
  display: flex;
  flex-direction: row;
`;

const Column = styled.span`
  width: 50%;
`;

export default function StaticRoutedPage() {
  const {data, refetch} = useQuery<
    Pick<IQuery, "fetchBoards">,
    IQueryFetchBoardsArgs
  >(FETCH_BOARDS);

  console.log(data?.fetchBoards);

  // Higher Order Function
  const onClickPage = (boardId: number) => () => {
    void refetch({page: boardId});
  };

  return (
    <>
      {data?.fetchBoards.map((board) => (
        <Row key={board._id}>
          <Column>{board.writer}</Column>
          <Column>{board.title}</Column>
        </Row>
      ))}

      {Array(10)
        .fill(1)
        .map((_, index) => (
          <span
            key={index}
            onClick={onClickPage(index + 1)} // id를 직접 입력해서 event.target을 하는 것보다 효율적임.
          >
            {index + 1}
          </span>
        ))}
    </>
  );
}
