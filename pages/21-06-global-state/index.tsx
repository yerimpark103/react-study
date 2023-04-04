import {isEditState} from "@/commons/store";
import BoardWrite from "@/components/units/21-global-state/BoardWrite.container";
import {useEffect} from "react";
import {useRecoilState} from "recoil";

export default function GlobalStatePage() {
  const [isEdit, setIsEdit] = useRecoilState(isEditState);

  useEffect(() => {
    setIsEdit(true);
  }, []);

  return <BoardWrite />;
}
