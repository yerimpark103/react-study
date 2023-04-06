function aaa() {
  const apple = 10;

  return function bbb() {
    // child function 이름은 상관 없음.
    // bbb 입장에서는 aaa가 선행되는 함수 즉 HOC
    const banana = 20;
    console.log(banana);
    console.log(apple);
  };
}
aaa(); // f bbb(){...}
aaa()(); // 20 10

function ccc(carrot) {
  return function ddd(dragonfruit) {
    console.log(dragonfruit);
    console.log(carrot);
  };
}

ccc(10);
ccc(10)(20); // === ddd(20), 20 10. 10은 클로져로 가져올 수 있음.

const eee = (eggplant) => (figs) => {
  console.log(figs);
  console.log(eggplant);
};

eee(10); // f (figs)...
eee(10)(20); // 20 10

const ggg = (grapes) => (hazelnuts) => (icebergLettuce) => {
  console.log(icebergLettuce);
  console.log(hazelnuts);
  console.log(grapes);
};

ggg(10); // f (hazelnuts)...
ggg(10)(20)(30); // 30 20 10
