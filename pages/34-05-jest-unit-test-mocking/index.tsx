import {gql, useMutation} from "@apollo/client";
import {useRouter} from "next/router";
import {ChangeEvent, useState} from "react";
import "@testing-library/jest-dom";

export const CREATE_BOARD = gql`
  mutation createBoard($createBoardInput: CreateBoardInput!) {
    # 변수의 타입 적는 곳
    createBoard(createBoardInput: $createBoardInput) {
      # 실제 우리가 전달할 변수 적는 곳
      _id
      writer
      title
      contents
    }
  }
`;

export default function GraphqlMutationPage() {
  const router = useRouter();
  const [writer, setWriter] = useState("");
  const [title, setTitle] = useState("");
  const [contents, setContents] = useState("");

  const [myFunction] = useMutation(CREATE_BOARD);

  const onClickSubmit = async () => {
    const result = await myFunction({
      variables: {
        createBoardInput: {
          writer: writer,
          title: title,
          contents: contents,
          password: "1234",
        },
      },
    });
    console.log(result.data);
    // alert(result.data.createBoard.message);
    router.push(`/boards/${result.data.createBoard._id}`);
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

  return (
    <>
      Writer :
      <input role="input-writer" type="text" onChange={onChangeWriter} />
      <br />
      Title :
      <input role="input-title" type="text" onChange={onChangeTitle} />
      <br />
      Contents :
      <input role="input-contents" type="text" onChange={onChangeContents} />
      <br />
      <button role="submit-button" onClick={onClickSubmit}>
        GRAPHQL-API 동기 요청하기
      </button>
    </>
  );
}
