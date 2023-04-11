import {accessTokenState} from "@/commons/store";
import {
  ApolloProvider,
  ApolloClient,
  InMemoryCache,
  ApolloLink,
} from "@apollo/client";
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
    console.log("browser");
    const result = localStorage.getItem("accessToken");
    console.log(result);
    if (result) setAccessToken(result);
  }, []);

  const uploadLink = createUploadLink({
    uri: "http://backendonline.codebootcamp.co.kr/graphql",
    headers: {Authorization: `Bearer ${accessToken}`},
  });

  const client = new ApolloClient({
    link: ApolloLink.from([uploadLink as unknown as ApolloLink]),
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
