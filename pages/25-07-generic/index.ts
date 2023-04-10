// 1. Primitive types
const getPrimitive = (
  arg1: string,
  arg2: number,
  arg3: boolean
): [boolean, number, string] => {
  return [arg3, arg2, arg1];
};

const resultPrimitive = getPrimitive("Evie", 123, true);
console.log(resultPrimitive); // [true, 123, "Evie"]

// 2. Any type
const getAny = (arg1: any, arg2: any, arg3: any): [any, any, any] => {
  console.log(arg1 + 1000); // any는 아무 연산이나 다 됨
  return [arg3, arg2, arg1];
};

const resultAny = getAny("Evie", 123, true);
console.log(resultAny); // [true, 123, "Evie"]

// 3. Unknown type
const getUnknown = (
  arg1: unknown,
  arg2: unknown,
  arg3: unknown
): [unknown, unknown, unknown] => {
  if (typeof arg1 === "number") console.log(arg1 + 1000); // unknown은 연산이 안 됨 : 사용하려면 타입 지정
  return [arg3, arg2, arg1];
};

const resultUnknown = getUnknown("Evie", 123, true);
console.log(resultUnknown); // [true, 123, "Evie"]

// 4. Generic type - 1
function getGeneric<MyType1, MyType2, MyType3>(
  arg1: MyType1,
  arg2: MyType2,
  arg3: MyType3
): [arg1: MyType3, arg2: MyType2, arg3: MyType1] {
  return [arg3, arg2, arg1];
}

const resultGeneric = getGeneric("Evie", 123, true); // Generic 타입은 인풋을 통해 예측된다
console.log(resultGeneric); // [true, 123, "Evie"]
// const resultGeneric: [arg1: boolean, arg2: number, arg3: string]

// 4. Generic type - 2
function getGeneric2<T1, T2, T3>(
  arg1: T1,
  arg2: T2,
  arg3: T3
): [arg1: T3, arg2: T2, arg3: T1] {
  return [arg3, arg2, arg1];
}

const resultGeneric2 = getGeneric2("Evie", 123, true); // Generic 타입은 인풋을 통해 예측된다
console.log(resultGeneric2); // [true, 123, "Evie"]
// const resultGeneric2: [arg1: boolean, arg2: number, arg3: string]

// 4. Generic type - 3
function getGeneric3<T, U, V>(
  arg1: T,
  arg2: U,
  arg3: V
): [arg1: V, arg2: U, arg3: T] {
  return [arg3, arg2, arg1];
}

const resultGeneric3 = getGeneric3("Evie", 123, true); // Generic 타입은 인풋을 통해 예측된다
console.log(resultGeneric3); // [true, 123, "Evie"]
// const resultGeneric3: [arg1: boolean, arg2: number, arg3: string]

// 4. Generic type - 4
const getGeneric4 = <T, U, V>(
  arg1: T,
  arg2: U,
  arg3: V
): [arg1: V, arg2: U, arg3: T] => {
  return [arg3, arg2, arg1];
};

const resultGeneric4 = getGeneric4("Evie", 123, true); // Generic 타입은 인풋을 통해 예측된다
console.log(resultGeneric4); // [true, 123, "Evie"]
// const resultGeneric4: [arg1: boolean, arg2: number, arg3: string]
