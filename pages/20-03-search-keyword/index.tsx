import {IQuery, IQueryFetchBoardsArgs} from "@/commons/types/generated/types";
import {useQuery, gql} from "@apollo/client";
import styled from "@emotion/styled";
import {ChangeEvent, MouseEvent, useState} from "react";
import _ from "lodash";
import {v4 as uuidv4} from "uuid";

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
  const [keyword, setKeyword] = useState("");
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

  const getDebounce = _.debounce((value) => {
    void refetch({search: value, page: 1});
    setKeyword(value);
  }, 500); // 1초 이내 재입력은 무시, 마지막 입력 1초 후에 작동

  const onChangeSearch = (event: ChangeEvent<HTMLInputElement>) => {
    getDebounce(event.target.value);
  };
  return (
    <>
      검색어 입력:
      <input type="text" onChange={onChangeSearch} />
      {data?.fetchBoards.map((board) => (
        <Row key={board._id}>
          <Column>{board.writer}</Column>
          <Column>
            {board.title
              .replaceAll(keyword, `#@!@#${keyword}#@!@#`)
              .split("#@!@#")
              .map((el) => (
                <span
                  key={uuidv4()}
                  style={{color: el === keyword ? "red" : ""}}
                >
                  {el}
                </span>
              ))}
          </Column>
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
