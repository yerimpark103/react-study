interface IProps {
  name: string;
  children: JSX.Element;
}

export default function Example(props: IProps) {
  return (
    <>
      <div>ฅ^._.^ฅ</div>
      <div>{props.name}</div>
      <div>가장 좋아하는 음식 : {props.children}</div>
    </>
  );
}
