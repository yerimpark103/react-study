import {
  IMutation,
  IMutationUploadFileArgs,
} from "@/commons/types/generated/types";
import {gql, useMutation} from "@apollo/client";
import {Modal} from "antd";
import {ChangeEvent, useState} from "react";

// const UPLOAD_FILE = gql`
//   mutation uploadFile($file: Upload!) {
//     uploadFile(file: $file) {
//       url
//     }
//   }
// `;

export default function ImageUploadPreviewPage() {
  const [imgUrl, setImgUrl] = useState("");
  // const [uploadFile] = useMutation<
  //   Pick<IMutation, "uploadFile">,
  //   IMutationUploadFileArgs
  // >(UPLOAD_FILE);

  const onChangeFile = async (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]; // input type="file" multiple/> 속성으로 여러개 체크 가능
    console.log(file);

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
    if (!file) return;
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
        setImgUrl(event.target?.result);
      }
    };
  };
  return (
    <>
      <input type="file" onChange={onChangeFile} />
      {imgUrl ? <img src={imgUrl} alt="uploaded image" /> : null}
      {/* <img
        src={`https://storage.googleapis.com/${imgUrl}`}
        alt="uploaded image"
      /> */}
    </>
  );
}
