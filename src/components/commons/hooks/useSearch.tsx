import {useState} from "react";

export function useSearch() {
  const [keyword, setKeyword] = useState("");
  const onChangeKeyword = (value: string) => {
    setKeyword(value);
  };

  return {keyword, onChangeKeyword};
}
