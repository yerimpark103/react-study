import {useMutation} from '@apollo/client';
import {ChangeEvent, useState} from 'react';
import {CREATE_BOARD, UPDATE_BOARD} from './BoardWrite.queries';
import BoardWriteUI from './BoardWrite.presenter';
import {useRouter} from 'next/router';
import {IBoardWriteProps, IMyVariables} from './BoardWrite.types';

export default function BoardWrite(props: IBoardWriteProps) {
  const router = useRouter();
  const [myColor, setMyColor] = useState(false);

  const [writer, setWriter] = useState('');
  const [title, setTitle] = useState('');
  const [contents, setContents] = useState('');

  const [createBoard] = useMutation(CREATE_BOARD);
  const [updateBoard] = useMutation(UPDATE_BOARD);

  const onClickSubmit = async () => {
    const result = await createBoard({
      variables: {
        writer: writer,
        title: title,
        contents: contents,
      },
    });
    alert(result.data.createBoard.message);
    router.push(`/10-01-typescript-boards/${result.data.createBoard.number}`);
  };

  const onClickUpdate = async () => {
    const myVariables: IMyVariables = {number: Number(router.query.number)};
    if (writer) myVariables.writer = writer;
    if (title) myVariables.title = title;
    if (contents) myVariables.contents = contents;
    // 1. 수정 뮤테이션
    const result = await updateBoard({
      variables: myVariables,
    });
    // 2. 상세 페이지로 이동하기
    alert(result.data.updateBoard.message);
    router.push(`/10-01-typescript-boards/${result.data.updateBoard.number}`);
  };

  const onChangeWriter = (event: ChangeEvent<HTMLInputElement>) => {
    setWriter(event.target.value);
    validator();
  };

  const onChangeTitle = (event: ChangeEvent<HTMLInputElement>) => {
    setTitle(event.target.value);
    validator();
  };

  const onChangeContents = (event: ChangeEvent<HTMLInputElement>) => {
    setContents(event.target.value);
    validator();
  };

  const validator = () => {
    if (writer !== '' && title !== '' && contents !== '') {
      setMyColor(true);
    }
  };

  return (
    <BoardWriteUI
      onClickSubmit={onClickSubmit}
      onClickUpdate={onClickUpdate}
      onChangeWriter={onChangeWriter}
      onChangeTitle={onChangeTitle}
      onChangeContents={onChangeContents}
      myColor={myColor}
      isEdit={props.isEdit}
      data={props.data}
    />
  );
}
