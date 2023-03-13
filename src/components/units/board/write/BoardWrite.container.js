import BoardWriteUI from './BoardWrite.presenter';
import {gql, useMutation} from '@apollo/client';
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

export default function BoardWrite() {
  const [writer, setWriter] = useState('');
  const [title, setTitle] = useState('');
  const [contents, setContents] = useState('');

  const [myFunction] = useMutation(CREATE_BOARD);

  const onClickSubmit = async () => {
    const result = await myFunction({
      variables: {
        writer: writer,
        title: title,
        contents: contents,
      },
    });
    console.log(result.data);
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
    <BoardWriteUI
      submit={onClickSubmit}
      changeWriter={onChangeWriter}
      changeTitle={onChangeTitle}
      changeContents={onChangeContents}
    />
  );
}
