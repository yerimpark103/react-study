import {ApolloProvider, ApolloClient, InMemoryCache} from "@apollo/client";
import type {AppProps} from "next/app";

function MyApp({Component}: AppProps) {
  const client = new ApolloClient({
    uri: "http://practice.codebootcamp.co.kr/graphql",
    cache: new InMemoryCache(),
  });

  return (
    <ApolloProvider client={client}>
      <Component />
    </ApolloProvider>
  );
}

export default MyApp;
