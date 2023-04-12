import "react-quill/dist/quill.snow.css";
import dynamic from "next/dynamic";
import {useForm} from "react-hook-form";
import {gql, useMutation} from "@apollo/client";
import {useRouter} from "next/router";
import {
  IMutation,
  IMutationCreateBoardArgs,
} from "@/commons/types/generated/types";

const ReactQuill = dynamic(async () => await import("react-quill"), {
  ssr: false,
});

const CREATE_BOARD = gql`
  mutation createBoard($createBoardInput: CreateBoardInput!) {
    createBoard(createBoardInput: $createBoardInput) {
      _id
    }
  }
`;

export default function WebEditorPage() {
  const router = useRouter();
  const [createBoard] = useMutation<
    Pick<IMutation, "createBoard">,
    IMutationCreateBoardArgs
  >(CREATE_BOARD);
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

  const onClickSubmit = async (data: any) => {
    const result = await createBoard({
      variables: {
        createBoardInput: {
          writer: data.writer,
          password: data.password,
          title: data.title,
          contents: data.contents,
        },
      },
    });
    console.log(result);
    if (typeof result.data?.createBoard._id !== "string") return;
    void router.push(`/27-04-web-editor-detail/${result.data.createBoard._id}`);
  };

  return (
    <form onSubmit={handleSubmit(onClickSubmit)}>
      작성자 : <input type="text" {...register("writer")} />
      <br />
      비밀번호 : <input type="password" {...register("password")} />
      <br />
      제목 : <input type="text" {...register("title")} />
      <br />
      내용 : <ReactQuill onChange={onChangeContents} />
      <br />
      <button>등록하기</button>
    </form>
  );
}
