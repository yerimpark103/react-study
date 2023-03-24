import Child1 from "@/components/units/14-lifting-state-up/Child1";
import Child2 from "@/components/units/14-lifting-state-up/Child2";
import {useState} from "react";

export default function LiftingStateUpPage() {
  const [count, setCount] = useState(0);
  const onClickCountUp = () => {
    setCount((prev) => prev + 1);
  };
  return (
    <>
      <Child1 count={count} onClickCountUp={onClickCountUp} />
      <hr />
      <Child2 count={count} setCount={setCount} />
    </>
  );
}
