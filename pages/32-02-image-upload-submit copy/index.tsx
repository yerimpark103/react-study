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
  const [imgUrls, setImgUrls] = useState(["", "", ""]);
  const [files, setFiles] = useState<File[]>([]);
  // const [imgUrl, setImgUrl] = useState("");
  // const [file, setFile] = useState<File>();
  const [uploadFile] = useMutation<
    Pick<IMutation, "uploadFile">,
    IMutationUploadFileArgs
  >(UPLOAD_FILE);

  const [createBoard] = useMutation<
    Pick<IMutation, "createBoard">,
    IMutationCreateBoardArgs
  >(CREATE_BOARD);

  const onClickSubmit = async () => {
    // // 1. Promise.all 안 썼을 때
    // const resultFile0 = await uploadFile({variables: {file: files[0]}});
    // const url0 = resultFile0.data?.uploadFile.url;

    // const resultFile1 = await uploadFile({variables: {file: files[1]}});
    // const url1 = resultFile1.data?.uploadFile.url;

    // const resultFile2 = await uploadFile({variables: {file: files[2]}});
    // const url2 = resultFile2.data?.uploadFile.url;

    // // const resultUrls = [url0, url1, url2]; // [a.jpg, b.jpg, c.jpg]

    // // 2. Promise.all 썼을 때
    // const results = await Promise.all([
    //   uploadFile({variables: {file: files[0]}}),
    //   uploadFile({variables: {file: files[1]}}),
    //   uploadFile({variables: {file: files[2]}}),
    // ]);
    // console.log(results); // [resultFile0, resultFile1, resultFile2]
    // const resultUrls = results.map((el) => (el ? el.data?.uploadFile.url : ""));

    // 3. Promise.all 썼을 때(리팩토링 )
    const results = await Promise.all(
      files.map((el) => el && uploadFile({variables: {file: el}}))
    );
    console.log(results); // [resultFile0, resultFile1, resultFile2]
    const resultUrls = results.map((el) => (el ? el.data?.uploadFile.url : "")); // [dog1.jpg, dog2.jpg, dog3.jpg]

    const result = await createBoard({
      variables: {
        createBoardInput: {
          writer: "Evie",
          password: "123",
          title: "이비빅",
          contents: "비비비빅",
          images: resultUrls,
        },
      },
    });
    console.log(result.data);
  };

  const onChangeFile =
    (index: number) => async (event: ChangeEvent<HTMLInputElement>) => {
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

          const tempUrls = [...imgUrls];
          tempUrls[index] = event.target?.result;
          setImgUrls(tempUrls);

          const tempFiles = [...files];
          tempFiles[index] = file;
          setFiles(tempFiles);
        }
      };
    };
  return (
    <>
      <input type="file" onChange={onChangeFile(0)} />
      <input type="file" onChange={onChangeFile(1)} />
      <input type="file" onChange={onChangeFile(2)} />
      {imgUrls[0] ? <img src={imgUrls[0]} alt="uploaded image" /> : null}
      {imgUrls[1] ? <img src={imgUrls[1]} alt="uploaded image" /> : null}
      {imgUrls[2] ? <img src={imgUrls[2]} alt="uploaded image" /> : null}
      <button onClick={onClickSubmit}>GRAPHQL-API 동기 요청하기</button>

      {/* <img
        src={`https://storage.googleapis.com/${imgUrl}`}
        alt="uploaded image"
      /> */}
    </>
  );
}
