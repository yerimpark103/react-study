import {gql, useMutation} from '@apollo/client';
import {useRouter} from 'next/router';
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

export default function GraphqlMutationPage() {
  const router = useRouter();

  const [writer, setWriter] = useState('');
  const [title, setTitle] = useState('');
  const [contents, setContents] = useState('');

  const [myFunction] = useMutation(CREATE_BOARD);

  const onClickSubmit = async () => {
    try {
      const result = await myFunction({
        variables: {
          writer: writer,
          title: title,
          contents: contents,
        },
      });
      console.log(result.data);
      alert(result.data.createBoard.message);
      router.push(
        `/05-10-dynamic-routed-board-mutation/${result.data.createBoard.number}`,
      );
    } catch (error) {
      console.log(error.message);
      alert(error.message);
    }
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
      <button onClick={onClickSubmit}>GRAPHQL-API 동기 요청하기</button>
    </>
  );
}
