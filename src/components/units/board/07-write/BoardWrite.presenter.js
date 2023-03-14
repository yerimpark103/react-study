import {MyButton, MyInput} from './BoardWrite.styles';

export default function BoardWriteUI(props) {
  return (
    <>
      Writer :
      <MyInput type="text" onChange={props.onChangeWriter} />
      <br />
      Title :
      <MyInput type="text" onChange={props.onChangeTitle} />
      <br />
      Contents :
      <MyInput type="text" onChange={props.onChangeContents} />
      <br />
      <MyButton zzz={props.myColor} onClick={props.onClickSubmit}>
        GRAPHQL-API 동기 요청하기
      </MyButton>
    </>
  );
}
