import {useState} from 'react';

export default function CounterStatePage() {
  const [count, setCount] = useState(0); // let count = 0

  function handleClickIncrement() {
    setCount(count + 1); // count ++
  }

  function handleClickDecrement() {
    setCount(count - 1); // count --
  }

  return (
    <div>
      <div>{count}</div>
      <button onClick={handleClickIncrement}>Increment</button>
      <button onClick={handleClickDecrement}>Decrement</button>
    </div>
  );
}
