import {
  IMutation,
  IMutationCreateBoardArgs,
  IMutationUploadFileArgs,
} from "@/commons/types/generated/types";
import {gql, useMutation} from "@apollo/client";
import {Modal} from "antd";
import {ChangeEvent, useState} from "react";

const UPLOAD_FILE = gql`
  mutation uploadFile($file: Upload!) {
    uploadFile(file: $file) {
      url
    }
  }
`;

const CREATE_BOARD = gql`
  mutation createBoard($createBoardInput: CreateBoardInput!) {
    createBoard(createBoardInput: $createBoardInput) {
      _id
    }
  }
`;

export default function ImageUploadPreviewPage() {
  const [imgUrl, setImgUrl] = useState("");
  const [file, setFile] = useState<File>();
  const [uploadFile] = useMutation<
    Pick<IMutation, "uploadFile">,
    IMutationUploadFileArgs
  >(UPLOAD_FILE);

  const [createBoard] = useMutation<
    Pick<IMutation, "createBoard">,
    IMutationCreateBoardArgs
  >(CREATE_BOARD);

  const onClickSubmit = async () => {
    const resultFile = await uploadFile({variables: {file}});
    const url = resultFile.data?.uploadFile.url;

    const result = await createBoard({
      variables: {
        createBoardInput: {
          writer: "Evie",
          password: "123",
          title: "이비빅",
          contents: "비비비빅",
          images: [url],
        },
      },
    });
    console.log(result.data);
  };

  const onChangeFile = async (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]; // input type="file" multiple/> 속성으로 여러개 체크 가능
    console.log(file);
    if (!file) return;

    // try {
    //   const result = await uploadFile({
    //     variables: {
    //       file,
    //     },
    //   });
    //   console.log(result.data?.uploadFile.url);
    //   setImgUrl(result.data?.uploadFile.url ?? "");
    // } catch (error) {
    //   if (error instanceof Error) Modal.error({content: error.message});
    // }
    // 1. 임시 URL 생성 : 가짜 url - 내 브라우저에서만 접근 가능
    // const result = URL.createObjectURL(file);
    // console.log(result);
    // setImgUrl(result);

    // 2. 임시 URL 생성 : 진짜 url - 다른 브라우저에서도 접근 가능
    const fileReader = new FileReader();
    fileReader.readAsDataURL(file);
    fileReader.onload = (event) => {
      if (typeof event.target?.result === "string") {
        console.log(event.target?.result);
        // 게시판에서 event.target.id 대신 event.currentTarget.id를 썼던 이유 : event.target은 태그만을 가리키지 않음
        setImgUrl(event.target?.result);
        setFile(file);
      }
    };
  };
  return (
    <>
      <input type="file" onChange={onChangeFile} />
      <button onClick={onClickSubmit}>GRAPHQL-API 동기 요청하기</button>
      {imgUrl ? <img src={imgUrl} alt="uploaded image" /> : null}
      {/* <img
        src={`https://storage.googleapis.com/${imgUrl}`}
        alt="uploaded image"
      /> */}
    </>
  );
}
