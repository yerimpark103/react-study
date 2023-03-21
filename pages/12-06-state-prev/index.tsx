import {useState} from "react";

export default function CounterStatePage() {
  const [count, setCount] = useState(0); // count = 0

  function handleClickIncrement() {
    setCount(count + 1); // 실제 count를 가져온다. count는 0이므로 0 + 1 = 1이 된다.
    setCount(count + 1); // 1이 state에 담겼지만 여전히 count는 0이므로 0 + 1 = 1이 된다.
    setCount(count + 1); // 1이 state에 담겼지만 여전히 count는 0이므로 0 + 1 = 1이 된다.
    setCount(count + 1); // 최종적으로 1이 state에 담겨 화면에 1이 반영된다.
    // count = 1이고, 리렌더가 된다.
  }

  function handleClickIncrementWithPrev() {
    setCount((prev) => prev + 1); // 임시 저장공간에서 count가 있는지 본다. 없으면 실제 count를 가져온다.
    setCount((prev) => prev + 1); // 임시 저장공간에 count = 1이 있다. 1 + 1 = 2 가 된다.
    setCount((prev) => prev + 1); // 임시 저장공간에 count = 2이 있다. 2 + 1 = 3 이 된다.
    setCount((prev) => prev + 1); // 임시 저장공간에 count = 3이 있다. 3 + 1 = 4 가 된다.
    // count = 4이고, 리렌더가 된다.
  }

  return (
    <div>
      <div>{count}</div>
      {/* Count 는 1이 된다 */}
      <button onClick={handleClickIncrement}>Increment</button>
      {/* Count 는 4가 된다 */}
      <button onClick={handleClickIncrementWithPrev}>
        Increment With Prev
      </button>
    </div>
  );
}
