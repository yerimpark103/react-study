import {useQuery, gql} from "@apollo/client";
import {useRouter} from "next/router";
import DOMPurify from "dompurify";

const FETCH_BOARD = gql`
  query fetchBoard($boardId: ID!) {
    fetchBoard(boardId: $boardId) {
      writer
      title
      contents
    }
  }
`;

export default function StaticRoutedPage() {
  const router = useRouter();

  const {data} = useQuery(FETCH_BOARD, {
    variables: {
      boardId: router.query.id,
    },
  });

  return (
    <>
      <div>작성자 : {data ? data.fetchBoard.writer : "로딩중입니다..."}</div>
      <div>제목 : {data?.fetchBoard.title}</div>
      {typeof window !== "undefined" && (
        <div
          dangerouslySetInnerHTML={{
            __html: DOMPurify.sanitize(data?.fetchBoard.contents),
          }}
        ></div>
      )}
      {/* <div>내용 : {data?.fetchBoard.contents}</div> */}

      <button
        onClick={() => {
          router.back();
        }}
      >
        back;
      </button>
    </>
  );
}

// playground XSS 공격
// <img src="#" onerror="console.log(localStorage.getItem(\"accessToken\"))"/>
