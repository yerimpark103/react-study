// import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import dynamic from "next/dynamic";

const ReactQuill = dynamic(async () => await import("react-quill"), {
  ssr: false,
});

export default function WebEditorPage() {
  const onChangeContents = (value: string) => {
    console.log(value);
  };

  const onClickSubmit = async () => {
    const {Modal} = await import("antd"); // code splitting
    Modal.success({content: "등록에 성공했습니다"});
  };

  return (
    <>
      작성자 : <input type="text" />
      <br />
      비밀번호 : <input type="password" />
      <br />
      제목 : <input type="text" />
      <br />
      내용 : <ReactQuill onChange={onChangeContents} />
      <br />
      <button onClick={onClickSubmit}>등록하기</button>
    </>
  );
}
