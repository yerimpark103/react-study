interface IProps {
  isActive: boolean;
  type: "button" | "submit" | "reset" | undefined;
  title: string;
}

export default function Button01(props: IProps) {
  return (
    <button
      type={props.type}
      style={{backgroundColor: props.isActive ? "yellow" : ""}}
    >
      {props.title}
    </button>
  );
}
