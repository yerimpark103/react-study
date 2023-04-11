import {IQuery, IQueryFetchBoardsArgs} from "@/commons/types/generated/types";
import {useQuery, gql, useMutation} from "@apollo/client";
import styled from "@emotion/styled";

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

const DELETE_BOARD = gql`
  mutation deleteBoard($boardId: ID!) {
    deleteBoard(boardId: $boardId)
  }
`;

const CREATE_BOARD = gql`
  mutation createBoard($createBoardInput: CreateBoardInput!) {
    createBoard(createBoardInput: $createBoardInput) {
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
  width: 40%;
`;

export default function StaticRoutedPage() {
  const {data} = useQuery<Pick<IQuery, "fetchBoards">, IQueryFetchBoardsArgs>(
    FETCH_BOARDS
  );
  const [deleteBoard] = useMutation(DELETE_BOARD);
  const [createBoard] = useMutation(CREATE_BOARD);

  const onClickDelete = (boardId: string) => () => {
    void deleteBoard({
      variables: {boardId},
      // refetchQueries: [{query : FETCH_BOARDS}] --> pro : 가독성, con : 규모가 클 시 서버 부하 유발 가능
      update(cache, {data}) {
        cache.modify({
          fields: {
            fetchBoards: (prev, {readField}) => {
              // 객체에서 key값을 읽을 때는 readField 사용
              const deletedId = data.deleteBoard; // 삭제된 id
              const filteredPrev = prev.filter(
                (el) => readField("_id", el) !== deletedId
              );
              return [...filteredPrev];
            },
          },
        });
      },
    });
  };

  const onClickCreate = () => {
    void createBoard({
      variables: {
        createBoardInput: {
          writer: "Evie",
          password: "123123",
          title: "이비빅",
          contents: "내용용",
        },
      },
      // refetchQueries: [{query : FETCH_BOARDS}]
      update(cache, {data}) {
        cache.modify({
          fields: {
            fetchBoards: (prev) => {
              return [data.createBoard, ...prev];
            },
          },
        });
      },
    });
  };

  return (
    <>
      {data?.fetchBoards.map((board) => (
        <Row key={board._id}>
          <Column>{board.writer}</Column>
          <Column>{board.title}</Column>
          <button onClick={onClickDelete(board._id)}>삭제</button>
        </Row>
      ))}
      <button onClick={onClickCreate}>등록</button>
    </>
  );
}
