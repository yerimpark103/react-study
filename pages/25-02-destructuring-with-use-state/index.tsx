import {useState} from "react";

export default function CounterStatePage() {
  const result = useState(0); // initialize count = 0

  function handleClickIncrement() {
    result[1](6); // setState(6)
  }

  return (
    <div>
      <div>{result[0]}</div>
      <button onClick={handleClickIncrement}>Increment</button>
    </div>
  );
}
