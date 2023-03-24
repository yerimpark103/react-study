export default function Child1(props: any) {
  return (
    <>
      <div>Child 1 Count : {props.count}</div>
      <button onClick={props.onClickCountUp}>Increment</button>
    </>
  );
}
