import {Component} from "react";

export default class ClassCounterPage extends Component {
  state = {
    count: 0,
  };

  onClickCountUp = () => {
    this.setState({
      count: 1,
    });
  };

  render() {
    return (
      <>
        <div>{this.state.count}</div>
        <button onClick={this.onClickCountUp}>Increment</button>
      </>
    );
  }
}
// import {useState} from "react";

// export default function FunctionCounterPage() {
//   const [count, setCount] = useState(0);
//   const onClickCountUp = () => {
//     setCount((prev) => prev + 1);
//   };
//   return (
//     <>
//       <div>{count}</div>
//       <button onClick={onClickCountUp}>Increment</button>
//     </>
//   );
// }
