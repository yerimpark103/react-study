import {useMutation} from '@apollo/client';
import {useState} from 'react';
import {CREATE_BOARD} from './BoardWrite.queries';
import BoardWriteUI from './BoardWrite.presenter';

export default function BoardWrite() {
  const [myColor, setMyColor] = useState(false);

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
    validator();
  };

  const onChangeTitle = event => {
    setTitle(event.target.value);
    validator();
  };

  const onChangeContents = event => {
    setContents(event.target.value);
    validator();
  };

  const validator = () => {
    if (writer !== '' && title !== '' && event.target.value !== '') {
      setMyColor(true);
    }
  };

  return (
    <BoardWriteUI
      onClickSubmit={onClickSubmit}
      onChangeWriter={onChangeWriter}
      onChangeTitle={onChangeTitle}
      onChangeContents={onChangeContents}
      myColor={myColor}
    />
  );
}
