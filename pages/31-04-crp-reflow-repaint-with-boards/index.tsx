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

  const onClickPage = (event: MouseEvent<HTMLSpanElement>) => {
    console.log(event.currentTarget.id);
    void refetch({page: Number(event.currentTarget.id)});
  };

  return (
    <>
      {/* 임시 배열 10개를 생성하여 데이터가 없을 때에도 높이 30px를 유지하여 reflow 방지 */}
      {(data?.fetchBoards ?? new Array(10).fill(1)).map((board) => (
        <Row key={board._id} style={{height: "30px"}}>
          <Column>{board.writer}</Column>
          <Column>{board.title}</Column>
        </Row>
      ))}

      {Array(10)
        .fill(1)
        .map((_, index) => (
          <span key={index} id={String(index + 1)} onClick={onClickPage}>
            {index + 1}
          </span>
        ))}
    </>
  );
}
