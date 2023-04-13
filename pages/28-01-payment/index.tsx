import Head from "next/head";

declare const window: typeof globalThis & {
  IMP: any;
};

export default function PaymentPage() {
  const onClickPayment = () => {
    const IMP = window.IMP;
    IMP.init(process.env.NEXT_IMP_KEY);

    IMP.request_pay(
      {
        pg: "nice",
        pay_method: "card", // vbank : 무통장
        // merchant_uid: "결제 번호", 중복될 시 결제 안됨.
        name: "아이리버 무선 마우스 외 1개",
        amount: 100,
        buyer_email: "yerimpark103@gmail.com",
        buyer_name: "홍길동",
        buyer_tel: "010-4242-4242",
        buyer_addr: "서울특별시 강남구 신사동",
        buyer_postcode: "01181",
        m_redirect_url: "http://localhost:3000/28-01-payment", // 모바일 결제용 redirect url
      },
      (rsp) => {
        console.log(rsp);
        // callback
        if (rsp.success) {
          alert("결제가 성공했습니다.");
          // 결제 성공 로직
          // 백엔드에 결제 관련 데이터(rsp.imp_uid) 넘겨주기 -> mutation 실행(createPointTransactionOfLoading)
        } else {
          alert("결제에 실패했습니다.");
          // 결제 실패 로직
        }
      }
    );
  };
  return (
    <>
      <Head>
        <script
          type="text/javascript"
          src="https://code.jquery.com/jquery-1.12.4.min.js"
        ></script>
        <script
          type="text/javascript"
          src="https://cdn.iamport.kr/js/iamport.payment-1.2.0.js"
        ></script>
      </Head>

      <button onClick={onClickPayment}>결제하기</button>
    </>
  );
}
