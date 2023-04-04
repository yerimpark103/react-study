import {isEditState} from "@/commons/store";
import {useRecoilState} from "recoil";

export default function BoardWriteUI() {
  const [isEdit, setIsEdit] = useRecoilState(isEditState);

  return <>{isEdit ? "수정하기" : "등록하기"}</>;
}
