import {atom} from "recoil";

// global recoil state
export const isEditState = atom({
  key: "isEditState",
  default: false,
});
