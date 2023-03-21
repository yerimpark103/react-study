import {Button, Modal} from "antd";

const success = () => {
  Modal.success({content: "로그인 성공"});
};

const error = () => {
  Modal.error({content: "비밀번호가 틀렸습니다."});
};

export default function ModalAlertPage() {
  return (
    <>
      <Button onClick={success}>Success</Button>
      <Button onClick={error}>Error</Button>
    </>
  );
}
