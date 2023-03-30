import {checkValidationImage} from "@/commons/libraries/validationFile";
import {
  IMutation,
  IMutationCreateBoardArgs,
  IMutationUploadFileArgs,
} from "@/commons/types/generated/types";
import {gql, useMutation} from "@apollo/client";
import {Modal} from "antd";
import {ChangeEvent, useRef, useState} from "react";

const CREATE_BOARD = gql`
  mutation createBoard($createBoardInput: CreateBoardInput!) {
    createBoard(createBoardInput: $createBoardInput) {
      _id
    }
  }
`;

const UPLOAD_FILE = gql`
  mutation uploadFile($file: Upload!) {
    uploadFile(file: $file) {
      url
    }
  }
`;

export default function GraphqlMutationPage() {
  const fileRef = useRef<HTMLInputElement>(null);
  const [imgUrl, setImgUrl] = useState("");
  const [writer, setWriter] = useState("");
  const [title, setTitle] = useState("");
  const [contents, setContents] = useState("");

  const [uploadFile] = useMutation<
    Pick<IMutation, "uploadFile">,
    IMutationUploadFileArgs
  >(UPLOAD_FILE);

  const [createBoard] = useMutation<
    Pick<IMutation, "createBoard">,
    IMutationCreateBoardArgs
  >(CREATE_BOARD);

  const onClickSubmit = async () => {
    const result = await createBoard({
      variables: {
        createBoardInput: {
          writer,
          password: "123",
          title,
          contents,
          images: [imgUrl],
        },
      },
    });
    console.log(result.data);
  };

  const onChangeWriter = (event: ChangeEvent<HTMLInputElement>) => {
    setWriter(event.target.value);
  };

  const onChangeTitle = (event: ChangeEvent<HTMLInputElement>) => {
    setTitle(event.target.value);
  };

  const onChangeContents = (event: ChangeEvent<HTMLInputElement>) => {
    setContents(event.target.value);
  };

  const onChangeFile = async (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]; // <input type="file" multiple/> 속성으로 여러개 체크 가능
    console.log(file);

    const isImageValid = checkValidationImage(file);

    if (!isImageValid) return;

    try {
      const result = await uploadFile({
        variables: {
          file,
        },
      });
      console.log(result.data?.uploadFile.url);
      setImgUrl(result.data?.uploadFile.url ?? "");
    } catch (error) {
      if (error instanceof Error) Modal.error({content: error.message});
    }
  };

  const onClickImage = () => {
    fileRef.current?.click();
  };

  return (
    <>
      Writer :
      <input type="text" onChange={onChangeWriter} />
      <br />
      Title :
      <input type="text" onChange={onChangeTitle} />
      <br />
      Contents :
      <input type="text" onChange={onChangeContents} />
      <br />
      <div
        onClick={onClickImage}
        style={{
          width: "50px",
          height: "50px",
          backgroundColor: "gray",
          cursor: "pointer",
        }}
      >
        이미지 선택
      </div>
      <input
        ref={fileRef}
        type="file"
        style={{display: "none"}}
        onChange={onChangeFile}
        accept="image/*"
      />
      <img
        src={`https://storage.googleapis.com/${imgUrl}`}
        alt="uploaded image"
      />
      <br />
      <button onClick={onClickSubmit}>GRAPHQL-API 동기 요청하기</button>
    </>
  );
}
