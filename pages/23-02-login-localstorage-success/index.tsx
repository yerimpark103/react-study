import {IQuery} from "@/commons/types/generated/types";
import {gql, useQuery} from "@apollo/client";

const FETCH_USER_LOGGED_IN = gql`
  query fetchUserLoggedIn {
    fetchUserLoggedIn {
      _id
      email
      name
    }
  }
`;

export default function LoginSuccessPage() {
  const {data} =
    useQuery<Pick<IQuery, "fetchUserLoggedIn">>(FETCH_USER_LOGGED_IN);
  return <>{data?.fetchUserLoggedIn.name}님 환영합니다</>;
}
