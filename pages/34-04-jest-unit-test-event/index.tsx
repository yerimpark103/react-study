import {useState} from "react";

export default function CounterStatePage() {
  const [count, setCount] = useState(0);

  const qqq = Math.random();

  console.log(qqq);

  function onClickCountUp() {
    setCount((prev) => prev + 1);
  }

  return (
    <>
      <div role="count">{count}</div>
      {/* 어떤 태그가 어떤 일을 하는지 알려주는 태그 : role */}
      <button onClick={onClickCountUp} role="count-button">
        카운트 올리기!!!
      </button>
    </>
  );
}
