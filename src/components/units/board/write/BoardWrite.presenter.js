export default function BoardWriteUI(props) {
  return (
    <>
      Writer :
      <input type="text" onChange={props.changeWriter} />
      <br />
      Title :
      <input type="text" onChange={props.changeTitle} />
      <br />
      Contents :
      <input type="text" onChange={props.changeContents} />
      <br />
      <button onClick={props.submit}>GRAPHQL-API 동기 요청하기</button>
    </>
  );
}
