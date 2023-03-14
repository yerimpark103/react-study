import {useQuery, gql, useMutation} from '@apollo/client';
import styled from '@emotion/styled';

const FETCH_BOARDS = gql`
  query fetchBoards {
    fetchBoards {
      number
      writer
      title
      contents
    }
  }
`;

const DELETE_BOARD = gql`
  mutation deleteBoard($number: Int) {
    deleteBoard(number: $number) {
      message
    }
  }
`;

const Row = styled.div`
  display: flex;
`;

const Column = styled.div`
  width: 20%;
`;

export default function StaticRoutedPage() {
  const {data} = useQuery(FETCH_BOARDS);
  const [deleteBoard] = useMutation(DELETE_BOARD);

  console.log(data?.fetchBoards);

  const handleClickDelete = async event => {
    await deleteBoard({
      variables: {
        number: Number(event.target.id),
      },
      refetchQueries: [{query: FETCH_BOARDS}],
    });
  };

  return (
    <>
      {data?.fetchBoards.map(board => (
        <Row key={board.number}>
          <Column>
            <input type="checkbox" />
          </Column>
          <Column>{board.number}</Column>
          <Column>{board.title}</Column>
          <Column>{board.contents}</Column>
          <Column>
            <button id={board.number} onClick={handleClickDelete}>
              Delete
            </button>
          </Column>
        </Row>
      ))}
    </>
  );
}
