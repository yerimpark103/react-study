import {accessTokenState} from "@/commons/store";
import {
  IMutation,
  IMutationLoginUserArgs,
  IMutationLoginUserExampleArgs,
} from "@/commons/types/generated/types";
import {gql, useMutation} from "@apollo/client";
import {useRouter} from "next/router";
import {ChangeEvent, useState} from "react";
import {useRecoilState} from "recoil";

const LOGIN_USER_EXAMPLE = gql`
  mutation loginUserExample($email: String!, $password: String!) {
    loginUserExample(email: $email, password: $password) {
      accessToken
    }
  }
`;

export default function LoginPage() {
  const router = useRouter();
  const [accessToken, setAccessToken] = useRecoilState(accessTokenState);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loginUserExample] = useMutation<
    Pick<IMutation, "loginUserExample">,
    IMutationLoginUserExampleArgs
  >(LOGIN_USER_EXAMPLE);
  const onChangeEmail = (event: ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value);
  };
  const onChangePassword = (event: ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value);
  };
  const onClickLogin = async () => {
    try {
      // 1. 로그인해서 액세스토큰 가져오기
      const result = await loginUserExample({
        variables: {
          email,
          password,
        },
      });
      const accessToken = result.data?.loginUserExample.accessToken;
      console.log(accessToken);

      // 2. 액세스토큰 글로벌스테이트에 저장하기
      if (!accessToken) {
        alert("로그인 실패");
        return;
      }
      setAccessToken(accessToken);

      // 3. 로그인 성공 페이지로 이동하기
      void router.push("/30-02-login-refreshtoken-success");
    } catch (error) {
      if (error instanceof Error) alert(error.message);
    }
  };
  return (
    <>
      이메일: <input type="text" onChange={onChangeEmail} />
      비밀번호:
      <input type="password" onChange={onChangePassword} />
      <button onClick={onClickLogin}>로그인하기</button>
    </>
  );
}
