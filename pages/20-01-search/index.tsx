import {IQuery, IQueryFetchBoardsArgs} from "@/commons/types/generated/types";
import {useQuery, gql} from "@apollo/client";
import styled from "@emotion/styled";
import {ChangeEvent, MouseEvent, useState} from "react";

const FETCH_BOARDS = gql`
  query fetchBoards($page: Int, $search: String) {
    fetchBoards(page: $page, search: $search) {
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
  const [search, setSearch] = useState("");
  const {data, refetch} = useQuery<
    Pick<IQuery, "fetchBoards">,
    IQueryFetchBoardsArgs
  >(FETCH_BOARDS);

  console.log(data?.fetchBoards);

  const onClickPage = (event: MouseEvent<HTMLSpanElement>) => {
    console.log(event.currentTarget.id);
    void refetch({page: Number(event.currentTarget.id)});
    // 검색에서 refetch할 때 사용한 search 검색어가 저장되어 있는 형태이므로 추가로 search 포함하지 않아도 됨.
  };

  const onClickSearch = () => {
    void refetch({search, page: 1});
  };

  const onChangeSearch = (event: ChangeEvent<HTMLInputElement>) => {
    setSearch(event.target.value);
  };
  return (
    <>
      검색어 입력:
      <input type="text" onChange={onChangeSearch} />
      <button onClick={onClickSearch}>검색하기</button>
      {data?.fetchBoards.map((board) => (
        <Row key={board._id}>
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
