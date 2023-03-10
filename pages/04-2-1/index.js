import {gql, useMutation, useLazyQuery} from '@apollo/client';
import {useState} from 'react';

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

const FETCH_BOARD = gql`
  query fetchBoard($number: Int) {
    fetchBoard(number: $number) {
      writer
      title
      contents
    }
  }
`;

// const FETCH_BOARD = gql`
//   query {
//     fetchBoard(number: 265727) {
//       writer
//       title
//       contents
//     }
//   }
// `;

export default function GraphqlMutationPage() {
  const [writer, setWriter] = useState('');
  const [title, setTitle] = useState('');
  const [contents, setContents] = useState('');

  const [createBoard] = useMutation(CREATE_BOARD);
  const [fetchBoard] = useLazyQuery(FETCH_BOARD);

  const onClickSubmit = async () => {
    const result = await createBoard({
      variables: {
        writer: writer,
        title: title,
        contents: contents,
      },
    });
    console.log(result.data.createBoard);

    const myBoard = await fetchBoard({
      variables: {
        number: result.data.createBoard.number,
      },
    });

    console.log(myBoard.data.fetchBoard);
    alert(result.data.createBoard.message);
  };

  const onChangeWriter = event => {
    setWriter(event.target.value);
  };

  const onChangeTitle = event => {
    setTitle(event.target.value);
  };

  const onChangeContents = event => {
    setContents(event.target.value);
  };

  return (
    <>
      Writer :
      <input type="text" onChange={onChangeWriter} />
      <br />
      Title :
      <input type="text" onChange={onChangeTitle} />
      <br />
      Contents :
      <input type="text" onChange={onChangeContents} />
      <br />
      <button onClick={onClickSubmit}>GRAPHQL-API 요청하기</button>
    </>
  );
}
