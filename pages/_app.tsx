import type {AppProps} from "next/app";
import ApolloSetting from "@/components/commons/apollo";
import Layout from "@/components/commons/layout";
import {Global} from "@emotion/react";
import {globalStyles} from "@/commons/styles/globalStyles";
import {RecoilRoot} from "recoil";

function MyApp({Component}: AppProps) {
  return (
    // 모든 페이지에서 카카오맵을 다운받으므로 비효율적임
    // <Head>
    //     <script
    //       type="text/javascript"
    //       src="//dapi.kakao.com/v2/maps/sdk.js?appkey=90df5911074985507e4c3b111e125e2f"
    //     ></script>
    //   </Head>
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
