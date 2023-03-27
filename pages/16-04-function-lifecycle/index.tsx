import {useEffect, useState} from "react";
import {useRouter} from "next/router";

export default function FunctionCounterPage() {
  const router = useRouter();
  const [count, setCount] = useState(0);

  // // componentDidMount와 동일
  // useEffect(() => {
  //   // 첫 실행도 변경으로 확인함.
  //   console.log("그려지고 나서 실행");
  // }, []); // 의존성 배열 (dependency array)

  // // componentDidUpdate와 비슷.
  // useEffect(() => {
  //   // 첫 실행도 변경으로 확인함.
  //   console.log("변경되고 나서 실행");
  // });

  // // componentWillUnmount와 동일
  // useEffect(() => {
  //   return () => {
  //     console.log("사라질 때 실행");
  //   };
  // });

  /* 
  useEffect 특징
  1. 하나로 합치기 가능
  */

  // componentDidMount, componentWillUnmount와 동일
  useEffect(() => {
    console.log("그려지고 나서 실행");

    return () => {
      console.log("사라질 때 실행");
    };
  }, []);

  // componentDidUpdate와 비슷.
  useEffect(() => {
    // 첫 실행도 변경으로 확인함.
    console.log("변경되고 나서 실행");
  });

  /* 
  2. 잘못된 사용 예제
  */
  // useEffect(() => {
  //   setCount((prev) => prev + 1);
  // });

  const onClickCountUp = () => {
    setCount((prev) => prev + 1);
  };
  const onClickMovePage = () => {
    void router.push("/");
  };

  return (
    <>
      <div>{count}</div>
      <button onClick={onClickCountUp}>Increment</button>
      <button onClick={onClickMovePage}>Exit</button>
    </>
  );
}
