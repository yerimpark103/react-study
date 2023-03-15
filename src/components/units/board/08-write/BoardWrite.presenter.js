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
      <MyButton
        zzz={props.myColor}
        onClick={props.isEdit ? props.onClickUpdate : props.onClickSubmit}
      >
        {props.isEdit ? '수정 적용하기' : '등록하기'}
      </MyButton>
    </>
  );
}
