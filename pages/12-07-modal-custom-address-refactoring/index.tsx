import {useState} from "react";
import {Button, Modal} from "antd";
import DaumPostcodeEmbed, {Address} from "react-daum-postcode";

export default function ModalCustomPage() {
  const [isOpen, setIsOpen] = useState(false);

  const onToggleModal = () => {
    // 임시 저장공간에 isOpen이 있는지 찾고, 없으면 false, 있으면 지난값
    setIsOpen((prev) => !prev);
  };

  const handleComplete = (address: Address) => {
    console.log("address is ", address);
    onToggleModal();
  };

  return (
    <>
      <Button type="primary" onClick={onToggleModal}>
        모달창 열기
      </Button>

      {/* 모달 종료 방식 1. 모달 숨기는 방법  */}
      {/* <Modal
        open={isOpen}
        onOk={onToggleModal}
        onCancel={onToggleModal}
      >
        주소 입력 : <DaumPostcodeEmbed onComplete={handleComplete} />
      </Modal> */}

      {/* 모달 종료 방식 2. 모달 삭제하는 방법 : state가 바뀜으로서 리렌더가 됨  */}
      {/* {isOpen && (
        <Modal
          open={true}
          onOk={onToggleModal}
          onCancel={onToggleModal}
        >
          주소 입력 : <DaumPostcodeEmbed onComplete={handleComplete} />
        </Modal>
      )} */}

      {/* 모달 종료 방식 3. Ant design api 사용하기 */}
      <Modal
        open={isOpen}
        onOk={onToggleModal}
        onCancel={onToggleModal}
        destroyOnClose={true}
      >
        주소 입력 : <DaumPostcodeEmbed onComplete={handleComplete} />
      </Modal>
    </>
  );
}
