import {Component} from "react";
import Router from "next/router";

export default class ClassCounterPage extends Component {
  state = {
    count: 0,
  };

  // 화면이 다 그려지고 나서 실행.
  componentDidMount() {
    console.log("componentDidMount : 그려지고 나서 실행");
  }

  // state 업데이트 되고 수정되어 리렌더될 때 실행
  componentDidUpdate() {
    console.log("componentDidUpdate : 변경되고 나서 실행");
  }

  // 컴포넌트를 끝낼 때 실행하고 끔
  componentWillUnmount() {
    console.log("componentWillUnmount : 사라질 때 실행");
  }

  onClickCountUp = () => {
    this.setState((prevState: {count: number}) => ({
      count: prevState.count + 1,
    }));
  };

  onClickMovePage() {
    void Router.push("/");
  }

  render() {
    return (
      <>
        <div>{this.state.count}</div>
        <button onClick={this.onClickCountUp}>Increment</button>
        <button onClick={this.onClickMovePage}>Exit</button>
      </>
    );
  }
}
