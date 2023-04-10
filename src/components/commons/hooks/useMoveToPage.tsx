import {visitedPageState} from "@/commons/store";
import {useRouter} from "next/router";
import {useRecoilState} from "recoil";

export function useMoveToPage() {
  const router = useRouter();
  const [visitedPage, setVisitedPage] = useRecoilState(visitedPageState);

  const onClickMoveToPage = (path: string) => () => {
    setVisitedPage(path);
    void router.push(path);
  };

  return {
    visitedPage,
    onClickMoveToPage,
  };
}
