import {IQuery, IQueryFetchBoardsArgs} from "@/commons/types/generated/types";
import BoardCommentItem from "@/components/units/15-board-comment-item";
import {useQuery, gql} from "@apollo/client";

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

export default function CommentEditPage() {
  const {data} = useQuery<Pick<IQuery, "fetchBoards">, IQueryFetchBoardsArgs>(
    FETCH_BOARDS
  );
  return (
    <>
      {data?.fetchBoards.map((board) => (
        <BoardCommentItem key={board._id} board={board} />
      ))}
    </>
  );
}
