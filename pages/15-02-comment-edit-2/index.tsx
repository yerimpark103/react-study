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
  const [editingIndex, setEditingIndex] = useState([
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
  ]);
  const {data} = useQuery<Pick<IQuery, "fetchBoards">, IQueryFetchBoardsArgs>(
    FETCH_BOARDS
  );

  const handleClickEditButton = (event: MouseEvent<HTMLButtonElement>) => {
    const temp = [...editingIndex];
    temp[Number(event.currentTarget.id)] = true;
    setEditingIndex(temp);
  };

  return (
    <>
      {data?.fetchBoards.map((board, index) => (
        <div key={board._id}>
          {!editingIndex[index] && (
            <Row key={board._id}>
              <Column>{board.writer}</Column>
              <Column>{board.title}</Column>
              <button id={String(index)} onClick={handleClickEditButton}>
                수정하기
              </button>
            </Row>
          )}
          {editingIndex[index] && (
            <div>
              수정할 내용: <input type="text" />
            </div>
          )}
        </div>
      ))}
    </>
  );
}
