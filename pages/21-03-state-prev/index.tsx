import {useState} from "react";

export default function StatePrevPage() {
  const [count, setCount] = useState(0); // initialize count = 0

  function handleClickIncrement() {
    // 1. 화살표함수
    setCount((prev) => prev + 1); // count ++

    // 2. 함수선언식
    setCount(function (prev) {
      return prev + 1;
    });

    // 3. 함수안에 로직넣기
    setCount((prev) => {
      // 로직 추가 가능, if, for 등
      return prev + 1;
    });

    // 4. 매개변수 바꿔보기
    setCount((count) => count + 1);
  }

  return (
    <div>
      <div>{count}</div>
      <button onClick={handleClickIncrement}>Increment</button>
    </div>
  );
}
