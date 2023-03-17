import {useQuery, gql} from '@apollo/client';
import {useRouter} from 'next/router';

const FETCH_BOARD = gql`
  query fetchBoard($number: Int) {
    fetchBoard(number: $number) {
      writer
      title
      contents
    }
  }
`;

export default function StaticRoutedPage() {
  const router = useRouter();
  console.log(router.query.number);

  const {data} = useQuery(FETCH_BOARD, {
    variables: {
      number: Number(router.query.number),
    },
  });

  const onClickMoveToEdit = () => {
    router.push(`/10-01-typescript-boards/${router.query.number}/edit`);
  };

  console.log(data);

  return (
    <>
      <div>{router.query.number} 게시글 이동 완료</div>
      <div>작성자 : {data ? data.fetchBoard.writer : '로딩중입니다...'}</div>
      <div>제목 : {data && data.fetchBoard.title}</div>
      <div>내용 : {data?.fetchBoard.contents}</div>

      <button onClick={() => router.back()}>back;</button>
      <button onClick={onClickMoveToEdit}>수정하러 이동하기</button>
    </>
  );
}
