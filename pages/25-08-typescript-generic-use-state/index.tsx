export function useMyState<S>(aaa: S): [S, () => void] {
  const myState = aaa; // aaa를 사용해서 state의 초기값 설정
  const mySetState = (bbb) => {
    // 1. myState를 bbb로 변경하기
    console.log(`${myState}에서 ${bbb}로 state를 변경합니다`);
    // 2. 해당 컴포넌트를 리렌더링하기 (class component의 render함수)
    console.log(`변경된 ${bbb}를 사용해서 컴포넌트를 리렌더링합니다`);
  };
  return [myState, mySetState];
}

// 사용자
const [count, setCount] = useMyState<number>(10);
