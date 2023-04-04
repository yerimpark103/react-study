import FetchPolicyExample from "@/components/units/21-fetch-policy";
import {gql, useQuery} from "@apollo/client";
import {useRouter} from "next/router";
import {useState} from "react";
const FETCH_BOARDS = gql`
  query fetchBoards {
    fetchBoards {
      _id
      writer
      title
      contents
    }
  }
`;

export default function GlobalStatePage() {
  const [isOpen, setIsOpen] = useState(false);
  const {data} = useQuery(FETCH_BOARDS);
  const router = useRouter();

  const onClickIsOpen = () => {
    setIsOpen(true);
  };

  const onClickMove = () => {
    void router.push("/21-05-fetch-policy-moved");
  };

  return (
    <>
      <button onClick={onClickIsOpen}>
        버튼을 클릭하면 새로운 컴포넌트가 나타납니다
      </button>
      {isOpen && <FetchPolicyExample />}
      <button onClick={onClickMove}>버튼을 클릭하면 페이지가 이동됩니다</button>
    </>
  );
}
