import {ApolloProvider, ApolloClient, InMemoryCache} from "@apollo/client";

interface IApolloSettingProps {
  children: JSX.Element;
}

export default function ApolloSetting(props: IApolloSettingProps) {
  const client = new ApolloClient({
    uri: "http://backendonline.codebootcamp.co.kr/graphql",
    cache: new InMemoryCache(),
  });
  return (
    // ApolloClient에 감싸져 있는 부분은 mutation, query 등의 영향을 받는다
    // prettier-ignore
    <ApolloProvider client={client}>
      {props.children}
    </ApolloProvider>
  );
}
