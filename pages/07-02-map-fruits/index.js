// // 백엔드에서 받아온 데이터라고 가정 : 컴포넌트 위에 데이터를 정의하는 이유 -> 컴포넌트를 리렌더링해도 다시 만들어지지 않음.
// const FRUITS = [
//   {number: 1, title: '레드향'},
//   {number: 2, title: '샤인머스켓'},
//   {number: 3, title: '산청딸기'},
//   // {number: 1, title: "레드향"},
//   // {number: 1, title: "레드향"},
//   // {number: 1, title: "레드향"},
//   // {number: 1, title: "레드향"},
//   // {number: 1, title: "레드향"},
//   // {number: 1, title: "레드향"},
//   // {number: 1, title: "레드향"},
//   // {number: 1, title: "레드향"},
// ];

// export default function MapFruitsPage() {
//   const aaa = [
//     <div>1 레드향</div>,
//     <div>2 샤인머스켓</div>,
//     <div>3 산청딸기</div>,
//   ];

//   const bbb = [
//     {number: 1, title: '레드향'},
//     {number: 2, title: '샤인머스켓'},
//     {number: 3, title: '산청딸기'},
//   ].map(el => (
//     <div>
//       {el.number} {el.title}
//     </div>
//   ));

//   const ccc = FRUITS.map(el => (
//     <div>
//       {el.number} {el.title}
//     </div>
//   ));

//   // return <>{ccc}</>;
//   return (
//     <>
//       {FRUITS.map(el => (
//         <div>
//           {el.number} {el.title}
//         </div>
//       ))}
//     </>
//   );
// }
