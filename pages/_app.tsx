// import "../styles/globals.css";
import type {AppProps} from "next/app";
import ApolloSetting from "@/components/commons/apollo";
import Layout from "@/components/commons/layout";
import {Global} from "@emotion/react";
import {globalStyles} from "@/commons/styles/globalStyles";

function MyApp({Component}: AppProps) {
  return (
    <>
      <Global styles={globalStyles} />
      <ApolloSetting>
        <Layout>
          <Component />
        </Layout>
      </ApolloSetting>
    </>
  );
}

export default MyApp;
