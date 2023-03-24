import {Dispatch, SetStateAction} from "react";

interface IProps {
  count: number;
  setCount: Dispatch<SetStateAction<number>>;
}

export default function Child2(props: IProps) {
  const onClick = () => {
    props.setCount((prev: number) => prev + 1);
  };
  return (
    <>
      <div>Child 2 Count : {props.count}</div>
      <button onClick={onClick}>Increment</button>
    </>
  );
}
