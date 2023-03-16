export default function MyComponent() {
  // 타입 추론
  let aaa = 'hello';
  aaa = 3; // Error

  // 타입 명시
  let bbb: string = 'world';

  // 문자 타입(선언, 할당 분리)
  let ccc: string;
  ccc = 'hello world!';

  // 숫자 타입
  let ddd: number = 10;
  ddd = 'Evie'; // Error

  // bool타입
  let eee: boolean = true;
  eee = false;
  eee = 'false'; // Error

  // 배열타입
  let fff: number[] = [1, 2, 3, 4, 5];
  let ggg: string[] = ['a', 'b', 'c'];
  let hhh: (string | number)[] = [1, 2, 3, 4, 4, 'a', 'b'];

  // 객체타입
  interface IProfile {
    name: string;
    age: number | string;
    breed: string;
  }

  const profile: IProfile = {
    name: 'Evie',
    age: 4,
    breed: 'Munchkin',
  };
  profile.age = '4.5살이지롱';

  // 함수타입 => 어디서 몇번이든 호출 가능하므로, 타입 추론 불가: 반드시 타입 명시 필요
  const add = (num1: number, num2: number, unit: string): string => {
    return num1 + num2 + unit;
  };
  const result = add(1000, 2000, '원');

  // any타입(javascript와 동일)
  let foo: any = 'bar';
  foo = 'baz';
  foo = 3;

  return <div></div>;
}
