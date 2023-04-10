import {useForm} from "react-hook-form";
import {yupResolver} from "@hookform/resolvers/yup";
import * as yup from "yup";

const schema = yup.object({
  writer: yup.string().required("작성자를 입력해주세요"),
  title: yup.string().required("제목을 입력해주세요"),
  contents: yup.string().required("내용을 입력해주세요"),
  password: yup
    .string()
    .min(4, "비밀번호는 최소 4자리입니다")
    .max(15, "비밀번호는 최대 15자리입니다")
    .required("비밀번호는 필수입니다"),

  // email: yup
  //   .string()
  //   .email("이메일 형식이 아닙니다")
  //   .required("이메일을 입력해주세요"),
  // phone: yup
  //   .string()
  //   .matches(/^\d{3}-\d{3,4}-\d{4}$/, "휴대폰 형식이 맞지 않습니다")
  //   .required("휴대폰 번호는 필수입니다"),
});

interface IFormData {
  writer: string;
  title: string;
  contents: string;
  password: string;
}

export default function ReactHookFormWithYupPage() {
  // register : onChangeInput, onChange... 등 기능이 있음
  const {register, handleSubmit, formState} = useForm<IFormData>({
    resolver: yupResolver(schema),
    mode: "onChange", // 검증 방식 - 입력과 함께 바로바로 트리거
  });
  const onClickSubmit = (data: IFormData) => {
    console.log(data);
  };

  return (
    <>
      <form onSubmit={handleSubmit(onClickSubmit)}>
        작성자 : <input type="text" {...register("writer")} />
        <div>{formState.errors.writer?.message}</div>
        <br />
        제목 : <input type="text" {...register("title")} />
        <div>{formState.errors.title?.message}</div>
        <br />
        내용 :<input type="text" {...register("contents")} />
        <div>{formState.errors.contents?.message}</div>
        <br />
        비밀번호 : <input type="password" {...register("password")} />
        <div>{formState.errors.password?.message}</div>
        <br />
        <button
          type="submit"
          style={{backgroundColor: formState.isValid ? "yellow" : ""}}
        >
          등록하기
        </button>
        <button type="reset">지우기</button>
      </form>
    </>
  );
}
