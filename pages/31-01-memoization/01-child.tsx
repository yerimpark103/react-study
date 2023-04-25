import {memo} from "react";

function MemoizationChildPage() {
  console.log("자식이 렌더링됩니다");

  return (
    <>
      <hr />
      <h1>저는 자식 컴포넌트입니다</h1>
      <hr />
    </>
  );
}

// hoc를 사용해서 memoization
export default memo(MemoizationChildPage);
