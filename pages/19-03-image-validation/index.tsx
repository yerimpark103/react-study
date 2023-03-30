import {checkValidationImage} from "@/commons/libraries/validationFile";
import {
  IMutation,
  IMutationUploadFileArgs,
} from "@/commons/types/generated/types";
import {gql, useMutation} from "@apollo/client";
import {Modal} from "antd";
import {ChangeEvent, useRef, useState} from "react";

const UPLOAD_FILE = gql`
  mutation uploadFile($file: Upload!) {
    uploadFile(file: $file) {
      url
    }
  }
`;

export default function ImageUploadPage() {
  const fileRef = useRef<HTMLInputElement>(null);
  const [imgUrl, setImgUrl] = useState("");
  const [uploadFile] = useMutation<
    Pick<IMutation, "uploadFile">,
    IMutationUploadFileArgs
  >(UPLOAD_FILE);

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
    </>
  );
}
