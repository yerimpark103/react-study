import {IQuery} from "@/commons/types/generated/types";
import {withAuth} from "@/components/commons/hocs/withAuth";
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

function LoginSuccessPage() {
  const {data} =
    useQuery<Pick<IQuery, "fetchUserLoggedIn">>(FETCH_USER_LOGGED_IN);

  return <>{data?.fetchUserLoggedIn.name}님 환영합니다</>;
}

export default withAuth(LoginSuccessPage); // LoginSuccessPage가 실행되기 전 withAuth가 실행됨
