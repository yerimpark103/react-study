import BoardListUI from "./BoardList.presenter";
import {useQuery} from "@apollo/client";
import {FETCH_BOARDS, FETCH_BOARDS_COUNT} from "./BoardList.queries";
import {MouseEvent} from "react";
import {
  IQuery,
  IQueryFetchBoardsArgs,
  IQueryFetchBoardsCountArgs,
} from "@/commons/types/generated/types";
import {useMoveToPage} from "@/components/commons/hooks/useMoveToPage";
import {useSearch} from "@/components/commons/hooks/useSearch";

export default function BoardList() {
  const {onClickMoveToPage} = useMoveToPage();
  const {keyword, onChangeKeyword} = useSearch();
  const {data, refetch} = useQuery<
    Pick<IQuery, "fetchBoards">,
    IQueryFetchBoardsArgs
  >(FETCH_BOARDS);
  const {data: dataBoardsCount} = useQuery<
    Pick<IQuery, "fetchBoardsCount">,
    IQueryFetchBoardsCountArgs
  >(FETCH_BOARDS_COUNT);

  return (
    <BoardListUI
      data={data}
      onClickMoveToPage={onClickMoveToPage}
      refetch={refetch}
      count={dataBoardsCount?.fetchBoardsCount}
      keyword={keyword}
      onChangeKeyword={onChangeKeyword}
    />
  );
}
