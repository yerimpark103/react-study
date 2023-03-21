export default function MyComponent() {
  // 타입 추론
  const aaa = "hello";
  // aaa = 3; // Error
  console.log(aaa);

  // 타입 명시
  const bbb: string = "world";
  console.log(bbb);
  // 문자 타입(선언, 할당 분리)
  let ccc: string = "";
  ccc = "hello world!";
  console.log(ccc);
  // 숫자 타입
  const ddd: number = 10;
  // ddd = 'Evie'; // Error
  console.log(ddd);

  // bool타입
  let eee: boolean = true;
  eee = false;
  // eee = 'false'; // Error
  console.log(eee);

  // 배열타입
  const fff: number[] = [1, 2, 3, 4, 5];
  const ggg: string[] = ["a", "b", "c"];
  const hhh: Array<string | number> = [1, 2, 3, 4, 4, "a", "b"];
  console.log(fff, ggg, hhh);

  // 객체타입
  interface IProfile {
    name: string;
    age: number | string;
    breed: string;
  }

  const profile: IProfile = {
    name: "Evie",
    age: 4,
    breed: "Munchkin",
  };
  profile.age = "4.5살이지롱";

  // 함수타입 => 어디서 몇번이든 호출 가능하므로, 타입 추론 불가: 반드시 타입 명시 필요
  const add = (num1: number, num2: number, unit: string): string => {
    return `${num1} + ${num2} + ${unit}`;
  };
  const result = add(1000, 2000, "원");
  console.log(result);
  // any타입(javascript와 동일)
  let foo: any = "bar";
  foo = "baz";
  foo = 3;
  console.log(foo);
  return <div></div>;
}
