import {
  IQuery,
  IQueryFetchBoardsArgs,
  IQueryFetchBoardsCountArgs,
} from "@/commons/types/generated/types";
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

const FETCH_BOARDS_COUNT = gql`
  query fetchBoardsCount {
    fetchBoardsCount
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

  const {data: dataBoardsCount} = useQuery<
    Pick<IQuery, "fetchBoardsCount">,
    IQueryFetchBoardsCountArgs
  >(FETCH_BOARDS_COUNT);

  const lastPage = dataBoardsCount
    ? Math.ceil(dataBoardsCount.fetchBoardsCount / 10)
    : 0;

  console.log(data?.fetchBoards);
  console.log(dataBoardsCount?.fetchBoardsCount);

  const onClickPage = (event: MouseEvent<HTMLSpanElement>) => {
    console.log(event.currentTarget.id);
    void refetch({page: Number(event.currentTarget.id)});
  };

  const onClickPrevPage = () => {
    if (startPage === 1) return;
    setStartPage(startPage - 10);
    void refetch({page: startPage - 10});
  };

  const onClickNextPage = () => {
    if (startPage + 10 <= lastPage) {
      setStartPage(startPage + 10);
      void refetch({page: startPage + 10});
    }
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
          .map(
            (_, index) =>
              index + startPage <= lastPage && (
                <span
                  key={index + startPage}
                  id={String(index + startPage)}
                  onClick={onClickPage}
                  style={{margin: "10px"}}
                >
                  {index + startPage}
                </span>
              )
          )}
        <span onClick={onClickNextPage}> &rsaquo; </span>
      </div>

      {/* <div>
        <span onClick={onClickPrevPage}> &lsaquo; </span>
        {Array(10)
          .fill(1)
          .map((_, index) => {
            if (index + startPage <= lastPage) {
              return (
                <span
                  key={index + startPage}
                  id={String(index + startPage)}
                  onClick={onClickPage}
                  style={{margin: "10px"}}
                >
                  {index + startPage}
                </span>
              );
            } else {
              return <span></span>;
            }
          })}
        <span onClick={onClickNextPage}> &rsaquo; </span>
      </div> */}
    </>
  );
}
