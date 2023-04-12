import "react-quill/dist/quill.snow.css";
import dynamic from "next/dynamic";
import {Modal} from "antd";
import {useForm} from "react-hook-form";

const ReactQuill = dynamic(async () => await import("react-quill"), {
  ssr: false,
});

export default function WebEditorPage() {
  const {register, handleSubmit, setValue, trigger} = useForm({
    mode: "onChange", // 비제어 x. 인풋마다 검증
  });
  const onChangeContents = (value: string) => {
    console.log(value);
    // Register로 등록하지 않고, 강제로 값을 넣어주는 react-hook-form 기능.
    // setValue(key, value)
    setValue("contents", value === "<p><br></p>" ? "" : value);

    // onChange되었다고 react-hook-form에 강제로 알려주는 기능
    void trigger("contents");
  };

  const onClickSubmit = () => {
    // const {Modal} = dynamic(async () => await import("antd"), {ssr: false}); // code splitting
    Modal.success({content: "등록에 성공했습니다"});
  };

  return (
    <>
      작성자 : <input type="text" {...register("writer")} />
      <br />
      비밀번호 : <input type="password" {...register("password")} />
      <br />
      제목 : <input type="text" {...register("title")} />
      <br />
      내용 : <ReactQuill onChange={onChangeContents} />
      <br />
      <button onClick={onClickSubmit}>등록하기</button>
    </>
  );
}
