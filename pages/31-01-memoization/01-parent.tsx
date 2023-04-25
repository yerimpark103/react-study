import {useCallback, useMemo, useState} from "react";
import MemoizationChildPage from "./01-child";

export default function MemoizationParentPage() {
  console.log("부모가 렌더링됩니다");
  let countLet = 0;
  const [countState, setCountState] = useState(0);

  // 1. useMemo로 변수 기억
  const randomNumberMemoized = useMemo(
    () =>
      // Math.random이 기록됨
      Math.random(),
    []
  );
  console.log(randomNumberMemoized);

  // 2. useCallback으로 함수 기억
  const onClickCountLet = useCallback(() => {
    console.log(countLet + 1);
    countLet += 1;
  }, []);

  // 3. useCallback 사용시 주의사항 : state 사용 주의. prev사용
  const onClickCountState = useCallback(() => {
    // 잘못 사용한 예제 : countState를 기억해버림.
    // console.log(countState + 1);

    setCountState((prev) => prev + 1);
    // 1. 부모 state가 업데이트 되면 딸려있는 모든 자식이 리렌더링 됨.
    // 2. 부모 내부 variables는 리렌더링과 함께 초기화(메모리에 새롭게 저장이 됨)
  }, []);

  // 4. useMemo로 나만의 useCallback 만들어보기
  const onClickCountStateMemoized = useMemo(
    () => () => {
      setCountState((prev) => prev + 1);
    },
    []
  );

  return (
    <>
      <hr />
      <h1>저는 부모 컴포넌트입니다</h1>
      <div>count let : {countLet} </div>
      <button onClick={onClickCountLet}>count(let) ++</button>
      <div>count state : {countState} </div>
      {/* <button onClick={onClickCountState}>count(state) ++</button> */}
      <button
        onClick={() => {
          setCountState((prev) => prev + 1);
        }}
      >
        count(state) ++
      </button>
      <hr />
      <MemoizationChildPage countState={countState} />
    </>
  );
}
