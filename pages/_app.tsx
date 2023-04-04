import type {AppProps} from "next/app";
import ApolloSetting from "@/components/commons/apollo";
import Layout from "@/components/commons/layout";
import {Global} from "@emotion/react";
import {globalStyles} from "@/commons/styles/globalStyles";
import {RecoilRoot} from "recoil";

function MyApp({Component}: AppProps) {
  return (
    <>
      <RecoilRoot>
        <ApolloSetting>
          <>
            <Global styles={globalStyles} />
            <Layout>
              <Component />
            </Layout>
          </>
        </ApolloSetting>
      </RecoilRoot>
    </>
  );
}

export default MyApp;
