// 1. HOF - 일반타입
function first1(arg1: string) {
  return function second1(arg2: number): [string, number] {
    return [arg1, arg2];
  };
}
const result = first1("이비")(8);
console.log(result);

// 2. HOF - any타입
function first2(arg1: any) {
  return function second2(arg2: any): [any, any] {
    return [arg1, arg2];
  };
}
const result2 = first2("이비")(8);
console.log(result2);

// 3. HOF - generic타입 : 타입추론가능
function first3<T>(arg1: T) {
  return function second3<U>(arg2: U): [T, U] {
    return [arg1, arg2];
  };
}
const result3 = first3("이비")(8);
console.log(result3);

// 4. HOF - generic타입 - 화살표함수
// prettier-ignore
const first4 = <T,>(arg1: T) => <U,>(arg2: U): [T, U] => {
    return [arg1, arg2];
};
const result4 = first4("이비")(8);
console.log(result4);

// 5. HOC - generic타입 - 컴포넌트에 응용
// prettier-ignore
const withAuth = <C,>(Component: C) => <P,>(props: P): [C, P] => {
  return [Component, props];
};
const result5 = withAuth("Bbb")({qqq: "Evie"});
console.log(result5);
