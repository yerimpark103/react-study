import {useForm} from "react-hook-form";

interface IFormData {
  writer: string;
  title: string;
  contents: string;
}

export default function ReactHookFormPage() {
  // register : onChangeInput, onChange... 등 기능이 있음
  const {register, handleSubmit} = useForm<IFormData>();
  const onClickSubmit = (data: IFormData) => {
    console.log(data);
  };

  return (
    <>
      <form onSubmit={handleSubmit(onClickSubmit)}>
        작성자 : <input type="text" {...register("writer")} />
        <br />
        제목 : <input type="text" {...register("title")} />
        <br />
        내용 :<input type="text" {...register("contents")} />
        {/* 주소 :<input type="text" {...register("boardAddress.addressDetail")} /> */}
        <br />
        <button type="submit">등록하기</button>
        <button type="reset">지우기</button>
      </form>
    </>
  );
}

/*
  <button type="submit">등록하기</button> // form 안에서는 기본값
  <button type="reset">지우기</button>
  <button type="button">나만의 버튼</button>
*/
