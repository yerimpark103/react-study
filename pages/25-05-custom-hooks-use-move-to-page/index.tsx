// import {useRouter} from "next/router";

// export default function CustomHooksUseMoveToPage() {
//   // Higher Order Function
//   const router = useRouter();
//   const onClickMoveToPage = (path: string) => () => {
//     void router.push(path);
//   };
//   return (
//     <>
//       <button onClick={onClickMoveToPage("/board")}>게시판으로 이동</button>
//       <button onClick={onClickMoveToPage("/market")}>마켓으로 이동</button>
//       <button onClick={onClickMoveToPage("/mypage")}>마이페이지로 이동</button>
//     </>
//   );
// }

import {useMoveToPage} from "@/components/commons/hooks/useMoveToPage";
// use 로 시작하는 함수를 사용하면 custom hook이라고 부르기.
export default function CustomHooksUseMoveToPage() {
  // custom hook
  const {onClickMoveToPage} = useMoveToPage();
  return (
    <>
      <button onClick={onClickMoveToPage("/board")}>게시판으로 이동</button>
      <button onClick={onClickMoveToPage("/market")}>마켓으로 이동</button>
      <button onClick={onClickMoveToPage("/mypage")}>마이페이지로 이동</button>
    </>
  );
}
