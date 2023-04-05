import {accessTokenState} from "@/commons/store";
import {
  ApolloProvider,
  ApolloClient,
  InMemoryCache,
  ApolloLink,
} from "@apollo/client";
import {createUploadLink} from "apollo-upload-client";
import {useRecoilState} from "recoil";

const GLOBAL_STATE = new InMemoryCache();

interface IApolloSettingProps {
  children: JSX.Element;
}

export default function ApolloSetting(props: IApolloSettingProps) {
  const [accessToken, setAccessToken] = useRecoilState(accessTokenState);
  const uploadLink = createUploadLink({
    uri: "http://backendonline.codebootcamp.co.kr/graphql",
    headers: {Authorization: `Bearer ${accessToken}`},
  });

  const client = new ApolloClient({
    link: ApolloLink.from([uploadLink as unknown as ApolloLink]),
    // global state부분
    // cache: new InMemoryCache() -> 페이지 전환되면 계속 리뉴됨
    cache: GLOBAL_STATE, // 페이지 전환 (_app.tsx 리렌더)되어도 캐시 유지
  });
  return (
    // ApolloClient에 감싸져 있는 부분은 mutation, query 등의 영향을 받는다
    // prettier-ignore
    <ApolloProvider client={client}>
      {props.children}
    </ApolloProvider>
  );
}
