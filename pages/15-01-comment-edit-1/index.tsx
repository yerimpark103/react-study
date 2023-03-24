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
  width: 45%;
`;

export default function CommentEditPage() {
  const [editingIndex, setEditingIndex] = useState(5);
  const {data} = useQuery<Pick<IQuery, "fetchBoards">, IQueryFetchBoardsArgs>(
    FETCH_BOARDS
  );

  const handleClickEditButton = (event: MouseEvent<HTMLButtonElement>) => {
    console.log(event);
    setEditingIndex(Number(event.currentTarget.id));
  };

  return (
    <>
      {data?.fetchBoards.map((board, index) => (
        <div key={board._id}>
          {index !== editingIndex && (
            <Row key={board._id}>
              <Column>{board.writer}</Column>
              <Column>{board.title}</Column>
              <button id={String(index)} onClick={handleClickEditButton}>
                수정하기
              </button>
            </Row>
          )}
          {index === editingIndex && (
            <div>
              수정할 내용: <input type="text" />
            </div>
          )}
        </div>
      ))}
    </>
  );
}
