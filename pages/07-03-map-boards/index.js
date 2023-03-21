import {useQuery, gql} from "@apollo/client";
import styled from "@emotion/styled";

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

const Row = styled.div`
  display: flex;
`;

const Column = styled.div`
  width: 25%;
`;

export default function StaticRoutedPage() {
  const {data} = useQuery(FETCH_BOARDS);

  console.log(data?.fetchBoards);

  return (
    <>
      {data?.fetchBoards.map((board) => (
        <Row key={board.number}>
          <Column>
            <input type="checkbox" />
          </Column>
          <Column>{board.number}</Column>
          <Column>{board.title}</Column>
          <Column>{board.contents}</Column>
        </Row>
      ))}
    </>
  );
}
