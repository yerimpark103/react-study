import ChildPage from "./02-child";
export default function ParentPage() {
  return (
    <>
      {/*
        1. 컴포넌트는 함수에 불과함. 
        2. 따라서 props도 매개변수에 불과, 즉 내 마음대로 이름 변경 가능
     */}
      {ChildPage({count: 3})}
      <ChildPage count={3} />
    </>
  );
}
