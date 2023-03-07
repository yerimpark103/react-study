export default function CounterLetDocumentPage() {
  function handleClickIncrement() {
    const count = Number(document.getElementById('count').innerText) + 1;
    document.getElementById('count').innerText = count;
  }

  function handleClickDecrement() {
    const count = Number(document.getElementById('count').innerText) - 1;
    document.getElementById('count').innerText = count;
  }

  return (
    <div>
      <div id="count">0</div>
      <button onClick={handleClickIncrement}>Increment</button>
      <button onClick={handleClickDecrement}>Decrement</button>
    </div>
  );
}
