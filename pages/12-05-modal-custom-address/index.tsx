import {useState} from "react";
import {Button, Modal} from "antd";
import DaumPostcodeEmbed, {Address} from "react-daum-postcode";

export default function ModalCustomPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const handleComplete = (address: Address) => {
    console.log("address is ", address);
    setIsModalOpen(false);
  };

  return (
    <>
      <Button type="primary" onClick={showModal}>
        모달창 열기
      </Button>

      {/* 모달 종료 방식 1. 모달 숨기는 방법  */}
      {/* <Modal
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        주소 입력 : <DaumPostcodeEmbed onComplete={handleComplete} />
      </Modal> */}

      {/* 모달 종료 방식 2. 모달 삭제하는 방법 : state가 바뀜으로서 리렌더가 됨  */}
      {/* {isModalOpen && (
        <Modal
          open={true}
          onOk={handleOk}
          onCancel={handleCancel}
        >
          주소 입력 : <DaumPostcodeEmbed onComplete={handleComplete} />
        </Modal>
      )} */}

      {/* 모달 종료 방식 3. Ant design api 사용하기 */}
      <Modal
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
        destroyOnClose={true}
      >
        주소 입력 : <DaumPostcodeEmbed onComplete={handleComplete} />
      </Modal>
    </>
  );
}
