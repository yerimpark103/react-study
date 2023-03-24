import {IQuery, IQueryFetchBoardsArgs} from "@/commons/types/generated/types";
import {useQuery, gql} from "@apollo/client";
import styled from "@emotion/styled";
import {MouseEvent, useState} from "react";

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
  const [startPage, setStartPage] = useState(1);

  const {data, refetch} = useQuery<
    Pick<IQuery, "fetchBoards">,
    IQueryFetchBoardsArgs
  >(FETCH_BOARDS);

  console.log(data?.fetchBoards);

  const onClickPage = (event: MouseEvent<HTMLSpanElement>) => {
    console.log(event.currentTarget.id);
    void refetch({page: Number(event.currentTarget.id)});
  };

  const onClickPrevPage = () => {
    setStartPage(startPage - 10);
    void refetch({page: startPage - 10});
  };

  const onClickNextPage = () => {
    setStartPage(startPage + 10);
    void refetch({page: startPage + 10});
  };

  return (
    <>
      {data?.fetchBoards.map((board) => (
        <Row key={board._id}>
          <Column>{board.writer}</Column>
          <Column>{board.title}</Column>
        </Row>
      ))}
      <div>
        <span onClick={onClickPrevPage}> &lsaquo; </span>
        {Array(10)
          .fill(1)
          .map((_, index) => (
            <span
              key={index + startPage}
              id={String(index + startPage)}
              onClick={onClickPage}
            >
              {index + startPage}
            </span>
          ))}
        <span onClick={onClickNextPage}> &rsaquo; </span>
      </div>
    </>
  );
}
