import {IQuery, IQueryFetchBoardsArgs} from "@/commons/types/generated/types";
import {useQuery, gql} from "@apollo/client";
import styled from "@emotion/styled";
import InfiniteScroll from "react-infinite-scroller";

const FETCH_BOARDS = gql`
  query fetchBoards($page: Int) {
    fetchBoards(page: $page) {
      _id
      writer
      title
      contents
    }
  }
`;

const Row = styled.div`
  display: flex;
  flex-direction: row;
`;

const Column = styled.span`
  width: 50%;
`;

export default function InfiniteScrollerPage() {
  const {data, fetchMore} = useQuery<
    Pick<IQuery, "fetchBoards">,
    IQueryFetchBoardsArgs
  >(FETCH_BOARDS);

  console.log(data?.fetchBoards);

  const handleLoadMore = () => {
    if (!data) return;

    void fetchMore({
      variables: {page: Math.ceil(data?.fetchBoards.length / 10) + 1},
      updateQuery: (prev, {fetchMoreResult}) => {
        if (!fetchMoreResult.fetchBoards)
          return {
            fetchBoards: [...prev.fetchBoards],
          };
        return {
          fetchBoards: [...prev.fetchBoards, ...fetchMoreResult.fetchBoards],
        };
      },
    });
  };

  return (
    <div style={{height: "400px", overflow: "auto"}}>
      <InfiniteScroll
        pageStart={0}
        loadMore={handleLoadMore}
        hasMore={true}
        useWindow={false}
      >
        {data?.fetchBoards.map((board) => (
          <Row key={board._id}>
            <Column>{board.writer}</Column>
            <Column>{board.title}</Column>
          </Row>
        ))}
      </InfiniteScroll>
    </div>
  );
}
