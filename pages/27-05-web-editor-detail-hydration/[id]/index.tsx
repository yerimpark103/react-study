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
      <div style={{color: "red"}}>
        작성자 : {data ? data.fetchBoard.writer : "로딩중입니다..."}
      </div>
      <div style={{color: "green"}}>제목 : {data?.fetchBoard.title}</div>
      {typeof window !== "undefined" ? (
        // 브라우저에서 그릴 때
        <div
          style={{color: "blue"}}
          dangerouslySetInnerHTML={{
            __html: DOMPurify.sanitize(data?.fetchBoard.contents),
          }}
        ></div>
      ) : (
        // 서버에서 그릴 때 : css/tag개수대로 그림. -> tag 개수를 맞춰야 함.
        <div style={{color: "blue"}}></div>
      )}
      <div style={{color: "brown"}}>주소 : 집</div>
    </>
  );
}

// playground XSS 공격
// <img src="#" onerror="console.log(localStorage.getItem(\"accessToken\"))"/>
