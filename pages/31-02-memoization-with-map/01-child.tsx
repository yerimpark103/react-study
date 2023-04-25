import {memo} from "react";

function Word(props: any) {
  console.log("자식이 렌더링됩니다", props.el);

  return <>{props.el}</>;
}

// hoc를 사용해서 memoization
export default memo(Word);
// export default Word;
