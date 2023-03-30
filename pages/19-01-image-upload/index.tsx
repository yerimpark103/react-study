import {
  IMutation,
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

export default function ImageUploadPage() {
  const [imgUrl, setImgUrl] = useState("");
  const [uploadFile] = useMutation<
    Pick<IMutation, "uploadFile">,
    IMutationUploadFileArgs
  >(UPLOAD_FILE);

  const onChangeFile = async (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]; // input type="file" multiple/> 속성으로 여러개 체크 가능
    console.log(file);

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
  return (
    <>
      <input type="file" onChange={onChangeFile} />
      <img
        src={`https://storage.googleapis.com/${imgUrl}`}
        alt="uploaded image"
      />
    </>
  );
}
