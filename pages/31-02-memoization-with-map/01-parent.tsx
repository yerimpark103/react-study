import {useCallback, useMemo, useState} from "react";
import Word from "./01-child";
import {v4 as uuidv4} from "uuid";

export default function MemoizationParentPage() {
  const [data, setData] = useState("Evie had a big supper num");

  const onClickChange = () => {
    setData("Evie also had a churu num");
  };

  return (
    <>
      {/* {data.split(" ").map((el, index) => (
        <Word key={index} el={el} />
        // memo시, key 또는 el이 변경된 부분만 리렌더링됨
      ))} */}
      {data.split(" ").map((el) => (
        <Word key={uuidv4()} el={el} />
        // memo시, dependency array 가 uuid 이기 때문에(key 변경) 모두 리렌더링.
      ))}
      <button onClick={onClickChange}>Change word</button>
    </>
  );
}
