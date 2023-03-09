import {gql, useMutation} from '@apollo/client';

const CREATE_BOARD = gql`
  mutation createBoard($writer: String, $title: String, $contents: String) {
    # Variable types
    createBoard(writer: $writer, title: $title, contents: $contents) {
      # Actual variables
      _id
      number
      message
    }
  }
`;

export default function GraphqlMutationPage() {
  const [myFunction] = useMutation(CREATE_BOARD);

  const onClickSubmit = async () => {
    const result = await myFunction({
      variables: {
        writer: 'Evivie',
        title: 'HEwwo',
        contents: 'World',
      },
    });
    console.log(result.data);
    alert(result.data.createBoard.message);
  };

  return (
    <>
      <button onClick={onClickSubmit}>GRAPHQL-API 동기 요청하기</button>
    </>
  );
}
