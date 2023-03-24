import {IBoard} from "@/commons/types/generated/types";
import styled from "@emotion/styled";
import {useState} from "react";

const Row = styled.div`
  display: flex;
  flex-direction: row;
`;

const Column = styled.span`
  width: 45%;
`;

interface IProps {
  board: IBoard;
}
export default function BoardCommentItem(props: IProps) {
  const [isEditing, setIsEditing] = useState(false);

  const handleClickEditButton = () => {
    setIsEditing(true);
  };

  return (
    <div key={props.board._id}>
      {!isEditing && (
        <Row key={props.board._id}>
          <Column>{props.board.writer}</Column>
          <Column>{props.board.title}</Column>
          <button onClick={handleClickEditButton}>수정하기</button>
        </Row>
      )}
      {isEditing && (
        <div>
          수정할 내용: <input type="text" />
        </div>
      )}
    </div>
  );
}
