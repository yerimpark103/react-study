import {getAccessToken} from "@/commons/libraries/getAccessToken";
import {accessTokenState} from "@/commons/store";
import {
  ApolloProvider,
  ApolloClient,
  InMemoryCache,
  ApolloLink,
  fromPromise,
} from "@apollo/client";
import {onError} from "@apollo/client/link/error";
import {createUploadLink} from "apollo-upload-client";
import {useEffect} from "react";
import {useRecoilState} from "recoil";

const GLOBAL_STATE = new InMemoryCache();

interface IApolloSettingProps {
  children: JSX.Element;
}

export default function ApolloSetting(props: IApolloSettingProps) {
  const [accessToken, setAccessToken] = useRecoilState(accessTokenState);

  /*
  // 1. 프리렌더링 예제 : process.browser
  if (process.browser) {
    console.log("browser");
    const result = localStorage.getItem("accessToken");
    console.log(result);
    if (result) setAccessToken(result);
  } else {
    console.log("frontend server");
  }
 */

  /*
  // 2. 프리렌더링 예제 : typeof window
  if (typeof window !== "undefined") {
    console.log("browser");
    const result = localStorage.getItem("accessToken");
    console.log(result);
    if (result) setAccessToken(result);
  } else {
    console.log("frontend server");
  }
 */

  // 3. 프리렌더링 무시 : useEffect
  useEffect(() => {
    // 1. 기존 방식 (refreshToken 이전)
    // console.log("browser");
    // const result = localStorage.getItem("accessToken");
    // console.log(result);
    // if (result) setAccessToken(result);

    // 2. 새로운 방식 (refreshToken 이후) - 새로고침 이후에도 토큰 유지할 수 있도록
    void getAccessToken().then((newAccessToken) => {
      setAccessToken(newAccessToken);
    });
  }, []);

  // operation : 실패한 쿼리
  const errorLink = onError(({graphQLErrors, operation, forward}) => {
    // 1-1. 에러를 캐치
    if (graphQLErrors) {
      for (const err of graphQLErrors) {
        // 1-2. 해당 에러가 토큰 만료 에러인지 체크(UNAUTHENTICATED)
        if (err.extensions.code === "UNAUTHENTICATED") {
          return fromPromise(
            // 2-1. refreshToken으로 accessToken을 재발급 받기
            getAccessToken().then((newAccessToken) => {
              // 2-2. 재발급 받은 accessToken 저장하기
              setAccessToken(newAccessToken);

              // 3-1. 재발급 받은 accessToken으로 방금 실패한 쿼리 정보 수정하기
              if (typeof newAccessToken !== "string") return;
              operation.setContext({
                headers: {
                  ...operation.getContext().headers, // 만료된 토큰이 추가되어 있는 상태
                  Authorization: `Bearer ${newAccessToken}`, // 토큰만 새걸로 바꿔치기
                },
              });
            })
            // 3-2. 방금 수정한 쿼리 재요청
          ).flatMap(() => forward(operation));
        }
      }
    }
  });

  const uploadLink = createUploadLink({
    uri: "https://backendonline.codebootcamp.co.kr/graphql",
    headers: {Authorization: `Bearer ${accessToken}`},
    credentials: "include",
  });

  const client = new ApolloClient({
    link: ApolloLink.from([errorLink, uploadLink as unknown as ApolloLink]),
    // global state부분
    // cache: new InMemoryCache() -> 페이지 전환되면 계속 리뉴됨
    cache: GLOBAL_STATE, // 페이지 전환 (_app.tsx 리렌더)되어도 캐시 유지
    connectToDevTools: true,
  });
  return (
    // ApolloClient에 감싸져 있는 부분은 mutation, query 등의 영향을 받는다
    // prettier-ignore
    <ApolloProvider client={client}>
      {props.children}
    </ApolloProvider>
  );
}
